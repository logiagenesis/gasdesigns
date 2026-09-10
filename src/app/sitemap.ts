import type { MetadataRoute } from "next";

/** Required for `output: export`: pins this route to build-time generation. */
export const dynamic = "force-static";

import { PUBLISHED_SERVICES } from "@/data/services";
import { SITE_URL } from "@/lib/site-config";

/**
 * A static export sets `trailingSlash`, so the pages actually live at
 * `/about/` and Next writes canonicals to match. The sitemap builds its URLs
 * by hand, so it has to agree — otherwise every entry points at a URL whose
 * canonical is a different string.
 */
const STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const href = (path: string): string => {
  if (path === "") return STATIC_EXPORT ? `${SITE_URL}/` : SITE_URL;
  return STATIC_EXPORT ? `${SITE_URL}${path}/` : `${SITE_URL}${path}`;
};

/**
 * XML sitemap. Only indexable routes appear — /contact/sent is noindex and is
 * deliberately excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: href(""), changeFrequency: "monthly", priority: 1 },
    { url: href("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: href("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: href("/contact"), changeFrequency: "yearly", priority: 0.8 },
    { url: href("/privacy-policy"), changeFrequency: "yearly", priority: 0.2 },
    { url: href("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = PUBLISHED_SERVICES.map((s) => ({
    url: href(`/services/${s.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    ...route,
    lastModified: now,
  }));
}
