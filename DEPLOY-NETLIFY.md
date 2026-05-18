# Deploy with GitHub + Netlify

The repo includes **`netlify.toml`** so Netlify picks up build settings, functions, and redirects automatically.

---

## Step 1: Push the repo to GitHub

If the project is not on GitHub yet:

1. Create a **public** repository on [github.com](https://github.com) (no README — this repo already has one).
2. From the project folder:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## Step 2: Import the site on Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and sign in (**Sign up with GitHub** is easiest).
2. **Add new site** → **Import an existing project** → **Deploy with GitHub**.
3. Select this repository.
4. Netlify should read **`netlify.toml`** automatically:

| Setting | Value |
|--------|--------|
| Branch | `main` |
| Build command | `npm run build` |
| Publish directory | `.` |
| Functions | `netlify/functions` |

5. Click **Deploy site**.

The first build runs `npm run build` (Sharp: WebP tiles, favicons). Warnings for missing optional source images are normal.

---

## Step 3 (optional): GitHub contribution strip

For the Developer View contribution grid, add **`GITHUB_TOKEN`** (and optional **`GITHUB_LOGIN`**) in Netlify → **Site configuration** → **Environment variables**, then redeploy. Details: **[NETLIFY-GITHUB.md](./NETLIFY-GITHUB.md)**.

---

## Step 4 (optional): Custom domain

**Site configuration** → **Domain management** → **Add domain** → e.g. `kennethvemagiri.com` → follow DNS instructions from your registrar.

---

## Local preview with functions

```powershell
npm install
npx netlify-cli dev
```

Uses `.env` for `GITHUB_TOKEN` / `GITHUB_LOGIN` (see `.env.example`). Static-only preview: `npm run dev`.

---

## Updating the live site

```powershell
git add .
git commit -m "Describe your change"
git push
```

Netlify deploys from `main` within about a minute.
