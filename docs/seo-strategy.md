# SEO strategy

## What is built

| Item | Status |
|---|---|
| Unique title and meta description per route | Done — 15 routes |
| Canonical URLs | Done, on every page via `pageMetadata()` |
| Open Graph + Twitter cards | Done |
| OG image | Generated at `/opengraph-image`, 1200×630, from the brand mark |
| Structured heading hierarchy | Done — strictly sequential, verified |
| XML sitemap | `/sitemap.xml`, 15 URLs, excludes noindex routes |
| robots.txt | `/robots.txt`, disallows `/api/` and `/contact/sent` |
| JSON-LD | Organization, Service ×9, OfferCatalog, FAQPage, BreadcrumbList |
| Nine service detail pages | Statically generated, not "if practical" |
| 404 page | Done |
| Thank-you route | `/contact/sent`, noindex, for conversion tracking |
| Lighthouse SEO | **100** on every page tested |

### One non-obvious thing that was fixed

`/contact` was originally a **dynamic** route, because it read `searchParams` for
the `?service=` preselect. Next.js streams dynamic pages and emits the metadata
in the body for React to hoist on the client — so the meta description was
**not in `<head>`** in the served HTML. Any crawler that does not execute
JavaScript would have missed it, and Lighthouse scored it 91.

The preselect now reads via `useSearchParams()` inside the client component, the
page is statically rendered, the description is in `<head>`, and SEO is 100.

Worth remembering: **adding `searchParams` to a page silently costs you
crawlable metadata.** Check `curl <url> | grep -B2 '</head>'` after any change
that makes a route dynamic.

---

## Structured data

`src/components/JsonLd.tsx`.

### The LocalBusiness decision

**`LocalBusiness` is not emitted, on purpose.** It only switches on when a phone
number *and* an area served both exist — `canEmitLocalBusiness()` in
`src/lib/site-config.ts`. Until then the site emits `Organization` with only
facts it can stand behind: name, URL, logo, email, description.

An empty-NAP `LocalBusiness` is worse than none. It tells Google this is a local
business and then declines to say where or how to reach it, which is a weak
entity signal and can suppress the very local pack results it is meant to win.

The moment `NEXT_PUBLIC_BUSINESS_PHONE` and `NEXT_PUBLIC_AREA_SERVED` are set,
the `@type` flips to `LocalBusiness` and `telephone`, `areaServed`,
`openingHours` and `address` populate themselves. No code change.

### What is emitted now

- **Organization** — one node, `@id` `{SITE_URL}/#organization`, referenced by
  every Service node as `provider`. One entity, not fifteen.
- **Service** ×9 — one per detail page.
- **OfferCatalog** — the nine services on `/` and `/services`.
- **FAQPage** — the eight homepage questions.
- **BreadcrumbList** — every page below the root.

Deliberately absent: `aggregateRating` and `Review`. Gasify Gauteng publishes
4.9/100 reviews. Gas Designs has none, and inventing them is both a Google
policy violation and fraud.

---

## Keyword themes

Used naturally in headings, body and metadata. Not stuffed — see
`docs/competitor-audit.md` §2 for what stuffing looks like in this market, and
why it is beatable.

**Primary:** gas installations · LPG installations · natural gas installations ·
gas COC · gas certificate of compliance · gas leak detection · commercial kitchen
gas installation · industrial gas installation · bulk LPG installation · gas
maintenance · residential gas installation · gas safety inspections

**Long-tail already covered by service pages:** bulk LPG vessel siting · gas
manifold changeover · commercial kitchen gas isolation · gas reticulation for
developments · gas pressure testing · regulator maintenance · gas interlock
wiring

**Not yet targetable, and this is the biggest SEO gap:** every
`{service} in {location}` query. The site is geography-neutral because no service
area has been confirmed. This is not a technical limitation — it is item 3 in
`docs/missing-client-info.md`, and it is worth more traffic than every other
item on this page combined.

---

## Google readiness

**Analytics.** GTM loads only when `NEXT_PUBLIC_GTM_ID` is set; GA4 loads
directly only when `NEXT_PUBLIC_GA_ID` is set *and* GTM is not. With neither,
nothing loads — no empty script tags, no console errors, and the privacy policy
rewrites its own analytics section to say so.

**Events tracked** — `src/lib/analytics.ts`:

| Event | Fires on |
|---|---|
| `cta_quote_click` | Any quote CTA, with a `location` label |
| `phone_click` / `email_click` / `whatsapp_click` | Contact links, with `location` |
| `form_start` | First focus on any form field, once |
| `form_submit_success` | Successful submission, with the service chosen |
| `form_validation_error` | Field **names** only — never values |

No personal data reaches the dataLayer. Ever.

**Conversions.** Track the `/contact/sent` pageview as the primary conversion —
it does not depend on a JS event firing. `form_submit_success` is the secondary.

**Search Console.** Submit `https://www.gasdesigns.co.za/sitemap.xml` after
launch. Verify by DNS TXT rather than an HTML file, so it survives redeploys.

**Google Business Profile.** Not created — item 9. It is the single
highest-leverage local asset available and it is free. NAP must match the site
exactly, character for character.

---

## Before launch

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin. Canonicals, OG tags,
   sitemap and robots all derive from it, and getting it wrong poisons all four.
2. Decide `www` vs apex and 301 the other. Pick one and never serve both.
3. Force HTTPS. HSTS with preload is already set in `next.config.ts` — do not
   enable preload until you are certain about every subdomain.
4. Verify Search Console and submit the sitemap.
5. Create the Google Business Profile.
6. Re-check `/robots.txt` and `/sitemap.xml` on the production domain.
7. Confirm the OG image renders — paste the URL into Slack or WhatsApp and look.
8. Re-run Lighthouse against production, not localhost.

## After launch

- Watch Search Console coverage for the nine service pages specifically.
- Once the service area is confirmed, build `{service} in {area}` pages. That is
  where the volume is.
- Consider an indicative CoC price. Camp A publishes; Camp B hides. At the
  residential end, hiding costs enquiries.
