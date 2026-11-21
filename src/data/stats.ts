import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import type { Stat } from "@/types/stat";

/**
 * Home page stats strip. Every number is derived from the other data files
 * (or quoted from the CV), so update the source data rather than these values.
 */

/** Stated on the CV: "Completed a 6-month professional React.js internship." */
const INTERNSHIP_MONTHS = 6;

/** Products with a public live URL. */
export const liveProductCount = projects.filter(
  (project) => project.liveUrl,
).length;

function monthsSince(isoMonth: string, now = new Date()) {
  const [year, month] = isoMonth.split("-").map(Number);
  return (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
}

const ubtStart =
  experience.find((entry) => entry.id === "edu-ubt")?.startDate ?? "2023-10";
const monthsAtUbt = monthsSince(ubtStart);
const yearsAtUbt = Math.floor(monthsAtUbt / 12);

export const stats: Stat[] = [
  {
    id: "live-products",
    value: liveProductCount,
    label:
      liveProductCount === 1 ? "Live product shipped" : "Live products shipped",
  },
  {
    id: "internship",
    value: INTERNSHIP_MONTHS,
    suffix: " mo",
    label: "Professional React.js internship",
  },
  {
    id: "cs-study",
    value: yearsAtUbt,
    suffix: monthsAtUbt % 12 > 0 ? "+" : "",
    label: "Years of CS & Engineering at UBT",
  },
  {
    id: "certificates",
    value: certifications.length,
    label: "Certificates earned",
  },
];
