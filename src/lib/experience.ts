import { experience } from "@/data/experience";
import type { Experience } from "@/types/experience";

export function getEducation(): Experience[] {
  return experience.filter((entry) => entry.type === "education");
}

export function getWorkExperience(): Experience[] {
  return experience.filter(
    (entry) => entry.type === "work" || entry.type === "freelance",
  );
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2023-06" → "Jun 2023"; plain years and other strings pass through. */
export function formatExperienceDate(value: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const month = MONTHS[Number(match[2]) - 1];
  return month ? `${month} ${match[1]}` : value;
}

export function formatExperiencePeriod(
  startDate: string,
  endDate?: string | "present",
): string {
  const start = formatExperienceDate(startDate);
  if (!endDate) return start;
  if (endDate === "present") return `${start} – Present`;
  return `${start} – ${formatExperienceDate(endDate)}`;
}

/**
 * Work history plus ongoing studies, newest first — the career timeline shown
 * on the home page.
 */
export function getCareerTimeline(): Experience[] {
  return experience
    .filter(
      (entry) =>
        entry.type === "work" ||
        entry.type === "freelance" ||
        (entry.type === "education" && entry.endDate === "present"),
    )
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
}
