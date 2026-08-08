# Gent Portfolio

Personal professional portfolio for a Full-Stack Developer — projects, skills, experience, CV, and contact — built with Next.js App Router.

## Overview

This is a production-oriented portfolio site with:

- Typed local content (no CMS/database in v1)
- Server Components by default, client islands only where needed
- Contact form with Zod validation, honeypot, rate limiting, and Resend delivery
- SEO (metadata, sitemap, robots, JSON-LD, OG images)
- Dark/light/system themes
- Vitest unit tests + Playwright smoke tests
- GitHub Actions CI and Vercel-ready deployment

Personal copy still uses `[YOUR X]` placeholders in `src/data/` until you fill real details.

## Live Demo

Add your production URL after deploying to Vercel, for example:

`https://your-domain.vercel.app`

Set the same value as `NEXT_PUBLIC_SITE_URL`.

## Features

- **Home** — Hero introduction + featured projects
- **About** — Summary, skills, work experience, education
- **Projects** — Archive with category filters + dynamic detail pages
- **CV** — Print-friendly resume + PDF download
- **Contact** — Accessible form → `/api/contact` → Resend email
- **Theme** — Light (default), dark, and system preference
- **SEO** — Canonical URLs, Open Graph/Twitter cards, sitemap, robots, Person JSON-LD
- **Analytics** — Vercel Analytics + Speed Insights (Web Vitals)

## Tech Stack

| Area      | Choice                                           |
| --------- | ------------------------------------------------ |
| Framework | Next.js `16.3` (App Router)                      |
| UI        | React `19`, Tailwind CSS `v4`, Lucide icons      |
| Forms     | React Hook Form + Zod + Resend                   |
| Theme     | `next-themes`                                    |
| Testing   | Vitest, Playwright                               |
| Quality   | ESLint, Prettier, Husky, lint-staged, Commitlint |
| CI/CD     | GitHub Actions + Vercel                          |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights`    |

## Architecture

Content-driven UI: add typed objects under `src/data/`; components read helpers from `src/lib/`.

```
src/
├── app/                 # Routes, API, SEO files (sitemap/robots/OG)
├── components/          # UI by domain (hero, projects, contact, …)
├── data/                # projects, skills, experience, profile
├── lib/                 # utils, validations, seo, email, rate-limit
└── types/               # Shared TypeScript models
tests/
├── unit/                # Vitest
└── e2e/                 # Playwright smoke tests
public/
├── images/projects/     # Project assets
└── documents/cv.pdf     # Resume PDF
```

**Adding a project:** append one object to `src/data/projects.ts`, drop images in `public/images/projects/`, set `featured: true` if it should appear on Home. Detail routes and sitemap entries update from that data.

## Project Structure (routes)

| Route              | Purpose                                |
| ------------------ | -------------------------------------- |
| `/`                | Hero + featured projects               |
| `/about`           | Profile, skills, experience, education |
| `/projects`        | Full archive (`?category=` filter)     |
| `/projects/[slug]` | Case study detail                      |
| `/cv`              | Resume view + PDF download             |
| `/contact`         | Contact form                           |
| `/api/contact`     | Validated email API                    |
| `/sitemap.xml`     | Dynamic sitemap                        |
| `/robots.txt`      | Crawler rules                          |

## Getting Started

**Requirements:** Node.js 20+ (see `.nvmrc`), npm 11+

```bash
git clone https://github.com/gentkrasniqi1/gent-portfolio.git
cd gent-portfolio
nvm use
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Documented in `.env.example`:

| Variable               | Required    | Purpose                                  |
| ---------------------- | ----------- | ---------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod)  | Canonical URL, sitemap, OG absolute URLs |
| `RESEND_API_KEY`       | For contact | Resend API key                           |
| `CONTACT_TO_EMAIL`     | For contact | Inbox receiving messages                 |
| `CONTACT_FROM_EMAIL`   | For contact | Verified Resend from address             |

Without mail env vars, `/api/contact` returns **503** (no fake success). Analytics needs no extra client keys on Vercel.

## Development

```bash
npm run dev          # Next.js dev server
npm run lint         # ESLint
npm run typecheck    # next typegen + tsc
npm run format       # Prettier
```

Git hooks:

- **pre-commit** — lint-staged (ESLint + Prettier)
- **commit-msg** — Conventional Commits via Commitlint

Branch model: `main` ← `dev` ← `feature/*`

## Testing

```bash
npm run test:unit           # Vitest (CI mode)
npm run test:e2e:install    # Playwright Chromium (once)
npm run build               # required before e2e
npm run test:e2e            # Playwright smokes against next start
```

Covered today:

- Unit: validations, rate limit, client IP, email config, SEO/project helpers
- E2E: homepage loads, About navigation, contact form validation errors

## Build

```bash
npm run build
npm run start
```

## Deployment

1. Push to GitHub (`gentkrasniqi1/gent-portfolio`)
2. Import the repo in [Vercel](https://vercel.com)
3. Set env vars (`NEXT_PUBLIC_SITE_URL`, Resend keys)
4. Deploy — production from `main`, preview deployments per PR

CI (`.github/workflows/ci.yml`) on push/PR to `main` and `dev`:

lint → typecheck → unit tests → production build → Playwright Chromium smokes

## Screenshots

Add screenshots under `docs/screenshots/` when the live site and real content are ready, then link them here.

## Projects

Seed projects in `src/data/projects.ts`. The first real project should be added as a typed entry (do not hardcode one-off UI). Empty state messaging is intentional until content exists.

## Performance

- `next/font` with `display: "swap"`
- `next/image` (AVIF/WebP via `next.config`)
- Server Components by default; client islands limited to nav, theme, contact form, print
- Security headers + CSP in `next.config.ts`
- Vercel Analytics + Speed Insights for Web Vitals

Target: Lighthouse 90+ after real images/copy are in place — re-measure on production.

## Future Improvements

- Fill profile/skills/experience and first featured project
- English / Albanian toggle
- Optional blog or certifications section
- Redis/Upstash rate limiting for multi-instance contact protection
- CMS later (without rewriting the UI contract)

## License

MIT — see [LICENSE](./LICENSE).
