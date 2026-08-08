import { describe, expect, it } from "vitest";
import { absoluteUrl, isPlaceholder, serializeJsonLd } from "@/lib/seo";

describe("seo helpers", () => {
  it("builds absolute urls", () => {
    expect(absoluteUrl("/")).toMatch(/^https?:\/\//);
    expect(absoluteUrl("/about")).toMatch(/\/about$/);
  });

  it("detects placeholders", () => {
    expect(isPlaceholder("[YOUR NAME]")).toBe(true);
    expect(isPlaceholder("Gent")).toBe(false);
  });

  it("escapes less-than for JSON-LD", () => {
    expect(serializeJsonLd({ a: "<script>" })).toContain("\\u003c");
  });
});
