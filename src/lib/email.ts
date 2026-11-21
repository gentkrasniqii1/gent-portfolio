import { Resend } from "resend";
import { profile } from "@/data/profile";
import { SOCIAL_LINKS } from "@/lib/constants";
import type { ContactFormValues } from "@/lib/validations";

/** Display name used when CONTACT_FROM_EMAIL is a bare address. */
export const SENDER_NAME = `${profile.name} Portfolio`;

/** Timestamps in notifications use local time in Kosovo. */
const TIME_ZONE = "Europe/Belgrade";

function isConfiguredEmail(value: string | undefined): value is string {
  return (
    typeof value === "string" && value.length > 0 && !value.startsWith("[YOUR")
  );
}

export function getContactMailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !isConfiguredEmail(to) || !from) {
    return null;
  }

  return {
    apiKey,
    to,
    from: formatSender(from),
    /** Opt-in auto-reply to the visitor (CONTACT_SEND_CONFIRMATION=true). */
    sendConfirmation: process.env.CONTACT_SEND_CONFIRMATION?.trim() === "true",
  };
}

/** "contact@example.com" → "Gent Krasniqi Portfolio <contact@example.com>". */
export function formatSender(from: string, name = SENDER_NAME) {
  return from.includes("<") ? from : `${name} <${from}>`;
}

export type ContactMessage = Omit<ContactFormValues, "website"> & {
  /** Page the form was sent from (same-origin Referer). */
  pageUrl?: string;
  sentAt: Date;
};

type EmailContent = { subject: string; text: string; html: string };

/** Normalises line endings and trims; keeps line breaks for the body. */
function clean(value: string) {
  return value.replace(/\r\n?/g, "\n").trim();
}

/** Single-line value for headers such as the subject. */
function singleLine(value: string) {
  return clean(value).replace(/\s+/g, " ");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Only http(s) links make it into the email (never javascript: or data:). */
function safeHttpUrl(value: string | undefined) {
  return value && /^https?:\/\//i.test(value) ? value : undefined;
}

function formatTimestamp(date: Date) {
  const local = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: TIME_ZONE,
  }).format(date);
  return `${local} (Kosovo time)`;
}

/** Notification sent to CONTACT_TO_EMAIL for each message. */
export function buildContactEmail(message: ContactMessage): EmailContent {
  const name = singleLine(message.name);
  const email = singleLine(message.email);
  const subject = singleLine(message.subject);
  const body = clean(message.message);
  const pageUrl = message.pageUrl ?? "Not available";
  const sentAt = formatTimestamp(message.sentAt);

  const fields: Array<[label: string, value: string, href?: string]> = [
    ["Name", name],
    ["Email", email, `mailto:${email}`],
    ["Subject", subject],
    ["Page", pageUrl, safeHttpUrl(message.pageUrl)],
    ["Sent", sentAt],
  ];

  const text = [
    "New message from your portfolio",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    body,
    "",
    `Reply to this email to answer ${name} directly.`,
  ].join("\n");

  const rows = fields
    .map(([label, value, href]) => {
      const content = href
        ? `<a href="${escapeHtml(href)}" style="color:#0f766e">${escapeHtml(value)}</a>`
        : escapeHtml(value);
      return `<tr><td style="padding:6px 16px 6px 0;color:#5c6670;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#12181e">${content}</td></tr>`;
    })
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f2f3f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #d5d7d2;border-radius:12px;padding:24px">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#0f766e">Portfolio contact</p>
      <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;color:#12181e">${escapeHtml(subject)}</h1>
      <table cellpadding="0" cellspacing="0" role="presentation" style="font-size:14px;line-height:1.5;border-collapse:collapse">${rows}</table>
      <div style="margin-top:20px;padding:16px;background:#f2f3f1;border-radius:8px;font-size:15px;line-height:1.6;color:#12181e;white-space:pre-wrap">${escapeHtml(body)}</div>
      <p style="margin:20px 0 0;font-size:13px;color:#5c6670">Reply to this email to answer ${escapeHtml(name)} directly.</p>
    </div>
  </body>
</html>`;

  return {
    subject: `[Portfolio] ${subject} — ${name}`,
    text,
    html,
  };
}

/**
 * Short auto-reply to the visitor. It deliberately repeats nothing they typed,
 * so the form can't be used to send someone else arbitrary text.
 */
export function buildConfirmationEmail(): EmailContent {
  const lines = [
    "Thanks for getting in touch.",
    "",
    "I've received your message and I'll reply within 24–48 hours.",
    "",
    profile.name,
    profile.portfolioUrl,
  ];

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f2f3f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #d5d7d2;border-radius:12px;padding:24px;font-size:15px;line-height:1.6;color:#12181e">
      <p style="margin:0 0 12px">Thanks for getting in touch.</p>
      <p style="margin:0 0 20px">I've received your message and I'll reply within 24–48 hours.</p>
      <p style="margin:0">${escapeHtml(profile.name)}<br><a href="${escapeHtml(profile.portfolioUrl)}" style="color:#0f766e">${escapeHtml(profile.portfolioUrl.replace(/^https?:\/\//, ""))}</a></p>
    </div>
  </body>
</html>`;

  return {
    subject: "Thanks for your message",
    text: lines.join("\n"),
    html,
  };
}

/**
 * Sends the notification (reply-to set to the visitor) and, when enabled, a
 * confirmation to the visitor. A failed confirmation is logged but never
 * fails the request, because the message itself was delivered.
 */
export async function sendContactEmail(message: ContactMessage) {
  const config = getContactMailConfig();
  if (!config) {
    throw new Error("Contact email is not configured.");
  }

  const resend = new Resend(config.apiKey);
  const visitorEmail = singleLine(message.email);
  const notification = buildContactEmail(message);

  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: visitorEmail,
    ...notification,
  });

  if (error) {
    throw new Error(error.message || "Failed to send email.");
  }

  if (!config.sendConfirmation) return;

  try {
    const confirmation = await resend.emails.send({
      from: config.from,
      to: visitorEmail,
      replyTo: SOCIAL_LINKS.email,
      ...buildConfirmationEmail(),
    });
    if (confirmation.error) {
      console.error(
        "[contact] Confirmation not sent:",
        confirmation.error.message,
      );
    }
  } catch (confirmationError) {
    console.error("[contact] Confirmation not sent:", confirmationError);
  }
}
