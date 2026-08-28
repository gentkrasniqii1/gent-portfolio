/**
 * CV data access layer for the /cv page.
 *
 * Content is parsed automatically from `public/documents/cv.pdf` into
 * `cv.generated.ts` by `scripts/parse-cv.ts` (run on predev/prebuild).
 *
 * To update the CV: replace `public/documents/cv.pdf` and restart dev/build.
 * See docs/cv-sync.md.
 */

import { CV_DATA } from "@/data/cv.generated";

export {
  CV_DATA,
  CV_PARSE_META,
  CV_PDF_PATH,
  getCvData,
} from "@/data/cv.generated";

export function getCvPdfFilename(name = CV_DATA.identity.name) {
  return `${name.replace(/\s+/g, "-")}-CV.pdf`;
}
