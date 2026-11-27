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

**Mobile LCP is the open problem.** The LCP element is the hero photograph. Its file is fetched at 0.02 s, so the network is not the cause. The delay is JavaScript: about 414 KB raw (index plus `motion`, roughly 140 KB gzip) must run before React paints the hero. GSAP and Lenis are in the first load because the home page imports them directly. Splitting them out of first paint is the likely fix. It has not been done.

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
