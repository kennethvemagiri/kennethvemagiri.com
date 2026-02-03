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
- **Styles:** Edit `styles.css`; run `npm run minify` to update `styles.min.css`.
- **Images:** Add or change images, then run `npm run build` to regenerate WebP.
- **Contact form:** See `CONTACT-FORM-SETUP.md`. Form ID is in the form `action` in `index.html`.

## Deploy

The site is static. Deploy the repo to Netlify, Vercel, or GitHub Pages (publish directory: root). See `DEPLOY-NETLIFY.md` for Netlify steps.

---

© Kenneth Vemagiri
