# Connect the contact form to your email

The "Get in touch" form on [`index.html`](index.html) posts to Formspree. Notifications should go to **kennethvemagiri@gmail.com** (same as the visible **Email** link on the site).

## Required: Formspree dashboard

Your live form uses `action="https://formspree.io/f/xjgrdeyd"`.

1. Log in at [https://formspree.io](https://formspree.io).
2. Open that form and set **notification email** to **kennethvemagiri@gmail.com** (Form Settings / Notifications).
3. Confirm the address if Formspree sends a verification email.

Until this matches, submissions may still go to an older inbox.

## One-time setup (new form, about 2 minutes)

1. **Sign up at Formspree**  
   Go to: [https://formspree.io](https://formspree.io) and create a free account (or log in).

2. **Create a new form**  
   - Click **"New form"** (or **"+ New Form"**).  
   - Set **"Email"** to: **kennethvemagiri@gmail.com** (this is where you’ll receive messages).  
   - Save / create the form.

3. **Copy your form ID**  
   Formspree will show a URL like:  
   `https://formspree.io/f/xyzabcde`  
   The part after `/f/` is your **form ID** (e.g. `xyzabcde`).

4. **Put the form ID in your site**  
   - Open **index.html**.  
   - Find `<form ... action="https://formspree.io/f/...">` and set it to your form URL, e.g. `action="https://formspree.io/f/xyzabcde"`.  
   - The repo currently uses `xjgrdeyd`; change it only if you create a new Formspree form.

5. **Deploy / host your site**  
   After you host the site (e.g. Netlify, Vercel, GitHub Pages), the form will work. Formspree also works when testing locally.

## What you’ll receive

Each time someone submits the form, you’ll get an email at **kennethvemagiri@gmail.com** with:

- **Name**  
- **Email**  
- **Message**  
- Subject line: *"New message from kennethvemagiri.com"*

## Free tier

Formspree’s free plan includes about **50 submissions per month**. For a most sites that’s usually enough; you can upgrade if you need more.

## Optional: thank-you page

In the Formspree dashboard you can set a **redirect URL** after submit (e.g. a “Thank you” page on your site). The form will work even without this.
