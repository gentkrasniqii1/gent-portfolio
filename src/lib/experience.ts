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

export function formatExperiencePeriod(
  startDate: string,
  endDate?: string | "present",
): string {
  if (!endDate) return startDate;
  if (endDate === "present") return `${startDate} — Present`;
  return `${startDate} — ${endDate}`;
}
