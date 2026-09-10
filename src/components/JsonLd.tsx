import {
  ADDRESS,
  AREA_SERVED,
  BRAND_NAME,
  EMAIL,
  OPENING_HOURS,
  PHONE,
  SITE_META,
  SITE_URL,
  SOCIAL_LINKS,
  canEmitLocalBusiness,
} from "@/lib/site-config";
import { PUBLISHED_SERVICES } from "@/data/services";
import { FAQS } from "@/data/content";

type Json = Record<string, unknown>;

function Ld({ data }: { data: Json }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is generated from site-config, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organisation-level structured data.
 *
 * LocalBusiness is deliberately withheld until a phone number and service area
 * are confirmed: a LocalBusiness node with an empty NAP is worse for search
 * than emitting none at all. Until then only facts we can stand behind — name,
 * URL, logo, email — are published, as an Organization.
 */
export function OrganizationJsonLd() {
  const contactPoint: Json = {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: EMAIL.value,
    ...(PHONE.confirmed ? { telephone: PHONE.value } : {}),
    availableLanguage: ["en"],
  };

  const base: Json = {
    "@context": "https://schema.org",
    "@type": canEmitLocalBusiness() ? "LocalBusiness" : "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    url: SITE_URL,
    description: SITE_META.description,
    logo: `${SITE_URL}/brand/gas-designs-logo-mark.svg`,
    image: `${SITE_URL}/opengraph-image`,
    email: EMAIL.value,
    contactPoint: [contactPoint],
  };

  if (PHONE.confirmed) base.telephone = PHONE.value;
  if (AREA_SERVED.confirmed) base.areaServed = AREA_SERVED.value;
  if (OPENING_HOURS.confirmed) base.openingHours = OPENING_HOURS.value;
  if (SOCIAL_LINKS.confirmed && SOCIAL_LINKS.value.length > 0) {
    base.sameAs = SOCIAL_LINKS.value.map((s) => s.href);
  }
  if (ADDRESS.confirmed) {
    base.address = {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.value.street,
      addressLocality: ADDRESS.value.locality,
      addressRegion: ADDRESS.value.region,
      postalCode: ADDRESS.value.postalCode,
      addressCountry: ADDRESS.value.country,
    };
  }

  return <Ld data={base} />;
}

/** The nine confirmed services as an OfferCatalog. */
export function ServiceCatalogJsonLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: `${BRAND_NAME} services`,
        url: `${SITE_URL}/services`,
        itemListElement: PUBLISHED_SERVICES.map((s, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: {
            "@type": "Service",
            name: s.longTitle,
            description: s.metaDescription,
            url: `${SITE_URL}/services/${s.slug}`,
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      }}
    />
  );
}

/** A single service. Provider references the organisation node by @id. */
export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `${SITE_URL}${path}`,
        serviceType: name,
        provider: { "@id": `${SITE_URL}/#organization` },
        ...(AREA_SERVED.confirmed ? { areaServed: AREA_SERVED.value } : {}),
      }}
    />
  );
}

export function FaqJsonLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.name,
          item: `${SITE_URL}${t.path === "/" ? "" : t.path}`,
        })),
      }}
    />
  );
}
