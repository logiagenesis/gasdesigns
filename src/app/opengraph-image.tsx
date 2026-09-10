import { ImageResponse } from "next/og";

import { BRAND_LOCKUP, SITE_META } from "@/lib/site-config";

export const runtime = "nodejs";
export const alt = `${SITE_META.name} — ${SITE_META.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FLAME =
  "M3 -20.5C2.6 -15 6.6 -12.4 7.2 -8 7.8 -3.2 4.4 0.4 0 0.4 -4.4 0.4 -7.4 -3.2 -7 -7.8 -6.6 -12.4 -2 -14.2 -0.6 -19 0 -21.2 3.2 -22.4 3 -20.5Z";
const CORE =
  "M0.6 -10.6C2.4 -7.8 3.4 -6 3.4 -4.2 3.4 -1.6 1.9 0.2 0 0.2 -1.9 0.2 -3.4 -1.6 -3.4 -4.2 -3.4 -6.4 -1.6 -8 0.6 -10.6Z";

/**
 * Social card, drawn from the same mark geometry as the favicon and the logo
 * so the tab icon, the link preview and the site all read as one brand.
 *
 * Uses the system font stack rather than loading Space Grotesk: an OG image is
 * generated per request on first render, and a webfont fetch is one more thing
 * that can fail in a cold start.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #05070A 0%, #101820 55%, #1B2430 100%)",
          padding: "72px 80px",
        }}
      >
        {/* Mark */}
        <svg width="112" height="112" viewBox="0 0 64 64">
          <defs>
            <linearGradient
              id="ogChrome"
              x1="12"
              y1="14"
              x2="52"
              y2="58"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="0.45" stopColor="#C3D1E1" />
              <stop offset="1" stopColor="#7C8DA1" />
            </linearGradient>
            <linearGradient
              id="ogFlame"
              x1="0"
              y1="-21"
              x2="0"
              y2="1"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#FF6B35" />
            </linearGradient>
          </defs>
          <path
            d="M49.6 32.9A18 18 0 1 1 30.4 18.86"
            fill="none"
            stroke="url(#ogChrome)"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          <path
            d="M46.2 36.72H34"
            fill="none"
            stroke="#00AEEF"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          <g transform="translate(40.5 21.5) scale(0.8)">
            <path d={FLAME} fill="url(#ogFlame)" />
            <path d={CORE} fill="#6EE7F9" />
          </g>
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#F8FAFC",
            }}
          >
            {BRAND_LOCKUP.first}
            <span style={{ color: "#B8C7D9", marginLeft: 14 }}>
              {BRAND_LOCKUP.second}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#F8FAFC",
              marginTop: 26,
              maxWidth: 900,
              letterSpacing: "-0.02em",
            }}
          >
            Gas systems engineered, installed and proven.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 30,
            }}
          >
            <div style={{ display: "flex", width: 46, height: 3, background: "#FF6B35" }} />
            <div style={{ display: "flex", fontSize: 25, color: "#B8C7D9" }}>
              LPG &amp; natural gas · installation · maintenance · compliance
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
