# Using GitHub with your website

You can use GitHub to **store your code** and **host the site for free** (GitHub Pages). Your Squarespace domain can point to it.

---

## Option 1: GitHub only (host on GitHub Pages)

**What you get:** Free hosting, your site lives at `https://yourusername.github.io/repo-name` or a custom domain (e.g. kennethvemagiri.com).

**Limitation:** GitHub Pages only serves **static** files (HTML, CSS, JS). It cannot run a backend. So the **contact form** would still need either:
- **Formspree** (or similar) in the form `action`, or  
- A form that uses **mailto:** (opens the visitor’s email app – no server).

**Steps:**

1. **Create a GitHub account** (if you don’t have one): [github.com](https://github.com)

2. **Create a new repository**
   - Click **New repository**
   - Name it e.g. `kennethvemagiri.com` or `my-website`
   - Public, no need to add README (you already have files)
   - Create

3. **Push your site to GitHub** (from your project folder in terminal):
   ```bash
   cd E:\kennethvemagiri.com
   git init
   git add .
   git commit -m "Initial commit - personal website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name.

4. **Turn on GitHub Pages**
   - In the repo: **Settings** → **Pages**
   - Under **Source**: choose **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)**
   - Save. After a minute, the site is at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

5. **Use your Squarespace domain (optional)**
   - In the same **Pages** settings, under **Custom domain**, enter e.g. `kennethvemagiri.com`
   - In **Squarespace**: go to your domain’s DNS and add the records GitHub shows (usually an A record or CNAME). Squarespace has a guide for connecting a domain to an external site.

---

## Option 2: GitHub + Vercel/Netlify (host + contact form backend)

**What you get:** Same repo on GitHub, but the site is **deployed on Vercel or Netlify**. They can run a small **serverless function** so your contact form sends email to you **without Formspree**.

**Steps:**

1. **Put your site on GitHub** (same as steps 1–3 above).

2. **Sign up at Vercel or Netlify** and connect your GitHub account.

3. **Import the repo**
   - **New project** → **Import** from GitHub → choose your repo
   - Deploy. They’ll give you a URL like `your-site.vercel.app` or `your-site.netlify.app`.

4. **Connect your Squarespace domain**
   - In Vercel/Netlify: add your domain (e.g. kennethvemagiri.com)
   - They’ll show which DNS records to add in Squarespace (A or CNAME). Add those in Squarespace DNS.

5. **Add a serverless contact form** (I can give you the exact code)
   - A small serverless function (e.g. `api/contact.js` or `netlify/functions/contact.js`) that receives the form and sends email to **urstrulykenneth@gmail.com** via a free email API (e.g. Resend).
   - Your form in `index.html` would POST to that function instead of Formspree.

---

## Summary

| Approach | Hosting | Contact form |
|----------|--------|---------------|
| **GitHub Pages only** | Free on GitHub | Formspree, or mailto (no backend) |
| **GitHub + Vercel/Netlify** | Free on Vercel/Netlify | Your own serverless function → your email |

**Recommendation:** If you want to **avoid Formspree** and have the form send to your email, use **Option 2** (GitHub + Vercel or Netlify) and we add the serverless form. If you’re fine with Formspree for now, **Option 1** (GitHub Pages) is the simplest.

If you tell me which option you want (Pages only vs Vercel/Netlify), I can give you the exact form + serverless code and deployment steps next.
