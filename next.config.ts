import type { NextConfig } from "next";

/**
 * Two deploy targets from one tree.
 *
 *   npm run build          → Node server. API routes, security headers, SMTP.
 *   npm run build:static   → static export for GitHub Pages.
 *
 * The static target trades away things a static host cannot do. Those losses
 * are real and are documented in docs/deployment.md — do not quietly paper
 * over them here.
 */
const isStaticExport = process.env.NEXT_OUTPUT === "export";

/**
 * Serving from https://logiagenesis.github.io/gasdesigns means every asset and
 * internal link needs the /gasdesigns prefix. next/link, next/font and the
 * build's own asset URLs pick this up automatically; a raw <a href="/…"> would
 * not, which is why there are none left in src/.
 *
 * Set NEXT_PUBLIC_BASE_PATH="" when moving to a custom domain such as
 * gasdesigns.co.za, where the site sits at the root.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/**
 * Security headers.
 *
 * Only applied on the Node target. GitHub Pages serves no custom headers at
 * all, so a static deploy has no CSP, no HSTS and no frame protection — see
 * docs/deployment.md. Next warns loudly if these are declared alongside
 * `output: export`, so they are omitted there rather than left to be ignored.
 *
 * `'unsafe-inline'` on script-src is required by Next's inlined bootstrap and
 * by GTM's loader. `'unsafe-eval'` is deliberately absent.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com",
      "frame-src https://www.googletagmanager.com",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * `node.ts` is only a recognised route extension on the server target, which
   * is what keeps src/app/api/contact/route.node.ts out of the static export.
   * A POST handler cannot be statically exported, so including it would fail
   * the build outright.
   */
  pageExtensions: isStaticExport
    ? ["ts", "tsx"]
    : ["ts", "tsx", "node.ts", "node.tsx"],

  ...(isStaticExport
    ? {
        output: "export" as const,
        // Emits directory/index.html rather than page.html. Without it the
        // root route's RSC prefetch resolves to `<basePath>.txt`, which does
        // not exist, and every header logo link 404s in the background.
        trailingSlash: true,
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
        // No image optimiser exists on a static host.
        images: { unoptimized: true },
      }
    : {
        images: {
          // Everything on the site is vector today. When the client supplies
          // photography, add their CDN host here rather than disabling this.
          formats: ["image/avif", "image/webp"] as ("image/avif" | "image/webp")[],
        },
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
