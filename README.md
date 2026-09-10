# Gas Designs

Marketing site for Gas Designs — LPG and natural gas installation, maintenance
and compliance.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in what you have; it runs with all of it blank
npm run dev                    # http://localhost:3000
```

```bash
npm run check          # lint + typecheck + build
npm run build && npm run start
npm test               # Playwright smoke tests against a production build

npm run build:static   # static export for GitHub Pages → out/
npm run serve:static   # serve out/ locally
```

Playwright needs a browser once: `npx playwright install chromium`.
On a machine that already has one, set `PLAYWRIGHT_CHROMIUM_PATH` instead.

---

## Read this before changing anything

| Document | What it covers |
|---|---|
| **[`docs/missing-client-info.md`](docs/missing-client-info.md)** | **Start here.** What the client still owes before launch, and what is switched off until it arrives. |
| [`docs/design-system.md`](docs/design-system.md) | Locked tokens, the grid contract, the card contract, motion budget |
| [`docs/brand-guide.md`](docs/brand-guide.md) | The mark, its construction rules, colour, type |
| [`docs/copywriter-pack.md`](docs/copywriter-pack.md) | All site copy, and what needs sign-off |
| [`docs/seo-strategy.md`](docs/seo-strategy.md) | What is implemented, and the launch checklist |
| [`docs/competitor-audit.md`](docs/competitor-audit.md) | Real market research, September 2026 |
| [`docs/content-strategy.md`](docs/content-strategy.md) | Content gaps, ranked |
| [`docs/design-opportunities.md`](docs/design-opportunities.md) | Where this site can pull ahead |
| [`docs/deployment.md`](docs/deployment.md) | Node host vs GitHub Pages, and what the static target gives up |

---

## The one rule

**Nothing is published as a claim unless it is confirmed.**

`src/lib/site-config.ts` holds every company fact with a `confirmed` flag. A fact
with `confirmed: false` does not render — not as a placeholder, not as "coming
soon", not at all. Components ask the helpers (`telHref()`, `whatsappHref()`,
`canEmitLocalBusiness()`) rather than reading `.value` directly.

This is enforced, not merely intended. `tests/smoke.spec.ts` fails the build if
"24/7", "SAQCC", "DP Energies" or the pending phone number appears on any page.

There is a reason for the strictness. This is a business emerging from a
partnership split, sharing a phone number with the other party, with no supplied
registration numbers. An invented certification is a legal problem, not a
copywriting one.

---

## Structure

```
src/
  app/
    layout.tsx              fonts, metadata, header/footer, analytics
    page.tsx                homepage
    services/               index + [slug] ×9 (statically generated)
    about/ contact/         contact/sent is noindex, for conversion tracking
    privacy-policy/ terms/
    api/contact/route.ts    validation, rate limit, SMTP
    sitemap.ts robots.ts opengraph-image.tsx icon.svg
  components/               Logo, Header, Hero, HeroScene, ServicesGrid,
                            ServiceIcon, Sections, ContactForm, Footer, JsonLd…
  data/services.ts          the nine services — throws if not exactly 9
  data/content.ts           sectors, process, safety, FAQs
  lib/site-config.ts        every company fact, with confirmed flags
  lib/contact-schema.ts     one Zod schema, client and server
  lib/mailer.ts             SMTP to the Workspace inbox
  lib/rate-limit.ts         in-memory, per-instance
public/brand/               six SVGs, wordmark outlined
tests/smoke.spec.ts         50 tests
```

---

## Things that will bite you

**The service grid is a contract.** Exactly nine cards; exactly 3×3 at ≥1024px.
Guarded in `src/data/services.ts` (throws), in CSS, and in tests. A tenth service
is a layout decision, not just a data one.

**Card summaries must fit two lines.** The `-webkit-line-clamp` is a backstop.
If you see an ellipsis, shorten the copy.

**Adding `searchParams` to a page makes it dynamic — and moves its meta
description out of `<head>`.** Next streams metadata into the body for React to
hoist client-side, so non-JS crawlers never see it. `/contact` was fixed by
reading the query with `useSearchParams()` in the client component instead. Check
with `curl <url> | grep -B2 '</head>'`.

**The CSP has no `'unsafe-eval'`.** Zod v4 probes for JIT support with
`new Function`, which trips it — hence `z.config({ jitless: true })` in
`contact-schema.ts`. If a new dependency needs eval, fix the dependency rather
than widening the policy.

**Rate limiting is in-memory**, so it resets on cold start and is per-instance.
Enough to blunt a naive flood, not a substitute for a shared store. If real abuse
starts, swap `src/lib/rate-limit.ts` for Upstash or Redis — the call signature is
designed so only that file changes.

**Never hard-code a colour.** If it is not a token in `globals.css`, it does not
belong in the design.

**`src/app/api/contact/route.node.ts` is named that way on purpose.**
`pageExtensions` only treats `node.ts` as a route extension on the Node target,
which is what keeps this POST handler out of the static export. Rename it to
`route.ts` and `npm run build:static` fails.

**`public/.nojekyll` is an empty file and load-bearing.** GitHub Pages runs
Jekyll, which drops directories starting with an underscore — without it,
`_next/` vanishes and the site deploys with no CSS or JavaScript.

---

## Deploying

Two targets — see [`docs/deployment.md`](docs/deployment.md) for the full
picture, including what the static target gives up.

**GitHub Pages** (`.github/workflows/deploy-pages.yml`, on push to `main`)
publishes to https://logiagenesis.github.io/gasdesigns. Requires
Settings → Pages → Source → "GitHub Actions" once. It has no server, so the
enquiry form posts to an external service via the `NEXT_PUBLIC_FORM_ENDPOINT`
secret — and shows a visible "not connected" notice if that is unset. **A
static host serves no custom headers, so the CSP and HSTS below do not apply
there.**

**Node host** — any host that runs Next 15. Vercel needs no configuration.

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin — canonicals, OG tags,
   the sitemap and robots all derive from it.
2. Set `CONTACT_TO_EMAIL` and `SMTP_*`, or **the enquiry form cannot deliver.**
   It fails loudly rather than silently: the visitor is told to email directly
   and the server logs the misconfiguration.
3. Google Workspace SMTP: `SMTP_USER` is the mailbox address and `SMTP_PASS` must
   be an **App Password**, not the account password.
4. Work the launch checklist in `docs/seo-strategy.md`.

`next.config.ts` sets HSTS, CSP, `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy` and `Permissions-Policy`. If your host adds its own, check they
do not conflict.

---

## Verified, not assumed

| | Desktop | Mobile (4× CPU throttle, slow 4G) | Static export |
|---|---|---|---|
| Lighthouse Performance | 100 | 95–96 | 99 |
| Accessibility | 100 | 100 | 100 |
| Best Practices | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 |

- axe-core: **0 violations**, WCAG 2.0/2.1 A and AA, across all 7 page types.
- Playwright: **50 tests passing**.
- No horizontal overflow at 360, 390, 768, 1024, 1440 or 1920px.
- `npm run lint` and `npm run typecheck` clean.

### Known

`npm audit` reports 2 advisories in `postcss`, reached only through Next's own
build toolchain. They are build-time, not runtime, and clearing them requires a
major bump to Next 16. Not worth it on a fresh build; revisit at the next planned
upgrade.
