import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The thank-you page and the form endpoint have nothing to index.
        disallow: ["/api/", "/contact/sent"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
