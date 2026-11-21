import { describe, expect, it } from "vitest";
import {
  absoluteUrl,
  getPersonJsonLd,
  isPlaceholder,
  serializeJsonLd,
} from "@/lib/seo";

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

  it("describes the person with a Prizren address and profile links", () => {
    const person = getPersonJsonLd().mainEntity;
    expect(person["@type"]).toBe("Person");
    expect(person.address).toMatchObject({
      addressLocality: "Prizren",
      addressCountry: "XK",
    });
    expect(person.sameAs).toEqual(
      expect.arrayContaining([expect.stringContaining("github.com")]),
    );
  });
});
