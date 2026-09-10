import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { BRAND_NAME, EMAIL, USE_GA4_DIRECT, USE_GTM } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Gas Designs collects, uses and stores the information you send through this website, written with South Africa's POPIA in mind.",
  path: "/privacy-policy",
});

const analyticsEnabled = USE_GTM || USE_GA4_DIRECT;

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Privacy Policy</span>
          </nav>
          <h1 className="t-display">Privacy Policy</h1>
          <p className="t-small" style={{ marginTop: 14 }}>
            Applies to this website only.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(3rem, 2rem + 4vw, 5rem)" }}>
        <div className="shell prose">
          <div className="caveat">
            <p className="t-label">Review required</p>
            <p>
              This policy describes what this website actually does. It has not
              been reviewed by a legal practitioner, and it does not yet name the
              responsible party&apos;s registered details or an information
              officer. Both are required before launch — see{" "}
              <code>docs/missing-client-info.md</code>.
            </p>
          </div>

          <h2>What this policy covers</h2>
          <p>
            This policy explains what {BRAND_NAME} does with the information you
            send through this website. It is written with the Protection of
            Personal Information Act 4 of 2013 (POPIA) in mind.
          </p>

          <h2>Information you give us</h2>
          <p>
            The enquiry form asks for your name, an optional company name, a
            phone number, an email address, the suburb or town of the site, the
            service you need, the site type, the kind of enquiry, and whatever
            you write in the message field.
          </p>
          <p>
            We ask for these because we cannot quote gas work without them. If
            you would rather not use the form, email us at{" "}
            <a href={`mailto:${EMAIL.value}`}>{EMAIL.value}</a> instead.
          </p>

          <h2>Information collected automatically</h2>
          {analyticsEnabled ? (
            <>
              <p>
                This site uses Google Analytics and/or Google Tag Manager to
                understand how visitors move through the pages. That involves
                cookies and similar identifiers, and it records things like the
                pages you view, roughly where you are, and which site referred
                you.
              </p>
              <p>
                We also record when someone starts the enquiry form, submits it
                successfully, or clicks a phone, email or WhatsApp link. Those
                events carry the name of the field or button only — never the
                contents of what you typed.
              </p>
            </>
          ) : (
            <>
              <p>
                No analytics or tracking service is currently active on this
                site. No advertising or tracking cookies are set.
              </p>
              <p>
                If analytics is switched on later, this section will be updated
                to describe it before it goes live.
              </p>
            </>
          )}
          <p>
            Our hosting provider keeps standard server logs, including IP
            addresses, for security and abuse prevention. We also apply a
            short-lived rate limit to form submissions, which briefly records the
            requesting IP address in memory.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry and prepare a quotation.</li>
            <li>To arrange and carry out work you ask us to do.</li>
            <li>To keep records of work performed and tests carried out.</li>
            <li>To keep this website working and defend it from abuse.</li>
          </ul>
          <p>
            We do not sell your information. We do not use it for unrelated
            marketing, and we do not add you to a mailing list from an enquiry.
          </p>

          <h2>Who else sees it</h2>
          <p>
            Enquiries are delivered by email to our own inbox, which is hosted by
            our email provider. Where a job requires a supplier or another trade —
            an electrician, for example — we share only what that person needs to
            do their part. We may also disclose information where the law
            requires it.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries that do not become work are kept only as long as they are
            useful for following up. Records relating to work actually carried
            out are kept longer, because installation and test records need to
            remain available. Ask us and we will tell you what we hold.
          </p>

          <h2>Your rights under POPIA</h2>
          <p>
            You may ask what personal information we hold about you, ask us to
            correct it, ask us to delete it where we are not required to keep it,
            and object to how we are using it. Email{" "}
            <a href={`mailto:${EMAIL.value}`}>{EMAIL.value}</a> and we will
            respond.
          </p>
          <p>
            You may also complain to the Information Regulator of South Africa if
            you are not satisfied with how we have handled your information.
          </p>

          <h2>Cookies</h2>
          <p>
            {analyticsEnabled
              ? "Analytics cookies are set by Google when those services are active. You can block or delete cookies in your browser settings; the site will still work."
              : "This site does not set advertising or tracking cookies. Your browser may store standard technical data required for the page to load."}
          </p>

          <h2>Changes</h2>
          <p>
            If this policy changes, the updated version will be published on this
            page.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy go to{" "}
            <a href={`mailto:${EMAIL.value}`}>{EMAIL.value}</a>.
          </p>
        </div>
      </section>

      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]}
      />
    </>
  );
}
