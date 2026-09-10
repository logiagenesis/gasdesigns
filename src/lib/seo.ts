import type { Metadata } from "next";
import { SITE_META, SITE_URL } from "./site-config";

/**
 * Builds page metadata with a canonical URL, Open Graph and Twitter cards.
 * Every page must call this so no page ships without a canonical.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  /** Route path beginning with "/". */
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle =
    path === "/" ? `${SITE_META.name} — ${SITE_META.tagline}` : title;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_META.name,
      title: fullTitle,
      description,
      locale: SITE_META.locale,
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${SITE_META.name} — ${SITE_META.tagline}`,
        },
      ],
    },
    twitter: {
      card: SITE_META.twitterCard,
      title: fullTitle,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
