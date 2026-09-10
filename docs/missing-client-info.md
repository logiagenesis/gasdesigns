# Missing client information

Everything the site needs from Pierre before it can launch, ordered by how much
damage it does to leave it unanswered.

Nothing on this list has been guessed, inferred or filled in with a plausible
value. Where a fact is unknown, the site renders without it rather than around
it — that is enforced in code, not by convention. See `src/lib/site-config.ts`,
where every fact carries a `confirmed` flag, and the guard in
`tests/smoke.spec.ts` that fails the build if an unconfirmed claim reaches a page.

---

## Blockers — the site should not go live without these

### 1. SAQCC Gas and LPGSA registration numbers

**Why it blocks:** every credible competitor leads with these. See
`docs/competitor-audit.md` §1. Without them Gas Designs looks unregistered, which
is worse than looking new.

**Currently:** the site never uses the words *registered*, *licensed*, *certified*
or *insured* about the business. The compliance service page carries an explicit
caveat saying certification details are still to be confirmed.

**Needed:** SAQCC Gas practitioner number(s), the authorisation class, LPGSA
membership status and number, and the company registration number.

---

### 2. The phone number — and who owns it

**Why it blocks:** the number on the live maintenance page, **+27 61 039 7034**,
is also published by DP Energies. Publishing it as a Gas Designs-only identity is
a brand conflict and an operational one: enquiries meant for one business will
land with the other, and in a partnership split that is a dispute waiting to
happen.

**Currently:** no phone number appears anywhere on the site. Click-to-call, the
WhatsApp link, the mobile contact bar and `LocalBusiness` structured data are all
switched off. The site falls back to email.

**Needed:** one sentence from Pierre — either *"that number is mine alone, Daniel
is not using it"* or *"here is the new number"*. Then set
`NEXT_PUBLIC_BUSINESS_PHONE` and `NEXT_PUBLIC_WHATSAPP_NUMBER` and everything
above switches itself on.

---

### 3. Service area

**Why it blocks:** `LocalBusiness` structured data is deliberately withheld until
both a phone number and an area served exist, because a `LocalBusiness` node with
an empty NAP is worse for search than emitting none at all. Local search is how
this business gets found.

**Currently:** the copy is geography-neutral throughout. The FAQ answer on
coverage says to ask rather than naming areas we cannot honour.

**Needed:** the towns or metros served, and whether that differs for residential
versus industrial work. Set `NEXT_PUBLIC_AREA_SERVED` (comma-separated).

---

### 4. The trading name

Three forms are in play:

| Form | Where it appears |
|---|---|
| `GasDesigns` | the live maintenance page lockup |
| `Gas Designs` | the client brief |
| `Gas Design` | mentioned in the brief as a possible earlier name |

**Currently:** the site uses **Gas Designs** in prose and metadata, and
**GAS DESIGNS** in the logo lockup.

**Needed:** the registered legal name, and the trading name if it differs. This
also determines what goes on the certificates, so it is not just a branding
question. Change it in one place: `BRAND_NAME` in `src/lib/site-config.ts`.

---

### 5. Legal review of the privacy policy and terms

**Why it blocks:** POPIA requires the responsible party to be identifiable. The
policy currently cannot name one.

**Currently:** both pages carry a visible "Review required" notice. The privacy
policy describes exactly what the site does — form fields collected, analytics
state, rate-limit IP handling, retention, POPIA rights — and adapts its analytics
section automatically depending on whether GA/GTM is configured.

**Needed:** registered entity name and address, an information officer, and a
practitioner's review. The terms cover website use only — they contain no trading
terms, payment terms, warranty or limitation of liability for installation work,
and they should before any contract is signed off the back of them.

---

## Important — the site works without these, but is weaker

### 6. Availability, and the "24/7" question

The brief says "24/7 emergency response". That line was lifted from DP Energies'
website, not stated by Pierre. It is not published anywhere on this site, and a
test asserts it never appears.

Note what the competition does: Bull & Bush promises "site surveys within 5
working days". That is checkable and honourable. A blanket 24/7 claim is neither,
unless someone genuinely answers the phone at 3am.

**Needed:** real operating hours, and whether after-hours callout genuinely
exists. Set `NEXT_PUBLIC_OPENING_HOURS`.

### 7. Scope — the six capabilities not on the site

DP Energies publishes these; the nine Gas Designs buckets do not carry them.
They are tracked in code as `PENDING_SCOPE` in `src/data/services.ts` and render
nowhere:

1. Industrial specialty gases (nitrogen, CO₂, argon)
2. Bulk tank revalidation
3. Gas supply / reselling
4. Bulk diesel supply
5. Electrical CoC as a standalone product
6. Appliance supply as distinct from appliance installation

**Needed:** for each, does Gas Designs do it? Any that are yes need a tenth
service or a change to an existing one. Any that are no should be struck from the
list so this question stops recurring.

### 8. Physical address

No address has been supplied. Required for `LocalBusiness` schema, a Google
Business Profile, and NAP consistency across directories. If the business runs
from a home address and that should not be public, say so — a service-area
business can be listed without a street address, but that is a deliberate choice.

### 9. Google Business Profile

Does one exist? It is the highest-leverage local SEO asset available and it is
free. Once created, set `NEXT_PUBLIC_GOOGLE_MAPS_URL`. The NAP on it must match
the site exactly.

### 10. Founder background and trading history

The About page is written entirely around *approach*, with no founding year, no
years-of-experience claim, no team bios and no history. That is deliberate: given
the partnership split, an unverified history claim is a legal exposure as well as
an accuracy one.

Specifically **not** written, and not to be written without written instruction:
any reference to DP Energies, "formerly", "previously part of", or combined
years of experience across both businesses.

The 2025 mark on the live maintenance page is a page footer date. It has not been
treated as a founding year.

**Needed:** what can be said, verifiably, about how long the business has traded
and who runs it.

### 11. Photography and named projects

No images have been supplied, so the site uses no photography at all. The section
where a project gallery would normally sit shows build standards instead — an
abstract, non-photographic panel. It must not be swapped for stock images: stock
photos of someone else's pipework on a page about your workmanship is the exact
cheap-template look the brief was trying to avoid.

Ritter Gas names eleven client projects. For industrial buyers that is the proof
that matters.

**Needed:** real site photographs, and written permission to name two or three
clients.

### 12. Appliance supply

Does Gas Designs sell hobs, geysers and fireplaces, or only install them?
Competitors mostly sell. The site currently says appliance supply is "arranged
separately where agreed" — deliberately noncommittal, and it should not stay that
way.

---

## Configuration — needed to switch things on

| Variable | What it unlocks | Status |
|---|---|---|
| `CONTACT_TO_EMAIL`, `SMTP_*` | The enquiry form actually delivering | **Required** |
| `NEXT_PUBLIC_BUSINESS_PHONE` | Click-to-call, mobile bar, LocalBusiness | Blocked on item 2 |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp button | Blocked on item 2 |
| `NEXT_PUBLIC_AREA_SERVED` | LocalBusiness `areaServed` | Blocked on item 3 |
| `NEXT_PUBLIC_ADDRESS_*` | PostalAddress in schema | Blocked on item 8 |
| `NEXT_PUBLIC_OPENING_HOURS` | `openingHours` in schema | Blocked on item 6 |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | Client to create |
| `NEXT_PUBLIC_GA_ID` | GA4, if not using GTM | Client to create |
| `NEXT_PUBLIC_GOOGLE_MAPS_URL` | "Find us" link | Blocked on item 9 |

**Until `SMTP_*` and `CONTACT_TO_EMAIL` are set, the enquiry form cannot deliver.**
It fails loudly rather than silently: the visitor sees a message telling them to
email directly, and the server logs the misconfiguration. No enquiry is ever
accepted and then dropped.

---

## The eight questions, in one message

Everything above condenses to this. It is written to be pasted into WhatsApp.

> 1. What is the registered legal name, and the trading name if different?
> 2. Are you keeping +27 61 039 7034, and is Daniel definitely off it? If not,
>    what is the new number?
> 3. Which areas do you cover — and is that different for industrial work?
> 4. Are you genuinely available after hours, or are we saying office hours?
> 5. What are your SAQCC and LPGSA numbers?
> 6. Do you supply appliances, or install only?
> 7. Do you still do nitrogen/CO₂/argon, tank revalidation, gas supply or diesel?
> 8. Do you have real site photos, and can we name any clients?

Without answers to 1–5 the site can look finished and still be commercially
wrong.
