# CV sync — PDF as single source of truth

The `/cv` page and the **Download PDF** button both come from the same file:

`public/documents/cv.pdf`

Replace that file whenever you update your CV. Do not edit `src/data/cv.generated.ts` by hand — it is regenerated from the PDF on every `dev`/`build` run (see [Generated file / git](#generated-file--git) below).

## Update workflow

1. Export or save your CV as `public/documents/cv.pdf` (preferred, fixed filename — see [Filename](#filename) below).
2. Run `npm run dev` or `npm run build` — `scripts/parse-cv.ts` regenerates `src/data/cv.generated.ts`.
3. During dev, saving a new `cv.pdf` (or any `.pdf` in `public/documents/`) while the server is running re-parses automatically (see `scripts/dev-with-cv-watch.ts`).

## Filename

`public/documents/cv.pdf` is the canonical, expected filename and is always preferred when present — the download link and generated metadata both use it.

If `cv.pdf` is missing but exactly one other `.pdf` file exists in `public/documents/`, `parse-cv.ts` will use that file instead and print a warning. This is a convenience for a one-off rename, not a general file-discovery feature: if zero or more than one non-canonical PDF is found, the parser does not guess — it fails (in CI/production) or keeps the previous generated data with a loud warning (locally). Prefer keeping the file named `cv.pdf`.

## How the text is read

`scripts/parse-cv.ts` extracts the PDF's text in one of two ways and logs which one it used:

1. **Tagged PDFs (preferred)** — `[parse-cv] Read text from the PDF's tag structure`. PDFs printed from a browser (Chrome/Edge "Save as PDF") and most modern editors are _tagged_: they carry a structure tree of headings, paragraphs and list items. `scripts/pdf-text.ts` reads that tree and emits **one line per heading, paragraph or list item**, with list items prefixed `• `. This keeps bullet boundaries exact even when bullets are drawn as graphics rather than `•` characters, and it leaves out untagged page furniture such as running headers and `Page 1 of 2` footers.
2. **Untagged PDFs (fallback)** — `[parse-cv] PDF is not tagged — using plain text extraction`. Plain text from `pdf-parse`'s `getText()`. Here bullets must be real `•` characters in the text, and lines that follow a bullet are treated as its wrapped continuation.

`pdfjs-dist` is loaded from `pdf-parse`'s own dependency tree, so both paths always use the same pdfjs version.

## PDF structure (required for parsing)

The parser (`scripts/cv-parser.ts`) finds sections by heading text (case- and whitespace-insensitive) and slices them **in the order they appear in the document**, so you can reorder sections and change how many entries or bullets each has. Two layouts are supported: the current one (`·` separators, en dashes) and the older one (commas, `|` and hyphens).

- **Header** (everything before the first section heading):
  - With a **Profile** section: name → role → one or more contact lines. Contact items are separated by `·` (or `|`), e.g. `Prizren, Kosovë · +383 … · name@example.com · github.com/…`.
  - Without one: name → role → primary contact line (comma-separated) → secondary contact/links line (`|`-separated), and everything after that is the summary.
  - A letter-spaced all-caps role ending in `DEVELOPER` (`FR ONTEND DEV ELOP ER`) is re-joined; any other role is kept as written (only extra spaces are collapsed).
- **Profile / summary** — accepted heading: `PROFILE`. Optional; its paragraph becomes the summary.
- **Skills** — accepted headings: `TECHNICAL SKILLS`, `SKILLS`, `SKILLS & TOOLS`. One `Label: item1, item2` per line or list item.
- **Experience** — accepted headings: `PROFESSIONAL EXPERIENCE`, `EXPERIENCE`, `WORK EXPERIENCE`, `EMPLOYMENT HISTORY`. One headline per job followed by its bullets. The headline is either `Title — Org, City · Period` or `Title - Org Period` (period at the end).
- **Projects** — accepted headings: `PROJECTS`, `SELECTED PROJECTS`. Each project starts with either a `Title · domain · stack` line (the domain becomes the Live link, the rest the stack; a year segment is optional) or a title line ending in a year, followed by bullets and optional `Live:` / `Code:` / `Stack:` lines. A labelled line such as `Earlier projects: A, B, C` is kept as its own entry.
- **Education** — accepted headings: `EDUCATION`, `EDUCATION & TRAINING`. One line per entry: `Program — School · Period · extra details` (details such as `GPA 4.8` are shown under the entry) or `Program - School Period`.
- **Additional information** — accepted headings: `ADDITIONAL INFORMATION`, `ADDITIONAL INFO`, `CERTIFICATIONS & LANGUAGES`. A `Languages:` line (`Albanian (native), English (professional)`) and a `Certifications:` line with items separated by `·` or `;`. Either line may come first.

**Periods** may use a hyphen, en dash or em dash, with or without months, and may end in `Present`: `Jun 2023 - Jan 2024`, `Oct 2026 – Present`, `2026 – Present`, `2020 - 2024`.

If you use a heading not in this list, add it to `SECTION_ALIASES` in `scripts/cv-parser.ts`. If you change the structure more significantly (e.g. a new top-level section type), `scripts/cv-parser.ts` needs a corresponding parser function — see `parseProjects`/`parseExperience`/etc. for the pattern.

## Validation — the build fails on a bad parse

`scripts/cv-parser.ts` validates the parsed data (`validateCvData`) before it is ever written to `cv.generated.ts`. A `CvValidationError` is thrown, and `parse-cv.ts` **always exits non-zero** (in dev, CI, and production alike — there is no stale-data fallback for a content problem), when:

- no recognized section heading is found at all
- the header is missing name/role/contact lines (at least 3 lines with a Profile section, 4 without)
- `identity.name`, `identity.role`, or `identity.summary` end up empty
- there is no contact information at all
- an experience/education/project entry has a date/period that doesn't match a recognized format
- the extracted text is suspiciously small relative to the raw PDF text (a sign the parser mis-detected sections and dropped most of the content)

Non-fatal warnings (e.g. a missing section, no projects parsed, empty certifications) are logged and also recorded in `CV_PARSE_META.warnings` in the generated file. After replacing the PDF, check that this list is empty — a parse can succeed and still drop a whole section.

### Missing-file fallback

A **missing PDF file** (not a validation failure) is treated differently: locally, if a previously generated `cv.generated.ts` exists, `parse-cv.ts` keeps it and warns loudly. This is a local dev convenience only — the same situation fails the build (`process.exit(1)`) when `CI` or `VERCEL` is set, which Vercel and GitHub Actions both set automatically. A validation failure against a PDF that _is_ present is always fatal, in every environment, with no fallback — the build must not ship silently wrong CV content.

## Generated file / git

`src/data/cv.generated.ts` is **committed** in this repository (it is not listed in `.gitignore`). It is fully reproducible from `public/documents/cv.pdf` by `scripts/parse-cv.ts`, which runs automatically via the `predev`/`prebuild` npm lifecycle hooks before `next dev` and `next build` — including on Vercel, since Vercel runs `npm run build`. So a deploy always regenerates it from the current PDF, whatever version is committed.

The output is deterministic (repo-relative source path, Prettier-formatted, and the file is only rewritten when the parsed content changes), so it only shows up in a diff when the CV actually changed. When you replace `cv.pdf`, commit the regenerated `cv.generated.ts` together with it.

**Staleness guard.** `CV_PARSE_META.sourceSha256` records the SHA-256 of the PDF the file was generated from, and `tests/unit/cv.test.ts` fails if it doesn't match the current `public/documents/cv.pdf`. CI runs the unit tests (and typecheck) _before_ the build, against the committed file, so a commit that changes `cv.pdf` without regenerating `cv.generated.ts` fails CI instead of leaving a stale copy in the repo. Fix it with `npx tsx scripts/parse-cv.ts` and commit both files.

Vercel's build command must stay the default (`npm run build`) so the `prebuild` hook runs; overriding it with `next build` would skip the parser and deploy whatever `cv.generated.ts` is committed.

After a deploy, compare `/cv` with the download in a freshly loaded tab (Ctrl+Shift+R). A tab opened before the deploy keeps the previous page, and client-side navigation can reuse a visited page for a few minutes, while the download always comes from the new deployment.

## What `/cv` shows that differs from the PDF

`src/data/cv.ts` wraps the generated data before the page renders it:

- **Email:** any email address in the PDF's contact line is replaced with the public address from `SOCIAL_LINKS.email` in `src/lib/constants.ts`. The downloadable PDF itself is unchanged, so it still contains whatever address you exported.

Everything else on the page is the parsed PDF text, laid out by `cv-document.tsx`.

## Download

- **URL:** `/documents/cv.pdf` (static file, byte-for-byte — this is always the canonical path regardless of which source PDF was parsed via the filename fallback above)
- **Not generated:** removed `@react-pdf/renderer` route (`/api/cv.pdf`)

## Print

`/cv` uses `window.print()` (`src/components/cv/print-button.tsx`) and the print-specific CSS in `src/app/globals.css` (`@media print`), which forces light "resume paper" tokens regardless of the active theme. This is unaffected by the CV sync changes.

## Files

| Path                                | Role                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| `public/documents/cv.pdf`           | Your CV file (replace to update everything)                                    |
| `scripts/parse-cv.ts`               | PDF → `cv.generated.ts` CLI; file resolution, text extraction, validation gate |
| `scripts/pdf-text.ts`               | Tag-aware text extraction for tagged PDFs (one line per block/list item)       |
| `scripts/cv-parser.ts`              | Text parsing logic + `validateCvData`                                          |
| `scripts/dev-with-cv-watch.ts`      | Dev-only watcher: re-parses on any `.pdf` change in `public/documents/`        |
| `src/data/cv.generated.ts`          | Auto-generated view model for `/cv` — committed, never edit by hand            |
| `src/data/cv.ts`                    | Public-email swap, re-exports + `getCvPdfFilename()`                           |
| `src/components/cv/cv-document.tsx` | Web layout, renders `CvData` structurally                                      |

## Layout fidelity — what to expect

`/cv` reproduces the **semantic structure** of the source PDF (summary → experience → projects → education → skills → languages/certifications, each with its own entries and bullets) rather than its exact visual layout. Neither extraction path uses font sizes or positions: tagged PDFs give the paragraph and list structure, untagged PDFs only plain lines. Reconstructing pixel-level layout would need a much heavier approach for a benefit this project doesn't need, since `cv-document.tsx` renders the structured data with its own consistent, print-friendly design.

## Quick check after replacing the PDF

1. Run `npx tsx scripts/parse-cv.ts` (or `npm run dev` / `npm run build`) and confirm `[parse-cv] Wrote src/data/cv.generated.ts` with no errors.
2. Open `src/data/cv.generated.ts` and confirm `CV_PARSE_META.warnings` is empty.
3. Open `/cv` and confirm every section matches the PDF.
4. Click **Download PDF** — the file should match `public/documents/cv.pdf` exactly.
5. Optional: `npm run test:unit -- tests/unit/cv.test.ts tests/unit/cv-parser.test.ts tests/unit/pdf-text.test.ts`
