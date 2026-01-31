# How to add an article to your site

Follow these steps **every time** you write a new article (on Medium, your blog, or anywhere).

---

## Step 1: Publish your article somewhere

Write and publish your article on:

- Medium  
- Your own blog  
- Substack  
- Any website  

Copy the **link** to that article (e.g. `https://medium.com/@you/my-article-123`).

---

## Step 2: Open the blog data file

In your project, open this file:

**`blog/blog-data.js`**

That’s the only file you need to edit for the blog section.

---

## Step 3: Add one block for your new article

In `blog-data.js` you’ll see a list of articles. Each article is a **block** like this:

```js
{
  title: "Article title one",
  date: "2025-01-10",
  excerpt: "A short excerpt. Replace with your real blog title and excerpt.",
  url: "#",
  image: "",
  featured: false
}
```

**To add a new article:** copy one of these blocks, paste it at the **top** of the list (so newest is first), then change the values to match your article.

**Example** – you wrote “How I learned Python” on Medium on 20 Jan 2025:

1. Copy a block.
2. Paste it at the top of the list.
3. Edit it to:

```js
{
  title: "How I learned Python",
  date: "2025-01-20",
  excerpt: "A short summary of what the article is about. One or two sentences.",
  url: "https://medium.com/@you/how-i-learned-python",
  image: "",
  featured: true
}
```

**What each line means:**

| Field     | What to put |
|----------|-------------|
| **title**  | The article title (as you want it on your site). |
| **date**   | When you published it: `"2025-01-20"` (year-month-day). It will show as “Jan 2025” on the site. |
| **excerpt**| One or two sentences that describe the article (shown on the card). |
| **url**    | The full link to the article (where “Read more” goes). |
| **image**  | Leave as `""` for now (placeholder image is used). Or put an image in the `blog/` folder and use e.g. `"blog/my-photo.jpg"`. |
| **featured** | `true` for **one** article you want in the big “Featured” block at the top; `false` for all others. |

---

## Step 4: Save and refresh

1. Save **`blog/blog-data.js`**.
2. Refresh your website in the browser.

Your new article will appear. No build or extra steps needed.

---

## Quick checklist (each new article)

1. Publish the article and copy its URL.  
2. Open **`blog/blog-data.js`**.  
3. Copy one existing article block and paste it at the **top** of the list.  
4. Change **title**, **date**, **excerpt**, and **url** to your new article.  
5. Set **featured** to `true` only for the one post you want in the big spotlight; others `false`.  
6. Save the file and refresh the site.

That’s the full workflow every time.
