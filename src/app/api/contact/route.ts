import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { mailerConfigured, sendLeadEmail } from "@/lib/mailer";

export const runtime = "nodejs";
/** Never cached: every POST is a distinct lead. */
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32 * 1024;

export async function POST(request: Request): Promise<Response> {
  // 1. Rate limit before doing any work.
  const limit = rateLimit(clientKey(request.headers));
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many enquiries from this connection. Please try again shortly.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  // 2. Reject oversized or non-JSON bodies.
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "That message is too large." },
      { status: 413 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that submission." },
      { status: 400 },
    );
  }

  // 3. Validate server-side. The client already checked; that is not enough.
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, error: "Some details need checking.", fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // 4. Honeypot. Report success so a bot learns nothing from the response.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 5. Deliver.
  if (!mailerConfigured()) {
    // Missing SMTP config is a deployment fault, not a visitor's problem.
    console.error(
      "[contact] SMTP is not configured — lead was NOT delivered. " +
        "Set SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM and CONTACT_TO_EMAIL.",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send that just now. Please email us directly and we will pick it up.",
        ...(process.env.NODE_ENV !== "production"
          ? { devHint: "SMTP env vars are missing — see .env.example" }
          : {}),
      },
      { status: 503 },
    );
  }

  try {
    await sendLeadEmail(data, {
      pageUrl: data.pageUrl,
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Log the failure without echoing credentials or the visitor's details.
    console.error(
      "[contact] SMTP send failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send that just now. Please email us directly and we will pick it up.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

/** Anything other than POST is not a thing this endpoint does. */
export async function GET(): Promise<Response> {
  return NextResponse.json(
    { ok: false, error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
