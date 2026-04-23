# ArbiScan Landing Page

## Deploy to Vercel (60 seconds)

### Option A — Vercel CLI (fastest)
```bash
npm i -g vercel
cd arbiscan-landing
vercel
```
Follow the prompts. Your site will be live at a `.vercel.app` URL instantly.
Then add your custom domain in the Vercel dashboard.

### Option B — Vercel Dashboard (no CLI)
1. Go to vercel.com → New Project
2. Import from GitHub (push this folder to a repo first), OR
3. Drag and drop this folder onto the Vercel dashboard
4. Click Deploy — done.

### Option C — GitHub + auto-deploy
1. Create a GitHub repo, push this folder
2. Connect the repo to Vercel
3. Every `git push` auto-deploys — great for updates

---

## Before going live — checklist

- [ ] Replace the buy button `href="#"` in `index.html` (search for `buy-btn`) with your Gumroad/LemonSqueezy payment link
- [ ] Update `mailto:hello@arbiscan.io` in the footer with your real email
- [ ] Update `og:` meta tags with your real domain URL
- [ ] Add your domain in Vercel dashboard → Settings → Domains

## Payment links

**Gumroad** — gumroad.com → New Product → set price to £35 → copy the product link
**LemonSqueezy** — app.lemonsqueezy.com → Products → copy checkout link

Paste either link into the `href` of `#buy-btn` at the bottom of `index.html`.

---

## Customising

- **Price**: search `£35` and replace throughout
- **Name**: search `ArbiScan` and replace
- **Testimonials**: edit the `.testimonial` blocks in the HTML
- **FAQ**: edit the `.faq` blocks
- **Ticker**: edit the `TICKS` array in the `<script>` tag
