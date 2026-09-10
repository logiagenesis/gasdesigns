import Link from "next/link";
import { notFound } from "next/navigation";

import { QuoteCta } from "@/components/QuoteCta";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CtaBand } from "@/components/Sections";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { PUBLISHED_SERVICES, getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

/** All nine detail pages are statically generated — not "if practical". */
export function generateStaticParams() {
  return PUBLISHED_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  // Pending-scope services are not published, so they 404 rather than render.
  if (!service || service.offered !== "confirmed") notFound();

  const others = PUBLISHED_SERVICES.filter((s) => s.slug !== service.slug).slice(
    0,
    5,
  );

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>

          <span className="service-hero-icon" aria-hidden="true">
            <ServiceIcon name={service.icon} size={30} />
          </span>

          <h1 className="t-display">{service.longTitle}</h1>
          <p className="t-body measure-wide" style={{ marginTop: 18 }}>
            {service.summary}
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(3rem, 2rem + 4vw, 5rem)" }}>
        <div className="shell service-layout">
          <div className="prose">
            {service.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            <h2>What the work covers</h2>
            <ul className="spec-list">
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>Worth knowing before you book</h2>
            <ul className="spec-list">
              {service.considerations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {service.disclaimer && (
              <div className="caveat">
                <p className="t-label">Please note</p>
                <p>{service.disclaimer}</p>
              </div>
            )}
          </div>

          <aside className="service-aside">
            <div className="glass" style={{ padding: 24, display: "grid", gap: 14 }}>
              <p className="t-label">Get it quoted</p>
              <p className="t-small" style={{ color: "var(--text-secondary)" }}>
                Send the site details and we will come back with scope, price and
                what is excluded.
              </p>
              <QuoteCta location={`service_${service.slug}`} />
            </div>

            <div>
              <p className="t-label" style={{ marginBottom: 12 }}>
                Other services
              </p>
              <ul className="related-list">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`}>
                      <span>{s.title}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title={`Need ${service.title.toLowerCase()}?`}
        body="Tell us about the site and the appliances involved. We will tell you what it takes and what it will cost."
      />

      <ServiceJsonLd
        name={service.longTitle}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      />
    </>
  );
}
