// Authored doodle SVGs. Ink and fills use CSS variables so the evening theme repaints them.
const INK = 'stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
const svg = (inner, box = 48, cls = '') => `<svg viewBox="0 0 ${box} ${box}" class="${cls}" aria-hidden="true" focusable="false">${inner}</svg>`;

export const STICKERS = {
  flower: { label: 'Flower', art: `<g ${INK}><circle cx="24" cy="12.5" r="7" fill="var(--blush)"/><circle cx="35" cy="20.5" r="7" fill="var(--blush)"/><circle cx="31" cy="33.5" r="7" fill="var(--blush)"/><circle cx="17" cy="33.5" r="7" fill="var(--blush)"/><circle cx="13" cy="20.5" r="7" fill="var(--blush)"/><circle cx="24" cy="23.5" r="5.5" fill="var(--butter)"/></g>` },
  tulip: { label: 'Tulip', art: `<g ${INK}><path d="M24 44V27" fill="none"/><path d="M24 36c-5-1-9-5-10-9 5 0 9 3 10 9zM24 33c4-1 8-4 9-8-5 0-8 3-9 8z" fill="var(--sage)"/><path d="M15 10l4.5 5L24 7l4.5 8L33 10c1 9-2 17-9 17s-10-8-9-17z" fill="var(--lavender)"/></g>` },
  star: { label: 'Star', art: `<path ${INK} fill="var(--butter)" d="M24 5.5l5.4 11.6 12.4 1.5-9.2 8.6 2.5 12.4L24 33.4l-11 6.2 2.4-12.4-9.1-8.6 12.4-1.5z"/>` },
  heart: { label: 'Heart', art: `<path ${INK} fill="var(--blush-deep)" d="M24 41C14 33.5 6.5 27 6.5 18.5 6.5 12.6 11 8.5 16 8.5c3.6 0 6.4 2 8 5 1.6-3 4.4-5 8-5 5 0 9.5 4.1 9.5 10 0 8.5-7.5 15-17.5 22.5z"/>` },
  butterfly: { label: 'Butterfly', art: `<g ${INK}><path d="M23 22C19 12 8 7 6 13s5 11 17 10z" fill="var(--baby)"/><path d="M25 22c4-10 15-15 17-9s-5 11-17 10z" fill="var(--baby)"/><path d="M23 25c-8 1-13 6-11 10s9 1 11-9zM25 25c8 1 13 6 11 10s-9 1-11-9z" fill="var(--lavender)"/><path d="M24 15v21M24 15l-4-6M24 15l4-6" fill="none"/></g>` },
  smiley: { label: 'Smiley', art: `<g ${INK}><circle cx="24" cy="24" r="17.5" fill="var(--butter)"/><path d="M17.5 21v-.5M30.5 21v-.5" stroke-width="3.4"/><path d="M15.5 28c4 6 13 6 17 0" fill="none"/></g>` },
  sparkle: { label: 'Sparkle', art: `<g ${INK}><path d="M22 6c1 9 4 12 13 13-9 1-12 4-13 13-1-9-4-12-13-13 9-1 12-4 13-13z" fill="var(--lavender)"/><path d="M37 30c.5 4 1.6 5.4 5.5 6-3.9.6-5 2-5.5 6-.5-4-1.6-5.4-5.5-6 3.9-.6 5-2 5.5-6z" fill="var(--butter)"/></g>` },
  sun: { label: 'Sun', art: `<g ${INK}><circle cx="24" cy="24" r="9.5" fill="var(--butter)"/><path d="M24 4.5v6M24 37.5v6M4.5 24h6M37.5 24h6M10.2 10.2l4.2 4.2M33.6 33.6l4.2 4.2M37.8 10.2l-4.2 4.2M14.4 33.6l-4.2 4.2" fill="none"/></g>` },
  rainbow: { label: 'Rainbow', art: `<g ${INK} fill="none"><path d="M6 35a18 18 0 0 1 36 0" stroke="var(--blush-deep)" stroke-width="5"/><path d="M12 35a12 12 0 0 1 24 0" stroke="var(--butter-deep)" stroke-width="5"/><path d="M18 35a6 6 0 0 1 12 0" stroke="var(--baby-deep)" stroke-width="5"/><path d="M4 36.5c2-3 6-3 8 0M36 36.5c2-3 6-3 8 0" stroke-width="2.2" fill="var(--paper)"/></g>` },
};

const face = (fill, inner) => `<g ${INK}><circle cx="24" cy="24" r="19" fill="${fill}"/>${inner}</g>`;
export const MOODS = {
  joyful: { label: 'Joyful', art: face('var(--butter)', `<path d="M14.5 21c1.5-3 4.5-3 6 0M27.5 21c1.5-3 4.5-3 6 0" fill="none"/><path d="M14.5 27h19c-1 7-5 9.5-9.5 9.5S15.5 34 14.5 27z" fill="var(--blush-deep)"/>`) },
  calm: { label: 'Calm', art: face('var(--baby)', `<path d="M14.5 21.5c1.5 2 4.5 2 6 0M27.5 21.5c1.5 2 4.5 2 6 0M19 30c3 2.5 7 2.5 10 0" fill="none"/>`) },
  loved: { label: 'Loved', art: face('var(--blush)', `<path d="M17.5 22v-.5M30.5 22v-.5" stroke-width="3.4"/><path d="M18 29c3.5 3.5 8.5 3.5 12 0" fill="none"/><circle cx="12.5" cy="28" r="2.6" fill="var(--blush-deep)" stroke="none"/><circle cx="35.5" cy="28" r="2.6" fill="var(--blush-deep)" stroke="none"/><path d="M36 4.5c1.4-2 4.5-1.4 4.5 1 0 2.2-2.4 3.6-4.5 5.3-2-1.7-4.5-3.1-4.5-5.3 0-2.4 3.1-3 4.5-1z" fill="var(--blush-deep)" stroke-width="1.6"/>`) },
  proud: { label: 'Proud', art: face('var(--sage)', `<path d="M14 18.5l5 1.5M34 18.5l-5 1.5M17.5 23.5v-.5M30.5 23.5v-.5" fill="none"/><path d="M17.5 23.5v-.5M30.5 23.5v-.5" stroke-width="3.4"/><path d="M16 28.5c5 5 11 5 16 0z" fill="var(--paper)"/>`) },
  cozy: { label: 'Cozy', art: face('var(--lavender)', `<path d="M14.5 22h6M27.5 22h6M20.5 29.5c2 1.5 5 1.5 7 0" fill="none"/><path d="M36 9h4.5L36 13.5h4.5" fill="none" stroke-width="1.8"/>`) },
  giggly: { label: 'Giggly', art: face('var(--peach)', `<path d="M15 21l4.5-2-4.5-2M33 21l-4.5-2 4.5-2" fill="none"/><path d="M15 26.5c5 5.5 13 5.5 18 0z" fill="var(--paper)"/><path d="M25 30.5c0 4 4.5 4 4.5 0" fill="var(--blush-deep)"/>`) },
};

export const sticker = (key, cls = 'sticker') => (STICKERS[key] ? svg(STICKERS[key].art, 48, cls) : '');
export const mood = (key, cls = 'mood') => (MOODS[key] ? svg(MOODS[key].art, 48, cls) : '');

const ICON = (d, extra = '') => `<svg viewBox="0 0 24 24" class="icon" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</g></svg>`;
export const icons = {
  home: ICON('<path d="M3.5 11.2 12 4l8.5 7.2"/><path d="M5.8 9.6V20h12.4V9.6"/><path d="M10 20v-5.2c0-1.1 4-1.1 4 0V20"/>'),
  journal: ICON('<path d="M6 3.8h11.5a1 1 0 0 1 1 1v15.4H6.2A1.7 1.7 0 0 1 4.5 18.5V5.3c0-.9.6-1.5 1.5-1.5z"/><path d="M4.5 18.5c0-1 .8-1.8 1.8-1.8h12.2"/><path d="M9 8.5h6M9 11.5h4"/>'),
  gallery: ICON('<path d="M7.5 3.8 18.6 5.6l-2 13.3L5.4 17z"/><path d="M8.6 6.6l7.7 1.2-1.1 6.8-7.6-1.2z"/><path d="M4 8.6 3 18.7l9.6 2"/>'),
  stats: ICON('<path d="M8 3.5h8M8.5 3.5v3C5.8 7.8 5 10 5 12.5v6c0 1.4 1 2.2 2.2 2.2h9.6c1.2 0 2.2-.8 2.2-2.2v-6c0-2.5-.8-4.7-3.5-6v-3"/><path d="M8.2 14.2l1.4 1.4 1.8-2.6M13.4 16.5c.8-1.4 2.4-1.4 3.2 0"/>'),
  gear: ICON('<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/>'),
  search: ICON('<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5.2 5.2"/>'),
  camera: ICON('<path d="M4 8.2c0-.9.7-1.6 1.6-1.6h2.2l1.5-2.2h5.4l1.5 2.2h2.2c.9 0 1.6.7 1.6 1.6v9.6c0 .9-.7 1.6-1.6 1.6H5.6c-.9 0-1.6-.7-1.6-1.6z"/><circle cx="12" cy="12.8" r="3.6"/>'),
  left: ICON('<path d="M14.5 5.5 8 12l6.5 6.5"/>'),
  right: ICON('<path d="M9.5 5.5 16 12l-6.5 6.5"/>'),
  close: ICON('<path d="M6 6l12 12M18 6 6 18"/>'),
  pencil: ICON('<path d="M4.5 19.5l1-4.4L15.8 4.8a2 2 0 0 1 2.9 0l.5.5a2 2 0 0 1 0 2.9L8.9 18.5z"/><path d="M13.8 6.8l3.4 3.4"/>'),
  trash: ICON('<path d="M4.5 6.5h15M9.5 6.5V4.5h5v2M6.5 6.5l1 13h9l1-13"/>'),
  plus: ICON('<path d="M12 5v14M5 12h14"/>'),
  cloud: ICON('<path d="M7 18.5h10a4 4 0 0 0 .6-8 5.5 5.5 0 0 0-10.6-1A4.5 4.5 0 0 0 7 18.5z"/>'),
  download: ICON('<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14"/>'),
  upload: ICON('<path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M5 19.5h14"/>'),
  shuffle: ICON('<path d="M4 7h3.5c4 0 5 10 9 10H20M4 17h3.5c1.6 0 2.7-1.6 3.6-3.6M13 9.6C13.9 8.4 15 7 16.5 7H20M17.5 4.5 20 7l-2.5 2.5M17.5 14.5 20 17l-2.5 2.5"/>'),
};

/** Hand-drawn loop around today's date; its stroke draws itself in CSS. */
export const todayCircle = `<svg viewBox="0 0 60 60" class="today-ring" aria-hidden="true"><path pathLength="1" d="M33 7.5C18 5 6.5 15.5 7.5 31c1 14 13 22.5 26 21 13-1.5 20.5-12 19.5-24C52 14 41.5 6.5 28.5 8.2 22 9 16.5 12 13.5 16"/></svg>`;

export const tinyFlower = (cls = 'deco') => svg(`<g ${INK} stroke-width="1.8"><circle cx="12" cy="6.5" r="3.6" fill="var(--blush)"/><circle cx="17.5" cy="11" r="3.6" fill="var(--blush)"/><circle cx="15.5" cy="17.5" r="3.6" fill="var(--blush)"/><circle cx="8.5" cy="17.5" r="3.6" fill="var(--blush)"/><circle cx="6.5" cy="11" r="3.6" fill="var(--blush)"/><circle cx="12" cy="12.5" r="2.8" fill="var(--butter)"/></g>`, 24, cls);
export const tinySparkle = (cls = 'deco') => svg(`<path stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round" fill="var(--butter)" d="M12 2.5c.6 5.6 3.4 8.4 9 9-5.6.6-8.4 3.4-9 9-.6-5.6-3.4-8.4-9-9 5.6-.6 8.4-3.4 9-9z"/>`, 24, cls);
export const tinyHeart = (cls = 'deco') => svg(`<path stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round" fill="var(--blush-deep)" d="M12 20.5C7 16.6 3 13.4 3 9.2 3 6.3 5.2 4.2 7.8 4.2c1.8 0 3.3 1 4.2 2.5.9-1.5 2.4-2.5 4.2-2.5C18.8 4.2 21 6.3 21 9.2c0 4.2-4 7.4-9 11.3z"/>`, 24, cls);

/** Paper star that drops into the happiness jar. */
const paperStar = (x, y, fill, rot, i) => `<g class="jar-star" style="--i:${i}" transform="translate(${x} ${y}) rotate(${rot})"><path d="M0-11 3.2-4 11-3.4 5-1.6 6.8 9 0 4.8-6.8 9-5-1.6-11-3.4-3.2-4z" fill="${fill}" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/><path d="M0-11 0 4.8M-11-3.4 0 4.8M11-3.4 0 4.8" stroke="var(--ink)" stroke-width=".9" opacity=".35"/></g>`;
const STAR_SPOTS = [[46, 112, -12, 'var(--blush-deep)'], [72, 108, 18, 'var(--butter-deep)'], [58, 88, 4, 'var(--baby-deep)'], [40, 70, -20, 'var(--sage-deep)'], [74, 66, 24, 'var(--lavender-deep)']];
export function jar(count, max = 5, cls = 'jar') {
  const stars = STAR_SPOTS.slice(0, Math.min(count, max)).map(([x, y, r, f], i) => paperStar(x, y, f, r, i)).join('');
  return `<svg viewBox="0 0 116 140" class="${cls}" role="img" aria-label="${count} of ${max} happy things in the jar">
    <path d="M30 22h56v10c11 6 16 16 16 30v52c0 11-8 18-19 18H33c-11 0-19-7-19-18V62c0-14 5-24 16-30z" fill="var(--jar-glass)" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
    ${stars}
    <path d="M27 8h62c2 0 3 1 3 3v8c0 2-1 3-3 3H27c-2 0-3-1-3-3v-8c0-2 1-3 3-3z" fill="var(--lavender)" stroke="var(--ink)" stroke-width="2.4"/>
    <path d="M30 13h56" stroke="var(--ink)" stroke-width="1.4" stroke-dasharray="3 4" opacity=".5"/>
    <path d="M24 66c0-10 3-18 10-23" fill="none" stroke="var(--paper)" stroke-width="3.2" stroke-linecap="round" opacity=".8"/>
  </svg>`;
}
