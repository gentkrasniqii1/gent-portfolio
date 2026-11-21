import { NextResponse } from "next/server";
import { getContactMailConfig, sendContactEmail } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import {
  contactFormServerSchema,
  getFieldErrors,
  isHoneypotTripped,
} from "@/lib/validations";

export const runtime = "nodejs";

/** The page the form was sent from, if the Referer is this same site. */
function getSourcePage(request: Request) {
  const referer = request.headers.get("referer");
  if (!referer) return undefined;
  try {
    const source = new URL(referer);
    const target = new URL(request.url);
    const sameSite = source.host === target.host;
    return sameSite && /^https?:$/.test(source.protocol)
      ? source.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

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
    // Missing env vars are an operator problem; keep the details in the logs.
    console.error(
      "[contact] Not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
    );
    return NextResponse.json(
      {
        ok: false,
        error: "The contact form is unavailable right now.",
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
        error: "Please check the highlighted fields.",
        fieldErrors: getFieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const { website, ...payload } = parsed.data;

  if (isHoneypotTripped(website)) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactEmail({
      ...payload,
      pageUrl: getSourcePage(request),
      sentAt: new Date(),
    });
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
