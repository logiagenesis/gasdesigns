"use client";

import Link from "next/link";
import {
  PHONE,
  WHATSAPP,
  mailtoHref,
  telHref,
  whatsappHref,
} from "@/lib/site-config";
import { track } from "@/lib/analytics";
import type { TrackEvent } from "@/lib/analytics";

/**
 * Sticky mobile contact bar.
 *
 * Phone and WhatsApp only appear once those numbers are confirmed in
 * site-config — an unconfirmed number is never published. Email is always
 * available, so the bar always offers at least one real way to make contact.
 */
export function MobileContactBar() {
  const tel = telHref();
  const wa = whatsappHref();

  type Item = {
    href: string;
    label: string;
    tone?: "cyan" | "green";
    event: TrackEvent;
    external?: boolean;
  };

  const items: Item[] = [];

  if (tel) {
    items.push({ href: tel, label: "Call", tone: "cyan", event: "phone_click" });
  }
  if (wa) {
    items.push({
      href: wa,
      label: "WhatsApp",
      tone: "green",
      event: "whatsapp_click",
      external: true,
    });
  }
  // Email stands in as the primary channel while the phone number is pending.
  if (!PHONE.confirmed && !WHATSAPP.confirmed) {
    items.push({
      href: mailtoHref(),
      label: "Email",
      tone: "cyan",
      event: "email_click",
    });
  }

  return (
    <div className="contact-bar">
      {items.slice(0, 2).map((item) => (
        <a
          key={item.label}
          href={item.href}
          data-tone={item.tone}
          {...(item.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          onClick={() => track(item.event, { location: "mobile_bar" })}
        >
          {item.label}
        </a>
      ))}
      <Link
        href="/contact"
        onClick={() => track("cta_quote_click", { location: "mobile_bar" })}
      >
        Get a quote
      </Link>
    </div>
  );
}