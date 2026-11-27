# Design system

Tokens are in `src/styles/tokens.css`. Change values there only.

## Colour
| Token | Value | Use |
|---|---|---|
| `--c-emerald-950` / `--bg` | #10251C | Midnight emerald: main background |
| `--c-forest-800` / `--surface` | #214C35 | Forest: alternate sections |
| `--c-espresso-950` / `--bg-deep` | #141310 | Espresso: footer and deep sections |
| `--c-ivory-100` / `--fg` | #EDE6D5 | Champagne ivory: text |
| `--c-warm-200` | #D9C8AF | Muted text at 82% |
| `--c-brass-300` / `--rule` | #B8A47A at 45% | Hairlines only |
| `--c-cognac-500` / `--accent` | #B76B35 | Primary button, accent fill |
| `--c-cognac-300` / `--focus` | #E0A36E | Focus rings and italic emphasis |

Contrast: ivory on midnight emerald and cognac-300 on midnight emerald pass WCAG AA for body text. The axe scan in `e2e/a11y.spec.ts` checks this on every route.

## Type
- Display: Instrument Serif (400, italic for emphasis). Self-hosted via `@fontsource`.
- UI and body: Manrope Variable. Self-hosted.
- Scale: hero `clamp(3.25rem, 9vw, 9.75rem)`; display `clamp(2.6rem, 5.6vw, 6rem)`; h2 `clamp(1.75rem, 3vw, 2.75rem)`; body `clamp(1rem, …, 1.125rem)`; labels 13 px, uppercase, 0.18em tracking.
- Not used: a condensed event face (Barlow Condensed). Event headings use the display serif. This is a deliberate simplification.

## Grid and spacing
- Container max 1440 px; gutter `clamp(20px, 3vw, 64px)`.
- Desktop 12-column grid for hero, food and footer. Tablet and mobile stack into one or two columns.
- Section rhythm `clamp(88px, 12vw, 180px)`.

## Breakpoints
| Width | Layout |
|---|---|
| < 700 | single column; mobile hamburger below 768 |
| 700–899 | two-column galleries and video pairs |
| 768–1023 | visible horizontal nav, secondary items hidden |
| ≥ 900 | pinned sequences, asymmetric grids |
| ≥ 1200 | five-column gallery |

## Components
`Header` (fixed, solid after 24 px scroll), `MobileMenu` (native dialog), `Footer`, `Logo`, `Picture` (responsive WebP, explicit dimensions), `VideoLoop`, `ReserveList`, `PinnedSequence`, `StripFaces`, the gallery `dialog` lightbox, and the tabs on `/experience` and `/menu`.

## Buttons and focus
- Primary: cognac fill. Secondary: outline. Minimum height 48 px (40 px in the header).
- Icon buttons 48 × 48.
- Focus: 2 px cognac-300 outline, 3 px offset.
- Touch targets: footer and contact links have a minimum 24 px height (axe `target-size`).

## Shapes
No rounded cards, pills or gradients beyond the hero and final section wash. Edges are square; hairline rules separate chapters.
