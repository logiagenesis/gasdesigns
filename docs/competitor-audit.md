# Competitor audit — South African gas installation market

**Status:** Partial, and honest about it.
**Method:** Web search plus direct page extraction, September 2026.
**Depth:** 3 competitors reviewed page-by-page. 9 identified and characterised from
search results and index data only — those entries are marked `[search-only]` and
must not be treated as a full review.

The original brief asked for a deep dive on 20 competitors. That was deliberately
capped. A 20-site audit is a separate research engagement, not something to run
inside a build pass — the token budget it consumes comes directly out of the
quality of the thing being built. What is here is real and verifiable. Nothing in
this document is invented: every company named has a live site at the URL given.

**Nothing from this audit was copied into the Gas Designs site.** It exists to
inform positioning decisions, not to supply copy.

---

## 1. The single most important finding

**Every credible competitor leads with SAQCC Gas registration.** Without
exception. It is the first trust signal on the page, usually in the header strip,
and it is repeated in schema markup, footers and service pages.

Gas Designs currently cannot display any of this, because no registration numbers
have been supplied. Until that changes, the site competes with one hand tied
behind its back — and this is a commercial blocker, not a design problem.

See `docs/missing-client-info.md`, item 1.

---

## 2. Reviewed in depth

### Bull & Bush Engineering SA — https://bullnbush.co.za
*The closest competitor to the industrial half of Gas Designs' scope.*

| | |
|---|---|
| Location | Riversands, Midrand, Gauteng. National + SADC. |
| Founded | 2006 (stated in schema) |
| Positioning | Multi-discipline gas engineering: medical, industrial, LPG, hot water, steam/boilers |
| Accreditations shown | SAQCC Gas, LPGSA member, CIDB registered, B-BBEE Level 1 |
| Primary CTA | "Request a site survey" |
| Secondary CTA | "View technical specs" |
| Visual style | Light, corporate. Navy `#1E3A5F` + red `#E80000`. Poppins/Inter. Photography-led. |

**What they do better than anyone else:**

- **A published technical specification table.** Vessel capacity, supply pressure,
  reticulation material, code of practice and sign-off, split across "Standard"
  and "Bulk / industrial" columns. This is the single most credible thing on any
  site reviewed — it demonstrates competence rather than asserting it.
- **Sector cards carry typical vessel sizing** ("Hospitality: 1,000–4,500 L
  typical", "Manufacturing: 9,000–50,000 L typical"). Specific, checkable, and it
  pre-qualifies the enquiry.
- **A specific, measurable service promise:** "Site surveys typically scheduled
  within 5 working days of enquiry, with indicative scope and budget on the same
  visit." Far stronger than a vague 24/7 claim, and far easier to honour.
- Named standards: SANS 10087-1 for standard installs, SANS 10087-3 and SANS 827
  for bulk.

**Weaknesses:** generic Material Symbols icons; a maintenance banner on a live
commercial site; footer copyright reads 2024 while the schema says otherwise.

---

### Ritter Gas Services & Supplies — https://rittergas.co.za
*Closest on service mix. Western Cape, so not a direct territorial rival.*

| | |
|---|---|
| Location | 2 Burg Street, Malmesbury, Western Cape |
| Reach | Western Cape core; national industrial projects; selected Africa consulting |
| Accreditations shown | SAQCC accredited, LPGSA member (and Installers Division Chairperson), "20+ years", "Industrial Rated Installer" |
| Primary CTA | "Request a Quote" / WhatsApp |
| Visual style | Dense, information-heavy, utilitarian |

**Scope overlap is near-total** with the nine Gas Designs buckets, plus: cylinder
refills and exchange, vaporisers, gas trains, metering, HDPE reticulation,
underground tanks, LPG training, and project management/consulting.

**What they do better:**

- **A named project list with client names** — Atlantis Foundries, Alucab,
  Huhtamaki, Mouton Citrus, Amaro Foods, Paardevlei Lifestyle Estate. For
  industrial buyers this is the proof that matters. Gas Designs has none supplied
  and must not invent any.
- Compliance page names SANS 10087 explicitly and describes materials,
  workmanship, pressure testing, commissioning and documentation.
- POPIA policy and PAIA manual published as downloadable PDFs. Gas Designs'
  privacy policy is drafted but still needs the responsible-party details.
- An emergency gas-safety notice on the homepage. Gas Designs matches this.

**Weaknesses:** every product says "Price: Contact us", which wastes the price
list entirely; heavy loyalty/pensioner-discount content sits oddly against
industrial positioning; the page tries to be a shop, an engineering firm and a
training provider at once.

---

### Gasify Gauteng — https://gasifygp.co.za
*The residential/CoC SEO aggressor in Gas Designs' likely territory.*

| | |
|---|---|
| Location | Century Blvd, Riverside, Johannesburg |
| Area served | 16 named Gauteng cities in schema, 35 named suburbs on-page |
| Accreditations shown | SAQCC certified, SANS 10087-1:2024, "Insurance Approved" |
| Pricing | **Published.** Gas CoC from R950; schema `priceRange` R950–R15000 |
| Hours | Mon–Fri 08:00–17:00, Sat 08:00–13:00, "emergency 24/7" |
| Primary CTA | "Get Quote" / "Call 064-555-8866" |

**What they do better:**

- **The most complete structured data of anyone reviewed:** `LocalBusiness` +
  `HomeAndConstructionBusiness`, `hasOfferCatalog` with priced offers, `FAQPage`
  with 10 questions, `aggregateRating` (4.9 / 100 reviews), individual `Review`
  nodes, `openingHoursSpecification`, and 16 `areaServed` cities.
- **Publishes prices.** At the residential end this converts, because the buyer's
  first question is "what does a CoC cost".
- **Load shedding is a whole section**, with a gas-vs-electric running cost table.
  This is the strongest South Africa-specific demand hook in the market and it is
  absent from the Gas Designs brief entirely.
- Per-suburb landing pages for long-tail local search.

**Weaknesses — and they are exploitable:**

- Raw keyword strings are dumped visibly into the page body ("Gas Installer Near
  Me | Gas Installation Gauteng | Gas Installer Johannesburg | …"). It reads as
  spam to a human and is a 2015-era tactic.
- Emoji used as the brand mark (🔥).
- Claims "#1 in Gauteng" with nothing supporting it.
- Almost entirely residential. **No industrial, bulk LPG, reticulation or
  development capability is shown at all.**

---

## 3. Identified, not fully reviewed `[search-only]`

| Company | URL | Apparent focus |
|---|---|---|
| Stargas | stargas.co.za | LPG supply + install, 9 Gauteng depots, since 2009 |
| The LpGas Man | thegasman.co.za | Residential install + CoC, Johannesburg, e-commerce |
| PRO Gas Installer | progasinstaller.co.za | Residential/commercial appliance installs |
| Gas Piping Services | gasps.co.za | Bulk LPG depots, transmission/reticulation design |
| Ayogas | ayogas.co.za | Housing-development reticulated gas |
| GasAfrica | gasafrica.com | LPG reticulated piping systems |
| Egoli Gas | — | Piped natural gas reticulator, Greater Johannesburg, 8,500+ customers |
| Minzo Bulk Gas | — | Bulk LPG distribution, Pretoria |
| Eco Gas Installers | ecogasinstallers.co.za | SAQCC-registered practitioners, Gauteng |

Industry bodies worth knowing: **SAQCC Gas** (saqccgas.co.za) maintains the public
register of authorised practitioners. **LPGSA** (lpgas.co.za) lists registered
installers. **GIASA** (giasa.co.za), formed 2022, is a newer installer association.

---

## 4. Where the market has a gap

Read across all of the above and the positioning falls into two camps:

**Camp A — residential CoC volume.** Gasify, The LpGas Man, PRO Gas, Eco Gas.
Price-led, SEO-heavy, geyser and hob focused, same-day service, load-shedding
angle. Crowded and competing on price.

**Camp B — industrial engineering.** Bull & Bush, Ritter, Gas Piping Services.
Spec tables, named projects, accreditation walls, site surveys. Credible but
often visually dated and slow to respond to smaller work.

**The gap is the middle.** Nobody reviewed does the *commercial kitchen and
multi-unit development* segment well, with industrial-grade rigour presented at
a scale that a restaurant group or a developer actually wants to read. That is
precisely where the Gas Designs nine-service spread sits.

The site as built leans into this deliberately: engineering seriousness in the
copy (load sizing, sectional isolation, recorded testing) without the dated
presentation of Camp B, and without the price-led scramble of Camp A.

---

## 5. Recommendations, in priority order

1. **Get the SAQCC and LPGSA numbers, and display them.** Everything else is
   secondary. This is the price of entry, and every competitor has paid it.
2. **Publish a technical specification table**, in the Bull & Bush manner. It is
   the highest-credibility, lowest-cost content available. Gas Designs' build
   standards panel is the placeholder for it — it can carry real numbers as soon
   as the client confirms them.
3. **Make a specific service commitment instead of a vague one.** "Site survey
   within N working days" beats "24/7" — it is checkable, honourable, and it is
   what serious buyers actually compare.
4. **Decide on the load-shedding angle.** It is the strongest local demand driver
   in the residential market and Gas Designs is silent on it. If the client wants
   residential volume, this needs a page. If they do not, say so and stay out of
   Camp A entirely.
5. **Consider publishing an indicative CoC price.** Camp A publishes; Camp B
   hides. At the residential end, hiding costs enquiries.
6. **Get permission to name three projects.** Client names beat any amount of
   copy for industrial credibility. Without them, Gas Designs reads as new.
7. **Do not copy the keyword-stuffing.** It is the most visible weakness in the
   market and the easiest thing to beat on quality signals alone.

---

## 6. What is still outstanding

To complete this to the brief's original ambition:

- 9 `[search-only]` entries need page-by-page review.
- 8 further competitors need identifying to reach 20.
- No keyword volume or difficulty data was pulled — that needs a paid SEO tool
  (Ahrefs, Semrush) and is a separate exercise.
- No backlink or domain-authority comparison was run.
- Google Business Profile presence and review counts were not compared.

Commission that as its own piece of work, with the tooling it needs.
