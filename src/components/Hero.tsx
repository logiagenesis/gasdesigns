import Link from "next/link";

import { HeroScene } from "@/components/HeroScene";
import { QuoteCta } from "@/components/QuoteCta";

/**
 * Homepage hero.
 *
 * The stat strip carries scope facts rather than invented numbers — no
 * "500+ installations", no "20 years", nothing the client has not confirmed.
 */
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-floor" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="shell hero-inner">
        <div className="anim-rise" style={{ animationDelay: "60ms" }}>
          <span className="hero-eyebrow">
            <span className="dot" aria-hidden="true" />
            <span className="t-label" style={{ color: "var(--text-secondary)" }}>
              LPG &amp; Natural Gas Specialists
            </span>
          </span>

          <h1 className="t-display">
            Gas systems engineered, installed and{" "}
            <span className="accent">proven</span>.
          </h1>

          <p className="hero-sub">
            Installation, maintenance and compliance work for homes, commercial
            kitchens and industrial sites — sized against real load, pressure
            tested before handover, and documented so the readings are on record.
          </p>

          <div className="hero-actions">
            <QuoteCta location="hero" />
            <Link href="/services" className="btn btn-ghost">
              View Services
            </Link>
          </div>

          <ul className="hero-stats">
            <li>
              <dl>
                <dt>Scope</dt>
                <dd>Residential to industrial</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>Disciplines</dt>
                <dd>Install · Maintain · Comply</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>Handover</dt>
                <dd>Tested &amp; recorded</dd>
              </dl>
            </li>
          </ul>
        </div>

        <div className="anim-fade" style={{ animationDelay: "220ms" }}>
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
