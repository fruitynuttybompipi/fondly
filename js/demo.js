// Builds the demo diary: about a year of sample moments with drawn "photos", dated relative to today
// so the calendar, On This Day and stats always have something to show. Never runs on the real diary.
import { PROMPTS } from './content.js';
import { STICKERS, MOODS } from './art.js';

const TEXTS = [
  'Morning light through the kitchen window while the kettle sang.', 'Mum sent a voice note singing off-key.', 'Found my favourite pen under the sofa.',
  'Rainy walk, warm roti canai after.', 'Finished the report a day early.', 'The cat fell asleep on my feet.', 'Pandan cake from the new bakery.',
  'Long call with an old friend, laughed until it hurt.', 'Sunset from the car park, pink everywhere.', 'The plants finally have new leaves.',
  'A stranger held the lift for me.', 'Clean sheets day.', 'Teh tarik with the team after a hard meeting.', 'Got the window seat on the train.',
  'Cooked rendang from Grandma’s recipe and it tasted right.', 'Fixed the leaky tap myself.', 'Heard my favourite song in a shop.',
  'Neighbour shared mangoes from her tree.', 'Read three chapters before bed.', 'First swim in months.', 'The bus came the moment I reached the stop.',
  'Brother called just to say hi.', 'Night market satay, still hot.', 'Watched the rain from the balcony with coffee.', 'Learned a new chord on the guitar.',
  'A kid waved at me from a passing car.', 'Sent the email I had been avoiding.', 'Durian with the family, everyone arguing happily.',
  'Morning jog, the park smelled like cut grass.', 'Someone remembered my coffee order.', 'Folded laundry while a podcast made me laugh.',
  'Quiet lunch alone, exactly what I needed.', 'Saw a rainbow over the highway.', 'Finished a puzzle we started weeks ago.', 'Fresh bread smell on the street.',
  'Dad sent a photo of his garden.', 'Slept eight whole hours.', 'Helped a colleague solve a bug.', 'Kopi ais on a very hot afternoon.', 'Watered the plants and they perked up.',
  'Cinema with friends, shared popcorn.', 'Wrote a letter by hand.', 'Cool breeze on the walk home.', 'Bought flowers for no reason.', 'A really good nasi lemak.',
  'Stretched for ten minutes and felt taller.', 'Tidied the desk, everything has a place.', 'The moon was huge tonight.', 'Got a thank-you note from a client.',
  'Pancakes on a Sunday.', 'Finally booked the holiday.', 'Sister made me laugh so hard I snorted.', 'Rain on the roof while falling asleep.', 'Beach walk, shoes in hand.',
  'Mountain air on the hike, legs tired and happy.', 'Grandma taught me a new kuih.', 'The library was quiet and warm.', 'Morning birds outside the window.',
  'Said no to something, felt lighter.', 'Ate mango on the steps.', 'Old photo turned up in a book.', 'Team won the futsal game.', 'Coffee with a view of the city lights.',
];

// Small deterministic random so a reset rebuilds the same diary.
function rng(seed) { return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32; }; }
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Simple painted scenes stand in for camera photos.
const SCENES = [
  (g, w, r) => { sky(g, w, ['#f7b77a', '#d98a5e', '#56636c']); g.fillStyle = '#ffe08a'; circle(g, w * .5, w * .62, w * .12); hills(g, w, '#2f3b44', .72, r); },
  (g, w, r) => { sky(g, w, ['#bfe0f0', '#e0eff7']); g.fillStyle = '#5fa3c9'; g.fillRect(0, w * .6, w, w * .4); g.strokeStyle = '#fff'; g.lineWidth = w / 120; for (let i = 0; i < 6; i++) { const y = w * (.66 + i * .05); g.beginPath(); g.moveTo(w * r() * .3, y); g.lineTo(w * (.4 + r() * .5), y); g.stroke(); } g.fillStyle = '#fffdf8'; g.beginPath(); g.moveTo(w * .55, w * .58); g.lineTo(w * .55, w * .36); g.lineTo(w * .7, w * .58); g.fill(); },
  (g, w) => { g.fillStyle = '#b98a63'; g.fillRect(0, 0, w, w); g.fillStyle = '#ecd7b4'; circle(g, w * .5, w * .5, w * .32); g.fillStyle = '#fffdf8'; circle(g, w * .5, w * .5, w * .24); g.fillStyle = '#6b4a33'; circle(g, w * .5, w * .5, w * .19); g.fillStyle = '#c99c74'; circle(g, w * .46, w * .46, w * .05); },
  (g, w, r) => { g.fillStyle = '#e6ecf4'; g.fillRect(0, 0, w, w); g.fillStyle = '#7fb06c'; for (let i = 0; i < 9; i++) { g.save(); g.translate(w * .5, w * .55); g.rotate(-1.4 + i * .35 + r() * .1); g.beginPath(); g.ellipse(0, -w * .17, w * .05, w * .17, 0, 0, 7); g.fill(); g.restore(); } g.fillStyle = '#d98a5e'; g.beginPath(); g.moveTo(w * .36, w * .58); g.lineTo(w * .64, w * .58); g.lineTo(w * .6, w * .86); g.lineTo(w * .4, w * .86); g.fill(); },
  (g, w, r) => { sky(g, w, ['#1f2a33', '#34445a']); g.fillStyle = '#f2ede2'; circle(g, w * .78, w * .2, w * .07); for (let i = 0; i < 8; i++) { const bw = w * .12, x = i * w * .13, h = w * (.3 + r() * .35); g.fillStyle = '#2b3843'; g.fillRect(x, w - h, bw, h); g.fillStyle = '#ffe08a'; for (let j = 0; j < 10; j++) if (r() > .55) g.fillRect(x + w * .02 + (j % 3) * w * .035, w - h + w * .03 + Math.floor(j / 3) * w * .06, w * .018, w * .025); } },
  (g, w, r) => { sky(g, w, ['#8ea4cb', '#cfd8e8']); for (let i = 0; i < 12; i++) { g.fillStyle = `rgba(255,224,138,${.25 + r() * .3})`; circle(g, w * r(), w * (.5 + r() * .5), w * (.04 + r() * .07)); } g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = w / 200; for (let i = 0; i < 40; i++) { const x = w * r(), y = w * r(); g.beginPath(); g.moveTo(x, y); g.lineTo(x - w * .01, y + w * .05); g.stroke(); } },
  (g, w, r) => { sky(g, w, ['#cfe3c0', '#bfe0f0']); [['#7f95bd', .45], ['#56636c', .6], ['#2f3b44', .75]].forEach(([c, b]) => { g.fillStyle = c; g.beginPath(); g.moveTo(0, w); for (let x = 0; x <= 1.01; x += .25) g.lineTo(w * x, w * (b - r() * .2)); g.lineTo(w, w); g.fill(); }); },
  (g, w, r) => { sky(g, w, ['#bfe0f0', '#fbf7ee']); g.fillStyle = '#7fb06c'; g.fillRect(0, w * .55, w, w * .45); for (let i = 0; i < 70; i++) { g.fillStyle = ['#ffe08a', '#fffdf8', '#f4c7a6', '#cfd8e8'][i % 4]; circle(g, w * r(), w * (.58 + r() * .42), w * (.008 + r() * .014)); } },
];
function sky(g, w, stops) { const gr = g.createLinearGradient(0, 0, 0, w); stops.forEach((c, i) => gr.addColorStop(i / (stops.length - 1), c)); g.fillStyle = gr; g.fillRect(0, 0, w, w); }
function circle(g, x, y, rad) { g.beginPath(); g.arc(x, y, rad, 0, Math.PI * 2); g.fill(); }
function hills(g, w, c, base, r) { g.fillStyle = c; g.beginPath(); g.moveTo(0, w); g.lineTo(0, w * base); g.quadraticCurveTo(w * .3, w * (base - .12 * r()), w * .55, w * base); g.quadraticCurveTo(w * .8, w * (base + .06), w, w * (base - .05)); g.lineTo(w, w); g.fill(); }

async function paint(scene, r) {
  const w = 900;
  const c = document.createElement('canvas');
  c.width = c.height = w;
  SCENES[scene](c.getContext('2d'), w, r);
  return new Promise((res) => c.toBlob(res, 'image/jpeg', 0.8));
}

export async function seedDemo(db) {
  const r = rng(20261109);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const days = [];
  for (let i = 400; i >= 0; i--) { const d = new Date(today); d.setDate(d.getDate() - i); days.push(d); }
  // Same date two and three years back, so On This Day has several years to browse.
  for (const y of [2, 3]) { const d = new Date(today); d.setFullYear(d.getFullYear() - y); days.unshift(d); }

  const stickers = Object.keys(STICKERS);
  const moods = Object.keys(MOODS);
  const rows = [];
  let t = 0;
  for (const d of days) {
    const date = iso(d);
    const isToday = date === iso(today);
    const onThisDay = date.slice(5) === iso(today).slice(5) && !isToday;
    if (!isToday && !onThisDay && r() > 0.55) continue;
    const roll = r();
    const n = isToday ? 2 : onThisDay ? 3 : roll < .2 ? 1 : roll < .5 ? 2 : roll < .8 ? 3 : roll < .92 ? 4 : 5;
    for (let k = 0; k < n; k++) {
      const at = new Date(d); at.setHours(20, 30 + k * 6, 0, 0);
      let photoId = null;
      if (r() < 0.24) {
        photoId = `demo${(t++).toString(36)}`;
        await db.putPhoto(photoId, await paint(Math.floor(r() * SCENES.length), r));
      }
      rows.push({
        id: `demo-${date}-${k}`, date, text: TEXTS[Math.floor(r() * TEXTS.length)], prompt: PROMPTS[k % PROMPTS.length],
        photoId, sticker: r() < 0.6 ? stickers[Math.floor(r() * stickers.length)] : null, mood: r() < 0.8 ? moods[Math.floor(r() * moods.length)] : null,
        createdAt: at.getTime(), updatedAt: at.getTime(), deleted: false,
      });
    }
  }
  await db.putMomentsFromSync(rows);
  await db.setMeta('demoSeeded', true);
  return rows.length;
}
