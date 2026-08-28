# CV sync — PDF as single source of truth

The `/cv` page and the **Download PDF** button both come from the same file:

`public/documents/cv.pdf`

Replace that file whenever you update your CV. Do not edit `src/data/cv.generated.ts` by hand — it is generated on every `dev`/`build` run and is **not committed to git** (see [Generated file / git](#generated-file--git) below).

## Update workflow

1. Export or save your CV as `public/documents/cv.pdf` (preferred, fixed filename — see [Filename](#filename) below).
2. Run `npm run dev` or `npm run build` — `scripts/parse-cv.ts` regenerates `src/data/cv.generated.ts`.
3. During dev, saving a new `cv.pdf` (or any `.pdf` in `public/documents/`) while the server is running re-parses automatically (see `scripts/dev-with-cv-watch.ts`).

## Filename

`public/documents/cv.pdf` is the canonical, expected filename and is always preferred when present — the download link and generated metadata both use it.

If `cv.pdf` is missing but exactly one other `.pdf` file exists in `public/documents/`, `parse-cv.ts` will use that file instead and print a warning. This is a convenience for a one-off rename, not a general file-discovery feature: if zero or more than one non-canonical PDF is found, the parser does not guess — it fails (in CI/production) or keeps the previous generated data with a loud warning (locally). Prefer keeping the file named `cv.pdf`.

## PDF structure (required for parsing)

The parser (`scripts/cv-parser.ts`) locates sections by heading text, not by position — so reordering sections, changing how many entries or bullets each has, and changing text length are all supported. Keep these section titles recognizable (case/whitespace-insensitive) so the parser can split content:

- Header (before the first section heading): name, role, contact line, links line, then summary text. These four lines are still positional — the parser reads them as name → role → primary contact → secondary contact/links, then treats everything else before the first heading as the summary.
- **Skills** — accepted headings: `TECHNICAL SKILLS`, `SKILLS`, `SKILLS & TOOLS`. Lines like `Label: item1, item2`.
- **Projects** — accepted headings: `PROJECTS`, `SELECTED PROJECTS`. Title lines ending in a year; bullets with `•`; optional `Live:` / `Code:` / `Stack:` lines.
- **Experience** — accepted headings: `PROFESSIONAL EXPERIENCE`, `EXPERIENCE`, `WORK EXPERIENCE`, `EMPLOYMENT HISTORY`. Headline + period (`Mon YYYY - Mon YYYY` or `- Present`); bullets with `•`.
- **Education** — accepted headings: `EDUCATION`, `EDUCATION & TRAINING`. Program line + period.
- **Additional information** — accepted headings: `ADDITIONAL INFORMATION`, `ADDITIONAL INFO`. `Languages:` and `Certifications:` lines.

If you use a heading not in this list, add it to `SECTION_ALIASES` in `scripts/cv-parser.ts`. If you change the structure more significantly (e.g. a new top-level section type), `scripts/cv-parser.ts` needs a corresponding parser function — see `parseProjects`/`parseExperience`/etc. for the pattern.

## Validation — the build fails on a bad parse

`scripts/cv-parser.ts` validates the parsed data (`validateCvData`) before it is ever written to `cv.generated.ts`. A `CvValidationError` is thrown, and `parse-cv.ts` **always exits non-zero** (in dev, CI, and production alike — there is no stale-data fallback for a content problem), when:

- no recognized section heading is found at all
- the header is missing name/role/contact lines
- `identity.name`, `identity.role`, or `identity.summary` end up empty
- there is no contact information at all
- an experience/education/project entry has a date/period that doesn't match a recognized format
- the extracted text is suspiciously small relative to the raw PDF text (a sign the parser mis-detected sections and dropped most of the content)

Non-fatal warnings (e.g. a single missing optional section, empty certifications) are still just logged.

### Missing-file fallback

A **missing PDF file** (not a validation failure) is treated differently: locally, if a previously generated `cv.generated.ts` exists, `parse-cv.ts` keeps it and warns loudly. This is a local dev convenience only — the same situation fails the build (`process.exit(1)`) when `CI` or `VERCEL` is set, which Vercel and GitHub Actions both set automatically. A validation failure against a PDF that _is_ present is always fatal, in every environment, with no fallback — the build must not ship silently wrong CV content.

## Generated file / git

`src/data/cv.generated.ts` is listed in `.gitignore` and should not be committed. It is fully reproducible from `public/documents/cv.pdf` by `scripts/parse-cv.ts`, which runs automatically via the `predev`/`prebuild` npm lifecycle hooks before `next dev` and `next build` — including on Vercel, since Vercel runs `npm run build`. Committing it would create a second, easily-stale copy of CV content alongside the PDF; not committing it guarantees the file in your working tree (or Vercel's build) always matches the current `cv.pdf`.

## Download

- **URL:** `/documents/cv.pdf` (static file, byte-for-byte — this is always the canonical path regardless of which source PDF was parsed via the filename fallback above)
- **Not generated:** removed `@react-pdf/renderer` route (`/api/cv.pdf`)

## Print

`/cv` uses `window.print()` (`src/components/cv/print-button.tsx`) and the print-specific CSS in `src/app/globals.css` (`@media print`), which forces light "resume paper" tokens regardless of the active theme. This is unaffected by the CV sync changes.

## Files

| Path                                | Role                                                                    |
| ----------------------------------- | ----------------------------------------------------------------------- |
| `public/documents/cv.pdf`           | Your CV file (replace to update everything)                             |
| `scripts/parse-cv.ts`               | PDF → `cv.generated.ts` CLI; file resolution + validation gate          |
| `scripts/cv-parser.ts`              | Text parsing logic + `validateCvData`                                   |
| `scripts/dev-with-cv-watch.ts`      | Dev-only watcher: re-parses on any `.pdf` change in `public/documents/` |
| `src/data/cv.generated.ts`          | Auto-generated view model for `/cv` — gitignored, never edit by hand    |
| `src/data/cv.ts`                    | Re-exports + `getCvPdfFilename()`                                       |
| `src/components/cv/cv-document.tsx` | Web layout, renders `CvData` structurally (unchanged)                   |

## Layout fidelity — what to expect

`pdf-parse` (the library used to extract PDF text) exposes plain per-page text only — no font size, position, or bounding-box data at the level this project uses it (`getText()` returns `{ num, text }` per page). Because of this, `/cv` reproduces the **semantic structure** of the source PDF (heading hierarchy: summary → experience → projects → education → skills → languages/certifications, each with its own entries and bullets) rather than its exact visual layout (columns, exact line breaks, font choices). This is a deliberate trade-off: reconstructing pixel-level PDF layout would require a materially heavier extraction approach for a benefit (exact visual reproduction) this project doesn't need, since `cv-document.tsx` already renders the structured data with its own consistent, print-friendly design.

## Quick check after replacing the PDF

1. Run `npm run dev` (or `npm run build`) and confirm `[parse-cv] Wrote src/data/cv.generated.ts` with no errors.
2. Open `/cv` and confirm content matches the PDF.
3. Click **Download PDF** — the file should match `public/documents/cv.pdf` exactly.
4. Optional: `npm run test:unit -- tests/unit/cv.test.ts tests/unit/cv-parser.test.ts`
