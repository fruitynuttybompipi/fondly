---
name: Fondly
description: A pocket pastel scrapbook you finish every night.
colors:
  butter: "#ffe08a"
  butter-deep: "#eec043"
  clay: "#f4c7a6"
  clay-deep: "#d98a5e"
  slate: "#cfd8e8"
  slate-deep: "#7f95bd"
  sky: "#bfe0f0"
  sky-deep: "#5fa3c9"
  sage: "#cfe3c0"
  sage-deep: "#7fb06c"
  mint: "#c4e6da"
  slate-ink: "#2f3b44"
  slate-ink-soft: "#56636c"
  cream-paper: "#fbf7ee"
  card-cream: "#fffdf8"
  polaroid-white: "#fffefa"
  ground-butter: "#fff1c4"
  ground-oat: "#f6ecdc"
  ground-sky: "#e0eff7"
  ground-sage: "#e5f1dc"
  ground-slate: "#e6ecf4"
  kraft-back: "#c9a878"
  kraft-front: "#ecd7b4"
  kraft-flap: "#dfc394"
  danger-terracotta: "#b4513a"
  evening-paper: "#1f2a33"
  evening-card: "#2b3843"
  evening-slate-sheet: "#34445a"
  evening-ink: "#f2ede2"
  evening-ink-soft: "#b9c3c9"
  evening-polaroid: "#ece6d8"
typography:
  display:
    fontFamily: "Gochi Hand, Comic Sans MS, cursive"
    fontSize: "clamp(2.1rem, 1.7rem + 1.6vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.15
  headline:
    fontFamily: "Gochi Hand, Comic Sans MS, cursive"
    fontSize: "clamp(2rem, 1.6rem + 1.6vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "0.005em"
  title:
    fontFamily: "Gochi Hand, Comic Sans MS, cursive"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1.12
  moment:
    fontFamily: "Gochi Hand, Comic Sans MS, cursive"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Shantell Sans, Comic Sans MS, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "Shantell Sans, Comic Sans MS, system-ui, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.35
  label:
    fontFamily: "Shantell Sans, Comic Sans MS, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.15
rounded:
  photo: "2px"
  polaroid: "4px"
  note: "6px"
  slip: "2px 6px 3px 5px"
  sheet: "6px 18px 8px 14px"
  cell: "14px"
  tabbar: "22px 22px 0 0"
  mount: "4px 0 0 0"
  mount-end: "0 0 4px 0"
  organic: "26px 20px 28px 22px / 22px 28px 20px 26px"
  round: "50%"
  pill: "999px"
spacing:
  gutter: "16px"
  gutter-wide: "32px"
  stack: "20px"
  card-pad: "18px"
components:
  button-primary:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.slate-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
    height: "46px"
  button-big:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
    height: "56px"
  button-clay:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
    height: "46px"
  button-slate:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
    height: "46px"
  button-danger:
    backgroundColor: "{colors.clay-deep}"
    textColor: "#2a1a12"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
    height: "46px"
  capture-card:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.organic}"
    padding: "16px 20px"
  sheet:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.sheet}"
    padding: "{spacing.card-pad}"
  sheet-slate:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.sheet}"
    padding: "20px 18px"
  polaroid:
    backgroundColor: "{colors.polaroid-white}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.polaroid}"
    padding: "14px 14px 12px"
  chip:
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  input-field:
    backgroundColor: "{colors.cream-paper}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.cell}"
    padding: "10px 14px"
    height: "48px"
  search-field:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "52px"
  tab-bar:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.slate-ink-soft}"
    typography: "{typography.label}"
    rounded: "22px 22px 0 0"
    padding: "6px"
  tab-active-icon:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
    size: "46px 30px"
---

# Design System: Fondly

## Overview

**Creative North Star: "The Pocket Scrapbook"**

Every screen is a page of coloured paper and every memory is something pasted onto it: a taped note card, a Polaroid, a folded slip. The whole app sits on a grain-textured paper ground whose colour changes by section: butter for home, oat for the journal and day page, sky for the gallery, sage for stats, and slate for settings and the save reward. Cream cards, Polaroid frames and pastel notes sit on that ground with washi tape, photo-corner mounts and small tilts. All text and every doodle outline is drawn in slate ink. The palette is gender-neutral by the owner's decision: butter, clay, slate, sky, sage and mint, with no pink or lavender lead.

Density is low and the tone is gentle. Most content is one column on the phone. On desktop it becomes a left rail with a two-column page. Delight comes from physical metaphors that each do a real job: the happiness jar fills with folded paper stars, the On This Day kraft envelope breaks its seal to reveal Polaroids, and today's date gets a circle that draws itself. After dark the evening theme turns the paper deep navy-slate, the pastels become ink, and Polaroids and slips stay light paper.

The system rejects the habit-tracker dashboard. It has no streaks, rings, charts or KPI tiles. Numbers appear as handwritten notes ("2/5 little happy things collected") and never as metrics.

**Key Characteristics:**
- A grain-textured paper ground with a different colour for each route
- Slate ink (#2f3b44) for text and every doodle outline
- Two faces only: Gochi Hand as the main voice and Shantell Sans for body and UI
- Washi tape strips, Polaroid frames, photo-corner mounts, a kraft envelope, and ruled or graph-paper card fills
- Small resting tilts (between -1.6deg and 2deg) and asymmetric "cut paper" corners
- Soft, slate-tinted drop shadows that pool under objects; nothing glossy
- An evening theme on deep navy-slate paper where light paper objects keep dark ink

## Colors

Six gender-neutral pastels with a deeper partner for most of them, slate ink, cream paper and kraft. All of it is repainted in the evening theme through custom properties.

### Primary
- **Butter Yellow** (butter): the default action colour. It fills primary buttons, the capture card, the active tab icon, search highlights, `::selection`, the jar count badge and the jar tag. **Butter Deep** (butter-deep) appears only inside doodle art and jar stars.

### Secondary
- **Clay Apricot** (clay): the second action colour, used for "Keep it", the full-jar capture card, the add-moment plus, the editing ring around a moment being written, filled calendar days (a 30% wash) and washi tape. **Clay Terracotta** (clay-deep) is the hand-drawn accent: the today circle, the caret, `accent-color`, the input focus ring, the heart sticker, the envelope seal and the danger button fill.

### Tertiary
- **Slate Blue** (slate): the On This Day sheet, the selected segmented control, photo-corner mounts, the jar lid and slate buttons. **Slate Blue Deep** (slate-deep) is the colour of every focus outline, the selected-chip ring, the select chevron and the scrollbar.
- **Sky, Sage, Mint** (sky, sage, mint): washi tape, notes, slips and sticker fills. Sky also fills the reminder note and sits behind a photo while it loads. Sage Deep (sage-deep) marks the synced dot and recap bullets; Sky Deep (sky-deep) pulses while syncing.

### Neutral
- **Slate Ink** (slate-ink): all text and doodle outlines in the day theme, and the fixed text colour on every pastel fill in both themes.
- **Soft Slate Ink** (slate-ink-soft): secondary text, hints, meta dates, inactive tabs and day-of-week labels.
- **Cream Paper / Card Cream / Polaroid White** (cream-paper, card-cream, polaroid-white): the base paper, card surfaces and photo frames, separated by small warm steps.
- **Section grounds** (ground-butter, ground-oat, ground-sky, ground-sage, ground-slate): pale tints set as the body background per route.
- **Kraft** (kraft-back, kraft-front, kraft-flap): the three layers of the On This Day envelope only.
- **Rule line** (`rgb(47 59 68 / .12)`): ruled lines on notes, the calendar graph grid, and 2px inset borders on fields.
- **Danger Terracotta** (danger-terracotta): error text and the sync error state only.
- **Evening set** (evening-paper, evening-card, evening-slate-sheet, evening-ink, evening-ink-soft, evening-polaroid): deep navy-slate paper with warm cream ink. Each route ground shifts to its own dark tint (#24303a home, #2c2f33 journal and day, #1f2c3a gallery, #22322f stats).

### Named Rules
**The Slate On Pastel Rule.** Text on any pastel fill (butter, clay, slate, sky, sage, mint) or on any light paper object is fixed slate ink #2f3b44 in both themes. The evening theme never turns that text cream.

**The Neutral Palette Rule.** The palette is butter, clay, slate, sky, sage and mint on cream. Pink and lavender never lead a surface; they appear only inside user photos.

**The Paper Per Room Rule.** Each route sets one of the five section grounds; a new route never introduces a sixth hue.

**The Ink Repaints Rule.** Doodle art draws with `var(--ink)` and pastel `var(--*)` fills, never literal hex values, so the evening theme repaints it.

## Typography

Sizes come from a seven-step scale in `css/app.css` (`--fs-xs` .78rem, `--fs-sm` .88rem, `--fs-base` 1.0625rem, `--fs-md` 1.35rem, `--fs-lg` 1.6rem, `--fs-xl` and `--fs-display` fluid). Use a token, never a raw rem value.


**Display Font:** Gochi Hand (with Comic Sans MS, cursive)
**Body Font:** Shantell Sans, variable 300 to 800 (with Comic Sans MS, system-ui, sans-serif)

**Character:** Gochi Hand is a marker-pen hand that carries the diary's voice: the wordmark, every heading, dates, quotes and the moments themselves. Shantell Sans is a legible, hand-made sans for body copy, labels, buttons and forms, so instructions stay readable at night.

### Hierarchy
- **Display** (Gochi Hand 400, clamp 2.1 to 3rem, 1.18): the save-reward quote and the long day date. Two lines at most.
- **Wordmark** (Gochi Hand 400, clamp 1.7 to 2.2rem, 1): the "Fondly" masthead only.
- **Headline** (Gochi Hand 400, clamp 2 to 2.75rem, 1.12): page h1 and the greeting.
- **Title** (Gochi Hand 400, 1.2 to 1.6rem, 1.12): section h2/h3, card titles, the capture label, the affirmation line, the jar count, the On This Day date and the year beside the month.
- **Moment** (Gochi Hand 400, 1.3rem, 1.38): the text of moments and notes. The editor textarea uses 30px rows so writing sits on the ruled lines.
- **Body** (Shantell Sans 400, 1.0625rem, 1.55): running copy; form labels at 600; buttons at 600 1rem.
- **Label** (Shantell Sans 400, 0.72 to 0.88rem): tab labels, meta dates, char counts, mood names and hints, always in Soft Slate Ink.

### Named Rules
**The Two Hands Rule.** Only two faces exist. Gochi Hand speaks (names, headings, dates, quotes, moments); Shantell Sans explains (body, buttons, labels, forms). Gochi Hand never carries an instruction paragraph or a button label.

**The No Shouting Rule.** Type has no uppercase transforms and no letter-spaced labels. Hierarchy comes from switching face and size.

## Layout

Phone first. The masthead holds the wordmark, the sync pill and a settings button. Content is a single column with 16px side gutters and 20 to 22px between stacked blocks. A cream four-tab bar is fixed to the bottom with 22px top corners; `main` reserves `110px + safe-area` at the bottom so content clears it.

At 960px and up the body becomes a grid with a 236px rail and a fluid column. The tab bar turns into a sticky rail card with organic corners, gutters grow to 32px, and content caps at 1180px. Home splits 1.4fr / 1fr with "Recently Remembered" across the full width. The day page uses a 220px sticky jar column beside the moments. From 760px, moments cap at 640px and every second moment indents 40px, like notes pasted unevenly. The gallery is a masonry of 2, 3 (700px) and 4 (1200px) columns.

Horizontal strips (Recently Remembered) scroll with x-mandatory snap and 136 to 150px columns, bleeding to the screen edge on mobile.

## Elevation & Depth

Depth is physical paper. Each object casts a soft drop shadow tinted with the slate shadow channel (`--shadow: 40 52 60`, or `4 10 16` in the evening). Many objects add a 1 to 3px low-opacity lip under the bottom edge to suggest paper thickness. Shadows use a negative spread so they pool under the object rather than haloing it. Lift on hover comes from motion (translateY of -2 to -4px plus a small tilt), not from a heavier shadow.

### Shadow Vocabulary
- **Sheet** (`0 1px 0 rgb(var(--shadow) / .08), 0 16px 30px -20px rgb(var(--shadow) / .5)`): cards and sheets.
- **Button** (`0 2px 0 rgb(var(--shadow) / .14), 0 10px 18px -12px rgb(var(--shadow) / .6)`): filled buttons.
- **Capture** (`0 3px 0 rgb(var(--shadow) / .14), 0 18px 28px -18px rgb(var(--shadow) / .65)`): the capture card.
- **Moment** (`0 2px 0 rgb(0 0 0 / .04), 0 18px 28px -20px rgb(var(--shadow) / .7)`): moments, Polaroids and gallery items.
- **Thumb** (`0 4px 8px -4px rgb(var(--shadow) / .5)`): small Polaroid thumbnails and slips.
- **Reward** (`0 30px 50px -30px rgb(var(--shadow) / .7)`): the save-reward card only.
- **Tab bar** (`0 -6px 24px -10px rgb(var(--shadow) / .3)`): the mobile bottom bar, casting upward.

### Named Rules
**The Pooled Shadow Rule.** Every shadow has a negative spread and a slate tint. No grey halos and no hard offset blocks; the only crisp edge allowed is the 1 to 3px paper lip.

## Shapes

Paper is cut by hand, so corners are deliberately uneven. Sheets and notes use asymmetric radii (`rounded.sheet`). Statement pieces (the capture card, the desktop rail, add-moment, the reward card) use the organic blob radius. Photos and Polaroids stay nearly square (2 to 4px). Controls are pills, calendar cells and inputs use 14px, and icon buttons are 44px circles.

Recurring pieces:
- **Washi tape:** a 92x24px strip with a zig-zag torn-edge mask, a diagonal white stripe and 0.88 opacity, rotated -3 to 6deg. Its colour (butter, sky, sage, slate or clay) follows the card's tilt class.
- **Photo-corner mount:** a 22px slate triangle in the bottom-right corner of a sheet, or top-left on stats cards.
- **Polaroid:** a cream frame with a thicker bottom margin.
- **Tilts:** resting rotations from -1.6 to 2deg. Interactive pieces straighten or tip a little further on hover.
- **Ruled and graph paper:** 30px ruled lines on notes and the editor, 26 to 28px on journal entries and the memory jar, and a 22px grid on the calendar.
- **Dashed outlines:** reserved for empty-slot affordances (add-moment, photo drop) and focus rings.

## Components

### Buttons
Tactile, rounded and a little wobbly when hovered.
- **Shape:** full pill, at least 46px tall; the big variant is 56px.
- **Primary:** butter fill, slate ink text, Shantell Sans 600 at 1rem, the Button shadow.
- **Variants:** clay for keeping a moment, slate, and danger (clay-deep fill with dark brown #2a1a12 text). Ghost buttons have no fill and a 2px inset rule-line ring.
- **Hover / Active:** hover moves `translateY(-2px) rotate(-.6deg)` over .25s on the house ease; active sets `translateY(1px)`; disabled sets opacity .5.
- **Text link button:** underlined Soft Slate Ink text for secondary actions.

### Chips
- **Style:** a pill with a 55% white fill and slate ink text at .88rem.
- **State:** selected chips become a cream card with a 2px slate-deep inset ring and weight 600. The settings segmented control fills slate when checked.

### Cards / Containers
- **Corner Style:** cut-paper asymmetric (`rounded.sheet`), or organic for statement cards.
- **Background:** card cream; a slate sheet for On This Day; sky for the reminder note; graph or ruled fills on the calendar, notes and memory jar.
- **Shadow Strategy:** Sheet shadow (see Elevation & Depth).
- **Border:** none. Edges come from shadow and paper colour.
- **Internal Padding:** 18px by default, 20 to 26px on feature cards.

### Inputs / Fields
- **Style:** a paper fill, no border, a 2px inset rule-line ring, 14px radius at 48px tall. Search is a 52px card-cream pill.
- **Focus:** the inset ring turns clay-deep. Elsewhere, focus is a 3px dashed slate-deep outline with a 3px offset.
- **Textarea:** borderless and ruled, with Gochi Hand text on the lines.
- **Select:** a pill with a custom slate-deep chevron.
- **Error:** Danger Terracotta text below the field.

### Navigation
- **Mobile:** a four-tab cream bar fixed to the bottom, each tab an outline icon over a short label at .78rem. The current tab is slate ink 600 with its icon in a 46x30 butter pill.
- **Desktop:** a sticky rail card with organic corners, icons left of the full label, and a 30% butter wash on hover.
- **Masthead:** the Gochi Hand wordmark on the left; on the right the sync pill (a dot that turns sage when synced, pulses sky while syncing, and turns terracotta on error) and a 44px circular settings button.

### Stickers and Mood Faces
Authored 48px SVG doodles with 2.2 slate-ink strokes and pastel `var()` fills. The neutral sticker set is star, sun, moon, cloud, leaf, mountain, coffee, book, music, paper plane, flower, heart, smiley and sparkle. Six mood faces (joyful, calm, loved, proud, cozy, giggly) use the same construction on butter, sky, clay, sage, slate and mint discs. A sticker sits on a moment at 12deg, peeking over the top edge.

### Polaroids and Notes (signature)
A moment is either a Polaroid (a cream frame around a square photo with handwritten text below) or a ruled note card. Small Polaroids appear in calendar cells (rotated -4deg), journal rows (fanned with -18px overlap) and the On This Day envelope.

### Happiness Jar (signature)
An authored SVG jar with translucent sky glass and a slate lid. Each saved moment drops in as a folded paper star (clay-deep, butter-deep, sky-deep, sage-deep, slate-deep), falling 70px with a 90ms stagger. The count sits beside it as a butter pill ("2/5").

### On This Day Envelope (signature)
A kraft envelope (back, front pocket and flap) on the slate sheet, built in a `<details>` with a clay-deep heart seal. Opening it flips the flap with `rotateX(180deg)` over .7s, fades the seal and raises the peeking Polaroids.

### Today Circle (signature)
A hand-drawn clay-deep loop around today's date that draws itself (a stroke-dashoffset animation over 1.1s after a .3s delay).

### Motion
One house ease, `cubic-bezier(.16, 1, .3, 1)`, for lifts, tilts, reveals and drops. Reduced motion shortens every animation to an instant, removes confetti and shows the today circle already drawn.

## Do's and Don'ts

### Do:
- **Do** put slate ink #2f3b44 on every pastel fill and light paper object, in both themes.
- **Do** build each new card from the paper kit: cut-paper corners, a pooled slate shadow, and optional washi tape or a photo-corner mount.
- **Do** keep resting tilts between -1.6deg and 2deg, and straighten or lift them on hover with the house ease.
- **Do** draw new icons and stickers as authored SVG using `var(--ink)` outlines at 2.2 stroke and pastel `var()` fills.
- **Do** use a dashed 3px slate-deep outline for keyboard focus, and keep touch targets at 44px or more.
- **Do** give a new route one of the five section grounds.

### Don't:
- **Don't** show progress as streaks, rings, charts or KPI tiles. A count is a handwritten note or a butter pill.
- **Don't** let pink or lavender lead a surface, a button or a sticker fill.
- **Don't** add a third typeface, or set Gochi Hand on buttons, instructions or paragraphs.
- **Don't** use uppercase, letter-spaced labels, or eyebrow text above headings.
- **Don't** use grey or hard-offset drop shadows. Shadows pool under the object, tinted slate.
- **Don't** use emoji or text glyphs as icons. Draw the doodle as SVG.
- **Don't** set clay-deep as a text colour on light grounds; it is a stroke and fill accent.
- **Don't** turn the evening theme into a dark-mode inversion of Polaroids and slips. They stay light paper with dark ink.


## Scrapbook Touches

Kept to one or two per screen, faint, and never on top of a control or text that must be read:

- **Label tabs:** small butter (or kraft) paper labels in Gochi Hand that caption a section: "this month" on the calendar, "from the vault" on On This Day, "this year" on the stats jar. Decorative; the section heading carries the meaning.
- **Margin doodles:** single-stroke stars, swirl and arrow in `--doodle` (ink at 38%) beside the greeting and page headings.
- **Paper:** kraft (`--kraft` + grain) for the Daily Little Reminder and the demo bar, dotted grid on journal entries, a torn bottom edge on note-style moments, a folded corner on the capture card.
- **Stamps and clips:** a round ink date stamp (`--stamp`) on each day page, a wire paper clip (`--clip`) holding photo moments, and a postmark with the year on the On This Day envelope.
