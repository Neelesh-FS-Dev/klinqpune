# Performance report

Lighthouse 12.8 was run on the production build (`vite preview`, port 4790). Results are below, followed by the measured build sizes.

## Lighthouse — home page (run 27 Nov 2026, after two fixes)
| Category | Desktop | Mobile (simulated 4G, 4× CPU) |
|---|---|---|
| Performance | **100** | **79** |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 66 | 66 |

| Metric | Desktop | Mobile | Target (brief) |
|---|---|---|---|
| First Contentful Paint | 0.5 s | 2.3 s | — |
| Largest Contentful Paint | 0.6 s | **5.0 s** | ≤ 2.5 s |
| Cumulative Layout Shift | 0.005 | 0.001 | ≤ 0.1 |
| Total Blocking Time | 0 ms | 0 ms | — |
| Speed Index | 0.8 s | 2.3 s | — |
| Time to Interactive | 0.7 s | 5.2 s | — |

**SEO 66 is intentional.** The site is `noindex` until publication is authorised, so Lighthouse's "Page is blocked from indexing" fails. It will pass once that is removed.

**Mobile LCP: simulated versus measured.** The default mobile run uses Lighthouse's simulated throttling, which reports LCP 5.0–5.2 s. The trace in the same run shows the hero photograph requested at 0.01 s and its LCP sub-parts summing to about 90 ms, so the simulator's critical-path model is inflating the number. A DevTools-throttled run (`--throttling-method=devtools`, measured rather than simulated) gives **performance 96 and LCP 2.2 s** on the same build, under the 2.5 s target.

GSAP and Lenis now load after the first commit: the entry no longer preloads the `motion` chunk. The simulated run did not change (5.0 s before, 5.2 s after), and there is no measured run from before the split to compare against. Treat the split as a structural improvement; the measured LCP above is the number to rely on.

Remaining simulated-mobile opportunities are listed below. Most are in the simulated run only.

Changes made during the audit:
- Preloaded the hero image in `index.html` (it did not move mobile LCP, but makes the request start before the bundle).
- Converted the brand lockup to WebP (`klinq-lockup-cropped-from-poster.webp`).

Remaining Lighthouse opportunities (mobile): responsive image sizing (about 314 KB; the 1080 px variant is served at 2.6× DPR), render-blocking CSS (about 600 ms, 8 KB), unused JavaScript (about 75 KB), and one PNG favicon.

Reports: `docs/qa/lighthouse/home-desktop.report.html` and `home-mobile.report.html` (plus JSON).

## Build output (`npm run build`)

## Build output (`npm run build`)
| Asset | Raw | Gzip |
|---|---|---|
| `index-*.js` (app shell, home page, React Router) | 289.7 KB | 91.5 KB |
| `motion-*.js` (GSAP and Lenis) | 135.3 KB | 50.3 KB |
| `index-*.css` | 23.7 KB | 8.1 KB |
| Secondary route chunks (Experience, Menu, Events, Faces, Celebrate, Gallery, Visit, NotFound) | 0.5 – 3.9 KB each | — |
| Fonts (self-hosted WOFF2, all subsets) | 139.6 KB total | — |
| `index.html` | 1.8 KB | 0.9 KB |

Notes:
- The home page imports GSAP directly, so the motion chunk loads with it. Lenis is in the same chunk.
- No WebGL libraries are included. There is no three.js or R3F bundle.

## Media
| Item | Size |
|---|---|
| Photo WebPs, all (1080 and 640 variants, 21 photos) | 2.7 MB on disk |
| Hero (`hero-glass.webp`, 1080 wide) | 60 KB |
| Hero, 640 variant (phones) | 23 KB |
| Typical content photo (1080 wide) | 140 KB |
| Videos (3) | 0.98, 0.84 and 1.36 MB, muted and `preload="none"` |

On a mobile connection the first paint needs the 640 hero (about 23 KB), the JS and the CSS. Videos download only when scrolled into view and play.

## Not measured (required by the brief, still open)
- Other routes in Lighthouse (only the home page was audited).
- INP and any field (real-user) data.
- Memory across repeated route changes.
- Frame rate of the pinned sequences.
- Image payload on the first viewport in a throttled network.
- Bundle split of Lenis from GSAP.

## Known risks
- The full-size WebP is served at desktop widths and the 640 variant at phone widths. The `sizes` attributes are set, but they have not been checked against a real device.
- Photos are 4:5 and set with explicit width and height, which prevents layout shift.
