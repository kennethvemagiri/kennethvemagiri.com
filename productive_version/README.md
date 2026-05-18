# Productive version – Kenneth Vemagiri

Dark-theme, single-page portfolio inspired by a productive/dev-style layout.

## What’s included

- **Hero**: Profile photo, name, “Available for work”, info grid (role, location, email, time, site, resume), bio with tech tags, CTAs and social links.
- **Last played**: YouTube card driven from `script.js`. Set `LAST_PLAYED.videos` to an array of `{ youtube, title? }` URLs (or plain URL strings). A random video is shown; every **2–3 hours** (random interval) it picks another (different from the previous when you have 2+). State is stored in `localStorage` (`kv-dev-last-played-rot`) so refreshes do not reset the timer. Single URL still works via `youtube` / `title` only.
- **Contributions**: Placeholder for a contribution graph (e.g. GitHub). Replace via script when you have an API or proxy.
- **Tech stack**: Pills for Python, JS, React, etc. Edit the list in `index.html` as needed.
- **Featured projects**: Cards for MedWorkFlow, GoCafeCo, Pronto, WiseWeb with links to the main site’s project pages. Repo links are `#` placeholders.
- **Experience**: One entry (MedWorkFlow). Add more in `index.html` as needed.
- **Contact**: Two-column “Get in Touch” (Schedule a call, Email, LinkedIn) + “Send a Message” form. See `TODO.md` for calendar widget and form backend.

## Where to add integrations

1. **APIs**
   - **Last played**: In `script.js`, set `LAST_PLAYED.videos` (array of YouTube URLs / `{ youtube, title }`). Rotation is client-side every 2–3 hours with `localStorage`; no API required.
   - **Contributions**: Deploy on **Netlify** and set `GITHUB_TOKEN` (and optional `GITHUB_LOGIN`) per root **`NETLIFY-GITHUB.md`**. `productive_version/script.js` calls `/api/github-contributions` on the same origin.
- **Current project**: Set **`"currentBuild": true`** on exactly one entry in **`data/site-content.json`** (same file as the main site work grid). The Developer View card reads that project’s **`title`**, **`tagline`** (or **`metric`** if tagline is empty), and the first **GitHub** action link. If nothing is flagged, the first **featured** project with a GitHub `href` is used.

2. **Links**
   - **CV/Resume**: In `index.html`, the hero “Resume” link is set to your Google Drive CV. Change the `href` if you move it.
   - **GitHub**: Hero and project “Repo” links. Replace any `href="#"` with your repo URLs when you want them public.
   - **Site/Blog**: Hero “kennethvemagiri.com” link. Update if you add a blog or other primary URL.
   - **Favicon**: Add `<link rel="icon" ...>` in `<head>` if you want a custom favicon for this version.

3. **Contact**
   - **Schedule a free call**: In `index.html`, the first “Get in Touch” option uses `href="#"`. Replace with your Cal.com or Calendly booking URL.
   - **Calendar widget**: To make the in-page calendar look like the Cal.com reference (three panels, dark theme), follow the checklist in `TODO.md`.
   - **Form**: “Send a Message” uses `action="#"`. Connect to Formspree, a serverless function, or your API.

## Running locally

From the `productive_version` folder, serve the directory with any static server. For example:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve -p 8080
```

Then open `http://localhost:8080/`.  
Assets (profile image, project images) use paths like `../profile.webp` and `../featured-projects/...`, so run the server from **inside** `productive_version` and ensure the parent folder is the main `kennethvemagiri.com` site so those paths resolve.
