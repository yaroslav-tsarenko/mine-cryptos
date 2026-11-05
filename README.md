# MineCryptos — crypto cloud-mining marketing site

A front-end-only marketing site and mock miner dashboard for **MineCryptos**.
Everything you can click works — but nothing talks to a server: prices, balances,
payouts and form submissions are simulated in the browser for demo purposes.

## Tech stack

- [Vite 8](https://vite.dev) + React 19 + TypeScript 6
- React Router 7 (data router, lazy-loaded routes)
- CSS Modules + a small set of global design tokens (`src/styles/global.css`)
- ESLint 10 flat config (`typescript-eslint`, `react-hooks`, `react-refresh`)
- No UI framework, no icon font, no web-font requests — icons are inline SVG

## Getting started

Requires Node.js 20.19+ (22 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:4500
```

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server with HMR                  |
| `npm run build`     | Type-check and build to `dist/`                |
| `npm run preview`   | Serve the production build on port 4500        |
| `npm run lint`      | ESLint with `--max-warnings 0`                 |
| `npm run typecheck` | TypeScript project build without emitting      |

## Pages

| Route                            | Highlights                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `/`                              | Hero with live "mined today" cards, price ticker, count-up stats, plans, testimonials carousel, contact form |
| `/how-it-works`                  | Interactive 4-step stepper, animated reward flow, first-24-hours timeline                                    |
| `/plans`, `/plans/:slug`         | Coin filter, monthly/hourly billing, sorting, comparison table; plan page with duration/quantity, price summary, tabs and a 3-step mock checkout |
| `/calculator`                    | Coin, hashrate, duration, power cost, pool fee, difficulty and price scenario → animated profit + SVG chart with break-even |
| `/markets`                       | Mock live prices with green/red flashes, sparklines, search, sort and a watchlist                           |
| `/data-centers`                  | Dotted SVG world map with selectable sites (deep-linkable via `?site=`)                                      |
| `/referral`                      | Copyable link, earnings estimator, tiers, leaderboard                                                        |
| `/about`, `/blog`, `/blog/:slug` | Story, mission, timeline, team; 6 articles with categories, search, reading progress and TOC                |
| `/faq`, `/contact`               | Searchable, categorised FAQ; validated contact form, live-chat assistant                                    |
| `/login`, `/signup`              | Validation, show/hide password, password-strength meter                                                      |
| `/dashboard/*`                   | Own layout: hashrate gauge, ticking balance, workers (restart), payouts (filters, pagination, CSV export), withdraw flow, referrals, settings (2FA setup, wallets, notifications) |
| `/privacy`, `/terms`             | Legal pages with scroll-spy contents (`/terms#refunds`, `/terms#cancellation`)                              |
| `*`                              | Styled 404 (also used for unknown plan and article slugs)                                                    |

## Project structure

```
src/
  components/
    layout/    Header (mobile menu), Footer + newsletter, ScrollToTop, LegalPage …
    sections/  Hero, PlansSection, WhyUsSection, TriadSection, ContactSection …
    ui/        Button, Field, Modal, Tabs, Accordion, Toast, Reveal, CountUp, Icon …
    widgets/   ProfitChart, WorldMap, Gauge, CheckoutModal, SupportChat …
  data/        Mock content: plans, coins, posts, FAQs, data centers, dashboard
  hooks/       useDocumentMeta, useInView, useReducedMotion, useAnimatedNumber …
  lib/         Formatting, validation, mining maths, seeded random
  pages/       Route components (lazy-loaded); pages/dashboard/* is the app area
  store/       Mock market feed and wallet (useSyncExternalStore)
public/
  images/      Optimised WebP artwork
```

## Notes for production

- **Demo data:** all prices and earnings are illustrative. Before going live,
  replace `src/store/market.ts` with a real price feed and wire the forms to an API.
- **Domain:** canonical and Open Graph URLs use the placeholder
  `https://minecryptos.example` (`index.html`, `src/lib/site.ts`,
  `public/robots.txt`, `public/sitemap.xml`).
- **Social links** in the footer point to the networks' home pages as placeholders
  (`SOCIALS` in `src/lib/site.ts`).
- **Accessibility and motion:** animations are disabled under
  `prefers-reduced-motion`, modals use native `<dialog>`, decorative images have
  empty `alt`.
- **Deploying:** SPA fallbacks are included for Vercel (`vercel.json`) and Netlify
  (`public/_redirects`). Any static host works — serve `dist/` with a fallback to
  `index.html`.
