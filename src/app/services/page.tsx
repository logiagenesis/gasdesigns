import Link from "next/link";

import { ServicesGrid } from "@/components/ServicesGrid";
import { CtaBand, Process } from "@/components/Sections";
import { BreadcrumbJsonLd, ServiceCatalogJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gas Installation Services",
  description:
    "The nine services Gas Designs delivers — residential and commercial gas installations, industrial distribution, bulk LPG, compliance support, maintenance, leak detection and controls.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Services</span>
          </nav>
          <p className="t-label">Services</p>
          <h1 className="t-display" style={{ marginTop: 14 }}>
            Everything we do, in nine buckets
          </h1>
          <p className="t-body measure-wide" style={{ marginTop: 18 }}>
            Each one links through to what is actually included, what it depends
            on, and the parts that need a decision from you before we can quote
            it properly.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="all-services-title"
        style={{ paddingBottom: "clamp(3rem, 2rem + 4vw, 5rem)" }}
      >
        <div className="shell">
          <h2 id="all-services-title" className="sr-only">
            All services
          </h2>
          <ServicesGrid />
        </div>
      </section>

      <Process />
      <CtaBand
        title="Not sure which one you need?"
        body="Describe the site and the appliances. We will tell you which of these applies, and say so plainly if it is not work we should be taking on."
      />

      <ServiceCatalogJsonLd />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
    </>
  );
}
