import { afterEach, describe, expect, it } from "vitest";
import {
  buildConfirmationEmail,
  buildContactEmail,
  formatSender,
  getContactMailConfig,
  SENDER_NAME,
} from "@/lib/email";

const KEYS = [
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
  "CONTACT_SEND_CONFIRMATION",
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
    delete process.env.CONTACT_SEND_CONFIRMATION;

    expect(getContactMailConfig()).toEqual({
      apiKey: "re_test",
      to: "me@example.com",
      from: "Portfolio <hi@example.com>",
      sendConfirmation: false,
    });
  });

  it("adds a display name to a bare sender and reads the confirmation flag", () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_TO_EMAIL = "me@example.com";
    process.env.CONTACT_FROM_EMAIL = "contact@example.com";
    process.env.CONTACT_SEND_CONFIRMATION = "true";

    expect(getContactMailConfig()).toMatchObject({
      from: `${SENDER_NAME} <contact@example.com>`,
      sendConfirmation: true,
    });
  });
});

describe("formatSender", () => {
  it("keeps an existing display name", () => {
    expect(formatSender("Someone <a@example.com>")).toBe(
      "Someone <a@example.com>",
    );
  });

  it("names a bare address after the portfolio", () => {
    expect(formatSender("a@example.com")).toBe(
      "Gent Krasniqi Portfolio <a@example.com>",
    );
  });
});

describe("buildContactEmail", () => {
  const message = {
    name: "  Jane   Doe ",
    email: "jane@example.com",
    subject: "Frontend role\r\nat Acme",
    message: "Hi Gent,\r\n\r\nWe'd like to talk. <script>alert(1)</script>",
    pageUrl: "https://gentkrasniqi.dev/contact",
    sentAt: new Date("2026-11-21T09:30:00Z"),
  };

  it("uses the '[Portfolio] subject — name' format on one line", () => {
    expect(buildContactEmail(message).subject).toBe(
      "[Portfolio] Frontend role at Acme — Jane Doe",
    );
  });

  it("lists every field in the plain-text version", () => {
    const { text } = buildContactEmail(message);

    expect(text).toContain("Name: Jane Doe");
    expect(text).toContain("Email: jane@example.com");
    expect(text).toContain("Subject: Frontend role at Acme");
    expect(text).toContain("Page: https://gentkrasniqi.dev/contact");
    expect(text).toContain("Sent: 21 Nov 2026, 10:30 (Kosovo time)");
    expect(text).toContain("Hi Gent,\n\nWe'd like to talk.");
  });

  it("escapes visitor input in the HTML version", () => {
    const { html } = buildContactEmail(message);

    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).toContain('href="mailto:jane@example.com"');
  });

  it("never links a non-http page URL", () => {
    const { html } = buildContactEmail({
      ...message,
      pageUrl: "javascript:alert(1)",
    });

    expect(html).not.toContain('href="javascript:');
  });
});

describe("buildConfirmationEmail", () => {
  it("promises a reply window without echoing anything the visitor typed", () => {
    const { subject, text, html } = buildConfirmationEmail();

    expect(subject).toBe("Thanks for your message");
    expect(text).toContain("within 24–48 hours");
    expect(html).toContain("within 24–48 hours");
  });
});
