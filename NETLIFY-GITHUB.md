# GitHub contributions on Netlify

The Developer View (`/productive_version/`) loads **last 14 days** of contribution counts from **`/api/github-contributions`**, implemented as a Netlify Function so your **token stays on the server**.

## 1. Add environment variables in Netlify

1. Open your site on [app.netlify.com](https://app.netlify.com) → **Site configuration** → **Environment variables**.
2. Add:
   - **`GITHUB_TOKEN`** — a [fine-grained](https://github.com/settings/personal-access-tokens) or classic PAT. Minimum scope: **`read:user`** (and access to the account you query). For only **public** contribution data, read-only user scope is enough.
   - **`GITHUB_LOGIN`** (optional) — GitHub username whose graph you want (e.g. `kennethvemagiri`). If you omit it, the API uses the **user that owns the token**.

3. Apply to **Production** (and **Deploy previews** if you want previews to show real data).

Trigger a new deploy after saving variables (**Deploys** → **Trigger deploy** → **Deploy site**).

## 2. Deploy this repo to Netlify

Connect the GitHub repo; Netlify reads **`netlify.toml`** at the repo root:

| Setting | Value |
|--------|--------|
| Build command | `npm run build` (WebP + favicons via Sharp) |
| Publish directory | `.` (repository root) |
| Functions | `netlify/functions/` |

No framework required.

## 3. Verify

Open:

`https://YOUR_DOMAIN/api/github-contributions`

You should see JSON like `{ "counts": [ ... 14 numbers ... ], "login": "..." }`.

If you see `Missing GITHUB_TOKEN on the server`, the variable is not set for that deploy context.

## Local development

```bash
npm install
npx netlify-cli dev
```

`netlify dev` serves the static site and runs functions with env from a local `.env` (copy names from `.env.example`; never commit secrets). Plain `npm run dev` (static `serve`) does **not** run functions; the contribution strip keeps the placeholder until you use `netlify dev` or test on a deployed URL.
