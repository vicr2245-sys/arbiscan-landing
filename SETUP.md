# ArbiScan — GitHub + Vercel Setup Guide

## Step 1 — Create a GitHub repository

1. Go to **github.com** and sign in (create a free account if needed)
2. Click the **+** icon (top right) → **New repository**
3. Set the following:
   - Repository name: `arbiscan-landing`
   - Visibility: **Public** (required for free Vercel deployments) or Private (Vercel Pro)
   - Do NOT tick "Add a README" — we already have one
4. Click **Create repository**
5. GitHub will show you a page with setup commands — **copy your repo URL**, it looks like:
   `https://github.com/YOUR_USERNAME/arbiscan-landing.git`

---

## Step 2 — Push the landing page to GitHub

Open a terminal (or Git Bash on Windows) in the `arbiscan-landing` folder and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/arbiscan-landing.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

After this, your files will be visible at github.com/YOUR_USERNAME/arbiscan-landing.

---

## Step 3 — Connect to Vercel

1. Go to **vercel.com** and sign in with your GitHub account
2. Click **Add New → Project**
3. Find `arbiscan-landing` in the list and click **Import**
4. Leave all settings as default — Vercel auto-detects static HTML
5. Click **Deploy**

Your site will be live at `arbiscan-landing.vercel.app` in about 30 seconds.

---

## Step 4 — Add your custom domain (optional)

1. In Vercel dashboard → your project → **Settings → Domains**
2. Type your domain (e.g. `arbiscan.io`) and click **Add**
3. Vercel gives you DNS records to add at your domain registrar (Namecheap, GoDaddy, etc.)
4. Add the records, wait ~10 minutes for DNS to propagate
5. Vercel auto-provisions an SSL certificate — your site will be HTTPS

---

## Step 5 — Making future changes (the workflow)

Every change you make follows this pattern:

```bash
# 1. Edit index.html in any text editor

# 2. Save and commit
git add .
git commit -m "describe what you changed"

# 3. Push to GitHub
git push
```

**That's it.** Vercel detects the push automatically and redeploys in ~15 seconds.
No manual uploading, no fiddling with servers.

---

## Quick reference — common changes

### Update the buy button link
Open `index.html`, search for `buy-btn`, replace `href="#"` with your Gumroad URL:
```html
<a href="https://YOUR_NAME.gumroad.com/l/arbiscan" class="btn-buy" id="buy-btn">
```
Then: `git add . && git commit -m "Add Gumroad link" && git push`

### Update the price
Search `$10` in `index.html`, replace all instances with new price.

### Update testimonials
Search for `testimonial-text` in `index.html` — three blocks, edit the text inside.

### Update contact email
Search `hello@arbiscan.io` and replace with your real email.

---

## File structure

```
arbiscan-landing/
├── index.html      ← the entire landing page (edit this)
├── vercel.json     ← Vercel config (security headers, routing)
├── .gitignore      ← files Git ignores
└── README.md       ← this file
```
