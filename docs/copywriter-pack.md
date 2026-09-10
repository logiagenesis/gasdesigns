# Copywriter pack

Everything written for the site, in one place, plus what a human copywriter
should sharpen and what needs client sign-off before it can stand.

**Provenance:** all copy is original. Nothing was copied, reworded or
structurally imitated from dp-energies.co.za. Sentence shapes, headings, section
order and card structure were built independently. A smoke test asserts the
strings "DP Energies", "24/7" and "SAQCC" appear nowhere on the site.

---

## Voice

Plain, technical, and willing to say the unhelpful thing. The differentiator in
this market is not enthusiasm — every competitor has that — it is sounding like
someone who has actually stood in a plant room.

**Do:** name the failure mode. Say what is excluded. Give the number. Admit what
you cannot do.
**Don't:** superlatives, "passionate", "solutions provider", "one-stop shop",
exclamation marks, or any claim that cannot be checked.

The test: could a competitor put their logo on this sentence and have it still be
true? If yes, rewrite it.

---

## Homepage

**Eyebrow:** LPG & Natural Gas Specialists

**H1:** Gas systems engineered, installed and *proven*.

**Sub:** Installation, maintenance and compliance work for homes, commercial
kitchens and industrial sites — sized against real load, pressure tested before
handover, and documented so the readings are on record.

**CTAs:** Request a Quote · View Services

**Stat strip** — scope facts, not invented numbers. There is no "500+
installations" and no "20 years" because neither has been confirmed.

| Scope | Disciplines | Handover |
|---|---|---|
| Residential to industrial | Install · Maintain · Comply | Tested & recorded |

### Trust strip — commitments, not credentials

No badges, no membership logos, no registration numbers, because none have been
supplied. What is there instead is four things the business commits to, which is
harder to fake and arguably better copy:

- **Quoting — Exclusions stated up front.** A quotation names what is not
  included, so the scope is clear before anyone starts.
- **Handover — Tested, then recorded.** Pressure and soundness results are
  written down and handed over with the installation.
- **Scope — The right trade for the work.** Regulated electrical work goes to
  suitably qualified electrical personnel, not around them.
- **Claims — Confirmed in writing.** Certification and availability are confirmed
  directly, in writing, before you commit.

*Replace this section the moment SAQCC and LPGSA numbers arrive — real
accreditation beats good copy every time.*

### Section headings

| Section | Label | Heading |
|---|---|---|
| Services | What we do | Nine ways we work on gas |
| Sectors | Where we work | Sites we build for |
| Process | How a job runs | Six steps, in this order |
| Safety | Safety & compliance | The part that is not negotiable |
| Standards | Build standard | What every installation gets |
| FAQ | Questions | Straight answers |
| CTA | Next step | Tell us about the site |

---

## The nine services

Card copy is in `src/data/services.ts`. Each entry has: `title` (three words
where possible), `summary` (two lines, written to fit), three `bullets` (six
words max), a two-paragraph `intro`, six `includes`, three `considerations`, and
an optional `disclaimer`.

| # | Card title | Summary |
|---|---|---|
| 1 | Residential Gas Systems | Complete LPG and natural gas systems for houses, estates and developments. |
| 2 | Commercial Kitchen Systems | Gas supply and equipment connections for restaurants, hotels and bakeries. |
| 3 | Industrial Gas Installations | Distribution pipework and planned maintenance for factories and plants. |
| 4 | Bulk LPG Installations | Storage vessels, manifold banks and distribution sized to real draw-off. |
| 5 | Custom Projects | Gas infrastructure planned with architects, developers and contractors. |
| 6 | Certificates of Compliance | Inspection, pressure testing and remedial work, ready for sign-off. |
| 7 | Gas System Maintenance | Planned upkeep that keeps regulators, valves and joints inside tolerance. |
| 8 | Leak Detection & Repairs | Fault tracing, isolation and repair when a system fails a pressure test. |
| 9 | Electrical & Controls | Ignition, isolator and control work that keeps a gas installation running. |

### Openers worth keeping

Each detail page opens on a technical insight rather than a sales line. These are
the strongest lines in the pack and they are the reason the site sounds like a
contractor rather than an agency:

> **Bulk LPG** — "Bulk storage is decided by two numbers that people often
> confuse: how much gas the site holds, and how fast it can take it off. Vapour
> offtake is limited by vessel surface area, so a tank that holds enough can
> still starve a peak load."

> **Commercial kitchens** — "A commercial kitchen draws hard and draws all at
> once. Sizing for the sum of the nameplate ratings — not the average — is what
> keeps burner pressure stable when every station fires at the same time."

> **Compliance** — "A certificate is the end of a process, not a service on its
> own. What actually decides the outcome is the condition of the installation
> when it is inspected."

> **Developments** — "On a development the gas scope is only partly a gas
> problem. It is a sequencing problem: first fix has to land between the
> brickwork and the screed, and a missed window turns a cheap run into an
> expensive one."

> **Maintenance** — "Gas components fail predictably. Hoses perish, seals harden,
> regulators drift and joints work loose under vibration — all of it on a
> timescale you can plan for rather than react to."

---

## Bounded claims

Three services carry a visible caveat box. These are deliberate and should not be
quietly deleted to make the page read more smoothly.

**Certificates of Compliance** — certification authority, registration numbers
and certificate types are not published, because they have not been confirmed.

**Leak Detection & Repairs** — response times and after-hours availability are
agreed per job, not published as a blanket commitment. This is the "24/7"
question, handled honestly.

**Electrical & Controls** — regulated electrical work and electrical CoCs fall to
suitably qualified and authorised electrical personnel.

---

## About page

Written entirely around **approach**, with no history, no founding year, no team
bios, no years-of-experience claim. Given the partnership split, an unverified
history claim is a legal exposure as well as an accuracy problem.

Headings: *A gas contractor that writes things down* / What we are actually good
at / How we quote / Where our scope ends.

The strongest paragraph, and the one to protect in any rewrite:

> "So the effort goes into the parts nobody photographs: the load calculation,
> the route decision, the staging against your programme, and the test record
> that gets handed over at the end. That is the work. The pipe is the easy part."

**Never write, without written instruction from the client:** any reference to
DP Energies, "formerly", "previously part of", or combined years of experience
across both businesses.

---

## FAQ

Eight questions, on `/` and in `FAQPage` structured data. Chosen because they are
what people actually ask, including the two that lose sales:

1. What does a gas installation actually cost?
2. Can you work on an installation someone else put in?
3. How long does an installation take?
4. Do you work around a trading kitchen or a live production floor?
5. What do I do if I smell gas?
6. Do I need a certificate of compliance?
7. Do you supply appliances as well as install them? *(answer is deliberately
   noncommittal — see missing-client-info item 12)*
8. Which areas do you cover? *(deliberately noncommittal — item 3)*

Questions 7 and 8 should be rewritten with real answers as soon as they exist.
They are currently the weakest copy on the site, and they are weak because the
facts are missing, not because the writing is bad.

---

## Metadata

| Route | Title | Length |
|---|---|---|
| `/` | Gas Designs — Precision Gas Systems | 34 |
| `/services` | Gas Installation Services | 26 |
| `/about` | About Gas Designs | 17 |
| `/contact` | Contact & Quotes | 16 |
| `/privacy-policy` | Privacy Policy | 14 |
| `/terms` | Terms of Use | 12 |

Non-home titles get `| Gas Designs` appended by the template. Service page titles
and descriptions live on each entry in `src/data/services.ts` as `metaTitle` and
`metaDescription`. All descriptions are 150–165 characters.

---

## For the human copywriter

**Leave alone:**
- The technical openers on the service pages. They are the differentiator.
- The caveat boxes. They are liability control, not filler.
- The "if you smell gas" answer. It is safety copy and the sequence matters.

**Sharpen:**
- FAQ 7 and 8, once the facts land.
- The sector card notes — eight of them, currently five to seven words each. They
  could carry more specificity, e.g. vessel sizing per sector as Bull & Bush does
  (see `docs/competitor-audit.md`).
- The trust strip, once real accreditations replace it.

**Needs client sign-off before it can stand:**
- Anything about availability, response times or after-hours work.
- Anything naming a certification, registration or membership.
- Anything about how long the business has traded or who runs it.
- The appliance supply question.

**Not yet written, because the facts do not exist:** any location-specific
landing pages, any case studies, any testimonials. Three of the four reviewed
competitors have all three. That gap is a content commission, not a build task —
see `docs/content-strategy.md`.
