import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Analytics, AnalyticsNoScript } from "@/components/Analytics";
import { BrandDefs } from "@/components/BrandDefs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileContactBar } from "@/components/MobileContactBar";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { SITE_META, SITE_URL } from "@/lib/site-config";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_META.name} — ${SITE_META.tagline}`,
    template: `%s | ${SITE_META.name}`,
  },
  description: SITE_META.description,
  applicationName: SITE_META.name,
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#05070A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-ZA"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <AnalyticsNoScript />
        <BrandDefs />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileContactBar />
        <OrganizationJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
