# Pronto (Prompt Workbench)

Portfolio **Work** tile assets and long-form piece live in this folder.

## Files

- **`article.html`** — Case study / essay; opens when visitors click the project image or title on the homepage (`mediaHref` / `caseHref` in `data/site-content.json`).
- **`index.html`** — Short local landing with screenshot (optional); **Open workbench** uses `LIVE_APP_URL`.
- **`screenshot.png`** — UI capture for the Work grid card (refresh when the product UI changes).
- **`hero-tile.webp`** — Tile image derived from `screenshot.png`; rebuild with `npm run build`.

## Links

| Use | URL |
|-----|-----|
| Live product | [https://pronto-liard-one.vercel.app/index.html](https://pronto-liard-one.vercel.app/index.html) |
| Article on this site | `/featured-projects/PromptWorkbench/article.html` |

`LIVE_APP_URL` in `index.html` and the **Go Live** row in `data/site-content.json` should stay in sync with the deployed app URL.
