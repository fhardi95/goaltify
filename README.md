# Goaltify ⚽

Football news, live scores, training guides — your goal.com alternative.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** (dark theme, Goaltify green `#1a7a3f`)
- **API-Football** — live scores, fixtures, standings
- **NewsAPI** — football news feed
- **Vercel** — deployment

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# → Add your FOOTBALL_API_KEY and NEWS_API_KEY

# 3. Run locally
npm run dev
# → http://localhost:3000
```

## API Keys (both free tier)

| Service | Free tier | Get key |
|---|---|---|
| API-Football | 100 req/day | https://api-sports.io |
| NewsAPI | 100 req/day | https://newsapi.org |

## Project structure

```
app/
  page.tsx              ← Homepage
  layout.tsx            ← Root layout (nav, footer, SEO)
  live-scores/          ← Live scores page
  news/                 ← News & articles
  academy/              ← Training guides
  shop/                 ← Merch & affiliate
  tools/                ← Calculators & formation builder
  api/
    scores/route.ts     ← Server-side scores API (hides API key)

components/
  layout/               ← Navbar, Footer
  scores/               ← LiveScoreCard, LiveScoresFeed
  news/                 ← NewsCard

lib/
  seo.ts                ← Meta tags, JSON-LD schemas
  api-football.ts       ← All API-Football calls

types/index.ts          ← TypeScript types
```

## Deploy to Vercel

```bash
npx vercel
# → Set FOOTBALL_API_KEY and NEWS_API_KEY in Vercel dashboard
```

## Goaltify build phases

- [x] **Phase 1** — Homepage, live scores, nav, footer ✅
- [ ] **Phase 2** — MDX blog, NewsAPI automation, Claude article generator
- [ ] **Phase 3** — Academy guides, metric calculators, formation builder
- [ ] **Phase 4** — Shop (Printify + Amazon affiliate), newsletter, AdSense
