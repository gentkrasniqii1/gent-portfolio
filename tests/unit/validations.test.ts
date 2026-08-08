import { describe, expect, it } from "vitest";
import { contactFormSchema } from "@/lib/validations";

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

  it("rejects a filled honeypot", () => {
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
