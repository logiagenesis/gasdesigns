# Content strategy

## Principle

This business does not win on volume of content. It wins on sounding like someone
who has stood in a plant room. One page that names a real failure mode is worth
ten that say "professional, reliable, affordable".

The tell, applied to every sentence: **could a competitor put their logo on this
and have it still be true?** If yes, it is filler.

---

## What exists

15 routes. Deliberately lean — the brief asked for basics done properly, not an
elaborate site.

```
/                      homepage, 8 sections
/services              index of nine
/services/[slug]       ×9, statically generated
/about                 approach, not history
/contact               form + channels + emergency notice
/contact/sent          thank-you, noindex, conversion tracking
/privacy-policy        POPIA-aware
/terms                 website use only
404
```

No blog. No pricing tables. No client logo wall. No testimonials. Each of those
was considered and rejected: three of them need facts the client has not
supplied, and a blog nobody maintains is worse than no blog.

---

## The content gaps that matter, ranked

### 1. Location pages — the biggest single opportunity

Every `{service} in {suburb}` query is currently unreachable, because the site is
geography-neutral. Gasify Gauteng runs 35 suburb entries and 16 schema
`areaServed` cities against exactly these queries.

**Blocked on:** service area confirmation (missing-client-info item 3).
**Then:** 5–8 pages for the highest-value areas, each with genuinely local
content, not a find-and-replace of the same paragraph. Google is good at spotting
doorway pages.

### 2. Named projects

Ritter Gas names eleven clients. For an industrial buyer, one named foundry beats
any amount of copy about quality.

**Blocked on:** client permission and photographs (item 11).
**Then:** three project pages — one residential estate, one commercial kitchen,
one industrial — each stating the problem, the constraint, the approach, and the
outcome. Not a gallery.

### 3. A technical specification table

Bull & Bush publishes vessel capacity, supply pressure, reticulation material,
code of practice and sign-off, split by standard versus bulk. It is the
highest-credibility content in the market and it costs nothing but accuracy.

**Blocked on:** confirmation of what Gas Designs actually specifies.
**Then:** the build standards panel on the homepage is already the placeholder.
It can carry real numbers the day they arrive.

### 4. The load-shedding question

The strongest South Africa-specific demand driver in the residential gas market.
Gasify builds a whole section on it with a running-cost comparison. Gas Designs is
silent.

**Blocked on:** a positioning decision, not a fact. If the client wants
residential volume, this needs a page. If they are targeting commercial and
industrial, staying out of it is the right call — but it should be a decision.

---

## Rules for anyone adding content

**Facts.** Nothing goes on the site that is not in `src/lib/site-config.ts` with
`confirmed: true`, or confirmed in writing by the client. If you are about to
type a number, a date, a certification or a location — stop and check.

**Never write:** any reference to DP Energies. "Formerly", "previously part of",
"combined experience". A 24/7 claim. Any registration number. Any testimonial.
Any client name without written permission.

**Structure.** Card summaries are two lines and must *fit* — the CSS clamp is a
backstop, not a licence. Bullets are three, six words each. Service titles are
three words where the language allows.

**Images.** There are none, and that is deliberate. Do not add stock photography.
A stock photo of someone else's pipework on a page about your workmanship is the
exact cheap-template look this brand was built to avoid. Real photographs, or
vector.

---

## Maintenance

**Quarterly:** re-read the caveat boxes — if a fact has been confirmed since,
remove the caveat and say the thing plainly. Check the FAQ still matches how the
business actually operates.

**When facts arrive:** update `src/lib/site-config.ts` and flip `confirmed`. Most
of the site adapts on its own — schema, contact bar, click-to-call and the
privacy policy's analytics section are all driven from that file.

**When scope changes:** `PENDING_SCOPE` in `src/data/services.ts` lists six
capabilities DP Energies publishes that Gas Designs does not claim. Each needs a
yes or no. A yes means a tenth service or a change to an existing one — and note
that the 3×3 grid contract means a tenth card is a layout decision, not just a
data one.
