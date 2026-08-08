import { NextResponse } from "next/server";
import { getContactMailConfig, sendContactEmail } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { contactFormServerSchema, isHoneypotTripped } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, 5, 60_000);

  if (!limited.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please try again shortly.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limited.retryAfterSeconds),
        },
      },
    );
  }

  if (!getContactMailConfig()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Contact form is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.",
      },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = contactFormServerSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { website, ...payload } = parsed.data;

  if (isHoneypotTripped(website)) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactEmail(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send message.";
    console.error("[contact]", message);
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send your message right now. Please try again later.",
      },
      { status: 502 },
    );
  }
}
