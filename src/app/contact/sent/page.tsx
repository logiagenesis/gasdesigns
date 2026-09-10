import Link from "next/link";

import { pageMetadata } from "@/lib/seo";

/**
 * Thank-you route.
 *
 * Exists as a distinct URL so a conversion can be counted on a pageview in
 * GA4 / GTM without depending on a JavaScript event firing. Not indexed.
 */
export const metadata = pageMetadata({
  title: "Enquiry sent",
  description: "Your enquiry has reached Gas Designs.",
  path: "/contact/sent",
  noIndex: true,
});

export default function ContactSentPage() {
  return (
    <section className="notfound">
      <div className="shell" style={{ display: "grid", gap: 18, justifyItems: "center" }}>
        <p className="t-label" style={{ color: "var(--safety-green)" }}>
          Enquiry sent
        </p>
        <h1 className="t-h2">That has reached us</h1>
        <p className="t-body measure" style={{ textAlign: "center" }}>
          We reply to every enquiry, including the ones we cannot take on. If it
          is urgent and you have not heard back, email us directly rather than
          waiting.
        </p>
        <div className="cta-actions">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/services" className="btn btn-ghost">
            Browse services
          </Link>
        </div>
      </div>
    </section>
  );
}
