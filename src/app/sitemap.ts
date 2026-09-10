import type { MetadataRoute } from "next";

import { PUBLISHED_SERVICES } from "@/data/services";
import { SITE_URL } from "@/lib/site-config";

/**
 * XML sitemap. Only indexable routes appear — /contact/sent is noindex and is
 * deliberately excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.8 },
    {
      url: `${SITE_URL}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = PUBLISHED_SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    ...route,
    lastModified: now,
  }));
}
