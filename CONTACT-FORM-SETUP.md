# Connect the contact form to your email

The "Get in touch" form sends submissions to **urstrulykenneth@gmail.com** using [Formspree](https://formspree.io) (free, no backend needed).

## One-time setup (about 2 minutes)

1. **Sign up at Formspree**  
   Go to: [https://formspree.io](https://formspree.io) and create a free account (or log in).

2. **Create a new form**  
   - Click **"New form"** (or **"+ New Form"**).  
   - Set **"Email"** to: **urstrulykenneth@gmail.com** (this is where you’ll receive messages).  
   - Save / create the form.

3. **Copy your form ID**  
   Formspree will show a URL like:  
   `https://formspree.io/f/xyzabcde`  
   The part after `/f/` is your **form ID** (e.g. `xyzabcde`).

4. **Put the form ID in your site**  
   - Open **index.html**.  
   - Find the contact form (search for `YOUR_FORM_ID`).  
   - Replace `YOUR_FORM_ID` with your actual form ID, e.g.:  
     `action="https://formspree.io/f/xyzabcde"`  
   - Save the file.

5. **Deploy / host your site**  
   After you host the site (e.g. Netlify, Vercel, GitHub Pages), the form will work. Formspree also works when testing locally.

## What you’ll receive

Each time someone submits the form, you’ll get an email at **urstrulykenneth@gmail.com** with:

- **Name**  
- **Email**  
- **Message**  
- Subject line: *"New message from kennethvemagiri.com"*

## Free tier

Formspree’s free plan includes about **50 submissions per month**. For a most sites that’s usually enough; you can upgrade if you need more.

## Optional: thank-you page

In the Formspree dashboard you can set a **redirect URL** after submit (e.g. a “Thank you” page on your site). The form will work even without this.
