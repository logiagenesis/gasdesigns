"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

/**
 * The primary conversion button. Client-side only so the quote-click event
 * can be attributed to the section it was pressed in.
 */
export function QuoteCta({
  location,
  label = "Request a Quote",
  variant = "btn-primary",
}: {
  location: string;
  label?: string;
  variant?: "btn-primary" | "btn-flame" | "btn-ghost";
}) {
  return (
    <Link
      href="/contact"
      className={`btn ${variant}`}
      onClick={() => track("cta_quote_click", { location })}
    >
      {label}
    </Link>
  );
}
