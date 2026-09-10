# Deployment

Two targets, one codebase.

| | Node host | GitHub Pages |
|---|---|---|
| Command | `npm run build` → `npm run start` | `npm run build:static` |
| Output | `.next/` server | `out/` static files |
| Enquiry form | Own API route: server-side validation, rate limiting, SMTP | External form service |
| Security headers | CSP, HSTS, frame options | **None** |
| URLs | `/about` | `/about/` |

Which is chosen is driven by `NEXT_OUTPUT=export` in `next.config.ts`. Nothing
else in the codebase branches on it beyond the three places noted below.

---

## GitHub Pages

Live at **https://logiagenesis.github.io/gasdesigns**, published by
`.github/workflows/deploy-pages.yml` on every push to `main`.

### One-time setup

1. **Settings → Pages → Build and deployment → Source → "GitHub Actions".**
   Without this the workflow builds successfully and then fails to publish.
2. Optional but recommended: add the form endpoint secret (below).
3. Push to `main`, or run the workflow manually from the Actions tab.

### What the workflow does

Lints, typechecks, builds the export, then verifies the output before it will
publish anything: index and 404 pages present, sitemap and robots present,
`.nojekyll` present, built assets present, exactly nine service pages, and the
base path actually baked into the asset URLs. A failure at any of those stops
the deploy rather than shipping a broken site.

### What you lose, and it is not nothing

**No security headers.** GitHub Pages serves no custom headers, so the CSP,
HSTS, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy` that the
Node target sets are all absent. They are declared only for the Node build —
Next warns that they cannot work with `output: export`, so leaving them
declared would be pretending.

There is no workaround on Pages. A `<meta http-equiv="Content-Security-Policy">`
tag can carry *some* of a CSP but not `frame-ancestors` and not HSTS, and it is
weaker than the real header. If headers matter, that is an argument for a Node
host, not for a meta tag.

**No API route.** See below.

**No server-side redirects or rewrites**, and no `www` → apex canonicalisation
beyond what DNS and GitHub give you.

### The enquiry form

Static hosting has no server, so `src/app/api/contact/route.node.ts` cannot
run — no server-side validation, no rate limiting, no SMTP.

The form posts to an external service instead. Set the repository secret
**`NEXT_PUBLIC_FORM_ENDPOINT`** (Settings → Secrets and variables → Actions) to
a Formspree, Web3Forms or Basin endpoint. Client-side Zod validation, the
honeypot and the UTM capture all still work; only the server half is replaced.

**Left unset, the form does not pretend to work.** It renders a visible "this
form is not connected yet" notice, disables the submit button and points at
`pierre@gasdesigns.co.za`. A form that silently swallows enquiries is worse
than no form — the same principle as the rest of the site.

Note that `NEXT_PUBLIC_*` values are compiled into the client bundle, so this
endpoint is public by nature. That is fine for a form endpoint; do not put a
real credential in a `NEXT_PUBLIC_` variable.

### Moving to a custom domain

Right now the site sits at a sub-path, which is why `basePath` is set. On
`gasdesigns.co.za` it would sit at the root and `basePath` must be empty —
otherwise every asset URL gains a `/gasdesigns` prefix that does not exist.

1. In `.github/workflows/deploy-pages.yml`, change the two `env` values at the
   top:
   ```yaml
   BASE_PATH: ""
   SITE_URL: "https://www.gasdesigns.co.za"
   ```
2. Add `public/CNAME` containing `www.gasdesigns.co.za`.
3. Point DNS at GitHub Pages (a `CNAME` record for `www` →
   `logiagenesis.github.io`).
4. Settings → Pages → Custom domain, and enable "Enforce HTTPS" once the
   certificate is issued.

`SITE_URL` drives canonicals, Open Graph tags, the sitemap and robots.txt.
Getting it wrong poisons all four at once, so change it in the same commit.

### A local gotcha

`npm run build:static` and `npm run build` write to the same `.next`
directory in different modes. After a static build, `npm run start` has no
server build to serve and behaves oddly — run `npm run build` again first.
The same applies before `npm test`, which runs against a Node server.

---

## Node host

The better target if you want the form's server-side half and the security
headers. Any host that runs Next 15 — Vercel needs no configuration.

Set `CONTACT_TO_EMAIL` and the `SMTP_*` variables or the form cannot deliver.
See `.env.example`. With Google Workspace, `SMTP_USER` is the mailbox address
and `SMTP_PASS` must be an **App Password**, not the account password.

---

## The three places the target actually matters

Worth knowing, because they are the things that break if someone changes the
config without reading:

1. **`src/app/api/contact/route.node.ts`** — the `.node.ts` extension is not
   decoration. `pageExtensions` in `next.config.ts` only treats `node.ts` as a
   route extension on the Node target, which is what keeps this POST handler
   out of the static export. Rename it to `route.ts` and the export fails with
   "route handlers cannot be used with output: export".

2. **`trailingSlash`** — set only for the export. Without it the root route's
   RSC prefetch resolves to `<basePath>.txt`, which does not exist, and the
   header logo link 404s in the background on every page. `src/app/sitemap.ts`
   mirrors the setting so its URLs match the canonicals Next generates.

3. **`public/.nojekyll`** — an empty file, and load-bearing. GitHub Pages runs
   Jekyll by default, and Jekyll ignores directories beginning with an
   underscore. Without it, `_next/` is dropped and the site deploys with no CSS
   and no JavaScript. The workflow re-creates it as a safety net.

---

## Verified

Against the static export, served through a simulator that mimics GitHub Pages'
extensionless resolution:

| | Static export | Node build |
|---|---|---|
| Lighthouse Performance | 99 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| axe-core violations | 0 | 0 |

All nine service pages, the 404, the sitemap, robots.txt and the generated
Open Graph image render in the export. Client-side navigation works under the
base path with no failed requests.

The Node target's 74 Playwright tests are unchanged and still pass.
