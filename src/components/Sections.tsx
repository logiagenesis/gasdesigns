import Link from "next/link";

import { QuoteCta } from "@/components/QuoteCta";
import {
  BUILD_STANDARDS,
  FAQS,
  PROCESS,
  SAFETY_POINTS,
  SECTORS,
} from "@/data/content";

/** Reusable section heading. */
export function SectionHead({
  label,
  title,
  body,
  action,
  id,
}: {
  label: string;
  title: string;
  body?: string;
  action?: React.ReactNode;
  /** Applied to the visible <h2> so sections can be labelled by it directly. */
  id?: string;
}) {
  return (
    <header className="section-head" data-split={action ? "true" : undefined}>
      <div>
        <p className="t-label">{label}</p>
        <h2 className="t-h2" id={id} style={{ marginTop: 14 }}>
          {title}
        </h2>
        {body && (
          <p className="t-body measure-wide" style={{ marginTop: 16 }}>
            {body}
          </p>
        )}
      </div>
      {action}
    </header>
  );
}

/**
 * Commitments, not credentials.
 *
 * Deliberately contains no certification badges, membership logos or
 * registration numbers — none have been supplied by the client, and inventing
 * them would be both a lie and a liability.
 */
const TRUST = [
  {
    label: "Quoting",
    title: "Exclusions stated up front",
    body: "A quotation names what is not included, so the scope is clear before anyone starts.",
  },
  {
    label: "Handover",
    title: "Tested, then recorded",
    body: "Pressure and soundness results are written down and handed over with the installation.",
  },
  {
    label: "Scope",
    title: "The right trade for the work",
    body: "Regulated electrical work goes to suitably qualified electrical personnel, not around them.",
  },
  {
    label: "Claims",
    title: "Confirmed in writing",
    body: "Certification and availability are confirmed directly, in writing, before you commit.",
  },
];

export function TrustStrip() {
  return (
    <section aria-labelledby="trust-title">
      <h2 id="trust-title" className="sr-only">
        How we work
      </h2>
      <div className="trust-strip">
        {TRUST.map((t) => (
          <div className="trust-item" key={t.title}>
            <p className="t-label">{t.label}</p>
            <h3 className="t-h4">{t.title}</h3>
            <p className="t-small">{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Sectors() {
  return (
    <section className="section" aria-labelledby="sectors-title">
      <div className="shell">
        <SectionHead
          label="Where we work"
          title="Sites we build for"
          body="The same discipline scales from a single hob to a distribution header. What changes is the sequencing, the isolation strategy and how much of the work has to happen out of hours."
          id="sectors-title"
        />
        <div className="sector-grid">
          {SECTORS.map((s) => (
            <div className="sector-card" key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section" aria-labelledby="process-title">
      <div className="shell">
        <SectionHead
          label="How a job runs"
          title="Six steps, in this order"
          body="No stage gets skipped to save a day. The expensive mistakes on a gas installation are all made before the pipe goes in."
          id="process-title"
        />
        <ol className="process-list">
          {PROCESS.map((step) => (
            <li className="process-step" key={step.index}>
              <span className="process-index">{step.index}</span>
              <h3 className="t-h4">{step.title}</h3>
              <p className="t-small" style={{ color: "var(--text-secondary)" }}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Safety() {
  return (
    <section className="section" aria-labelledby="safety-title">
      <div className="shell safety-wrap">
        <div>
          <p className="t-label">Safety &amp; compliance</p>
          <h2 className="t-h2" id="safety-title" style={{ marginTop: 14 }}>
            The part that is not negotiable
          </h2>
          <p className="t-body measure" style={{ marginTop: 18 }}>
            Gas is unforgiving of shortcuts, and most failures trace back to a
            decision made long before the fault appeared — a line sized for
            average draw, an isolation valve nobody can reach, a test that was
            watched but never written down.
          </p>
          <p className="t-body measure" style={{ marginTop: 14 }}>
            These four rules apply to every job we take, at every size.
          </p>
        </div>

        <ul className="safety-list">
          {SAFETY_POINTS.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Replaces a project gallery.
 *
 * The client has supplied no photography and no case studies, so this section
 * shows how work is built rather than claiming specific past jobs. Do not swap
 * this for stock photography — see docs/missing-client-info.md.
 */
export function Standards() {
  return (
    <section className="section" aria-labelledby="standards-title">
      <div className="shell">
        <div className="standards-panel glass">
          <div className="blueprint" aria-hidden="true" />
          <p className="t-label">Build standard</p>
          <h2 className="t-h2" id="standards-title" style={{ marginTop: 14 }}>
            What every installation gets
          </h2>
          <p className="t-body measure-wide" style={{ marginTop: 16 }}>
            The specification does not drop when the job is small. Materials,
            staging, isolation and testing follow the same standard whether it is
            one appliance or a full distribution header.
          </p>

          <dl className="standards-grid">
            {BUILD_STANDARDS.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="shell">
        <SectionHead
          label="Questions"
          title="Straight answers"
          body="If the answer to your question depends on your site, we will say so rather than guess."
          id="faq-title"
        />
        <div className="faq-list">
          {FAQS.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}</summary>
              <p className="faq-answer">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Tell us about the site",
  body = "Send through the appliances, the building and roughly when you need it done. You will get a straight answer on whether it is a job we should be quoting.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="section">
      <div className="shell">
        <div className="cta-band glass edge-specular">
          <p className="t-label">Next step</p>
          <h2 className="t-h2">{title}</h2>
          <p className="t-body measure-wide">{body}</p>
          <div className="cta-actions">
            <QuoteCta location="cta_band" />
            <Link href="/services" className="btn btn-ghost">
              Browse services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
