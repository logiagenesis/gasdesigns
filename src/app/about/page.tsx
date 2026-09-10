import Link from "next/link";

import { CtaBand, SectionHead } from "@/components/Sections";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PROCESS, SAFETY_POINTS } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Gas Designs",
  description:
    "How Gas Designs approaches gas installation work — sizing against real load, isolation you can reach, testing that is recorded, and scope stated honestly.",
  path: "/about",
});

/**
 * About page.
 *
 * Written entirely around approach rather than history. No founding year, no
 * years-of-experience claim, no team bios, no project history and no reference
 * to any previous or related business — none of it has been confirmed by the
 * client, and a partnership split makes an unverified history statement a
 * legal risk as well as an accuracy one. See docs/missing-client-info.md.
 */
export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">About</span>
          </nav>
          <p className="t-label">About</p>
          <h1 className="t-display" style={{ marginTop: 14 }}>
            A gas contractor that writes things down
          </h1>
          <p className="t-body measure-wide" style={{ marginTop: 18 }}>
            Gas Designs plans, installs and maintains LPG and natural gas systems
            for homes, commercial kitchens and industrial sites. The work is
            unglamorous and the standards are not negotiable — which is roughly
            how we would like the business to be judged.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(2rem, 1rem + 3vw, 3rem)" }}>
        <div className="shell prose">
          <h2>What we are actually good at</h2>
          <p>
            Most gas problems are decided long before anything goes wrong. A line
            sized for average draw instead of simultaneous demand. An isolation
            valve behind a fixed unit. A pressure test that was watched and then
            forgotten. None of those show up on the day of installation; all of
            them show up later.
          </p>
          <p>
            So the effort goes into the parts nobody photographs: the load
            calculation, the route decision, the staging against your programme,
            and the test record that gets handed over at the end. That is the
            work. The pipe is the easy part.
          </p>

          <h2>How we quote</h2>
          <p>
            A quotation from us says what is <strong>not</strong> included as
            clearly as what is. If something is likely to change once a wall is
            open or a ceiling is up, it gets flagged before you sign rather than
            raised as a variation afterwards.
          </p>
          <p>
            If a job is not one we should be taking on — wrong discipline, wrong
            scale, wrong timing — we would rather say so early than learn it
            halfway through.
          </p>

          <h2>Where our scope ends</h2>
          <p>
            Regulated electrical work is carried out and certified by suitably
            qualified electrical personnel, not by us. We handle the basic
            electrical support attached to a gas installation — isolators,
            ignition circuits, interlock wiring — and coordinate with your
            electrician for everything beyond that.
          </p>
          <p>
            We would rather hand a piece of work across than stretch a scope to
            cover it.{" "}
            <Link href="/services/electrical-and-controls-support">
              More on that split
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHead
            label="Standing rules"
            title="Four things that do not flex"
            body="They apply to a single hob and to a distribution header equally."
          />
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

      <section className="section">
        <div className="shell">
          <SectionHead
            label="Working with us"
            title="What the process looks like"
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

      <CtaBand
        title="Put us on a job"
        body="Send the site details through. You will get a straight answer about scope, sequencing and cost."
      />

      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
    </>
  );
}
