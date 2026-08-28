# CV PDF (source file)

Place your resume here as **`cv.pdf`**.

- **Download URL:** `/documents/cv.pdf` (served as-is, no programmatic generation)
- **Web page:** `/cv` reads this file via `scripts/parse-cv.ts` → `src/data/cv.generated.ts`

To update your CV, replace `cv.pdf` and restart dev/build (or save while `npm run dev` is running — the watcher re-parses automatically).

See `docs/cv-sync.md` for required PDF section structure.
