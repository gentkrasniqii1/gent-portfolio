# Contributing

Thanks for helping improve this portfolio. Even as a mostly solo project, this document defines the engineering process.

## Ground rules

- Prefer small, focused changes.
- Do not invent personal biography, employers, clients, or metrics — use `[YOUR X]` placeholders or real provided content only.
- Keep the data-driven architecture: new projects/skills/experience belong in `src/data/`, not hard-coded UI.
- Server Components by default; add `"use client"` only when interactivity requires it.
- Ask before adding dependencies.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Branching

- `main` — production
- `dev` — integration
- `feature/<short-name>` — individual work

Open PRs into `dev` (or `main` if that is your active integration branch).

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/). Commitlint enforces this on commit.

Examples:

```text
feat: add project filter chips
fix: restore focus after closing mobile nav
docs: expand environment variable section
test: cover contact honeypot server schema
chore: bump playwright browsers
```

## Quality gate (before you push)

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
```

For UI flows that touch navigation or the contact form:

```bash
npm run build
npm run test:e2e
```

Husky runs lint-staged on commit. Do not bypass hooks (`--no-verify`) unless explicitly needed and called out in the PR.

## Pull requests

Use the PR template. Include:

1. Summary of why the change exists
2. Screenshots for visual changes
3. Test plan checklist you actually ran

CI must pass before merge.

## Issues

Use the issue templates for bugs and features. Include reproduction steps for defects.

## Code style

- TypeScript strict mode — avoid `any`
- Semantic design tokens from `globals.css` / Tailwind theme — no ad-hoc hex in components
- Prefer accessibility patterns already used in the codebase (labels, focus rings, skip link, landmarks)

## Security

Never commit `.env.local`, API keys, or private credentials. Validate all contact input on the server even when the client already validates.
