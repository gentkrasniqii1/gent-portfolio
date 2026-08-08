import { afterEach, describe, expect, it } from "vitest";
import { getContactMailConfig } from "@/lib/email";

const KEYS = [
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
] as const;

const snapshot = Object.fromEntries(KEYS.map((key) => [key, process.env[key]]));

afterEach(() => {
  for (const key of KEYS) {
    const value = snapshot[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
});

describe("getContactMailConfig", () => {
  it("returns null when env is incomplete", () => {
    process.env.RESEND_API_KEY = "";
    process.env.CONTACT_TO_EMAIL = "me@example.com";
    process.env.CONTACT_FROM_EMAIL = "Portfolio <hi@example.com>";

    expect(getContactMailConfig()).toBeNull();
  });

  it("returns null for placeholder recipient email", () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_TO_EMAIL = "[YOUR EMAIL]";
    process.env.CONTACT_FROM_EMAIL = "Portfolio <hi@example.com>";

    expect(getContactMailConfig()).toBeNull();
  });

  it("returns config when all values are set", () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_TO_EMAIL = "me@example.com";
    process.env.CONTACT_FROM_EMAIL = "Portfolio <hi@example.com>";

    expect(getContactMailConfig()).toEqual({
      apiKey: "re_test",
      to: "me@example.com",
      from: "Portfolio <hi@example.com>",
    });
  });
});
