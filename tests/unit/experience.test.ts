import { describe, expect, it } from "vitest";
import {
  formatExperienceDate,
  formatExperiencePeriod,
  getCareerTimeline,
} from "@/lib/experience";

describe("formatExperiencePeriod", () => {
  it("formats a range with end date", () => {
    expect(formatExperiencePeriod("2020", "2024")).toBe("2020 – 2024");
  });

  it("formats present roles", () => {
    expect(formatExperiencePeriod("2024", "present")).toBe("2024 – Present");
  });

  it("returns start date when end is missing", () => {
    expect(formatExperiencePeriod("2023")).toBe("2023");
  });

  it("formats year-month values as short month names", () => {
    expect(formatExperienceDate("2023-06")).toBe("Jun 2023");
    expect(formatExperiencePeriod("2023-06", "2024-01")).toBe(
      "Jun 2023 – Jan 2024",
    );
  });
});

describe("getCareerTimeline", () => {
  it("lists work and ongoing studies, newest first", () => {
    const timeline = getCareerTimeline();
    const starts = timeline.map((entry) => entry.startDate);
    expect(starts).toEqual([...starts].sort().reverse());
    expect(
      timeline.every(
        (entry) => entry.type !== "education" || entry.endDate === "present",
      ),
    ).toBe(true);
  });
});
