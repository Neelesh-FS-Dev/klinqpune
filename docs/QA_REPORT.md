# QA report

Run on 27 Nov 2026 against the production build served by `vite preview` on port 4790.

## Automated results
| Check | Command | Result |
|---|---|---|
| TypeScript | `npm run typecheck` | Pass |
| ESLint | `npm run lint` | Pass, no warnings |
| Unit tests (event status and dates) | `npm test` | 5 pass, 0 fail |
| Production build | `npm run build` | Pass |
| Browser suite (Chromium, three viewports: 1440, 820, 390) | `npx playwright test` | **90 passed** on the final full run |
| Accessibility (axe, WCAG 2.2 A/AA) on 8 routes × 3 viewports | in the same suite | Pass after fixes (target-size) |
| Full-page and viewport screenshots | `e2e/screenshots.spec.ts` | Captured to `docs/qa/screenshots/` |

Playwright coverage:
- All eight routes render, with no console errors and no horizontal overflow.
- Reservation links are real HTTPS links to District, Zomato and Swiggy. Phone links use `tel:`.
- The desktop primary nav reaches What's On.
- The mobile menu opens as a modal, closes on Escape and returns focus to its toggle.
- The gallery lightbox opens, moves with the arrow keys and closes on Escape.
- The pinned sequence runs only at 900 px and wider, and is static elsewhere and under reduced motion.
- An unknown route shows the not-found page.

## Issues found and fixed during QA
1. **Blank homepage on desktop.** `ScrollTrigger` was registered after the pinned sequence needed it, so the page crashed. Fixed by registering at module load, with a static fallback if GSAP fails.
2. **Dark frame around pinned photographs.** `<figure>` default margins. Fixed.
3. **Footer and contact links below 24 px target height** (axe). Fixed.
4. **Tests hitting the wrong server.** Port 4173 was already used by another local project, and Playwright reused it. The site now uses port 4790, and Playwright does not reuse an existing server.
5. **Mobile menu closing immediately on open.** An effect depended on `open`. Fixed.

## Transient failures (not reproduced)
One full run showed 10 failures on the mobile and tablet projects (route and axe checks, screenshot captures). Re-running the mobile project alone passed 30/30, and three later full runs passed 66, 90 and 90. The cause was not identified. It looks like timing under parallel load, but this is unconfirmed.

## Not tested
- Firefox and WebKit. Only Chromium was installed and run.
- Real iPhone and Android hardware. The Pixel and iPhone emulations were not used; the suite uses custom viewports.
- Safari video seeking. The site does not scrub video, so this should not matter yet.
- Slow network, device rotation, background tabs, memory across route churn.
- Lighthouse on routes other than home. Home was run (see `PERFORMANCE_REPORT.md`): mobile performance 79, mobile LCP 5.0 s over the 2.5 s target.
- Keyboard-only walkthrough by a person with assistive technology. Automated checks only.
- Context loss and WebGL-off: not applicable, there is no WebGL.

## Visual review
Inspected at 1440: homepage hero (first screen), the pinned pour at step two (viewport screenshot), menu (first screen). Inspected at 820: events (first screen). Inspected at 390: homepage (first screen).
Not inspected individually: the other pour steps, the golden-hour pinned sequence in a real viewport (the only capture was a full-page image, where the sticky stage renders incorrectly), and the Experience, Faces, Celebrate, Gallery and Visit pages beyond the automated checks.
Issues seen and left open:
- The "Faces" and "Celebrate" pages use guest photographs. Consent is still needed.
- The hero photograph includes baked-in "FINAL CHILL" text from the restaurant's own graphic.

## Remaining limitations
Listed in `BUSINESS_RESEARCH.md` §6 and `MEDIA_INVENTORY.md`. Most important: no official logo file, no current priced menu, no permission to publish, and no reference-site review.
