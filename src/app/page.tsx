import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import {
  CtaBand,
  Faq,
  Process,
  Safety,
  SectionHead,
  Sectors,
  Standards,
  TrustStrip,
} from "@/components/Sections";
import { FaqJsonLd, ServiceCatalogJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SITE_META } from "@/lib/site-config";
import Link from "next/link";

export const metadata = pageMetadata({
  title: `${SITE_META.name} — ${SITE_META.tagline}`,
  description: SITE_META.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

      <section className="section" aria-labelledby="services-title">
        <div className="shell">
          <SectionHead
            label="What we do"
            title="Nine ways we work on gas"
            body="From a single appliance connection to a distribution header across a production floor. Every one of these is work we do ourselves."
            id="services-title"
            action={
              <Link href="/services" className="btn btn-ghost">
                All services
              </Link>
            }
          />
          <ServicesGrid />
        </div>
      </section>

      <Sectors />
      <Process />
      <Safety />
      <Standards />
      <Faq />
      <CtaBand />

      <ServiceCatalogJsonLd />
      <FaqJsonLd />
    </>
  );
}
