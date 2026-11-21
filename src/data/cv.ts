/**
 * CV data access layer for the /cv page.
 *
 * Content is parsed automatically from `public/documents/cv.pdf` into
 * `cv.generated.ts` by `scripts/parse-cv.ts` (run on predev/prebuild).
 *
 * To update the CV: replace `public/documents/cv.pdf` and restart dev/build.
 * See docs/cv-sync.md.
 */

import { CV_DATA as PARSED_CV_DATA } from "@/data/cv.generated";
import { SOCIAL_LINKS } from "@/lib/constants";
import type { CvData } from "@/types/cv";

export { CV_PARSE_META, CV_PDF_PATH } from "@/data/cv.generated";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The PDF lists a private inbox; the site shows the public address instead.
 * Applied here (not in the generated file) so it survives re-parsing the PDF.
 */
function withPublicEmail(data: CvData): CvData {
  return {
    ...data,
    identity: {
      ...data.identity,
      contactBits: data.identity.contactBits.map((bit) =>
        EMAIL_PATTERN.test(bit) ? SOCIAL_LINKS.email : bit,
      ),
    },
  };
}

export const CV_DATA: CvData = withPublicEmail(PARSED_CV_DATA);

export function getCvData(): CvData {
  return CV_DATA;
}

export function getCvPdfFilename(name = CV_DATA.identity.name) {
  return `${name.replace(/\s+/g, "-")}-CV.pdf`;
}
