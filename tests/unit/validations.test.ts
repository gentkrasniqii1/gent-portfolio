import { describe, expect, it } from "vitest";
import {
  contactFormSchema,
  contactFormServerSchema,
  getFieldErrors,
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

  it("trims whitespace before validating", () => {
    const result = contactFormSchema.safeParse({
      ...valid,
      email: "  jane@example.com  ",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("jane@example.com");
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

describe("getFieldErrors", () => {
  it("maps validation issues to the fields that caused them", () => {
    const result = contactFormServerSchema.safeParse({
      name: "J",
      email: "nope",
      subject: "Hi there",
      message: "Long enough message body.",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = getFieldErrors(result.error);
      expect(errors.name?.[0]).toBe("Name must be at least 2 characters");
      expect(errors.email?.[0]).toBe("Enter a valid email address");
      expect(errors.subject).toBeUndefined();
    }
  });
});
