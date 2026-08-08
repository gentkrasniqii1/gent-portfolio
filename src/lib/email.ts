import { Resend } from "resend";
import type { ContactFormValues } from "@/lib/validations";

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

  return { apiKey, to, from };
}

function escapeText(value: string) {
  return value.replace(/\r\n/g, "\n").trim();
}

export async function sendContactEmail(
  payload: Omit<ContactFormValues, "website">,
) {
  const config = getContactMailConfig();
  if (!config) {
    throw new Error("Contact email is not configured.");
  }

  const resend = new Resend(config.apiKey);
  const name = escapeText(payload.name);
  const email = escapeText(payload.email);
  const subject = escapeText(payload.subject);
  const message = escapeText(payload.message);

  const text = [
    `New portfolio contact message`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    ``,
    message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text,
  });

  if (error) {
    throw new Error(error.message || "Failed to send email.");
  }
}
