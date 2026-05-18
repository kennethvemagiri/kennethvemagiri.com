# Kenneth Vemagiri — Portfolio

Portfolio and project site. Built with HTML, CSS, and vanilla JavaScript. Single-page: hero, about, featured projects, contact form.

## What’s included

- **Hero** — Name, tagline, CTAs
- **About** — Bio with toggle (developers / plain-language)
- **Featured projects** — Scrollable project tiles (assets in `featured-projects/`)
- **Contact** — Modal form (Formspree), LinkedIn, email
- **Responsive nav** — Mobile hamburger, smooth scroll
- **Awards strip** — Loaded from `awards/` via `awards-data.js` (run `node build-awards.js` after adding images)

## Run locally

- **Node:** `npx serve .` then open http://localhost:3000
- **Python 3:** `python -m http.server 8000` then open http://localhost:8000

## Customize

- **Content:** Edit `index.html` (copy, links, project descriptions).
- **Styles:** Edit `styles.css` (and page-specific sheets under `styles/`). HTML references the source files; run `npm run minify` only when you intentionally ship `styles.min.css` / `script.min.js`.
- **Images:** Add or change images, then run `npm run build` to regenerate WebP.
- **Contact form:** See `CONTACT-FORM-SETUP.md`. Form ID is in the form `action` in `index.html`.

## Deploy

**Netlify** (recommended): connect the GitHub repo; `netlify.toml` sets build, publish directory, and the GitHub contributions function. See **`DEPLOY-NETLIFY.md`** and **`NETLIFY-GITHUB.md`** for env vars and verification.

```bash
npm install
npm run build          # optional locally; runs on Netlify before publish
npx netlify-cli dev    # static site + functions locally
```

---

© Kenneth Vemagiri
