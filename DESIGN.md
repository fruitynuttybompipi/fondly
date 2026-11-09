---
name: Little Happy Things
description: A pocket pastel scrapbook you finish every night.
colors:
  butter: "#ffe08a"
  butter-deep: "#f3c243"
  blush: "#ffc6d1"
  blush-deep: "#ef8aa5"
  lavender: "#d9c7f6"
  lavender-deep: "#a585dd"
  baby: "#bfdff7"
  baby-deep: "#74b0e0"
  sage: "#cbe3bf"
  sage-deep: "#82b871"
  peach: "#ffd3b2"
  plum-ink: "#463a4f"
  plum-ink-soft: "#6a5a75"
  cream-paper: "#fffaf0"
  card-cream: "#fffdf8"
  polaroid-white: "#fffefa"
  ground-butter: "#fff1c4"
  ground-blush: "#ffe4ea"
  ground-baby: "#e0f0fb"
  ground-sage: "#e5f1dc"
  ground-lavender: "#efe7fb"
  danger-rose: "#b4405c"
  evening-paper: "#2b2342"
  evening-card: "#382e56"
  evening-ink: "#f6eddf"
  evening-ink-soft: "#cdbfdc"
  evening-polaroid: "#ece2d2"
typography:
  display:
    fontFamily: "Yellowtail, Brush Script MT, cursive"
    fontSize: "clamp(2.1rem, 1.6rem + 2vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.18
  wordmark:
    fontFamily: "Yellowtail, Brush Script MT, cursive"
    fontSize: "clamp(1.7rem, 1.4rem + 1.2vw, 2.2rem)"
    fontWeight: 400
    lineHeight: 1
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
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.38
  body:
    fontFamily: "Shantell Sans, Comic Sans MS, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Shantell Sans, Comic Sans MS, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.15
rounded:
  photo: "2px"
  polaroid: "4px"
  sheet: "6px 18px 8px 14px"
  cell: "14px"
  organic: "26px 20px 28px 22px / 22px 28px 20px 26px"
  pill: "999px"
spacing:
  gutter: "16px"
  gutter-wide: "32px"
  stack: "20px"
  card-pad: "18px"
  gap-sm: "6px"
  gap-md: "14px"
components:
  button-primary:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.plum-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
    height: "46px"
  button-primary-big:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
    height: "56px"
  button-pink:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-lavender:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-ghost:
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  chip:
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  chip-on:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  input-field:
    backgroundColor: "{colors.cream-paper}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.cell}"
    padding: "10px 14px"
    height: "48px"
  search-field:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "52px"
  capture-card:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.organic}"
    padding: "16px 20px"
  sheet:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.sheet}"
    padding: "{spacing.card-pad}"
  polaroid:
    backgroundColor: "{colors.polaroid-white}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.polaroid}"
    padding: "8px 8px 10px"
  tab-active-icon:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.pill}"
---

# Design System: Little Happy Things

## Overview

**Creative North Star: "The Pocket Scrapbook"**

Every screen is a page of coloured paper and every memory is something pasted onto it: a taped note card, a Polaroid, a folded slip. The whole app sits on a grain-textured paper ground whose colour changes by section (butter for home, blush for the journal and day page, baby blue for the gallery, sage for stats, lavender for settings and the save reward). Cream cards, Polaroid frames and pastel notes rest on that ground at slight angles, held down by washi tape. Plum ink draws everything: text, the outlines of the authored doodle stickers and mood faces, and the hand-drawn today circle.

Density is low and the tone is gentle. Most content is one column on the phone. On desktop it becomes a left rail with a two-column page. Delight comes from physical metaphors that each do a real job: the happiness jar fills with folded paper stars, the On This Day envelope breaks its seal to reveal Polaroids, and today's date gets a circle that draws itself. After dark the evening theme turns the paper deep indigo and the pastels become ink. Paper objects that are light in real life, such as Polaroids and slips, stay light.

The system rejects the habit-tracker dashboard. It has no streaks, rings, charts or KPI tiles. Numbers appear as handwritten notes ("2/5 little happy things collected") and never as metrics.

**Key Characteristics:**
- A grain-textured paper ground with a different colour for each route
- Plum ink (#463a4f) for text and every doodle outline
- Three faces: Gochi Hand for headings, Yellowtail script for the wordmark, dates and quotes, and Shantell Sans for body text
- Washi tape strips, Polaroid frames, photo-corner mounts, and ruled or graph-paper card fills
- Small resting tilts (between -1.6deg and 2deg) and asymmetric "cut paper" corners
- Soft, warm, plum-tinted drop shadows; nothing glossy
- An evening theme that inverts the paper while light objects keep dark ink

## Colors

The palette is six owner-pinned pastels with a deeper partner for most of them, plum ink, and cream paper. All of it is repainted in the evening theme.

### Primary
- **Butter Yellow** (butter): the default action colour. It fills primary buttons, the capture card, the active tab icon, search highlights, `::selection` and the jar count badge. **Butter Deep** (butter-deep) is used only inside doodle art.

### Secondary
- **Blush Pink** (blush): the second action colour, used for "Keep it", the full-jar capture card, the add-moment plus, and the editing ring around a moment being written. **Blush Deep** (blush-deep) is the hand-drawn accent: the today circle, the caret, `accent-color`, focus borders on inputs, the heart sticker and the full-jar message.

### Tertiary
- **Lavender** (lavender): used for the On This Day sheet, the selected segmented control, photo-corner mounts and the lavender button. **Lavender Deep** (lavender-deep) is the colour of every focus outline, the selected-chip ring, the select chevron and the scrollbar.
- **Baby Blue, Sage, Peach** (baby, sage, peach): colours for washi tape, notes, slips and sticker fills. Baby blue also sits behind a photo while it loads. Sage Deep (sage-deep) marks the "synced" dot and recap bullets.

### Neutral
- **Plum Ink** (plum-ink): all text and doodle outlines in the day theme. It is also the fixed text colour on every pastel fill, in both themes.
- **Soft Plum** (plum-ink-soft): secondary text, hints, dates, inactive tabs and day-of-week labels.
- **Cream Paper / Card Cream / Polaroid White** (cream-paper, card-cream, polaroid-white): the base paper, card surfaces and photo frames, which differ by small warm steps.
- **Section grounds** (ground-butter, ground-blush, ground-baby, ground-sage, ground-lavender): very pale tints set as the body background for each route.
- **Rule line** (`rgb(70 58 79 / .12)`): ruled lines on notes, graph-paper lines on the calendar, and 2px inset borders on fields.
- **Danger Rose** (danger-rose): error text and the sync error state only.
- **Evening set** (evening-paper, evening-card, evening-ink, evening-ink-soft, evening-polaroid): deep indigo paper with warm cream ink. Each route ground shifts to its own dark tint.

### Named Rules
**The Plum On Pastel Rule.** Text on any pastel fill (butter, blush, lavender, baby, sage, peach) or on any light paper object is fixed plum #463a4f in both themes. The evening theme never turns that text cream.

**The Paper Per Room Rule.** Each route sets its own paper ground. A new route picks one of the five grounds; it never introduces a sixth hue.

**The Ink Repaints Rule.** Doodle art draws with `var(--ink)` and pastel `var(--*)` fills, never with literal hex values, so that the evening theme repaints it.

## Typography

**Display Font:** Yellowtail (with Brush Script MT, cursive)
**Headline Font:** Gochi Hand (with Comic Sans MS, cursive)
**Body Font:** Shantell Sans, variable 300 to 800 (with Comic Sans MS, system-ui)

**Character:** Gochi Hand is a marker-pen heading that reads like a diary title. Yellowtail is a looping script for things that should feel signed: the wordmark, dates, affirmations and quotes. Shantell Sans keeps body copy legible at night while staying hand-made.

### Hierarchy
- **Display** (Yellowtail 400, clamp 2.1 to 3rem, 1.18): the save-reward quote and the long day date. Two lines at most.
- **Wordmark** (Yellowtail 400, clamp 1.7 to 2.2rem, 1): the "Little Happy Things" masthead only.
- **Headline** (Gochi Hand 400, clamp 2 to 2.75rem, 1.12): page h1 and the greeting.
- **Title** (Gochi Hand 400, 1.35 to 1.6rem, 1.12): section h2/h3, card titles and the capture label.
- **Moment** (Gochi Hand 400, 1.3rem, 1.38): the text of moments and notes, written as if by hand. The editor textarea uses 30px rows so the text sits on the ruled lines.
- **Script accent** (Yellowtail, 1.5 to 1.6rem): the affirmation line, the On This Day date and the year beside the month.
- **Body** (Shantell Sans 400, 1.0625rem, 1.55): running copy, form labels at 600, and buttons at 600 1rem.
- **Label** (Shantell Sans 400, 0.78 to 0.88rem): tab labels, meta dates, char counts and hints, always in Soft Plum.

### Named Rules
**The Script Is Signed Rule.** Yellowtail is used only for the wordmark, dates, affirmations and quotes. It never carries an instruction, a button or a paragraph.

**The No Shouting Rule.** Type has no uppercase transforms and no letter-spaced labels. Hierarchy comes from changing the face and the size.

## Layout

The layout is phone first. The masthead holds the wordmark and the sync pill. Content sits in a single column with 16px side gutters and 20 to 22px between stacked blocks. A cream tab bar with four tabs is fixed to the bottom, with 22px top corners. `main` reserves `110px + safe-area` at the bottom so content clears the tab bar.

At 960px and up the body becomes a grid with a 236px rail and a fluid column. The tab bar turns into a sticky rail card with organic corners, and gutters grow to 32px with a 1180px max width. Home uses a 1.4fr / 1fr split with "Recently Remembered" across the full width. The day page uses a 220px sticky jar column beside the moments. From 760px, moments are capped at 640px and every second moment is offset 40px to the right, like pasted notes. The gallery is a CSS-columns masonry with 2, 3 and then 4 columns (breakpoints at 700px and 1200px).

Horizontal strips (Recently Remembered) scroll with x-mandatory snap and 136 to 150px columns. On mobile they bleed to the screen edge.

## Elevation & Depth

Depth is physical paper. Each object casts a soft, warm drop shadow tinted with the plum shadow channel (`--shadow: 62 44 78`, or `8 4 20` in the evening). Many objects add a 1 to 3px low-opacity lip under the bottom edge to suggest paper thickness. Shadows use a negative spread, so the shadow pools under the object rather than haloing it. Lift on hover comes from motion (translateY of -2 to -4px plus a small rotation), not from a larger shadow.

### Shadow Vocabulary
- **Sheet** (`0 1px 0 rgb(var(--shadow) / .08), 0 16px 30px -20px rgb(var(--shadow) / .5)`): cards and sheets.
- **Button** (`0 2px 0 rgb(var(--shadow) / .14), 0 10px 18px -12px rgb(var(--shadow) / .6)`): filled buttons.
- **Capture** (`0 3px 0 rgb(var(--shadow) / .14), 0 18px 28px -18px rgb(var(--shadow) / .65)`): the capture card.
- **Moment** (`0 2px 0 rgb(0 0 0 / .04), 0 18px 28px -20px rgb(var(--shadow) / .7)`): moments, Polaroids and gallery items.
- **Thumb** (`0 4px 8px -4px rgb(var(--shadow) / .5)`): small Polaroid thumbnails and slips.
- **Reward** (`0 30px 50px -30px rgb(var(--shadow) / .7)`): the save-reward card only.
- **Tab bar** (`0 -6px 24px -10px rgb(var(--shadow) / .3)`): the mobile bottom bar, which casts upward.

### Named Rules
**The Pooled Shadow Rule.** Every shadow has a negative spread and a plum tint. No grey halos and no hard offset blocks; the only crisp edge allowed is the 1 to 3px paper lip.

## Shapes

Paper is cut by hand, so corners are deliberately uneven. Sheets and notes use asymmetric radii (6px 18px 8px 14px). Large statement pieces (the capture card, the desktop rail, add-moment, the reward card) use the organic blob radius. Photos and Polaroids stay nearly square (2 to 4px). Controls are pills (999px), calendar cells and inputs use 14px, and icon buttons are circles.

Recurring pieces:
- **Washi tape:** a 92×24px strip with a zig-zag torn-edge mask, a diagonal white stripe and 0.88 opacity, rotated -3 to 6deg. Its colour follows the card's tilt class.
- **Photo-corner mount:** a 22px lavender triangle in the bottom-right corner of a sheet, or top-left on stats cards.
- **Polaroid:** a cream frame with a thicker bottom margin.
- **Tilts:** resting rotations from -1.6 to 2deg. Interactive pieces straighten or tip a little further on hover.
- **Ruled and graph paper:** 30px ruled lines on notes and the editor, 26 to 28px on journal entries and the memory jar, and a 22px grid on the calendar.
- **Dashed outlines:** reserved for "empty slot" affordances (add-moment, photo drop) and focus rings.

## Components

### Buttons
Tactile, rounded and a little wobbly when hovered.
- **Shape:** full pill (999px), at least 46px tall; the big variant is 56px.
- **Primary:** a butter fill with plum text, Shantell 600 at 1rem, and the button shadow.
- **Variants:** pink for keeping a moment, lavender, and danger (blush-deep fill with dark rose text). Ghost buttons have no fill and a 2px inset rule-line border.
- **Hover / Active:** hover moves the button `translateY(-2px) rotate(-.6deg)` over .25s on the house ease; active sets `translateY(1px)`; disabled sets opacity .5.
- **Text link button:** underlined Soft Plum text for secondary or destructive-adjacent actions.

### Chips
- **Style:** a pill with 55% white fill and plum text at .88rem.
- **State:** selected chips turn into a cream card with a 2px lavender-deep inset ring and weight 600. The segmented control in settings fills lavender when checked.

### Cards / Containers
- **Corner Style:** cut-paper asymmetric (`rounded.sheet`), or organic for statement cards.
- **Background:** card cream, a lavender sheet for On This Day, baby blue for the reminder note, and graph or ruled fills on the calendar, notes and memory jar.
- **Shadow Strategy:** Sheet shadow (see Elevation & Depth).
- **Border:** none. Edges come from shadow and paper colour.
- **Internal Padding:** 18px by default, 20 to 26px on feature cards.

### Inputs / Fields
- **Style:** a paper or cream fill, no border, a 2px inset rule-line ring, and 14px radius at 48px tall. Search is a 52px pill.
- **Focus:** the inset ring turns blush-deep. Elsewhere, focus is a 3px dashed lavender-deep outline with a 3px offset.
- **Textarea:** borderless and ruled, with Gochi Hand text on the lines.
- **Select:** a pill with a custom lavender chevron.
- **Error:** Danger Rose text below the field.

### Navigation
- **Mobile:** a four-tab cream bar fixed to the bottom, each tab an icon over a short label at .78rem. The current tab is plum 600, and its icon sits in a 46×30 butter pill.
- **Desktop:** a sticky rail card with organic corners. Icons sit left of the full label, and hover gives a 30% butter wash.
- **Masthead:** the Yellowtail wordmark on the left. On the right are the sync pill (a dot that turns sage when synced, pulses baby blue while syncing, and shows rose on error) and a 44px circular settings icon button.

### Polaroids and Notes (signature)
A moment is either a Polaroid (a cream frame around a square photo with handwritten text below) or a ruled note card. Either kind may have an authored sticker stuck on at 12deg, peeking over the top edge. Small Polaroids appear in calendar cells (rotated -4deg), journal rows (fanned with -18px overlap) and the On This Day envelope.

### Happiness Jar (signature)
An authored SVG jar with a translucent baby-blue glass fill. Each saved moment drops in as a folded paper star, falling 70px with a 90ms stagger. The count appears beside it as a butter pill ("2/5"), and the full state is a blush-deep handwritten line.

### On This Day Envelope (signature)
A lavender envelope (back, front pocket and flap) built in a `<details>` with a blush heart seal. Opening it flips the flap with `rotateX(180deg)` over .7s, fades the seal and raises the peeking Polaroids.

### Today Circle (signature)
A hand-drawn blush-deep loop around today's date that draws itself (a stroke-dashoffset animation over 1.1s with a .3s delay).

### Motion
There is a single house ease, `cubic-bezier(.16, 1, .3, 1)`, used for lifts, tilts, reveals and drops. Reduced motion shortens every animation to an instant, removes confetti and shows the today circle already drawn.

## Do's and Don'ts

### Do:
- **Do** put plum ink #463a4f on every pastel fill and light paper object, in both themes.
- **Do** build each new card from the paper kit: cut-paper corners, a pooled plum shadow, and optional washi tape or a photo-corner mount.
- **Do** keep resting tilts between -1.6deg and 2deg, and straighten or lift them on hover with the house ease.
- **Do** draw new icons and stickers as authored SVG using `var(--ink)` outlines at 2.2 stroke and pastel `var()` fills.
- **Do** use a dashed 3px lavender-deep outline for keyboard focus, and keep touch targets at 44px or more.
- **Do** give a new route one of the five section grounds.

### Don't:
- **Don't** show progress as streaks, rings, charts or KPI tiles. A count is a handwritten note or a butter pill.
- **Don't** set Yellowtail on buttons, instructions or paragraphs.
- **Don't** use uppercase, letter-spaced labels, or eyebrow text above headings.
- **Don't** use grey or hard-offset drop shadows. Shadows pool under the object, tinted plum.
- **Don't** use emoji or text glyphs as icons. Draw the doodle as SVG.
- **Don't** turn the evening theme into a dark-mode inversion of Polaroids and slips. They stay light paper with dark ink.
