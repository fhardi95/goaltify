# Goaltify — ESPN-Style Redesign Guide

## What changed

The redesign replaces your green/gray palette with an **ESPN UK-inspired dark editorial** design:
- **Primary colour**: `#cc0000` (ESPN red) — all brand elements, borders, highlights
- **Backgrounds**: Multi-layer dark surfaces (`#0d0d0d` page, `#1a1a1a` cards, `#2a2a2a` mid)
- **Typography**: `Oswald` (display, nav, scores, headings) + `Inter` (body text)
- **Layout pattern**: Sticky header + competition strip + horizontal score cards + main/sidebar grid

---

## Files delivered

| File | Destination in your repo | Notes |
|---|---|---|
| `globals.css` | `app/globals.css` | Replace entirely |
| `Navbar.tsx` | `components/layout/Navbar.tsx` | Replace entirely |
| `Footer.tsx` | `components/layout/Footer.tsx` | Replace entirely |
| `page.tsx` | `app/page.tsx` | Replace entirely |

---

## Step-by-step migration

### 1. Update globals.css

Replace `app/globals.css` with the new file. It includes:
- Google Fonts import for Oswald + Inter
- All ESPN-style CSS classes (ticker, header, comp-strip, score-strip, news-grid, standings-table, academy-grid, etc.)
- Tailwind `@theme` override (brand colours become red instead of green)

### 2. Update Navbar

Replace `components/layout/Navbar.tsx` with the new file.

The new Navbar adds three layers:
1. **Scrolling red ticker** — live scores marquee at the very top
2. **Sticky header** — logo, nav links, "Watch Live" CTA
3. **Competition strip** — fast-access tabs to each league

### 3. Update Footer

Replace `components/layout/Footer.tsx` with the new file.  
The footer now has a red top border and 4-column link grid.

### 4. Update Homepage

Replace `app/page.tsx` with the new file.

New homepage sections (top to bottom):
1. Horizontal score strip (featured match cards)
2. Main grid (hero article + news list + live scores + academy guides)
3. Sidebar (WC group draws + key stats)
4. Full WC group stage grid
5. FAQ (accordion)
6. Newsletter CTA

---

## Tailwind config (if using tailwind.config.ts)

If you use a `tailwind.config.ts` instead of the CSS `@theme` block, add:

```ts
theme: {
  extend: {
    colors: {
      brand: {
        400: '#e63333',
        500: '#cc0000',
        600: '#a00000',
      }
    },
    fontFamily: {
      display: ['Oswald', 'system-ui', 'sans-serif'],
      sans:    ['Inter', 'system-ui', 'sans-serif'],
    }
  }
}
```

---

## Standalone CSS variables reference

```css
--brand:        #cc0000;
--brand-light:  #e63333;
--brand-dark:   #a00000;

--surface-0: #0d0d0d;   /* page background */
--surface-1: #1a1a1a;   /* cards */
--surface-2: #222222;   /* card hover */
--surface-3: #2a2a2a;   /* mid surfaces */

--border:     #333333;
--border-sub: #1f1f1f;

--text-primary:   #f0f0f0;
--text-secondary: #aaaaaa;
--text-muted:     #666666;

--live-red:   #cc0000;
--future-blue:#4a9eff;
```

Use these variables anywhere in your own components to stay consistent.

---

## Component class cheat sheet

| Class | Usage |
|---|---|
| `.section-head` | Row with title + "See all" link |
| `.section-title` | Red-bar heading (Oswald, uppercase) |
| `.section-link` | Red "All News →" links |
| `.card` | Dark surface card (`surface-1` + border) |
| `.hero-article` | Full-width hero story card |
| `.hero-badge` | Red pill label inside hero |
| `.news-grid` | Stacked news list (1px border separators) |
| `.news-item` | Individual news row with thumb |
| `.news-comp` | Red league label above headline |
| `.score-strip` | Horizontal scrolling match card row |
| `.score-card.featured` | Match card with red top border |
| `.status-live` | Red "74'" status text with `.live-dot` |
| `.status-ft` | Muted "Full Time" |
| `.status-upcoming` | Blue kick-off time |
| `.standings-table` | League table with pos-badge dots |
| `.academy-grid` | 2-col card grid for guides |
| `.academy-tag` | Red category label |
| `.ticker-wrap` | Full-width red ticker bar |
| `.comp-strip` | Competition tab row under header |
