import nodemailer from "nodemailer";

import type { ContactData } from "./contact-schema";
import { BRAND_NAME } from "./site-config";

/**
 * SMTP delivery into the client's Google Workspace inbox.
 *
 * Workspace lead delivery is plain authenticated SMTP to CONTACT_TO_EMAIL —
 * there is no Gmail API integration and no service account, deliberately.
 * Credentials are read from the environment at call time and never logged.
 */

const cfg = () => ({
  host: process.env.SMTP_HOST ?? "",
  port: Number(process.env.SMTP_PORT ?? 587),
  user: process.env.SMTP_USER ?? "",
  pass: process.env.SMTP_PASS ?? "",
  from: process.env.SMTP_FROM ?? "",
  to: process.env.CONTACT_TO_EMAIL ?? "",
});

export function mailerConfigured(): boolean {
  const c = cfg();
  return Boolean(c.host && c.user && c.pass && c.from && c.to);
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

type LeadMeta = { pageUrl?: string; receivedAt: string };

function rows(data: ContactData, meta: LeadMeta): [string, string][] {
  const out: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company?.trim() || "—"],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Location", data.location],
    ["Service", data.service],
    ["Site type", data.siteType],
    ["Enquiry type", data.urgency],
    ["Page", meta.pageUrl || data.pageUrl || "—"],
    ["Received", meta.receivedAt],
  ];

  if (data.utmSource) out.push(["UTM source", data.utmSource]);
  if (data.utmMedium) out.push(["UTM medium", data.utmMedium]);
  if (data.utmCampaign) out.push(["UTM campaign", data.utmCampaign]);

  return out;
}

function buildHtml(data: ContactData, meta: LeadMeta): string {
  const cells = rows(data, meta)
    .map(
      ([k, v]) =>
        `<tr>
           <td style="padding:8px 14px 8px 0;color:#5A6B7D;font:500 12px/1.5 system-ui,sans-serif;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>
           <td style="padding:8px 0;color:#101820;font:400 14px/1.6 system-ui,sans-serif">${escapeHtml(v)}</td>
         </tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#f4f6f8;padding:24px">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;padding:28px;border:1px solid #e2e8f0">
    <p style="margin:0 0 4px;font:600 12px/1 system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#00AEEF">${escapeHtml(BRAND_NAME)}</p>
    <h1 style="margin:0 0 20px;font:600 20px/1.3 system-ui,sans-serif;color:#05070A">New website enquiry</h1>
    <table style="width:100%;border-collapse:collapse">${cells}</table>
    <h2 style="margin:24px 0 8px;font:600 13px/1.3 system-ui,sans-serif;color:#5A6B7D">Message</h2>
    <div style="white-space:pre-wrap;font:400 14px/1.7 system-ui,sans-serif;color:#101820;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px">${escapeHtml(data.message)}</div>
  </div></body></html>`;
}

function buildText(data: ContactData, meta: LeadMeta): string {
  const lines = rows(data, meta).map(([k, v]) => `${k}: ${v}`);
  return [
    `New website enquiry — ${BRAND_NAME}`,
    "",
    ...lines,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

export async function sendLeadEmail(
  data: ContactData,
  meta: LeadMeta,
): Promise<void> {
  const c = cfg();

  const transport = nodemailer.createTransport({
    host: c.host,
    port: c.port,
    // 465 is implicit TLS; 587 upgrades via STARTTLS.
    secure: c.port === 465,
    auth: { user: c.user, pass: c.pass },
  });

  await transport.sendMail({
    from: c.from,
    to: c.to,
    // Replying in the inbox goes straight back to the enquirer.
    replyTo: `${data.name} <${data.email}>`,
    subject: `${data.urgency}: ${data.service} — ${data.name} (${data.location})`,
    text: buildText(data, meta),
    html: buildHtml(data, meta),
  });
}
