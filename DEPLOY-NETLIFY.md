# Deploy with GitHub + Netlify

Your project is ready: Git is initialized and the first commit is done. Follow these steps to put the site on GitHub and deploy to Netlify.

---

## Step 1: Create a repository on GitHub

1. Go to [github.com](https://github.com) and sign in (or create an account).
2. Click **+** (top right) → **New repository**.
3. **Repository name:** e.g. `kennethvemagiri` or `kennethvemagiri.com`.
4. Choose **Public**.
5. **Do not** check "Add a README" or ".gitignore" (you already have them).
6. Click **Create repository**.

---

## Step 2: Push your code from Cursor

In Cursor’s **terminal** (project folder `e:\kennethvemagiri.com`), run these commands. Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name.

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Example: if your repo is `https://github.com/kenst/kennethvemagiri`, use:

```powershell
git remote add origin https://github.com/kenst/kennethvemagiri.git
git branch -M main
git push -u origin main
```

When prompted, sign in to GitHub (browser or token).

---

## Step 3: Connect Netlify to GitHub

1. Go to [app.netlify.com](https://app.netlify.com) and sign in (or create an account). Use **Sign up with GitHub** so Netlify can see your repos.
2. Click **Add new site** → **Import an existing project**.
3. Click **Deploy with GitHub** and authorize Netlify if asked.
4. Choose the repository you just pushed (e.g. `kennethvemagiri`).
5. **Build settings:**  
   - **Branch to deploy:** `main`  
   - **Build command:** leave empty (static site)  
   - **Publish directory:** `.` (root)  
6. Click **Deploy site**.

Netlify will build and give you a URL like `random-name-123.netlify.app`. Your site is live.

---

## Step 4 (optional): Custom domain

In Netlify: **Site settings** → **Domain management** → **Add custom domain** → enter `kennethvemagiri.com` and follow the DNS instructions.

---

## Updating the site from Cursor

After you change code in Cursor:

1. In the terminal:
   ```powershell
   git add .
   git commit -m "Describe your change"
   git push
   ```
2. Netlify will automatically deploy the new version (usually within a minute).

Done.
