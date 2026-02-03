# Instructions — How This Code Is Organized

This file explains how the project is structured and how to work with it. Think of it as a notebook for the site’s organization.

---

## 1. Overall structure

The site is a **single-page static site**. All main code lives in the **root folder**. Only certain content (featured projects, awards, blog, CV) lives in subfolders.

```
kennethvemagiri.com/
├── index.html          ← Main page (Hero, About, Featured Projects, Contact)
├── styles.css          ← All styles
├── script.js           ← Nav, contact modal, awards, etc.
├── profile.png         ← Hero profile image
├── featured-projects/   ← All Featured Projects (see below)
├── awards/             ← Awards strip images + awards-data.js
├── blog/               ← Blog data (blog-data.js)
├── cv/                 ← CV.pdf and related
└── (other docs: README, CONTACT-FORM-SETUP, DEPLOY-NETLIFY, etc.)
```

---

## 2. Featured Projects folder

**All projects shown in the “Featured projects” section live in one folder: `featured-projects/`.**

Each project has its **own subfolder** inside `featured-projects/` with that project’s assets (logos, images).

### Current projects (each in its own folder)

| Folder | Contents | Used in index.html |
|--------|----------|--------------------|
| `featured-projects/MWF/` | MedWorkFlow logo and assets | MedWorkFlow tile |
| `featured-projects/GoCafeCo/` | GoCafeCo logos | GoCafeCo tile |
| `featured-projects/Pronto/` | Pronto logo | Pronto tile |
| `featured-projects/InPlan/` | InPlan logo | InPlan tile |
| `featured-projects/WiseWeb/` | WiseWeb logo and icon | WiseWeb tile |

### How it was organized (and why)

- **Before:** Project folders (MWF, GoCafeCo, Pronto, InPlan, WiseWeb) lived in the **root** next to `index.html`.
- **Now:** Those same folders live inside **`featured-projects/`** so that:
  - The root stays clean (main code in one place).
  - All “Featured Projects” are grouped in one place.
  - Adding a new project = add a new folder under `featured-projects/` and one tile in `index.html`.

### Adding a new Featured Project

1. **Create a folder** under `featured-projects/`, e.g. `featured-projects/MyNewApp/`.
2. **Put the project’s assets** (e.g. `Logo.png`) in that folder.
3. **In `index.html`**, in the “Featured projects” section (inside `<div class="projects-scroll">`), add a new `<article class="project-tile ...">` block.
4. **Image path:** use `featured-projects/MyNewApp/Logo.png` (or whatever filename you use).
5. **Optional:** In `styles.css`, add `.project-tile-mynewapp .project-tile-image { background: #fff; }` if you want a white background behind the logo (like the other featured tiles).

---

## 3. Paths used in the code

- **Featured project images** in `index.html` all use the prefix `featured-projects/`, e.g.:
  - `featured-projects/MWF/MedWorkFlow.png`
  - `featured-projects/GoCafeCo/Projects%20Logo.png`
  - `featured-projects/Pronto/Logo.png`
  - `featured-projects/InPlan/Logo.png`
  - `featured-projects/WiseWeb/Logo.png`
- **Other assets** stay as they are: `profile.png`, `cv/CV.pdf`, `awards/`, `styles.css`, `script.js`, etc.

---

## 4. What not to change (so nothing breaks)

- **Don’t rename `featured-projects/`** unless you also update every `featured-projects/...` path in `index.html`.
- **Don’t move `index.html`, `styles.css`, or `script.js`** into a subfolder; the site expects them in the root.
- **CSS class names** like `project-tile-mwf`, `project-tile-gocafeco`, etc. are used for styling; you can keep or rename them, but if you rename, update both `index.html` and `styles.css`.

---

## 5. Quick reference

| What | Where |
|------|--------|
| Main page content | `index.html` |
| Styles | `styles.css` |
| Behaviour (nav, modal, awards) | `script.js` |
| Featured project assets | `featured-projects/<ProjectName>/` |
| Awards images + data | `awards/` |
| CV | `cv/CV.pdf` |
| Contact form setup | See `CONTACT-FORM-SETUP.md` |
| Deploy (Netlify, domain) | See `DEPLOY-NETLIFY.md` |

---

---

## 6. Image optimization (SEO & performance)

- **Hero image:** `profile.png` plus `profile.webp` (WebP), with `fetchpriority="high"` and responsive `srcset`.
- **Featured project images:** Each tile uses a `<picture>` with WebP (when available) and PNG fallback, plus `loading="lazy"` and `decoding="async"`.
- **Generating WebP:** Run `node build-images.js` (requires `npm install`). This creates `profile.webp` (hero, target &lt;200KB) and `.webp` versions in each `featured-projects/` subfolder. Re-run after adding or changing images.

---

*This instructions file describes the structure as of the reorganization: main code in the root, Featured Projects in `featured-projects/` with one folder per project.*
