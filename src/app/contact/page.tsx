import Link from "next/link";
import { Suspense } from "react";

import { ContactForm } from "@/components/ContactForm";
import { ContactLink } from "@/components/ContactLink";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  EMAIL,
  GOOGLE_MAPS_URL,
  PHONE,
  WHATSAPP,
  mailtoHref,
  telHref,
  whatsappHref,
} from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Quotes",
  description:
    "Request a gas installation, maintenance or compliance quote from Gas Designs. Tell us about the site and the appliances and we will come back with scope and price.",
  path: "/contact",
});

/**
 * Statically rendered.
 *
 * The `?service=` preselect is read inside <ContactForm /> with
 * useSearchParams rather than via the `searchParams` prop on purpose: taking
 * searchParams here would force dynamic rendering, and Next then streams the
 * page metadata into the body for React to hoist on the client — where a
 * crawler that does not run JavaScript never sees the description.
 */
export default function ContactPage() {
  const tel = telHref();
  const wa = whatsappHref();

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <p className="t-label">Contact</p>
          <h1 className="t-display" style={{ marginTop: 14 }}>
            Tell us about the site
          </h1>
          <p className="t-body measure-wide" style={{ marginTop: 18 }}>
            The more you can say about the appliances, the building and your
            timing, the closer the first number will be to the final one.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(3rem, 2rem + 5vw, 6rem)" }}>
        <div className="shell contact-layout">
          <aside className="contact-aside">
            <div className="contact-channel">
              <p className="t-label">Email</p>
              <strong>
                <ContactLink
                  href={mailtoHref()}
                  event="email_click"
                  location="contact_page"
                >
                  {EMAIL.value}
                </ContactLink>
              </strong>
            </div>

            {tel && (
              <div className="contact-channel">
                <p className="t-label">Phone</p>
                <strong>
                  <ContactLink
                    href={tel}
                    event="phone_click"
                    location="contact_page"
                  >
                    {PHONE.value}
                  </ContactLink>
                </strong>
              </div>
            )}

            {wa && (
              <div className="contact-channel">
                <p className="t-label">WhatsApp</p>
                <strong>
                  <ContactLink
                    href={wa}
                    event="whatsapp_click"
                    location="contact_page"
                    external
                  >
                    {WHATSAPP.value}
                  </ContactLink>
                </strong>
              </div>
            )}

            {GOOGLE_MAPS_URL.confirmed && (
              <div className="contact-channel">
                <p className="t-label">Find us</p>
                <strong>
                  <a
                    href={GOOGLE_MAPS_URL.value}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </strong>
              </div>
            )}

            <div className="caveat">
              <p className="t-label">If you smell gas</p>
              <p>
                Close the supply at the cylinder or main valve, open windows and
                doors, avoid light switches and naked flames, and leave the area
                before phoning anyone.
              </p>
            </div>
          </aside>

          {/* Suspense is required around a component using useSearchParams
              for this page to stay statically prerenderable. */}
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
    </>
  );
}
