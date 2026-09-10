/**
 * Thin analytics layer.
 *
 * Every call is a no-op when no measurement ID is configured, so the site
 * never breaks — and never throws — on an unconfigured deployment.
 * Nothing here sends personal data: only event names and coarse labels.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackEvent =
  | "cta_quote_click"
  | "phone_click"
  | "email_click"
  | "whatsapp_click"
  | "form_start"
  | "form_submit_success"
  | "form_validation_error";

/**
 * Push an event to the dataLayer (GTM) and/or gtag (GA4).
 *
 * `params` must never carry a name, email address, phone number or message
 * body — only field names, service slugs and similar non-identifying labels.
 */
export function track(
  event: TrackEvent,
  params: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === "undefined") return;

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}

/** Field names only — never the values the user typed. */
export function trackValidationErrors(fields: string[]): void {
  if (fields.length === 0) return;
  track("form_validation_error", {
    fields: fields.join(","),
    field_count: fields.length,
  });
}
