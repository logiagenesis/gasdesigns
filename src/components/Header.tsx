"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/nav";
import { track } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Solidify the header background once the page has scrolled past the hero lip.
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu; body scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header" data-stuck={stuck}>
      <div className="shell header-inner">
        {/* No aria-label: the lockup's own "GAS DESIGNS" text is the
            accessible name, and an added label would not match it. */}
        <Link href="/">
          <Logo size={36} />
        </Link>

        <nav className="nav-desktop" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={isCurrent(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link
            href="/contact"
            className="btn btn-primary header-cta"
            onClick={() => track("cta_quote_click", { location: "header" })}
          >
            Request a Quote
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <nav className="nav-mobile" id="mobile-nav" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn btn-primary"
            onClick={() => track("cta_quote_click", { location: "mobile_menu" })}
          >
            Request a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
