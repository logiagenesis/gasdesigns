"use client";

import { track } from "@/lib/analytics";
import type { TrackEvent } from "@/lib/analytics";

/** A tel:, mailto: or wa.me link that reports the click to analytics. */
export function ContactLink({
  href,
  event,
  location,
  external = false,
  className,
  children,
}: {
  href: string;
  event: TrackEvent;
  location: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => track(event, { location })}
    >
      {children}
    </a>
  );
}
