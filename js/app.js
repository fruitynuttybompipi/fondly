import * as db from './db.js';
import { mergeMoments, scheduleSync, syncNow, onSyncStatus, syncStatus, testConnection } from './sync.js';
import { STICKERS, MOODS, sticker, mood, icons, todayCircle, tinyFlower, tinySparkle, tinyHeart, jar, doodle, paperClip, dateStamp, postmark } from './art.js';
import { seedDemo } from './demo.js';
import { QUOTES, PROMPTS, AFFIRMATIONS, REMINDERS, dailyPick, greeting, EMPTY_OTD } from './content.js';

// ---------- helpers ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => iso(new Date());
const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const fmtLong = (s) => parse(s).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const fmtDate = (s) => parse(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const fmtShort = (s) => parse(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const isFuture = (s) => s > today();
const validDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && iso(parse(s)) === s;
const tilt = (id) => ['tilt-a', 'tilt-b', 'tilt-c', 'tilt-d'][[...id].reduce((h, c) => h + c.charCodeAt(0), 0) % 4];
const plural = (n, one, many = one + 's') => `${n} ${n === 1 ? one : many}`;
const YEARS_AGO = ['', 'One Year Ago', 'Two Years Ago', 'Three Years Ago', 'Four Years Ago', 'Five Years Ago'];

let toastTimer;
/** action: { label, run } adds one button; the toast then stays long enough to reach it. */
function toast(msg, action) {
  const el = $('#toast');
  el.replaceChildren(msg);
  if (action) {
    const b = Object.assign(document.createElement('button'), { type: 'button', className: 'toast-act', textContent: action.label });
    b.addEventListener('click', () => { el.classList.remove('show'); action.run(); }, { once: true });
    el.append(b);
  }
  if (action) el.append(Object.assign(document.createElement('span'), { className: 'sr', textContent: ` ${action.label} available.` }));
  el.classList.add('show');
  const ms = action ? 7000 : 3200;
  toastHide = () => { clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), ms); };
  toastHide();
}
let toastHide = () => {};
// Time stops while the toast is hovered or focused (WCAG 2.2.1), and restarts in full on leave.
for (const ev of ['pointerenter', 'focusin']) document.getElementById('toast').addEventListener(ev, () => clearTimeout(toastTimer));
for (const ev of ['pointerleave', 'focusout']) document.getElementById('toast').addEventListener(ev, () => toastHide());

// Milestones are read from real saved moments, never invented.
const MILESTONES = { 1: 'Your very first little happy thing is on this page. This is where it starts ♡', 10: 'Ten little happy things kept. The jar is getting cozy.', 25: 'Twenty-five little happy things. That is a lot of noticing.', 50: 'Fifty little happy things, and this page holds the fiftieth.', 100: 'Your 100th little happy thing is on this page ♡', 250: '250 little happy things. Look at you, collector.', 365: '365 little happy things: a whole year of them, in moments.', 500: '500 little happy things. What a jar.', 1000: '1,000 little happy things. Thank you for noticing every one.' };
function milestoneFor(date) {
  const order = [...all].sort((a, b) => a.date.localeCompare(b.date) || a.createdAt - b.createdAt);
  for (let i = 0; i < order.length; i++) if (order[i].date === date && MILESTONES[i + 1]) return MILESTONES[i + 1];
  return null;
}

// ---------- theme: evening paper after dark ----------
const darkQuery = matchMedia('(prefers-color-scheme: dark)');
darkQuery.addEventListener('change', () => applyTheme());
async function applyTheme() {
  const pref = await db.getMeta('theme', 'auto');
  const h = new Date().getHours();
  // shortcut: fixed 7pm–6am window stands in for real sunset; use a sun calculator if the owner travels far.
  const evening = pref === 'evening' || (pref === 'auto' && (h >= 19 || h < 6 || darkQuery.matches));
  document.documentElement.dataset.theme = evening ? 'evening' : 'day';
  $('meta[name="theme-color"]').content = evening ? '#1f2a33' : '#fff3c4';
}

// ---------- state ----------
let all = [];          // live moments
let byDate = new Map();
let calMonth = (() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; })();
let editing = null;    // { id|null, date, text, prompt, photoId, sticker, mood, newPhoto }
let confirmingDelete = null;
let otdYear = null;
let doneQuote = null;
let journalQuery = '';
const PAGE = 60;
let journalLimit = PAGE;
let galleryLimit = PAGE;
let galleryFilter = { y: 'all', m: 'all' };
let statsYear = new Date().getFullYear();
let pulled = null;

async function load() {
  all = await db.allMoments();
  byDate = new Map();
  for (const m of all) (byDate.get(m.date) ?? byDate.set(m.date, []).get(m.date)).push(m);
}

// ---------- shared pieces ----------
const photoImg = (m, cls = '', full = false) => (m.photoId ? `<img class="${cls}" data-photo="${esc(m.photoId)}"${full ? ' data-full' : ''} loading="lazy" decoding="async" alt="${esc(m.text ? 'Photo: ' + m.text.slice(0, 80) : 'Photo of a happy moment')}">` : '');
const moodTag = (m) => (m.mood ? `<span class="mood-tag">${mood(m.mood)}<span>${MOODS[m.mood].label}</span></span>` : '');

async function showPhoto(img) {
  const url = await db.photoURL(img.dataset.photo, !('full' in img.dataset));
  if (url) img.src = url; else img.closest('.has-photo')?.classList.add('photo-missing');
}
// Photos load as they come near the screen, so long lists don't decode everything at once.
const photoIO = 'IntersectionObserver' in window
  ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { photoIO.unobserve(e.target); showPhoto(e.target); } }), { rootMargin: '400px' })
  : null;
function hydratePhotos(root = document) {
  for (const img of $$('img[data-photo]:not([src])', root)) photoIO ? photoIO.observe(img) : showPhoto(img);
}

// ---------- HOME ----------
function calendarHTML() {
  const { y, m } = calMonth;
  const first = new Date(y, m, 1);
  const lead = (first.getDay() + 6) % 7; // Monday first
  const days = new Date(y, m + 1, 0).getDate();
  const t = today();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push('<span class="cal-pad" aria-hidden="true"></span>');
  for (let d = 1; d <= days; d++) {
    const date = `${y}-${pad(m + 1)}-${pad(d)}`;
    const ms = byDate.get(date) || [];
    const withPhoto = ms.find((x) => x.photoId);
    const withSticker = ms.find((x) => x.sticker);
    const future = date > t;
    const label = `${d} ${MONTHS[m]}${ms.length ? `, ${plural(ms.length, 'happy thing')}` : ''}${date === t ? ', today' : ''}`;
    const preview = withPhoto ? `<span class="cal-thumb has-photo">${photoImg(withPhoto)}</span>` : withSticker ? sticker(withSticker.sticker, 'cal-sticker') : '';
    const inner = `<span class="cal-num">${d}</span>${date === t ? todayCircle : ''}${preview}${ms.length ? `<span class="cal-mark">${tinyFlower('cal-flower')}${ms.length > 1 ? `<i>${ms.length}</i>` : ''}</span>` : ''}`;
    cells.push(future
      ? `<span class="cal-day future" aria-label="${esc(label)}, not yet">${inner}</span>`
      : `<a class="cal-day${ms.length ? ' has' : ''}${date === t ? ' today' : ''}" href="#/day/${date}" aria-label="${esc(label)}"${ms[0] ? ` title="${esc(ms[0].text.slice(0, 90))}"` : ''}>${inner}</a>`);
  }
  const now = new Date();
  const onThisMonth = y === now.getFullYear() && m === now.getMonth();
  return `<section class="cal sheet" aria-label="Calendar">
    <span class="tape tape-r" aria-hidden="true"></span>
    <span class="label-tab" aria-hidden="true">this month</span>
    <div class="cal-head">
      <button class="icon-btn" data-cal="-1" aria-label="Previous month">${icons.left}</button>
      <h2><span class="cal-month">${MONTHS[m]}</span> <span class="cal-year">${y}</span></h2>
      <button class="icon-btn" data-cal="1" aria-label="Next month">${icons.right}</button>
    </div>
    <div class="cal-dow" aria-hidden="true">${['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => `<span>${d}</span>`).join('')}</div>
    <div class="cal-grid">${cells.join('')}</div>
    ${onThisMonth ? '' : '<button class="link-btn cal-back" data-cal="today">Back to this month</button>'}
  </section>`;
}

function captureHTML() {
  const n = (byDate.get(today()) || []).length;
  if (n >= db.MAX_PER_DAY) return `<a class="capture full" href="#/day/${today()}">${tinyHeart('capture-deco')}<span><b>Today's jar is full ♡</b><small>Peek inside your page</small></span></a>`;
  return `<a class="capture" href="#/day/${today()}">${icons.plus}<span><b>Capture Today's Happy Moments</b><small>${n ? `${n}/5 collected so far` : 'Up to five little things'}</small></span></a>`;
}

function otdHTML() {
  const t = today();
  const [ty, md] = [Number(t.slice(0, 4)), t.slice(5)];
  const years = [...byDate.keys()].filter((d) => d.slice(5) === md && Number(d.slice(0, 4)) < ty).sort().reverse();
  if (!years.length) {
    return `<section class="otd otd-empty sheet-slate" aria-labelledby="otd-h">
      <h2 id="otd-h">On This Day… ♡</h2>
      <p>${esc(EMPTY_OTD)}</p>${tinySparkle('otd-spark')}
    </section>`;
  }
  const sel = years.includes(otdYear) ? otdYear : years[0];
  const ago = ty - Number(sel.slice(0, 4));
  const ms = byDate.get(sel);
  return `<section class="otd sheet-slate" aria-labelledby="otd-h">
    <span class="label-tab kraft" aria-hidden="true">from the vault</span>
    <h2 id="otd-h">A little memory from this day…</h2>
    <details class="envelope" ${sessionStorage.getItem('otd-open') === t ? 'open' : ''}>
      <summary>
        <span class="env-back" aria-hidden="true"></span>
        <span class="env-letter" aria-hidden="true">${ms.slice(0, 3).map((x, i) => `<span class="env-peek p${i}">${x.photoId ? photoImg(x) : (x.sticker ? sticker(x.sticker) : tinyHeart())}</span>`).join('')}</span>
        <span class="env-front" aria-hidden="true">${postmark(sel.slice(0, 4))}</span>
        <span class="env-flap" aria-hidden="true"></span>
        <span class="env-seal" aria-hidden="true">${tinyHeart('seal-heart')}</span>
        <span class="env-label"><b>${plural(years.length, 'year')} of memories</b><small>Tap to open</small></span>
      </summary>
      <div class="otd-body">
        ${years.length > 1 ? `<div class="chips" role="tablist" aria-label="Choose a year">${years.map((d) => { const a = ty - Number(d.slice(0, 4)); return `<button role="tab" class="chip${d === sel ? ' on' : ''}" aria-selected="${d === sel}" data-otd="${d}">${a} ${a === 1 ? 'year' : 'years'} ago</button>`; }).join('')}</div>` : ''}
        <h3>On This Day… ${YEARS_AGO[ago] || `${ago} Years Ago`} ♡</h3>
        <p class="otd-date">${fmtDate(sel)}</p>
        <p class="otd-sub">Look how far you've come! Here's what made you smile ${ago === 1 ? 'one year' : `${ago} years`} ago.</p>
        <ul class="otd-list">${ms.map((x) => `<li class="mini-polaroid ${tilt(x.id)}${x.photoId ? ' has-photo' : ' note'}">${photoImg(x)}<p>${esc(x.text)}</p><span class="mini-meta">${x.mood ? mood(x.mood) : ''}${x.sticker ? sticker(x.sticker) : ''}</span></li>`).join('')}</ul>
        <a class="btn btn-slate" href="#/day/${sel}">Revisit This Memory</a>
      </div>
    </details>
  </section>`;
}

function recentHTML() {
  const recent = [...all].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt).slice(0, 8);
  if (!recent.length) return '';
  return `<section class="recent" aria-labelledby="recent-h">
    <h2 id="recent-h">Recently Remembered</h2>
    <ul class="recent-strip">${recent.map((m) => `<li><a class="mini-polaroid ${tilt(m.id)}${m.photoId ? ' has-photo' : ' note'}" href="#/day/${m.date}">${m.photoId ? photoImg(m) : (m.sticker ? sticker(m.sticker, 'note-sticker') : '')}<p>${esc(m.text)}</p><time datetime="${m.date}">${fmtShort(m.date)}</time></a></li>`).join('')}</ul>
  </section>`;
}

function homeView() {
  const t = today();
  return `<div class="home">
    <div class="home-main">${calendarHTML()}${captureHTML()}</div>
    <div class="home-side">
      ${all.length ? '' : `<aside class="welcome"><span class="tape tape-l" aria-hidden="true"></span><h2>Your diary is ready</h2><p>Each night, keep up to five little happy things: a few words, a photo if you like, a sticker and a mood. Tap <b>Capture</b> to start tonight's page.</p></aside>`}
      <section class="hello" aria-labelledby="hello-h">
        ${(() => { const g = greeting(new Date().getHours()); return `<h1 id="hello-h">${g.text}&nbsp;${sticker(g.art, 'greet-art')}</h1>`; })()}
        ${doodle('stars', 'md-hello')}
        <p class="affirm">${esc(dailyPick(AFFIRMATIONS, t))}</p>
        <aside class="reminder"><span class="tape tape-r" aria-hidden="true"></span><h2>Daily Little Reminder</h2><p>${esc(dailyPick(REMINDERS, t, 'r'))}</p></aside>
      </section>
      ${otdHTML()}
    </div>
    ${recentHTML()}
  </div>`;
}

function bindHome(root) {
  $$('[data-cal]', root).forEach((b) => b.addEventListener('click', () => {
    const v = b.dataset.cal;
    if (v === 'today') { const d = new Date(); calMonth = { y: d.getFullYear(), m: d.getMonth() }; }
    else { const d = new Date(calMonth.y, calMonth.m + Number(v), 1); calMonth = { y: d.getFullYear(), m: d.getMonth() }; }
    const cal = $('.cal', root);
    cal.outerHTML = calendarHTML();
    bindHome(root);
    hydratePhotos($('.cal', root));
    $(`.cal [data-cal="${v}"]`, root)?.focus();
  }));
  $$('[data-otd]', root).forEach((b) => b.addEventListener('click', () => { otdYear = b.dataset.otd; render(); }));
  $('.envelope', root)?.addEventListener('toggle', (e) => sessionStorage.setItem('otd-open', e.target.open ? today() : ''));
}

// ---------- DAY ----------
function momentCard(m, date) {
  if (editing && editing.id === m.id) return editorHTML(date);
  if (confirmingDelete === m.id) {
    return `<li class="moment note confirm ${tilt(m.id)}"><p class="confirm-q">Let this little thing go?</p><p class="confirm-text">“${esc(m.text.slice(0, 120))}”</p>
      <div class="row"><button class="btn btn-ghost" data-act="keep">Keep it</button><button class="btn btn-danger" data-act="really-delete" data-id="${m.id}">${icons.trash} Delete</button></div></li>`;
  }
  return `<li class="moment ${m.photoId ? 'polaroid has-photo' : 'note'} ${tilt(m.id)}">
    ${m.photoId ? paperClip : '<span class="tape" aria-hidden="true"></span>'}
    ${m.photoId ? `<div class="pol-frame">${photoImg(m, '', true)}</div>` : ''}
    ${m.prompt ? `<p class="moment-prompt">${esc(m.prompt)}</p>` : ''}
    <p class="moment-text">${esc(m.text)}</p>
    <div class="moment-foot">${moodTag(m)}<span class="spacer"></span>
      <button class="icon-btn" data-act="edit" data-id="${m.id}" aria-label="Edit this moment">${icons.pencil}</button>
      <button class="icon-btn" data-act="delete" data-id="${m.id}" aria-label="Delete this moment">${icons.trash}</button>
    </div>
    ${m.sticker ? sticker(m.sticker, 'moment-sticker') : ''}
  </li>`;
}

function editorHTML(date) {
  const e = editing;
  const sid = (k) => `st-${k}`;
  return `<li class="moment note editing">
    <form class="editor" novalidate>
      <span class="tape" aria-hidden="true"></span>
      <div class="editor-prompt"><label for="moment-text">${esc(e.prompt)}</label>
        <button type="button" class="icon-btn" data-act="shuffle" aria-label="Show a different prompt" title="Different prompt">${icons.shuffle}</button></div>
      <textarea id="moment-text" rows="3" maxlength="300" placeholder="Write it down, big or tiny…">${esc(e.text)}</textarea>
      <p class="char-count" aria-live="polite"><span>${e.text.length}</span>/300</p>
      <div class="editor-photo">
        ${e.photoId
          ? `<div class="pol-frame small has-photo"><img data-photo="${esc(e.photoId)}" alt="Chosen photo"></div><div class="col"><label class="btn btn-ghost file-btn">${icons.camera} Change photo<input type="file" accept="image/*" data-act="photo" hidden></label><button type="button" class="link-btn" data-act="remove-photo">Remove photo</button></div>`
          : `<label class="photo-drop file-btn">${icons.camera}<span>Add a photo <small>(optional)</small></span><input type="file" accept="image/*" data-act="photo" hidden></label>`}
      </div>
      <fieldset class="picker"><legend>Add a sticker</legend>
        <div class="picker-row">${['', ...Object.keys(STICKERS)].map((k) => `<input type="radio" name="sticker" id="${sid(k || 'none')}" value="${k}" ${e.sticker === (k || null) || (!k && !e.sticker) ? 'checked' : ''}><label for="${sid(k || 'none')}" title="${k ? STICKERS[k].label : 'No sticker'}">${k ? sticker(k) : '<span class="none">none</span>'}<span class="sr">${k ? STICKERS[k].label : 'No sticker'}</span></label>`).join('')}</div>
      </fieldset>
      <fieldset class="picker"><legend>How did it feel?</legend>
        <div class="picker-row moods">${Object.keys(MOODS).map((k) => `<input type="radio" name="mood" id="md-${k}" value="${k}" ${e.mood === k ? 'checked' : ''}><label for="md-${k}">${mood(k)}<span>${MOODS[k].label}</span></label>`).join('')}</div>
      </fieldset>
      <div class="editor-actions">
        <button type="button" class="btn btn-ghost" data-act="cancel">Cancel</button>
        <button type="submit" class="btn btn-clay" ${e.text.trim() || e.photoId ? '' : 'disabled'}>Keep it ♡</button>
      </div>
    </form>
  </li>`;
}

function dayView(date) {
  const ms = byDate.get(date) || [];
  const n = ms.length;
  const isToday = date === today();
  const full = n >= db.MAX_PER_DAY;
  const newOpen = editing && !editing.id && editing.date === date;
  return `<div class="day">
    <header class="day-head">
      <a class="back" href="#/">${icons.left}<span>Calendar</span></a>
      ${dateStamp(date)}
      <h1 class="day-date"><time datetime="${date}">${fmtLong(date)}</time></h1>
      <p class="day-lead">${isToday ? "Today, I'm grateful for…" : 'That day, I was grateful for…'}</p>
      <p class="day-sub">It's the little things that make life beautiful.</p>
    </header>
    <aside class="jar-panel" aria-live="polite">
      <span class="jar-wrap">${jar(n)}${full ? tinySparkle('jar-glint') : ''}</span>
      ${full ? `<p class="jar-full">Your happiness jar is full for today! ♡</p>` : `<p class="jar-count"><b>${n}/5</b> little happy things collected</p>`}
    </aside>
    <ol class="moments">
      ${ms.map((m) => momentCard(m, date)).join('')}
      ${newOpen ? editorHTML(date) : ''}
    </ol>
    ${!full && !newOpen ? `<button class="add-moment" data-act="new">${icons.plus}<span>Add a little happy thing</span><small>${PROMPTS[n % PROMPTS.length]}</small></button>` : ''}
    ${n ? `<div class="day-save"><button class="btn btn-butter big" data-act="save-day" ${editing ? 'disabled' : ''}>Save my day ♡</button>${editing ? '<p class="hint">Finish the note you are writing first.</p>' : ''}</div>` : ''}
  </div>`;
}

const DRAFT_KEY = db.DEMO ? 'fondly-demo-draft' : 'lht-draft';
const saveDraft = () => localStorage.setItem(DRAFT_KEY, JSON.stringify(editing));

function startEditing(date, m) {
  const n = (byDate.get(date) || []).length;
  editing = m
    ? { id: m.id, date, text: m.text, prompt: m.prompt || PROMPTS[0], photoId: m.photoId, sticker: m.sticker, mood: m.mood, newPhoto: null }
    : { id: null, date, text: '', prompt: PROMPTS[n % PROMPTS.length], photoId: null, sticker: null, mood: null, newPhoto: null };
  saveDraft();
}

async function stopEditing({ discardPhoto }) {
  if (discardPhoto && editing?.newPhoto) await db.deletePhoto(editing.newPhoto).catch(() => {});
  editing = null;
  localStorage.removeItem(DRAFT_KEY);
}

function bindDay(root, date) {
  root.addEventListener('click', async (ev) => {
    const b = ev.target.closest('[data-act]');
    if (!b || b.tagName === 'INPUT') return;
    const act = b.dataset.act;
    const m = all.find((x) => x.id === b.dataset.id);
    if (act === 'new') { startEditing(date); await render(); $('#moment-text')?.focus(); }
    if (act === 'edit') { startEditing(date, m); confirmingDelete = null; await render(); $('#moment-text')?.focus(); }
    if (act === 'cancel') { await stopEditing({ discardPhoto: true }); await render(); }
    if (act === 'shuffle') {
      editing.prompt = PROMPTS[(PROMPTS.indexOf(editing.prompt) + 1) % PROMPTS.length];
      $('.editor-prompt label', root).textContent = editing.prompt;
      saveDraft();
    }
    if (act === 'remove-photo') {
      if (editing.newPhoto) { await db.deletePhoto(editing.newPhoto).catch(() => {}); editing.newPhoto = null; }
      editing.photoId = null; saveDraft(); await render();
    }
    if (act === 'delete') { confirmingDelete = b.dataset.id; await render(); $('[data-act="keep"]', root)?.focus(); }
    if (act === 'keep') { confirmingDelete = null; await render(); }
    if (act === 'really-delete') {
      confirmingDelete = null;
      const before = await db.deleteMoment(b.dataset.id);
      let undone = false;
      toast('Let go gently ♡', { label: 'Undo', run: async () => {
        undone = true;
        await db.updateMoment(before.id, { deleted: false, text: before.text, photoId: before.photoId });
        toast('Brought back ♡');
      } });
      // The photo waits out the undo window before it is removed for good.
      if (before?.photoId) setTimeout(() => { if (!undone) db.deletePhoto(before.photoId); }, 8000);
    }
    if (act === 'save-day') { doneQuote = null; location.hash = `#/done/${date}`; }
  });
  root.addEventListener('input', (ev) => {
    if (!editing) return;
    if (ev.target.id === 'moment-text') {
      editing.text = ev.target.value;
      $('.char-count span', root).textContent = editing.text.length;
      $('.editor [type=submit]', root).disabled = !(editing.text.trim() || editing.photoId);
    }
    if (ev.target.name === 'sticker') editing.sticker = ev.target.value || null;
    if (ev.target.name === 'mood') editing.mood = ev.target.value;
    saveDraft();
  });
  root.addEventListener('change', async (ev) => {
    if (ev.target.dataset.act !== 'photo' || !ev.target.files[0]) return;
    const label = ev.target.closest('label');
    label.classList.add('busy');
    try {
      const id = await db.storePhotoFile(ev.target.files[0]);
      editing.photoId = id;
      editing.newPhoto = id;
      saveDraft();
      await render();
    } catch {
      label.classList.remove('busy');
      toast("That photo couldn't be opened. Try a JPEG or PNG.");
    }
  });
  root.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const e = editing;
    if (!e || !(e.text.trim() || e.photoId)) return;
    const fields = { text: e.text.trim(), prompt: e.prompt, photoId: e.photoId, sticker: e.sticker, mood: e.mood };
    try {
      if (e.id) {
        const old = all.find((x) => x.id === e.id);
        await db.updateMoment(e.id, fields);
        if (old?.photoId && old.photoId !== e.photoId) await db.deletePhoto(old.photoId).catch(() => {});
      } else {
        await db.addMoment(e.date, fields);
      }
      editing = null;
      localStorage.removeItem(DRAFT_KEY);
      const n = (await db.momentsFor(date)).length;
      await render();
      // The new paper star falls into the jar, and the jar takes the weight.
      $('.jar-panel .jar-star:last-of-type')?.classList.add('drop');
      $('.jar-panel .jar-wrap')?.classList.add('bump', ...(n >= db.MAX_PER_DAY ? ['just-full'] : []));
      navigator.vibrate?.(12);
    } catch (err) {
      toast(err.message === 'jar-full' ? 'Your happiness jar is full for today! ♡' : 'Could not save just now. Your words are still here.');
    }
  });
}

// ---------- DONE ----------
function doneView(date) {
  const n = (byDate.get(date) || []).length;
  if (!doneQuote) {
    const last = Number(localStorage.getItem('lht-last-quote') ?? -1);
    let i = Math.floor(Math.random() * QUOTES.length);
    if (i === last) i = (i + 1) % QUOTES.length;
    localStorage.setItem('lht-last-quote', i);
    doneQuote = QUOTES[i];
  }
  const decos = [tinyFlower, tinySparkle, tinyHeart, tinySparkle, tinyFlower, tinyHeart, tinySparkle, tinyHeart];
  return `<div class="done">
    <div class="confetti" aria-hidden="true">${decos.map((f, i) => `<span style="--i:${i}">${f()}</span>`).join('')}</div>
    <div class="done-card">
      <span class="tape tape-l" aria-hidden="true"></span><span class="tape tape-r" aria-hidden="true"></span>
      <h1 class="done-lead">${n ? `${plural(n, 'little happy thing')}, kept safe.` : 'Your page is saved.'}</h1>
      ${milestoneFor(date) ? `<p class="milestone">${tinyHeart('ms-heart')}<span>${esc(milestoneFor(date))}</span></p>` : ''}
      <blockquote class="done-quote">${esc(doneQuote)}</blockquote>
      ${jar(n, 5, 'jar small')}
      <div class="done-actions"><a class="btn btn-butter big" href="#/">Back to calendar</a><a class="link-btn" href="#/day/${date}">See my page again</a></div>
    </div>
  </div>`;
}

// ---------- JOURNAL ----------
function highlight(text, q) {
  if (!q) return esc(text);
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return esc(text);
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
}

const moreButton = (which) => `<button type="button" class="btn btn-ghost more" data-more="${which}">Show more memories</button>`;

/** Loads the next page when the "more" button nears the viewport; the button still works by tap or keyboard. */
function autoMore(root, onMore) {
  const btn = $('[data-more]', root);
  if (!btn) return;
  btn.addEventListener('click', onMore, { once: true });
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); btn.click(); } }, { rootMargin: '600px' });
  io.observe(btn);
}

function journalList() {
  const q = journalQuery.trim().toLowerCase();
  const matches = (m) => !q || m.text.toLowerCase().includes(q) || (m.mood && MOODS[m.mood].label.toLowerCase().includes(q)) || STICKERS[m.sticker]?.label.toLowerCase().includes(q) || fmtDate(m.date).toLowerCase().includes(q);
  const days = [...byDate.entries()].map(([d, ms]) => [d, ms.filter(matches)]).filter(([, ms]) => ms.length).sort((a, b) => b[0].localeCompare(a[0]));
  if (!all.length) return `<div class="empty sheet">${tinySparkle('empty-deco')}<p>Your journal is waiting for its very first little thing.</p><a class="btn btn-butter" href="#/day/${today()}">Start today's page</a></div>`;
  if (!days.length) return `<div class="empty sheet"><p>Nothing matches “${esc(journalQuery)}” yet. Try another word, like a name or a place.</p></div>`;
  let out = '', month = '', shown = 0;
  for (const [d, ms] of days) {
    if (shown >= journalLimit) { out += `</ol>${moreButton('journal')}`; return out; }
    shown += ms.length;
    const mo = d.slice(0, 7);
    if (mo !== month) { out += `${month ? '</ol>' : ''}<h2 class="month-h">${MONTHS[Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}</h2><ol class="entries">`; month = mo; }
    const dt = parse(d);
    out += `<li><a class="entry" href="#/day/${d}">
      <span class="entry-date"><b>${dt.getDate()}</b><small>${dt.toLocaleDateString('en-GB', { weekday: 'short' })}</small></span>
      <ul class="entry-lines">${ms.map((m) => `<li>${m.mood ? mood(m.mood, 'mood xs') : tinyHeart('dot')}<span>${highlight(m.text || '(a photo)', journalQuery.trim())}</span></li>`).join('')}</ul>
      <span class="entry-thumbs">${ms.filter((m) => m.photoId).slice(0, 2).map((m) => `<span class="thumb has-photo ${tilt(m.id)}">${photoImg(m)}</span>`).join('')}</span>
    </a></li>`;
  }
  return out + '</ol>';
}

function journalView() {
  return `<div class="journal">
    <header class="page-head">${doodle('arrow', 'md-head')}<h1>My Journal</h1><p>Every page you've kept, newest first.</p></header>
    <label class="search">${icons.search}<span class="sr">Search memories</span><input type="search" id="journal-q" placeholder="Search your memories…" value="${esc(journalQuery)}" autocomplete="off"></label>
    <div id="journal-list">${journalList()}</div>
  </div>`;
}

function bindJournal(root) {
  const list = $('#journal-list', root);
  const paint = () => {
    list.innerHTML = journalList();
    hydratePhotos(list);
    autoMore(list, () => { journalLimit += PAGE; paint(); });
  };
  let wait;
  $('#journal-q', root).addEventListener('input', (e) => {
    clearTimeout(wait);
    // Search once typing pauses, not on every key.
    wait = setTimeout(() => { journalQuery = e.target.value; journalLimit = PAGE; paint(); }, 150);
  });
  autoMore(list, () => { journalLimit += PAGE; paint(); });
}

// ---------- GALLERY ----------
function galleryView() {
  const years = [...new Set(all.map((m) => m.date.slice(0, 4)))].sort().reverse();
  const items = all.filter((m) => (galleryFilter.y === 'all' || m.date.startsWith(galleryFilter.y)) && (galleryFilter.m === 'all' || m.date.slice(5, 7) === galleryFilter.m)).sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
  const opt = (v, label, cur) => `<option value="${v}" ${cur === v ? 'selected' : ''}>${label}</option>`;
  return `<div class="gallery">
    <header class="page-head">${doodle('swirl', 'md-head')}<h1>Memory Gallery</h1><p>Your scrapbook of little happy things.</p></header>
    <div class="filters">
      <label><span>Year</span><select id="g-year">${opt('all', 'All years', galleryFilter.y)}${years.map((y) => opt(y, y, galleryFilter.y)).join('')}</select></label>
      <label><span>Month</span><select id="g-month">${opt('all', 'All months', galleryFilter.m)}${MONTHS.map((n, i) => opt(pad(i + 1), n, galleryFilter.m)).join('')}</select></label>
    </div>
    ${items.length ? `<ul class="masonry">${items.slice(0, galleryLimit).map((m) => `<li><a class="g-item ${m.photoId ? 'polaroid has-photo' : 'note'} ${tilt(m.id)}" href="#/day/${m.date}">
      <span class="tape" aria-hidden="true"></span>
      ${m.photoId ? `<span class="pol-frame">${photoImg(m)}</span>` : ''}
      <p>${esc(m.text)}</p>
      <span class="g-meta"><time datetime="${m.date}">${fmtDate(m.date)}</time>${m.mood ? mood(m.mood, 'mood xs') : ''}</span>
      ${m.sticker ? sticker(m.sticker, 'g-sticker') : ''}
    </a></li>`).join('')}</ul>${items.length > galleryLimit ? moreButton('gallery') : ''}`
      : `<div class="empty sheet">${tinyFlower('empty-deco')}<p>${all.length ? 'No memories in this month yet.' : 'Your scrapbook fills up as you collect little happy things.'}</p></div>`}
  </div>`;
}

function bindGallery(root) {
  $('#g-year', root).addEventListener('change', (e) => { galleryFilter.y = e.target.value; galleryLimit = PAGE; render(); });
  $('#g-month', root).addEventListener('change', (e) => { galleryFilter.m = e.target.value; galleryLimit = PAGE; render(); });
  // shortcut: each page re-renders the whole grid; switch to appending nodes if galleries pass a few thousand items.
  autoMore(root, () => { const y = scrollY; galleryLimit += PAGE; render().then(() => scrollTo(0, y)); });
}

// ---------- STATS + MEMORY JAR ----------
function topKey(list, key) {
  const counts = {};
  list.forEach((m) => { if (m[key]) counts[m[key]] = (counts[m[key]] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
}

function statsView() {
  const years = [...new Set([String(new Date().getFullYear()), ...all.map((m) => m.date.slice(0, 4))])].sort().reverse();
  const yr = String(statsYear);
  const inYear = all.filter((m) => m.date.startsWith(yr));
  const days = new Set(inYear.map((m) => m.date)).size;
  const perMonth = MONTHS.map((_, i) => inYear.filter((m) => m.date.slice(5, 7) === pad(i + 1)).length);
  const maxMonth = Math.max(...perMonth);
  const topMood = topKey(inYear, 'mood');
  const topSticker = topKey(inYear.filter((m) => STICKERS[m.sticker]), 'sticker'); // retired stickers don't count
  const busiest = maxMonth ? MONTHS[perMonth.indexOf(maxMonth)] : null;
  return `<div class="stats">
    <header class="page-head"><h1>My Little Stats</h1><p>A gentle look back, no pressure.</p></header>
    <div class="filters"><label><span>Year</span><select id="s-year">${years.map((y) => `<option ${y === yr ? 'selected' : ''}>${y}</option>`).join('')}</select></label></div>
    <section class="recap sheet-sage" aria-labelledby="recap-h">
      <span class="tape" aria-hidden="true"></span>
      <span class="label-tab" aria-hidden="true">this year</span>
      <div class="recap-jar">${jar(inYear.length, 60, 'jar')}<p class="jar-tag">${inYear.length ? `${plural(inYear.length, 'little happy thing')} in ${yr}` : `An empty jar, ready for ${yr}`}</p></div>
      <div class="recap-notes">
        <h2 id="recap-h">Your ${yr}, in little things</h2>
        ${inYear.length ? `<ul class="recap-list">
          <li>You opened your diary on <b>${plural(days, 'day')}</b>.</li>
          ${busiest ? `<li>Your fullest month was <b>${busiest}</b>, with ${plural(maxMonth, 'happy thing')}.</li>` : ''}
          ${topMood ? `<li class="with-art">${mood(topMood, 'mood sm')}<span>You felt <b>${MOODS[topMood].label.toLowerCase()}</b> most often.</span></li>` : ''}
          ${topSticker ? `<li class="with-art">${sticker(topSticker, 'sticker sm')}<span>Your favourite sticker was the <b>${STICKERS[topSticker].label.toLowerCase()}</b>.</span></li>` : ''}
        </ul>` : `<p>No happy things kept in ${yr} yet. They'll gather here as you go.</p>`}
      </div>
    </section>
    ${memoryJarHTML()}
  </div>`;
}

const SLIP_COLORS = ['butter', 'clay', 'slate', 'sky', 'sage', 'mint'];
function memoryJarHTML() {
  if (!all.length) return `<section class="memory-jar sheet" aria-labelledby="mj-h"><h2 id="mj-h">Memory Jar</h2><p>Every happy thing you keep is folded into this jar. It's waiting for the first one.</p></section>`;
  const p = pulled && all.find((m) => m.id === pulled);
  const slips = [...all].reverse();
  // shortcut: shows the newest 120 slips; older ones are reached through search or Pull out a memory.
  const shown = slips.slice(0, 120);
  return `<section class="memory-jar sheet" aria-labelledby="mj-h">
    <span class="tape tape-r" aria-hidden="true"></span>
    <div class="mj-head"><div><h2 id="mj-h">Memory Jar</h2><p>Every happy thing you've ever kept: <b>${all.length}</b>.</p></div>
      <button class="btn btn-slate" data-act="pull">${icons.shuffle} Pull out a memory</button></div>
    ${p ? `<a class="pulled slip slip-${SLIP_COLORS[all.indexOf(p) % 6]}" href="#/day/${p.date}" aria-live="polite">${p.photoId ? `<span class="thumb has-photo">${photoImg(p)}</span>` : ''}<span><b>${esc(p.text || 'A photo memory')}</b><small>${fmtDate(p.date)} · open this page</small></span></a>` : ''}
    <ul class="slips">${shown.map((m, i) => `<li><a class="slip slip-${SLIP_COLORS[i % 6]} ${tilt(m.id)}" href="#/day/${m.date}" title="${fmtDate(m.date)}">${esc(m.text || 'a photo')}</a></li>`).join('')}</ul>
    ${slips.length > shown.length ? `<p class="hint">Showing your newest ${shown.length}. Search in My Journal to find older ones.</p>` : ''}
  </section>`;
}

function bindStats(root) {
  $('#s-year', root).addEventListener('change', (e) => { statsYear = Number(e.target.value); render(); });
  $('[data-act="pull"]', root)?.addEventListener('click', async () => {
    const pool = all.length > 1 ? all.filter((m) => m.id !== pulled) : all;
    pulled = pool[Math.floor(Math.random() * pool.length)].id;
    await render();
    $('.pulled', root)?.classList.add('pop');
  });
}

// ---------- SETTINGS ----------
async function settingsView() {
  const cfg = await db.getMeta('sync');
  const theme = await db.getMeta('theme', 'auto');
  const last = await db.getMeta('lastSync');
  const st = syncStatus();
  return `<div class="settings">
    <header class="page-head"><h1>Settings</h1><p>Where your diary lives, and how it looks.</p></header>
    <section class="sheet set-card" aria-labelledby="sync-h">
      <h2 id="sync-h">${icons.cloud} Sync with GitHub</h2>
      ${syncChip(st)}
      <p>Your entries always save on this device first. Connect your <b>private</b> data repo to keep a copy and use the diary on your other devices.</p>
      ${db.DEMO ? `<p class="sync-line">Sync is switched off in the demo diary, so sample entries never reach your GitHub.</p>` : cfg?.token ? `<p class="sync-line">Connected to <b>${esc(cfg.repo)}</b> (${esc(cfg.branch)}). ${last ? `Last synced ${new Date(last).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}.` : 'Not synced yet.'}</p>
        ${st.state === 'error' ? `<p class="error" role="alert">${esc(st.message)}</p>` : ''}
        <div class="row"><button class="btn btn-butter" data-act="sync-now">Sync now</button><button class="btn btn-ghost" data-act="disconnect">Disconnect this device</button></div>`
      : `<form class="sync-form" novalidate>
          <label>Data repo <small>owner/name, must be private</small><input name="repo" required placeholder="yourname/fondly-data" autocomplete="off" autocapitalize="off" spellcheck="false"></label>
          <label>Token <small>fine-grained, Contents read and write, this repo only</small><input name="token" type="password" required autocomplete="off" spellcheck="false"></label>
          <p class="error" role="alert" hidden></p>
          <button class="btn btn-butter" type="submit">Connect</button>
        </form>`}
      <p class="fine">The token stays in this browser on this device. Anyone using this device unlocked can read your diary.</p>
    </section>
    <section class="sheet set-card" aria-labelledby="look-h">
      <h2 id="look-h">Look</h2>
      <div class="seg" role="radiogroup" aria-label="Theme">
        ${[['auto', 'Evening paper after 7pm or in dark mode'], ['day', 'Always daytime'], ['evening', 'Always evening']].map(([v, l]) => `<label><input type="radio" name="theme" value="${v}" ${theme === v ? 'checked' : ''}><span>${l}</span></label>`).join('')}
      </div>
    </section>
    <section class="sheet set-card" aria-labelledby="bk-h">
      <h2 id="bk-h">Backup</h2>
      <p>Download everything, photos included, as one file. Importing never overwrites newer edits.</p>
      <div class="row"><button class="btn btn-ghost" data-act="export">${icons.download} Export backup</button><label class="btn btn-ghost file-btn">${icons.upload} Import backup<input type="file" accept="application/json,.json" data-act="import" hidden></label></div>
    </section>
  </div>`;
}

function bindSettings(root) {
  $('.sync-form', root)?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target;
    const err = $('.error', f);
    const repo = f.repo.value.trim().replace(/^https?:\/\/github\.com\//, '').replace(/\.git$|\/$/g, '');
    const token = f.token.value.trim();
    if (!/^[\w.-]+\/[\w.-]+$/.test(repo) || !token) { err.hidden = false; err.textContent = 'Fill in both: the repo as owner/name, and the token.'; return; }
    const btn = $('button', f);
    btn.disabled = true; btn.textContent = 'Checking…';
    try {
      const branch = await testConnection({ repo, token });
      await db.setMeta('sync', { repo, token, branch });
      await db.setMeta('remoteShas', {});
      // First sync must push every local day.
      await db.setMeta('dirtyDays', [...byDate.keys()]);
      toast('Connected ♡ Syncing now');
      await syncNow(db);
      render();
    } catch (x) {
      err.hidden = false; err.textContent = x.message; btn.disabled = false; btn.textContent = 'Connect';
    }
  });
  root.addEventListener('click', async (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'sync-now') { await syncNow(db); render(); }
    if (act === 'disconnect') { await db.setMeta('sync', null); await db.setMeta('remoteShas', {}); toast('This device is no longer syncing. Entries stay here.'); render(); }
    if (act === 'export') {
      const data = await db.exportAll();
      const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' })), download: `fondly-${today()}.json` });
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    }
  });
  root.addEventListener('change', async (e) => {
    if (e.target.name === 'theme') { await db.setMeta('theme', e.target.value); applyTheme(); }
    if (e.target.dataset.act === 'import' && e.target.files[0]) {
      try {
        const n = await db.importAll(JSON.parse(await e.target.files[0].text()), mergeMoments);
        toast(`Imported ${plural(n, 'memory', 'memories')} ♡`);
        scheduleSync(db, 500);
      } catch (x) { toast(x instanceof SyntaxError ? 'That file is not a backup from this app.' : x.message); }
    }
  });
}

// ---------- shell ----------
const SYNC_LABEL = { off: 'Saved on this device only', syncing: 'Syncing…', ok: 'Synced', offline: 'Offline, saved here', error: 'Sync needs a look' };
const syncChip = (st) => `<p id="sync-pill" class="sync-pill ${st.state}" role="status"><i aria-hidden="true"></i><span>${SYNC_LABEL[st.state]}</span></p>`;
/** Live status lives in Settings; the gear only gets a dot when sync needs attention. */
function syncPill(st = syncStatus()) {
  $('.gear')?.classList.toggle('alert', st.state === 'error');
  const el = $('#sync-pill');
  if (!el) return;
  el.className = `sync-pill ${st.state}`;
  $('span', el).textContent = SYNC_LABEL[st.state];
}

let renderQueued = false;
async function render() {
  await load();
  const hash = location.hash || '#/';
  const [, route = '', param] = hash.split('/');
  const view = $('#view');
  const keyOf = route || 'home';
  document.body.dataset.route = keyOf === 'done' ? 'done' : keyOf;
  $$('.tabs a').forEach((a) => a.toggleAttribute('aria-current', a.dataset.tab === (keyOf === 'day' || keyOf === 'done' ? 'home' : keyOf)));
  if (editing && (keyOf !== 'day' || editing.date !== param)) await stopEditing({ discardPhoto: true });

  let html;
  if (keyOf === 'day' || keyOf === 'done') {
    if (!validDate(param || '')) { location.hash = '#/'; return; }
    if (isFuture(param)) { toast("That day hasn't happened yet ♡"); location.hash = '#/'; return; }
  }
  switch (keyOf) {
    case 'day': html = dayView(param); break;
    case 'done': html = doneView(param); break;
    case 'journal': html = journalView(); break;
    case 'gallery': html = galleryView(); break;
    case 'stats': html = statsView(); break;
    case 'settings': html = await settingsView(); break;
    default: html = homeView();
  }
  const fresh = document.createElement('div');
  fresh.className = `view view-${keyOf}`;
  fresh.innerHTML = html;
  view.replaceChildren(fresh);
  const titles = { home: 'Fondly', day: fmtLong(param || today()), done: 'Kept safe ♡', journal: 'My Journal', gallery: 'Memory Gallery', stats: 'My Little Stats', settings: 'Settings' };
  document.title = keyOf === 'home' ? titles.home : `${titles[keyOf] || ''} · Fondly`;
  ({ home: bindHome, journal: bindJournal, gallery: bindGallery, stats: bindStats, settings: bindSettings }[keyOf])?.(fresh);
  if (keyOf === 'day') bindDay(fresh, param);
  hydratePhotos(fresh);
}

function queueRender() {
  if (renderQueued || editing) return; // never yank an open editor out from under the writer
  renderQueued = true;
  requestAnimationFrame(() => { renderQueued = false; render(); });
}

let lastRoute = '';
window.addEventListener('hashchange', () => {
  const r = location.hash.split('/')[1] || '';
  if (r !== lastRoute) window.scrollTo(0, 0);
  lastRoute = r;
  render();
});
db.onChange(() => { queueRender(); scheduleSync(db); });
onSyncStatus((s) => { syncPill(s); if (s.state === 'ok' && location.hash.startsWith('#/settings')) queueRender(); });
window.addEventListener('online', () => syncNow(db));
document.addEventListener('visibilitychange', () => { if (!document.hidden) { applyTheme(); syncNow(db); } });
setInterval(applyTheme, 10 * 60 * 1000);

function demoBar() {
  const bar = document.createElement('div');
  bar.className = 'demo-bar';
  bar.setAttribute('role', 'note');
  bar.innerHTML = `<span><b>Demo diary.</b> Sample entries; your own diary is untouched.</span><button type="button" class="link-btn">Reset demo</button><a class="link-btn" href="./">Open my diary</a>`;
  $('button', bar).addEventListener('click', async () => {
    $('#view').innerHTML = '<p class="demo-loading">Refilling the demo jar…</p>';
    await db.clearAll();
    await seedDemo(db);
    location.hash = '#/';
    render();
  });
  $('.masthead').after(bar);
}

(async function start() {
  await applyTheme();
  if (db.DEMO) {
    demoBar();
    if (!(await db.getMeta('demoSeeded'))) {
      $('#view').innerHTML = '<p class="demo-loading">Filling the demo diary with a year of little happy things…</p>';
      await seedDemo(db);
    }
  }
  const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
  if (draft?.date && !isFuture(draft.date)) {
    editing = draft;
    if (!location.hash.startsWith(`#/day/${draft.date}`)) location.hash = `#/day/${draft.date}`;
  }
  lastRoute = location.hash.split('/')[1] || '';
  await render();
  if (editing) toast('Your unfinished note is right where you left it ♡');
  syncPill();
  syncNow(db);
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js');
})();
