# Fondly

A private little diary for up to five happy moments a day. Pastel scrapbook look, works offline, installs to your phone's home screen, and can sync to a private GitHub repo you own.

## Use it

1. Open the app and tap **+ Capture Today's Happy Moments**.
2. Add up to five little things: words, an optional photo, a sticker and a mood.
3. Tap **Save my day ♡** for your quote.

Everything saves on the device first. Nothing leaves it unless you connect sync.

## Demo

Open `demo.html` (or add `?demo` to the address) for a sample diary with about a year of entries and painted photos. It uses its own storage, never syncs, and has a Reset button. Your own diary is not touched.

## Turn on sync (optional)

1. Create a **private** repo for your data, for example `fondly-data`.
2. Create a fine-grained token: GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens. Give it access to that one repo only, with **Contents: Read and write**.
3. In the app, open Settings (the slider icon) and enter `yourname/fondly-data` and the token.

Do this on each device. If the same day is edited on two devices, the newest edit of each moment wins.

Data layout in the data repo: `days/YYYY/YYYY-MM-DD.json` and `photos/<id>.jpg`.

## Host it on GitHub Pages

Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / root. GitHub Pages on a private repo needs a paid plan; on a free plan make this code repo public. Your journal stays in the separate private data repo.

## Develop

No build step. Serve the folder with any static server, e.g. `python3 -m http.server`, and open `http://localhost:8000`.

Tests: `node tests/merge.test.mjs`

When you change a shipped file, bump `VERSION` in `sw.js` so installed copies update.

## Credits

Fonts: Gochi Hand and Shantell Sans (SIL Open Font License, via Fontsource). Stickers, mood faces and icons are drawn for this app.
