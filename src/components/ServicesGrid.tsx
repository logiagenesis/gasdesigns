import Link from "next/link";

import { ServiceIcon } from "@/components/ServiceIcon";
import { PUBLISHED_SERVICES } from "@/data/services";

function Arrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * The nine service cards.
 *
 * The 3 x 3 desktop layout is a hard contract — see `.grid-9` in globals.css
 * and the count guard in src/data/services.ts. Cards share one height per row
 * because the grid rows are `1fr`, not because of a magic pixel value.
 */
export function ServicesGrid() {
  return (
    <ul className="grid-9" style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {PUBLISHED_SERVICES.map((service) => (
        <li key={service.slug} className="card-3d">
          <span className="card-icon" aria-hidden="true">
            <ServiceIcon name={service.icon} />
          </span>

          <h3 className="t-h4 card-title">
            <Link href={`/services/${service.slug}`} className="card-link">
              {service.title}
            </Link>
          </h3>

          <p className="card-summary">{service.summary}</p>

          <ul className="card-bullets">
            {service.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <span className="card-cta" aria-hidden="true">
            Read more <Arrow />
          </span>
        </li>
      ))}
    </ul>
  );
}
