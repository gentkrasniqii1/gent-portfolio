import { describe, expect, it } from "vitest";
import { formatExperiencePeriod } from "@/lib/experience";

describe("formatExperiencePeriod", () => {
  it("formats a range with end date", () => {
    expect(formatExperiencePeriod("2020", "2024")).toBe("2020 — 2024");
  });

  it("formats present roles", () => {
    expect(formatExperiencePeriod("2024", "present")).toBe("2024 — Present");
  });

  it("returns start date when end is missing", () => {
    expect(formatExperiencePeriod("2023")).toBe("2023");
  });
});
