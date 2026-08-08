# Gent Portfolio

Professional full-stack developer portfolio built with Next.js.

## Status

**Phase 4 complete** — Hero and About pages. Phase 5 is Skills & Experience.

## Tech stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v4
- Vitest · Playwright · ESLint · Prettier
- Husky · lint-staged · Commitlint

## Getting started

```bash
nvm use   # or Node 20+
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Purpose                |
| ------------------- | ---------------------- |
| `npm run dev`       | Development server     |
| `npm run build`     | Production build       |
| `npm run lint`      | ESLint                 |
| `npm run typecheck` | TypeScript check       |
| `npm run test:unit` | Vitest (CI mode)       |
| `npm run test:e2e`  | Playwright smoke tests |
| `npm run format`    | Prettier write         |

## Architecture

Typed content lives under `src/data/` and `src/types/`. App routes live under `src/app/`. See `PHASE_PROMPTS.md` for the phased delivery plan.

## License

Private / TBD.
