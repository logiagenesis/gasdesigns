# Design opportunities

Where this site can pull ahead, drawn from what the market actually does.
Evidence is in `docs/competitor-audit.md`.

---

## What the market looks like

Two camps, and a gap between them.

**Camp A — residential CoC volume.** Gasify Gauteng, The LpGas Man, PRO Gas.
Price-led, SEO-heavy, geyser and hob focused. Visually: bright, emoji, badge
strips, keyword strings dumped into the page body. Competing on price and speed.

**Camp B — industrial engineering.** Bull & Bush, Ritter, Gas Piping Services.
Spec tables, named projects, accreditation walls. Credible, and visually dated —
stock photography, Material Symbols icons, corporate navy-and-red.

**Nobody owns the middle.** Commercial kitchens and multi-unit developments,
handled with industrial rigour but presented at a scale a restaurant group or a
developer actually wants to read. That is exactly where the nine-service spread
sits, and it is the positioning this build leans into.

---

## Already taken

**1. A drawn scene instead of a stock photo.**
Every competitor uses photography — usually generic, sometimes visibly stock. The
hero here is a drawn manifold on a reflective floor: inline SVG, layered
gradients, CSS. It cannot look like anyone else's site because nobody else's site
has it, and it costs nothing in page weight.

**2. Icons nobody else has.**
Camp B runs Material Symbols. Camp A runs emoji. Nine hand-drawn icons on one
stroke spec, all from pipe and valve geometry, is a visible quality signal at
zero bundle cost.

**3. Copy that names failure modes.**
"Vapour offtake is limited by vessel surface area, so a tank that holds enough can
still starve a peak load." No competitor writes like this. It is the single
biggest differentiator in the build and it is free.

**4. Honesty as positioning.**
Where a fact is missing, the site says so rather than bluffing. The compliance
page states outright that certification details are still to be confirmed. That
reads as confidence, not weakness — and it is the opposite of "#1 in Gauteng"
with nothing behind it.

**5. Speed as a feature.**
Lighthouse 100/100/100/100 on desktop. Camp B's sites are slow. On a phone on a
site with bad signal — which is where a contractor actually gets found — this
wins.

---

## Available, blocked on client facts

**6. A published technical specification table.**
Bull & Bush's is the most credible thing in the market. The build standards panel
is already the placeholder; it needs real numbers.
*Blocked on: what Gas Designs actually specifies.*

**7. Sector-specific sizing.**
"Hospitality: 1,000–4,500 L typical" pre-qualifies an enquiry before it is sent.
The sector cards currently carry a short note each and could carry this.
*Blocked on: confirmation.*

**8. A checkable service promise.**
"Site survey within N working days" beats "24/7" — it is honourable and it is what
serious buyers compare. The site currently promises nothing, which is safe but
weak.
*Blocked on: what the client will actually commit to.*

**9. Three named projects.**
The highest-value content available for industrial credibility.
*Blocked on: permission and photographs.*

---

## Deliberately rejected

**A light mode.** The brief said dark-mode-first. A toggle doubles the design
surface for no conversion benefit on a contractor site.

**Three.js / WebGL.** Ruled out in the design system. A drawn SVG scene achieves
the effect at a fraction of the weight, and there is nothing to fail on a slow
device.

**A blog.** An abandoned blog is worse than no blog. Revisit only with a real
content commitment.

**Testimonials and a client logo wall.** Both need facts the client has not
supplied. Inventing them is fraud, and Google treats fake review markup as a
manual-action offence.

**Pricing tables.** Ritter's price list says "Contact us" against every item,
which wastes the whole section. Publishing one indicative price (a CoC) would be
better than a table of blanks — see `docs/seo-strategy.md`.

**Keyword-stuffed footers.** The most visible weakness in Camp A and the easiest
thing to beat by simply not doing it.

---

## If there is budget for one more thing

**The load-shedding page.** It is the strongest local demand driver in the
residential gas market, Gasify has built an entire section on it, and Gas Designs
says nothing.

But it is a positioning decision first. Residential load-shedding traffic pulls
the brand toward Camp A, where the competition is fiercest and margins thinnest.
If the real business is commercial kitchens and developments, the right answer is
to stay out of it deliberately — not by accident.

Ask the client which business they want before building the page.
