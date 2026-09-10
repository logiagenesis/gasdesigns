import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { BRAND_NAME, EMAIL } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms that apply to using the Gas Designs website, and how they relate to a quotation or contract for work.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Terms</span>
          </nav>
          <h1 className="t-display">Terms of Use</h1>
          <p className="t-small" style={{ marginTop: 14 }}>
            These terms cover the website. They are not the terms of a contract
            for work.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(3rem, 2rem + 4vw, 5rem)" }}>
        <div className="shell prose">
          <div className="caveat">
            <p className="t-label">Review required</p>
            <p>
              These terms are a starting point covering website use only. They
              do not include trading terms, payment terms, warranty terms or
              limitation of liability for installation work, and they do not name
              the contracting entity. A legal practitioner should review and
              extend them before launch.
            </p>
          </div>

          <h2>Using this site</h2>
          <p>
            By using this website you accept these terms. If you do not accept
            them, please do not use the site.
          </p>

          <h2>What the content is for</h2>
          <p>
            The pages here describe the kinds of work {BRAND_NAME} does. They are
            general information, not technical advice for your specific
            installation, and they are not an offer capable of acceptance.
          </p>
          <p>
            Gas work depends on the site. Nothing on this website should be used
            as a substitute for an assessment of your actual installation by a
            competent person.
          </p>

          <h2>Quotations and pricing</h2>
          <p>
            No price appears on this website. A quotation only exists once we have
            issued it in writing, and the scope, exclusions and validity stated in
            that quotation take precedence over anything described here.
          </p>

          <h2>Enquiries</h2>
          <p>
            Sending an enquiry does not create a contract and does not reserve a
            date. Work begins once a written quotation has been accepted.
          </p>

          <h2>Safety information</h2>
          <p>
            Any safety guidance on this site is general. In a suspected gas
            emergency, make the area safe and leave it before contacting anyone.
            Do not rely on this website during an emergency.
          </p>

          <h2>Accuracy and availability</h2>
          <p>
            We keep this site as accurate as we can, but we do not warrant that it
            is complete or current at any given moment, and we may change it
            without notice. We do not guarantee uninterrupted availability.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The text, layout, brand marks, icons and illustrations on this site
            belong to {BRAND_NAME} and may not be reproduced without permission.
          </p>

          <h2>External links</h2>
          <p>
            Where this site links elsewhere, we are not responsible for the
            content or the practices of that other site.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the Republic of South Africa.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms go to{" "}
            <a href={`mailto:${EMAIL.value}`}>{EMAIL.value}</a>.
          </p>
        </div>
      </section>

      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
      />
    </>
  );
}
