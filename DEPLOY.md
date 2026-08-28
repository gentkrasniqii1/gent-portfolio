# Deploy & repository checklist

Phase 15 wrap-up. CI is already configured in `.github/workflows/ci.yml`. Complete the steps below in GitHub and Vercel — this file is the runbook.

## Current repo state (verified)

- Branch: `main` (tracking `origin/main`)
- Working tree: clean
- Remote: `https://github.com/gentkrasniqii1/gent-portfolio.git`
- Conventional Commits history is present on `main`
- CI workflow covers: lint → typecheck → unit → build → Playwright smokes

## 1. Create an integration branch (optional but recommended)

```bash
git checkout -b dev
git push -u origin dev
git checkout main
```

Open feature PRs into `dev`; merge `dev` → `main` for production releases.

## 2. GitHub repository settings

### General

- Description: `Professional Full-Stack Developer portfolio built with Next.js`
- Topics (examples): `nextjs`, `typescript`, `tailwindcss`, `portfolio`, `vercel`
- Social preview: upload a 1280×640 image (or use a captured OG image from `/opengraph-image`)

### Branch protection (`main`)

Settings → Branches → Add rule for `main`:

- [ ] Require a pull request before merging
- [ ] Require status checks to pass — select the CI job (`Lint, typecheck, test, build`)
- [ ] Require branches to be up to date before merging
- [ ] Do not allow bypassing the above settings (for everyone, including admins, if you want hard protection)
- [ ] Restrict direct pushes to `main` (PR-only)

Apply a lighter or identical rule to `dev` if you use it.

### Actions

Confirm Actions are enabled so `.github/workflows/ci.yml` runs on push/PR.

## 3. Vercel deployment

1. Import `gentkrasniqii1/gent-portfolio` in the Vercel dashboard
2. Framework preset: **Next.js** (auto-detected)
3. Environment variables (Production + Preview):

| Name                   | Example                                                     |
| ---------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` (then your custom domain) |
| `RESEND_API_KEY`       | `re_…`                                                      |
| `CONTACT_TO_EMAIL`     | your inbox                                                  |
| `CONTACT_FROM_EMAIL`   | verified Resend sender                                      |

4. Deploy
5. Confirm:
   - Production deploys from `main`
   - Preview deployments appear for every PR
6. After the first production URL is live, update `NEXT_PUBLIC_SITE_URL` and the README **Live Demo** section

### Resend

- Verify the sending domain (or use the Resend onboarding address for early testing)
- Send a real message from `/contact` on the preview/production URL

### Analytics

`@vercel/analytics` and `@vercel/speed-insights` activate on Vercel with no extra client keys. Check the project’s Analytics / Speed Insights tabs after traffic.

## 4. Post-deploy smoke checklist

- [ ] `/` renders hero + featured empty/filled state
- [ ] `/about`, `/projects`, `/cv`, `/contact` load
- [ ] Theme toggle works without flash of wrong theme
- [ ] Contact form client validation works; configured env delivers email
- [ ] `/sitemap.xml` and `/robots.txt` resolve
- [ ] Share preview uses OG image (`/opengraph-image`)
- [ ] Lighthouse pass on production (target 90+ after real content/assets)

## 5. Content still to fill (not deploy blockers)

- Replace `[YOUR X]` in `src/data/profile.ts`, `src/lib/constants.ts`
- Add skills / experience / education entries
- Add the first real project to `src/data/projects.ts`
- Replace `public/documents/cv.pdf` and verify `/cv` + download (see `docs/cv-sync.md`)

## 6. Suggested local verification before calling deploy “done”

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run test:e2e
```
