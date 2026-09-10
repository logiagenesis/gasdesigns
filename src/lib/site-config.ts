/**
 * Gas Designs — single source of truth for company facts.
 *
 * RULE: nothing in this file is published as a claim unless `confirmed: true`.
 * Components must call the helpers at the bottom (or check `.confirmed`)
 * rather than reading `.value` directly. Anything still pending is tracked in
 * `docs/missing-client-info.md`.
 *
 * Observed facts come from the live maintenance page at
 * https://www.gasdesigns.co.za/ and are marked as such. Nothing here is invented.
 */

export type Fact<T = string> = {
  value: T;
  /** true = cleared for publication. false = must not appear on the site. */
  confirmed: boolean;
  /** Where the value came from, or what is blocking confirmation. */
  note: string;
};

const env = (key: string): string => (process.env[key] ?? "").trim();

/* ------------------------------------------------------------------ *
 * Identity
 * ------------------------------------------------------------------ */

/**
 * Display name. The live maintenance page uses the one-word lockup
 * "GasDesigns"; the client brief uses "Gas Designs". Two-word form is used
 * for prose and metadata, one-word form is reserved for the logo lockup.
 * Final legal/trading name is pending — see docs/missing-client-info.md.
 */
export const BRAND_NAME = "Gas Designs";
export const BRAND_LOCKUP = { first: "GAS", second: "DESIGNS" } as const;

export const SITE_URL = (
  env("NEXT_PUBLIC_SITE_URL") || "https://www.gasdesigns.co.za"
).replace(/\/$/, "");

/* ------------------------------------------------------------------ *
 * Contact facts
 * ------------------------------------------------------------------ */

/** Confirmed: published on the live Gas Designs maintenance page. */
export const EMAIL: Fact = {
  value: env("NEXT_PUBLIC_BUSINESS_EMAIL") || "pierre@gasdesigns.co.za",
  confirmed: true,
  note: "Published on the live gasdesigns.co.za maintenance page.",
};

/**
 * PENDING. The number on the maintenance page (+27 61 039 7034) is also
 * published by DP Energies. Publishing it as a Gas Designs-only identity is a
 * brand and operations conflict until Pierre confirms it is his alone.
 * Set NEXT_PUBLIC_BUSINESS_PHONE to switch on click-to-call, the mobile call
 * bar and LocalBusiness schema.
 */
export const PHONE: Fact = {
  value: env("NEXT_PUBLIC_BUSINESS_PHONE"),
  confirmed: env("NEXT_PUBLIC_BUSINESS_PHONE").length > 0,
  note:
    "Observed on the maintenance page as +27 61 039 7034, but the same number " +
    "is published by DP Energies. Blocked until the client confirms sole use.",
};

/** PENDING — same conflict as PHONE. E.164 digits only, no + or spaces. */
export const WHATSAPP: Fact = {
  value: env("NEXT_PUBLIC_WHATSAPP_NUMBER"),
  confirmed: env("NEXT_PUBLIC_WHATSAPP_NUMBER").length > 0,
  note: "Blocked on the same shared-number question as PHONE.",
};

/** PENDING — no address has been supplied by the client. */
export const ADDRESS: Fact<{
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
}> = {
  value: {
    street: env("NEXT_PUBLIC_ADDRESS_STREET"),
    locality: env("NEXT_PUBLIC_ADDRESS_LOCALITY"),
    region: env("NEXT_PUBLIC_ADDRESS_REGION"),
    postalCode: env("NEXT_PUBLIC_ADDRESS_POSTAL_CODE"),
    country: "ZA",
  },
  confirmed:
    env("NEXT_PUBLIC_ADDRESS_STREET").length > 0 &&
    env("NEXT_PUBLIC_ADDRESS_LOCALITY").length > 0,
  note: "No physical address supplied. Required before LocalBusiness schema is emitted.",
};

/** PENDING — service area unknown. Do not name towns or provinces without this. */
export const AREA_SERVED: Fact<string[]> = {
  value: env("NEXT_PUBLIC_AREA_SERVED")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  confirmed: env("NEXT_PUBLIC_AREA_SERVED").trim().length > 0,
  note: "No service area supplied. Site copy stays geography-neutral until confirmed.",
};

/** PENDING — the brief's "24/7" line was lifted from DP Energies copy. */
export const OPENING_HOURS: Fact<string> = {
  value: env("NEXT_PUBLIC_OPENING_HOURS"),
  confirmed: env("NEXT_PUBLIC_OPENING_HOURS").trim().length > 0,
  note:
    "The 24/7 claim in the brief originates from DP Energies, not from the " +
    "client. Do not publish any availability claim until confirmed in writing.",
};

/** PENDING — no registration or trade-body numbers have been supplied. */
export const REGISTRATIONS: Fact<{ label: string; number: string }[]> = {
  value: [],
  confirmed: false,
  note:
    "SAQCC Gas, LPGSASA and company registration numbers are unknown. " +
    "Never render the words registered, licensed, certified or insured until supplied.",
};

/** PENDING — no founder bio, trading history or project photography supplied. */
export const COMPANY_STORY: Fact<{ foundedYear: string; bio: string }> = {
  value: { foundedYear: "", bio: "" },
  confirmed: false,
  note:
    "The live maintenance page carries a 2025 year mark, which is a page " +
    "footer date and not a founding year. Bio and history must come from the client.",
};

export const GOOGLE_MAPS_URL: Fact = {
  value: env("NEXT_PUBLIC_GOOGLE_MAPS_URL"),
  confirmed: env("NEXT_PUBLIC_GOOGLE_MAPS_URL").length > 0,
  note: "Google Business Profile not yet created or not supplied.",
};

/** PENDING — no social profiles supplied. Empty array emits no sameAs. */
export const SOCIAL_LINKS: Fact<{ label: string; href: string }[]> = {
  value: [],
  confirmed: false,
  note: "No verified social profiles supplied. Do not guess handles.",
};

/* ------------------------------------------------------------------ *
 * Analytics
 * ------------------------------------------------------------------ */

export const GA_ID = env("NEXT_PUBLIC_GA_ID");
export const GTM_ID = env("NEXT_PUBLIC_GTM_ID");
/** GTM is preferred. GA4 only loads directly when GTM is absent. */
export const USE_GTM = GTM_ID.length > 0;
export const USE_GA4_DIRECT = !USE_GTM && GA_ID.length > 0;

/* ------------------------------------------------------------------ *
 * Derived helpers — use these in components
 * ------------------------------------------------------------------ */

/** Digits-only form suitable for a tel: href. */
export const telHref = (): string | null =>
  PHONE.confirmed ? `tel:${PHONE.value.replace(/[^\d+]/g, "")}` : null;

export const whatsappHref = (): string | null =>
  WHATSAPP.confirmed
    ? `https://wa.me/${WHATSAPP.value.replace(/[^\d]/g, "")}`
    : null;

export const mailtoHref = (): string => `mailto:${EMAIL.value}`;

/**
 * LocalBusiness JSON-LD requires a real NAP. An empty-NAP LocalBusiness is
 * worse than none at all, so it is only emitted once phone AND area are known.
 */
export const canEmitLocalBusiness = (): boolean =>
  PHONE.confirmed && AREA_SERVED.confirmed;

export const SITE_META = {
  name: BRAND_NAME,
  /** Used as the default OG/Twitter description and the <title> suffix. */
  tagline: "Precision Gas Systems",
  description:
    "Gas Designs plans, installs and maintains LPG and natural gas systems for homes, commercial kitchens and industrial sites, with compliance support on every job.",
  locale: "en_ZA",
  twitterCard: "summary_large_image" as const,
};
