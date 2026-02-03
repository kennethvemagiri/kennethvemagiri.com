# What else needs to be done

This list is for **you** to do (manual steps we can’t do from code). Everything in the repo is in good shape; these are optional or one-time checks.

---

## Optional but recommended

1. **Dedicated social share image (og-image)**  
   - Right now social links use `profile.png`. For better previews on Facebook/LinkedIn/Twitter, add an image **1200×630 px** (e.g. `images/og-image.jpg`).  
   - Then in `index.html` change `og:image` and `twitter:image` to:  
     `https://kennethvemagiri.com/images/og-image.jpg`

2. **GitHub profile link**  
   - In your schema we have `https://github.com/kennethvemagiri`. If your GitHub username is different, update it in `index.html` (JSON-LD block and anywhere else).  
   - Add **kennethvemagiri.com** to your GitHub profile “Website” field so Google sees another link to your site.

3. **Project descriptions**  
   - Pronto and InPlan now have short placeholders. When you’re ready, replace them in `index.html` with your real one-line descriptions.

4. **Formspree**  
   - Confirm in the Formspree dashboard that form ID `xjgrdeyd` sends to the email you want and that you’re within the free tier limits.

---

## Ongoing / when you remember

- **Google Search Console:** Check every few weeks for coverage/experience issues and fix any reported URLs.  
- **After changing CSS/JS:** Run `npm run minify` and commit the updated `styles.min.css` / `script.min.js`.  
- **After adding/changing images:** Run `npm run build` to regenerate WebP, then commit.  
- **Sitemap:** If you add new pages later, add their URLs to `sitemap.xml` and push.

---

## Nothing critical

There’s no required step left for the site to work, be indexed, or rank. The rest is polish and maintenance.
