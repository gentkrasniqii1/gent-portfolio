# Phase Prompts — Portfolio Project

Ngjit njërin prej këtyre, njërin pas tjetrit, sipas radhës. Mos kalo fazë pa mbyllur të mëparshmen. Rregullat e përhershme (`.cursor/rules/portfolio.mdc`) tashmë janë në kontekst — këto prompte shtojnë vetëm çfarë mungon për atë fazë specifike.

---

### PHASE 0 — Audit

Audito repon aktuale: versionin e Next.js, dependencies, strukturën ekzistuese të folderave, konfigurimet. Raporto çfarë mungon (dependencies, tooling) dhe propozo strukturën finale të folderave (`src/app`, `components`, `data`, `lib`, `types`, `tests`, `public`). Mos shkruaj kod. Ndalo dhe prit miratimin tim.

### PHASE 1 — Architecture & Tooling

Krijo strukturën e folderave të miratuar. Shto dhe konfiguro: `.editorconfig`, Prettier (sinkron me ESLint), `.nvmrc`, Husky pre-commit (lint-staged), Commitlint (Conventional Commits). Krijo `.env.example`. Mos shkruaj ende UI.

### PHASE 2 — Design System

Përcakto design tokens në `tailwind.config.ts`: paleta e ngjyrave (semantic: background, foreground, primary, muted, accent, destructive), typography scale, spacing scale, border radius, shadows, breakpoints. Konfiguro dark/light/system theme (pa flash gabimi në load) dhe font-in me `next/font`.

### PHASE 3 — Layout, Navbar, Footer

Ndërto `layout.tsx` global, `Navbar` (me theme toggle, navigim responsive/mobile menu), `Footer` (social links, copyright). Përdor vetëm design tokens ekzistues.

### PHASE 4 — Hero & About

Ndërto seksionin Hero (emri, roli, value proposition, CTA-t) dhe faqen About (përmbledhje profesionale, edukim). Përdor `[YOUR X]` placeholder për çdo informacion që s'ta kam dhënë.

### PHASE 5 — Skills & Experience

Ndërto `data/skills.ts` dhe `data/experience.ts` (tipe në `types/`). Ndërto komponentët `SkillGroup` dhe `Timeline` për eksperiencën.

### PHASE 6 — Projects Architecture

Ndërto `types/project.ts`, `data/projects.ts` me 1 projekt real që do t'ia jap, komponentin `ProjectCard` dhe `ProjectGrid`, faqen `/projects` që i lexon nga data-t. Struktura duhet të lejojë shtim projektesh vetëm duke shtuar objekte, pa prekur UI.

### PHASE 7 — Project Detail Pages

Ndërto `/projects/[slug]` dinamike: overview, problem, zgjidhje, teknologjitë, sfidat, galeri screenshot-esh, rezultate, links.

### PHASE 8 — Contact System

Ndërto `ContactForm` (React Hook Form + Zod, validim client+server), API route `/api/contact`, honeypot field + rate limiting bazik. Përdor env variable për shërbimin e email-it (p.sh. Resend).

### PHASE 9 — CV Page

Ndërto faqen `/cv` me CV të shkarkueshëm (PDF), layout print-friendly.

### PHASE 10 — SEO

Shto metadata (title/description) për çdo route, Open Graph + dynamic OG images (`next/og`), Twitter metadata, `app/sitemap.ts` (gjeneruar nga projects data), `app/robots.ts`, JSON-LD Person schema në root layout.

### PHASE 11 — Accessibility & Responsive

Kontrollo hierarkinë e heading-eve, focus states, skip-to-content link, alt text, kontrast, keyboard navigation, forma accessible. Testo çdo breakpoint (mobile/tablet/laptop/desktop).

### PHASE 12 — Performance

Optimizo imazhet (`next/image`), fontet, JS bundle (kontrollo client components të panevojshme). Shto Vercel Analytics + Web Vitals reporting. Synoj Lighthouse 90+.

### PHASE 13 — Testing

Shto Vitest unit tests për `lib/validations.ts` dhe logjikë tjetër jo-triviale. Shto 1-3 Playwright smoke tests (homepage ngarkohet, navigimi punon, forma validon).

### PHASE 14 — Documentation

Shkruaj README-në finale (Overview, Live Demo, Features, Tech Stack, Architecture, Getting Started, Env Variables, Development, Testing, Build, Deployment, Screenshots, Performance, Future Improvements, License) bazuar në implementimin real, jo gjenerike. Shto `LICENSE` dhe `CONTRIBUTING.md`.

### PHASE 15 — Git Cleanup & Deploy

Kontrollo historikun e commit-eve, pastro branch-et, konfiguro GitHub Actions (lint + typecheck + test + build në çdo PR), aktivizo branch protection në `main`, konfirmo deployment-in në Vercel (production + preview per PR).
