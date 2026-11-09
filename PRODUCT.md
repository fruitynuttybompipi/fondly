# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain HTML, CSS and JavaScript. No framework, no build step. Hosted as static files (GitHub Pages is the natural fit). Installable to the phone home screen as a PWA.

## Users

One person: the owner, journaling for themselves. Writes mostly on their phone at night, at the end of the day, often tired and winding down. Revisits memories on phone and occasionally on a laptop.

## Product Purpose

A private gratitude diary, "Little Happy Things". Each day the owner collects up to five small happy moments, optionally with a photo, a sticker and a mood, then leaves with a positive thought. Over months and years the collection becomes something to browse, search and rediscover.

Success: the nightly ritual takes a couple of minutes, feels like a reward rather than a chore, and old memories resurface on their own ("On This Day...").

## Positioning

Not a habit tracker or productivity log. It is a personal scrapbook: the five-moment cap keeps each day small and finishable, and every saved day becomes a future gift through "On This Day...".

## Operating Context

- Nightly ritual: open app, tap today, add 1 to 5 moments, save, receive a quote.
- Photos come from the phone camera roll; they are large and must be resized before storage.
- Revisiting happens through the calendar, gallery, search, Memory Jar and On This Day.

## Capabilities and Constraints

- Up to 5 moments per date, enforced. Fewer is fine. Each moment: text, optional photo, optional sticker, optional mood.
- Create, edit and delete moments on any date, past included.
- Calendar indicators, gallery, stats and On This Day derive from saved data and update immediately.
- On This Day reads real saved entries only. Displaying them never modifies them.
- Storage: local-first in the browser (IndexedDB), synced to a private GitHub repository the owner controls. Works offline; sync when online.
- Access control: the private repo plus a GitHub token kept on the owner's devices. No separate account system.
- Responsive: phone first, then tablet and desktop.
- Sync conflicts: newest edit wins, per moment.
- No in-app lock; the phone's own lock is the guard.
- Future dates are visible but locked; writing allowed on today and past days only.
- Evening theme switches on automatically after sunset (deep indigo paper, pastel ink); daytime stays light pastel.

## Brand Commitments

Pinned by the owner's brief:

- Name: "Little Happy Things".
- Handwritten / doodle typography and script fonts.
- Pastel palette: butter yellow, blush pink, lavender, baby blue, sage green, cream.
- Hand-drawn doodles (flowers, stars, hearts, smiley faces, sparkles), stickers, washi tape, paper texture, Polaroid frames, doodle borders, soft shadows, rounded organic shapes.
- Must feel like a creative personal diary, never a corporate productivity dashboard.
- Copy voice: warm, gentle, encouraging. Phrases from the brief to keep: "Hello, sunshine! ☀️", "Today, I'm grateful for...", "3/5 little happy things collected", "Your happiness jar is full for today! ♡", "+ Capture Today's Happy Moments", "Recently Remembered", "On This Day... One Year Ago ♡", "Revisit This Memory".

## Evidence on Hand

- The owner's brief, including the quote list and empty-state copy.
- No existing entries, photos or assets. Demo data must be clearly synthetic and removable; never seed fake memories into the owner's real store.

## Product Principles

1. The nightly ritual comes first: two taps to start today, nothing blocks a tired person.
2. Small and finishable: the cap of five is a feature, celebrated, not an error.
3. Memories are sacred: nothing is lost on refresh, offline, or during sync; past entries are never altered by viewing.
4. Delight lives in details (stickers, quotes, reveals), never at the cost of clarity.
5. Private by default: data lives on the owner's devices and their own repo.

## Accessibility & Inclusion

Readable text even with decorative script fonts: script for headings and accents, a legible hand-style face for body. Respect reduced-motion. Comfortable night-time use on a phone.
