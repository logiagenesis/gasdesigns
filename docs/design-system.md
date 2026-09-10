# Design system

The locked decisions. If a value is not here, it does not go in a component.

The purpose of this file is to stop the site drifting into a generic dark
template. "Premium" and "wow" are not specifications; radius, blur, card height
and type scale are.

---

## The one motif

**Precision pipe / manifold / regulator geometry.**

Everything visual on this site is built from it:

- the logo mark is a regulator ring with an open port;
- the hero is that same ring at scene scale, with a riser, a floor run, a tee'd
  gauge and a flanged foot;
- all nine service icons are drawn from pipe, valve, vessel and gauge parts;
- list bullets are pipe ticks, not discs;
- the FAQ toggle is two bars, not a chevron.

**No cartoon flames. No generic orbs. No icon library on service cards.**

## Tokens

All defined in `src/app/globals.css` under `:root`.

### Surfaces and lines
```
--surface-0   #05070A   page ground
--surface-1   #101820   raised
--surface-2   #1B2430   cards
--hairline           rgba(184,199,217,0.14)
--hairline-strong    rgba(184,199,217,0.26)
```

### Glass — locked, no ad-hoc `backdrop-blur`
```
--glass-bg          rgba(27,36,48,0.44)
--glass-bg-strong   rgba(16,24,32,0.78)
--glass-border      rgba(184,199,217,0.16)
--glass-blur        14px
--shadow-specular   inset top highlight + inset bottom shade + soft drop
--shadow-lift       the hover variant, adds a cyan-tinted spread
```

Use `.glass` or `.glass-strong`. Never write a one-off `backdrop-filter`.

### Radius
```
--radius-sm   8px    inputs, small tiles
--radius     14px    buttons
--radius-lg  20px    cards, panels
--radius-xl  28px    hero panels, CTA bands, form card
```

Four values. There is no fifth.

### Motion
```
--ease-out     cubic-bezier(0.22, 1, 0.36, 1)
--ease-in-out  cubic-bezier(0.65, 0, 0.35, 1)
--dur-fast     180ms   hover, focus
--dur          320ms   cards, panels
--dur-slow     720ms   hero entrance
```

### Layout
```
--shell     1200px
--gutter    20px mobile / 32px from 768px
--measure   38ch
--header-h  72px
```

---

## The service grid contract

**Non-negotiable, and enforced in three places.**

- Exactly **nine** cards. `src/data/services.ts` throws at module load if the
  array length is not 9.
- Desktop (≥1024px) is **exactly 3 columns × 3 rows**.
  `grid-template-columns: repeat(3, minmax(0, 1fr))` with `grid-auto-rows: 1fr`.
  No masonry, no 3-3-1, no 3-3-2, no four-card rows.
- Equal heights come from `grid-auto-rows: 1fr`, **not** from a magic pixel value.
- 2 columns from 640px, 1 column below.
- `tests/smoke.spec.ts` asserts the computed column count is 3 at 1280px, that
  there are 9 cards, and that heights within each row are identical.

### Card contract

| Element | Rule |
|---|---|
| Padding | 26px, equal on all sides |
| Icon | 46px tile, custom SVG, never from a library |
| Title | Three words where the language allows |
| Summary | **Two lines.** Written to fit; `-webkit-line-clamp: 2` is a backstop only |
| Bullets | Exactly three, six words maximum each |
| CTA | Pinned to the bottom with `margin-top: auto` |
| Hover | One state: 4px lift + edge specular + depth wash. No bounce, no scale |
| Link | Stretched pseudo-element, so the whole card is clickable without nesting anchors |

If a summary needs an ellipsis, **the summary is wrong** — shorten the copy, do
not loosen the clamp. Every one of the nine was rewritten once for exactly this
reason.

---

## Icons

Nine, hand-drawn, one shared spec:

```
viewBox        0 0 24 24
stroke-width   1.6
linecap/join   round
primary        currentColor (Ion Cyan in context)
accent         exactly one #FF6B35 element per icon
```

Lucide, Heroicons, Font Awesome and Material Symbols are **banned on service
cards.** A stock icon set is the fastest way to make a brand look like every
other dark template.

Each was rendered at 46px, 26px and 18px and checked for misreading. Four were
redrawn after that check:

- the burner ring read as a **microphone** → redrawn as a hob top;
- the bulk vessel read as a **hat** → redrawn as a true capsule on saddles;
- the leak icon was literally the **wifi glyph** → concentric arcs replaced with
  escaping-gas ticks;
- the industrial icon's accent moved from the header to a riser valve.

---

## The hero scene

A drawn manifold on a reflective floor. Inline SVG, layered gradients and CSS.

**Banned:** Three.js and any WebGL, background video, stock photography, and
"3D" that is only `transform: perspective` on a flat card.

Composition — a riser out of the ring, elbowing into a floor run, is what stops
it reading as a goblet. The first version was a ring on a single central stem
with a symmetrical base and it read unmistakably as a **wine glass**.

Layers, back to front:

1. `.hero-floor` — horizon line and reflective wash, edge-masked.
2. `.hero-grid` — perspective floor grid, pure CSS, `rotateX(64deg)`.
3. `.hero-scene-glow` — one blurred cyan radial.
4. The mirrored assembly, masked to a short fade below the floor line.
5. The floor line.
6. The live assembly.

The reflection mask sits on an **outer** group and the flip transform on an inner
one. Putting both on the same element flips the mask along with the content, and
the reflection silently vanishes — which is exactly what happened first time.

---

## Accessibility

Not a checklist item. Verified.

- **axe-core: 0 violations** across all 7 page types, WCAG 2.0/2.1 A and AA.
- **Lighthouse accessibility: 100.**
- One visible focus ring, `2px` Ion Cyan at `3px` offset, never removed.
- Heading order is strictly sequential. The trust strip and the services index
  carry visually-hidden `h2`s so nothing jumps `h1 → h3`.
- The logo link has **no** `aria-label` — its own "GAS DESIGNS" text is the
  accessible name, and adding a label created a name/content mismatch.
- Contrast: body text is `rgba(248,250,252,0.72)` on `#05070A`, ~13:1.
- `prefers-reduced-motion: reduce` kills every animation and hover transform.
- Every form field has a real `<label>`, `aria-invalid` and `aria-describedby`.

---

## Performance

Measured on a production build, not estimated.

| | Desktop | Mobile (4× CPU throttle, slow 4G) |
|---|---|---|
| Performance | 100 | 95–96 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

First Load JS is **103kB shared**, 106kB on content pages. The contact page is
150kB because it carries react-hook-form and Zod.

How that is held:

- No animation library. All motion is CSS.
- No icon library. Nine hand-drawn SVGs, inlined.
- No images at all — every visual is vector or CSS.
- Gradients are defined once in `<BrandDefs />` and referenced by id, rather than
  duplicated per logo instance.
- Fonts via `next/font` with `display: swap`, self-hosted, no render-blocking
  stylesheet.
- Zod runs `jitless`, which removes a `new Function` probe that violated the CSP.

---

## Security headers

Set in `next.config.ts`. The CSP is real and enforced — verified with no
violations reported in Chrome's Issues panel.

`script-src` allows `'self' 'unsafe-inline'` plus the two Google measurement
domains, and nothing else. **`'unsafe-eval'` is deliberately absent.** If a future
dependency needs it, fix the dependency rather than widening the policy.

Also set: HSTS with preload, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, and a `Permissions-Policy` that switches off camera,
microphone, geolocation and FLoC.
