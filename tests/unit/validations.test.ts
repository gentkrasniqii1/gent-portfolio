import { describe, expect, it } from "vitest";
import {
  contactFormSchema,
  contactFormServerSchema,
  isHoneypotTripped,
} from "@/lib/validations";

describe("contactFormSchema", () => {
  const valid = {
    name: "Jane Doe",
    email: "jane@example.com",
    subject: "Project inquiry",
    message: "Hello, I would like to discuss a project.",
    website: "",
  };

  it("accepts a valid payload", () => {
    const result = contactFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactFormSchema.safeParse({
      ...valid,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot on the client schema", () => {
    const result = contactFormSchema.safeParse({
      ...valid,
      website: "https://spam.example",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a too-short message", () => {
    const result = contactFormSchema.safeParse({
      ...valid,
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });
});

describe("contactFormServerSchema", () => {
  it("parses honeypot spam so it can be dropped silently", () => {
    const result = contactFormServerSchema.safeParse({
      name: "Bot",
      email: "bot@example.com",
      subject: "Spam offer",
      message: "Buy follower services now.",
      website: "https://spam.example",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(isHoneypotTripped(result.data.website)).toBe(true);
    }
  });
});
