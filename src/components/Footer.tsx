import Link from "next/link";

import { Logo } from "@/components/Logo";
import { ContactLink } from "@/components/ContactLink";
import { PUBLISHED_SERVICES } from "@/data/services";
import {
  BRAND_NAME,
  EMAIL,
  PHONE,
  SITE_META,
  WHATSAPP,
  mailtoHref,
  telHref,
  whatsappHref,
} from "@/lib/site-config";

export function Footer() {
  const tel = telHref();
  const wa = whatsappHref();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-col">
            <Logo size={38} />
            <p className="t-body measure" style={{ marginTop: 18 }}>
              {SITE_META.description}
            </p>
          </div>

          <div className="footer-col">
            <h2>Services</h2>
            <ul className="footer-list">
              {PUBLISHED_SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/services">All services</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>Contact</h2>
            <ul className="footer-list">
              <li>
                <ContactLink
                  href={mailtoHref()}
                  event="email_click"
                  location="footer"
                >
                  {EMAIL.value}
                </ContactLink>
              </li>
              {tel && (
                <li>
                  <ContactLink href={tel} event="phone_click" location="footer">
                    {PHONE.value}
                  </ContactLink>
                </li>
              )}
              {wa && (
                <li>
                  <ContactLink
                    href={wa}
                    event="whatsapp_click"
                    location="footer"
                    external
                  >
                    WhatsApp {WHATSAPP.value}
                  </ContactLink>
                </li>
              )}
              <li>
                <Link href="/contact">Request a quote</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="t-small" style={{ margin: 0 }}>
            © {year} {BRAND_NAME}. All rights reserved.
          </p>
          <nav className="footer-legal" aria-label="Legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
