# Gas Designs — brand guide

## The mark

A pipe ring with an open burner port, closed into a **G** by a cyan take-off line,
with a flame at the port.

Read it as an object and it is a regulator body seen face-on: gas enters, travels
the ring, and burns at the open port. Read it as a letterform and it is a G. Both
readings are intended, and it is the same geometry either way.

### How it was arrived at

The brief asked for a flame, a pipe curve and a G/D monogram. Four constructions
were drawn and tested at 128px, 64px, 40px, 24px and 16px on both `#05070A` and
`#F8FAFC` before this one was chosen.

Rejected, and why:

- **A "D" with a flame on the shoulder.** The flame perched on top of the letter
  rather than emerging from anything. It read as a candle.
- **A flame inside the D's counter.** Collided with the crossbar and turned to mud
  below 40px.
- **A symmetrical teardrop flame.** Read unambiguously as a *water droplet* —
  fatal for a gas brand. The flame was redrawn with a swept, offset tip.

The **D is not in the final mark.** Forcing it in produced a worse G, and a
legible G is worth more than a muddy ligature. The "Designs" half of the name is
carried by the wordmark. If the client wants the D explicit, a flat-backed G/D
hybrid was drawn and can be revisited — it is less elegant but it does both.

### Construction rules

Do not redraw the mark by eye. It is defined by these values.

```
viewBox            0 0 64 64
Ring centre        (32, 36.72), radius 18
Ring stroke        9.5, round cap
Ring arc           M49.6 32.9 A18 18 0 1 1 30.4 18.86
                   (an ~277° sweep; the ~83° gap at the top-right is the port)
Take-off line      M46.2 36.72 H34, stroke 9.5, round cap, solid #00AEEF
Flame anchor       translate(40.5 21.5) scale(0.8)
```

The flame is a swept-tip silhouette in a gold-to-copper gradient with a solid cyan
inner core. **The cyan core is not decoration** — a blue flame core is complete
combustion, which is the one visual an engineer reads as "this was done properly".

### Gradients — two, and only two

| Id | Use | Dark backgrounds | Light backgrounds |
|---|---|---|---|
| `gdChrome` | ring | `#FFFFFF` → `#C3D1E1` (45%) → `#7C8DA1` | `#4A5A6E` → `#222D3A` (45%) → `#080E15` |
| `gdFlame` | flame body | `#F59E0B` → `#FF6B35` | same |

Both run at 45° across the mark's bounding box. The take-off line and flame core
are **flat colour**, never gradients. No bevels, no drop shadows, no inner glows
— the depth comes from the chrome ramp alone.

### Clear space and minimum size

- Clear space on all sides: **the radius of the ring** (18 units, 28% of the mark).
- Minimum size, mark alone: **16px**. Tested and legible.
- Minimum size, full lockup: **120px** wide.

### Never

- Recolour the ring outside the chrome ramp.
- Fill the flame with the cyan or replace the core with white.
- Rotate, skew, or add a third gradient.
- Outline, emboss, or add a drop shadow.
- Place the mark on a mid-tone background where the chrome ramp loses contrast.
  Use the light-background variant below `#8090A5` luminance.
- Reconstruct it from a screenshot. Use the SVG.

---

## The lockup

```
[mark]  GAS DESIGNS
```

Mark at 64 units, a 20-unit gap, then the wordmark in **Space Grotesk SemiBold**,
27pt, letter-spacing 1.7 units, baseline at y=41.5.

**GAS** is `--frost` `#F8FAFC`; **DESIGNS** is `--chrome` `#B8C7D9`. On light
backgrounds: `#05070A` and `#4A5A6E`. The two-tone split is what stops the lockup
reading as a generic all-caps wordmark.

---

## Files

| File | Use |
|---|---|
| `public/brand/gas-designs-logo-full.svg` | Default full lockup |
| `public/brand/gas-designs-logo-dark.svg` | Lockup for dark backgrounds |
| `public/brand/gas-designs-logo-light.svg` | Lockup for light backgrounds |
| `public/brand/gas-designs-logo-mark.svg` | Mark alone, dark backgrounds |
| `public/brand/gas-designs-logo-mark-light.svg` | Mark alone, light backgrounds |
| `public/brand/favicon.svg` | Mark on a `#05070A` rounded tile |
| `src/app/icon.svg` | The favicon Next.js serves |

**The wordmark in these files is outlined vector paths, not live text.** They
render identically on a machine with no fonts installed — which is what a brand
file has to do. This was verified by rendering them with the webfont deliberately
absent.

Inside the app, `src/components/Logo.tsx` draws the mark inline and sets the
wordmark as real text, so it stays selectable and readable to screen readers.
The two are drawn from the same geometry — if you change one, change both.

Space Grotesk is licensed under the SIL Open Font License 1.1, which permits
outlining and redistribution.

### Not yet produced

PNG exports, a one-colour/reversed version, and a horizontal-vs-stacked lockup
pair. Ask if these are needed for signage, vehicle livery or embroidery — the
last of those in particular needs a simplified mark, since gradients do not
embroider.

---

## Colour

| Token | Hex | Role |
|---|---|---|
| Midnight Black | `#05070A` | Page ground |
| Carbon Graphite | `#101820` | Raised surface |
| Deep Steel | `#1B2430` | Cards, controls |
| Gas Blue | `#00AEEF` | Primary accent, the take-off line |
| Ion Cyan | `#6EE7F9` | Highlights, links, focus rings, flame core |
| Flame Copper | `#FF6B35` | Secondary accent, bullet ticks, gauge needle |
| Molten Gold | `#F59E0B` | Flame top, caution states |
| Chrome Silver | `#B8C7D9` | Secondary text, metal |
| Frost White | `#F8FAFC` | Primary text |
| Safety Green | `#00C853` | Success, safety affirmations |
| Error Red | `#EF4444` | Errors only |

Every one is a CSS custom property in `src/app/globals.css`. **Never hard-code a
hex in a component** — if a value is not in that file, it does not belong in the
design.

### How the accents divide

Cyan and copper are not interchangeable.

- **Cyan/blue = the gas path.** Flow, links, focus, interactive affordance.
- **Copper/gold = heat and attention.** Flame, bullet ticks, the gauge needle,
  caution notices.

Do not blend one into the other across a gradient. Blue-to-orange passes through
grey at its midpoint and looks like a rendering fault — this was caught on the
hero headline and fixed by keeping the accent inside the cyan ramp.

---

## Typography

| Role | Face | Size / line-height |
|---|---|---|
| Display (h1) | Space Grotesk 600 | 56/62 desktop → 36/40 mobile |
| Section (h2) | Space Grotesk 600 | 40/48 → 28/34 |
| Card / sub (h3, h4) | Space Grotesk 600 | 21/28, 17/24 |
| Body | Inter 400 | 16/28 |
| Small | Inter 400 | 14/22 |
| Technical label | JetBrains Mono 400 | 12/16, `0.14em`, uppercase |

Measure is capped at **38ch** for body copy and 56ch for wider blocks.

JetBrains Mono is reserved for labels, step numbers and data values. It is the
"instrument panel" voice. Using it for body copy destroys the effect.

---

## Motion

Budget, and it is a budget rather than a guideline:

- **Hero entrance:** once, on load. Two elements, staggered 60ms and 220ms.
- **Gas flow along the hero ring:** one looping dash, 5.5s linear.
- **Flame breathe:** one looping scale, 3.2s.
- **Cards:** hover only. 4px lift, edge specular, no bounce.
- **Everything else:** nothing.

No page-wide parallax. No scroll-triggered reveals. No scroll-jacking.
`prefers-reduced-motion: reduce` disables all of it — including hover transforms.

There is no animation library in the bundle. All of the above is CSS. The brief
listed Framer Motion; it was left out because the motion budget above does not
need it and a 90+ Lighthouse score does need the absence of it. The result is
Performance 100 on desktop. If richer motion is ever specified, that decision
should be revisited on the merits.
