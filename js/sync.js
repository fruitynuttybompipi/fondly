// Sync to a private GitHub repo the owner controls.
// Layout: days/YYYY/YYYY-MM-DD.json (moments incl. tombstones) and photos/<id>.jpg.
// Conflict rule: per moment, the newest updatedAt wins; on a tie a delete wins.

/** Pure merge, shared by sync and backup import. */
export function mergeMoments(a, b) {
  const byId = new Map();
  for (const m of [...a, ...b]) {
    const cur = byId.get(m.id);
    if (!cur || m.updatedAt > cur.updatedAt || (m.updatedAt === cur.updatedAt && m.deleted && !cur.deleted)) byId.set(m.id, m);
  }
  return [...byId.values()].sort((x, y) => x.date.localeCompare(y.date) || x.createdAt - y.createdAt);
}

export const dayPath = (date) => `days/${date.slice(0, 4)}/${date}.json`;
const DAY_RE = /^days\/\d{4}\/(\d{4}-\d{2}-\d{2})\.json$/;
const PHOTO_RE = /^photos\/([\w-]+)\.jpg$/;

const listeners = new Set();
export const onSyncStatus = (fn) => listeners.add(fn);
let status = { state: 'off' };
const setStatus = (s) => { status = s; listeners.forEach((fn) => fn(s)); };
export const syncStatus = () => status;

function bytesToB64(bytes) {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
const b64ToBytes = (b64) => Uint8Array.from(atob(b64.replace(/\s/g, '')), (c) => c.charCodeAt(0));
const textToB64 = (t) => bytesToB64(new TextEncoder().encode(t));

class GitHubError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

function client({ repo, branch, token }) {
  return async function api(path, { method = 'GET', body } = {}) {
    const res = await fetch(`https://api.github.com/repos/${repo}${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify({ branch, ...body }) : undefined,
    });
    if (res.status === 204) return null;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new GitHubError(res.status, data.message || res.statusText);
    return data;
  };
}

/** Check the settings before saving them: repo reachable, private, writable. */
export async function testConnection(cfg) {
  const res = await fetch(`https://api.github.com/repos/${cfg.repo}`, { headers: { Authorization: `Bearer ${cfg.token}`, Accept: 'application/vnd.github+json' } });
  if (res.status === 401) throw new Error('GitHub did not accept that token. Check it was copied in full and has not expired.');
  if (res.status === 404) throw new Error(`Can't see ${cfg.repo}. Check the name, and that the token has access to this repo.`);
  if (!res.ok) throw new Error(`GitHub answered ${res.status}. Try again in a moment.`);
  const info = await res.json();
  if (!info.private) throw new Error(`${cfg.repo} is public. Your journal must go in a private repo.`);
  if (info.permissions && !info.permissions.push) throw new Error('The token can read but not write. Give it Contents: Read and write.');
  return info.default_branch;
}

let running = null;
let timer = null;

/** Debounced sync after local edits. */
export function scheduleSync(db, delay = 2500) {
  clearTimeout(timer);
  timer = setTimeout(() => syncNow(db), delay);
}

export function syncNow(db) {
  running ??= runSync(db).finally(() => { running = null; });
  return running;
}

async function runSync(db) {
  const cfg = await db.getMeta('sync');
  if (!cfg?.token) return setStatus({ state: 'off' });
  if (!navigator.onLine) return setStatus({ state: 'offline' });
  setStatus({ state: 'syncing' });

  // Take the dirty list now; edits made during the sync re-add themselves.
  const dirty = await db.getMeta('dirtyDays', []);
  await db.setMeta('dirtyDays', []);
  const push = new Set(dirty);

  try {
    const api = client(cfg);
    let tree = [];
    try {
      tree = (await api(`/git/trees/${encodeURIComponent(cfg.branch)}?recursive=1`)).tree;
    } catch (e) {
      if (e.status !== 409 && e.status !== 404) throw e; // 409 = empty repo
    }
    const remoteShas = await db.getMeta('remoteShas', {});
    const treeSha = Object.fromEntries(tree.map((t) => [t.path, t.sha]));

    // 1. Pull remote days that changed since we last saw them.
    let local = await db.allMomentsRaw();
    for (const t of tree) {
      const date = DAY_RE.exec(t.path)?.[1];
      if (!date || remoteShas[t.path] === t.sha) continue;
      const blob = await api(`/git/blobs/${t.sha}`);
      const remote = JSON.parse(new TextDecoder().decode(b64ToBytes(blob.content)));
      const mine = local.filter((m) => m.date === date);
      const merged = mergeMoments(mine, remote);
      const changed = merged.filter((m) => { const o = mine.find((x) => x.id === m.id); return !o || o.updatedAt !== m.updatedAt || o.deleted !== m.deleted; });
      await db.putMomentsFromSync(changed);
      remoteShas[t.path] = t.sha;
      if (merged.length !== remote.length || merged.some((m) => { const r = remote.find((x) => x.id === m.id); return !r || r.updatedAt !== m.updatedAt; })) push.add(date);
    }
    local = await db.allMomentsRaw();

    // 2. Photos: download what we lack, upload what the repo lacks, remove orphans.
    const remotePhotos = new Map(tree.map((t) => [PHOTO_RE.exec(t.path)?.[1], t]).filter(([id]) => id));
    const localPhotos = new Set(await db.photoKeys());
    const referenced = new Set(local.filter((m) => !m.deleted && m.photoId).map((m) => m.photoId));
    for (const id of referenced) {
      if (!localPhotos.has(id) && remotePhotos.has(id)) {
        const blob = await api(`/git/blobs/${remotePhotos.get(id).sha}`);
        await db.putPhoto(id, new Blob([b64ToBytes(blob.content)], { type: 'image/jpeg' }));
      } else if (localPhotos.has(id) && !remotePhotos.has(id)) {
        const bytes = new Uint8Array(await (await db.getPhoto(id)).arrayBuffer());
        await api(`/contents/photos/${id}.jpg`, { method: 'PUT', body: { message: 'Add photo', content: bytesToB64(bytes) } });
      }
    }
    for (const [id, t] of remotePhotos) {
      if (!referenced.has(id)) await api(`/contents/${t.path}`, { method: 'DELETE', body: { message: 'Remove deleted photo', sha: t.sha } }).catch(() => {});
    }

    // 3. Push changed days.
    for (const date of push) {
      const path = dayPath(date);
      const write = async (sha) => {
        const rows = (await db.allMomentsRaw()).filter((m) => m.date === date).sort((a, b) => a.createdAt - b.createdAt);
        const res = await api(`/contents/${path}`, { method: 'PUT', body: { message: `Journal ${date}`, content: textToB64(JSON.stringify(rows, null, 1)), ...(sha ? { sha } : {}) } });
        remoteShas[path] = res.content.sha;
      };
      try {
        await write(treeSha[path]);
      } catch (e) {
        if (e.status !== 409 && e.status !== 422) throw e;
        // Someone else wrote this day meanwhile: merge theirs, then retry once.
        const cur = await api(`/contents/${path}?ref=${encodeURIComponent(cfg.branch)}`);
        const remote = JSON.parse(new TextDecoder().decode(b64ToBytes(cur.content)));
        const mine = (await db.allMomentsRaw()).filter((m) => m.date === date);
        await db.putMomentsFromSync(mergeMoments(mine, remote));
        await write(cur.sha);
      }
      push.delete(date);
    }

    await db.setMeta('remoteShas', remoteShas);
    await db.setMeta('lastSync', Date.now());
    setStatus({ state: 'ok', at: Date.now() });
  } catch (e) {
    // Put back whatever did not reach GitHub so the next sync retries it.
    const now = await db.getMeta('dirtyDays', []);
    await db.setMeta('dirtyDays', [...new Set([...now, ...push])]);
    const msg = e.status === 401 ? 'GitHub rejected the token. It may have expired: make a new one in Settings.'
      : e.status === 404 ? 'The journal repo or branch was not found. Check Settings.'
      : e instanceof TypeError ? 'Could not reach GitHub. Your entries are safe on this device.'
      : `Sync stopped: ${e.message}`;
    setStatus({ state: 'error', message: msg });
  }
}
