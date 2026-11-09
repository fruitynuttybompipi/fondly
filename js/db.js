// Local-first storage in IndexedDB: moments, photo blobs, and small meta values.
export const MAX_PER_DAY = 5;

let dbPromise;
function open() {
  dbPromise ??= new Promise((resolve, reject) => {
    // Internal DB name kept from the app's first name so existing entries stay readable.
    const req = indexedDB.open('little-happy-things', 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      const m = db.createObjectStore('moments', { keyPath: 'id' });
      m.createIndex('date', 'date');
      db.createObjectStore('photos');
      db.createObjectStore('meta');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

async function tx(store, mode, fn) {
  const db = await open();
  return new Promise((resolve, reject) => {
    const t = db.transaction(store, mode);
    let out, failure;
    Promise.resolve(fn(t.objectStore(store), t)).then((v) => { out = v; }, (e) => { failure = e; try { t.abort(); } catch { /* already done */ } });
    t.oncomplete = () => (failure ? reject(failure) : resolve(out));
    t.onerror = () => reject(failure || t.error);
    t.onabort = () => reject(failure || t.error);
  });
}
const req = (r) => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });

const listeners = new Set();
export const onChange = (fn) => listeners.add(fn);
const changed = (date) => listeners.forEach((fn) => fn(date));

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

/** All moments, tombstones included (sync needs them). */
export const allMomentsRaw = () => tx('moments', 'readonly', (s) => req(s.getAll()));

/** Live moments, sorted by date then creation. */
export async function allMoments() {
  const rows = await allMomentsRaw();
  return rows.filter((m) => !m.deleted).sort((a, b) => a.date.localeCompare(b.date) || a.createdAt - b.createdAt);
}

export async function momentsFor(date) {
  const rows = await tx('moments', 'readonly', (s) => req(s.index('date').getAll(date)));
  return rows.filter((m) => !m.deleted).sort((a, b) => a.createdAt - b.createdAt);
}

export async function addMoment(date, fields) {
  const now = Date.now();
  const moment = { id: uid(), date, text: '', photoId: null, sticker: null, mood: null, prompt: null, ...fields, createdAt: now, updatedAt: now, deleted: false };
  await tx('moments', 'readwrite', async (s) => {
    const existing = (await req(s.index('date').getAll(date))).filter((m) => !m.deleted);
    if (existing.length >= MAX_PER_DAY) throw new Error('jar-full');
    s.put(moment);
  });
  await markDirty(date);
  changed(date);
  return moment;
}

export async function updateMoment(id, fields) {
  let date;
  await tx('moments', 'readwrite', async (s) => {
    const m = await req(s.get(id));
    if (!m) throw new Error('missing');
    date = m.date;
    s.put({ ...m, ...fields, updatedAt: Date.now() });
  });
  await markDirty(date);
  changed(date);
}

/** Soft delete: the tombstone lets the delete win on other devices. */
export async function deleteMoment(id) {
  let photoId;
  await tx('moments', 'readonly', async (s) => { photoId = (await req(s.get(id)))?.photoId; });
  await updateMoment(id, { deleted: true, text: '', photoId: null });
  if (photoId) await deletePhoto(photoId);
}

/** Overwrite with merged rows coming from sync (no dirty marking). */
export async function putMomentsFromSync(rows) {
  if (!rows.length) return;
  await tx('moments', 'readwrite', (s) => rows.forEach((r) => s.put(r)));
  changed(null);
}

// ---- photos ----
export const getPhoto = (id) => tx('photos', 'readonly', (s) => req(s.get(id)));
export const putPhoto = (id, blob) => tx('photos', 'readwrite', (s) => s.put(blob, id));
export const deletePhoto = (id) => tx('photos', 'readwrite', (s) => s.delete(id));
export const photoKeys = () => tx('photos', 'readonly', (s) => req(s.getAllKeys()));

const urlCache = new Map();
export async function photoURL(id) {
  if (!id) return null;
  if (urlCache.has(id)) return urlCache.get(id);
  const blob = await getPhoto(id);
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  urlCache.set(id, url);
  return url;
}

/** Resize a camera photo to a 1600px JPEG before it is stored or synced. */
export async function storePhotoFile(file) {
  const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('encode'))), 'image/jpeg', 0.82));
  const id = uid();
  await putPhoto(id, blob);
  return id;
}

// ---- meta ----
export const getMeta = (key, fallback = null) => tx('meta', 'readonly', (s) => req(s.get(key))).then((v) => v ?? fallback);
export const setMeta = (key, value) => tx('meta', 'readwrite', (s) => s.put(value, key));

async function markDirty(date) {
  const dirty = await getMeta('dirtyDays', []);
  if (!dirty.includes(date)) await setMeta('dirtyDays', [...dirty, date]);
}

// ---- backup ----
const toDataURL = (blob) => new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); });

export async function exportAll() {
  const moments = await allMomentsRaw();
  const photos = {};
  for (const id of await photoKeys()) photos[id] = await toDataURL(await getPhoto(id));
  return { app: 'fondly', version: 1, exportedAt: new Date().toISOString(), moments, photos };
}

/** Import merges by id; the newer updatedAt wins, so a re-import never loses newer edits. */
export async function importAll(data, merge) {
  if (!['fondly', 'little-happy-things'].includes(data?.app) || !Array.isArray(data.moments)) throw new Error('This file is not a Fondly backup.');
  for (const [id, url] of Object.entries(data.photos || {})) await putPhoto(id, await (await fetch(url)).blob());
  const local = await allMomentsRaw();
  const merged = merge(local, data.moments);
  await tx('moments', 'readwrite', (s) => merged.forEach((r) => s.put(r)));
  const dirty = new Set(await getMeta('dirtyDays', []));
  data.moments.forEach((m) => dirty.add(m.date));
  await setMeta('dirtyDays', [...dirty]);
  changed(null);
  return data.moments.filter((m) => !m.deleted).length;
}
