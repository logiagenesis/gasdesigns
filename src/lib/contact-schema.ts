import { z } from "zod";

import { SITE_TYPES, URGENCY_TYPES } from "@/data/content";
import { PUBLISHED_SERVICES } from "@/data/services";

/**
 * Zod v4 compiles validators with `new Function` when it can, and probes for
 * that support with `Function("")`. Our Content-Security-Policy has no
 * 'unsafe-eval', so the probe throws — Zod catches it and falls back
 * correctly, but the attempt still logs a CSP violation in the browser.
 *
 * Opting out of the JIT removes the probe. The interpreted path is more than
 * fast enough for a contact form, and it keeps the CSP free of 'unsafe-eval'.
 */
z.config({ jitless: true });

const SERVICE_TITLES = PUBLISHED_SERVICES.map((s) => s.title) as [
  string,
  ...string[],
];

/**
 * One schema, used by both the browser and the API route.
 *
 * The client validates for feedback; the server validates because the client
 * cannot be trusted. Never relax this on the server side "because the form
 * already checks it".
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is too long."),

  company: z.string().trim().max(120, "That company name is too long.").optional(),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a contact number.")
    .max(24, "That number is too long.")
    .regex(
      /^[\d\s()+-]+$/,
      "Use digits, spaces and + ( ) - only.",
    ),

  email: z
    .string()
    .trim()
    .min(1, "Please enter an email address.")
    .max(160, "That email address is too long.")
    .pipe(z.email("That email address does not look right.")),

  location: z
    .string()
    .trim()
    .min(2, "Please tell us the suburb or town.")
    .max(120, "That location is too long."),

  service: z.enum(SERVICE_TITLES, {
    message: "Please choose the service you need.",
  }),

  siteType: z.enum(SITE_TYPES, { message: "Please choose a site type." }),

  urgency: z.enum(URGENCY_TYPES, { message: "Please choose what you need." }),

  message: z
    .string()
    .trim()
    .min(10, "A sentence or two about the job helps us quote it.")
    .max(3000, "Please keep this under 3000 characters."),

  consent: z.literal(true, {
    message: "Please confirm we may contact you about this enquiry.",
  }),

  /* --- Not user-facing --- */

  /** Honeypot. Bots fill it; humans never see it. Must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),

  pageUrl: z.string().max(500).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export const SERVICE_OPTIONS = SERVICE_TITLES;
