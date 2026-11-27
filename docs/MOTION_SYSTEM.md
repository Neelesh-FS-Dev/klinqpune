# Motion system

## Stack
- **GSAP 3** with ScrollTrigger for the pinned sequences. Only layer opacity and transform change.
- **Lenis** for smooth scrolling. One frame loop: Lenis is driven by the GSAP ticker, and ScrollTrigger updates on Lenis scroll.
- Not used: any second animation library, scroll hijacking, particles, looping background motion.

## Motion levels
| Level | Where | Timing |
|---|---|---|
| 1 — signature | Golden hour → after hours; The Art of the Pour | Scroll-scrubbed (`scrub: 0.6`) |
| 2 — editorial | Image hover scale (1.5%); strip and gallery transitions | 600 ms ease-out |
| 3 — functional | Nav underline, buttons, tabs | 200 ms |

## Behaviour
- **Desktop (≥ 900 px) with motion allowed:** pinned sequences. Section height is 320vh. The sticky stage shows one photograph at a time, crossfading with a slight scale. Captions and progress dots follow the scroll.
- **Smaller screens or reduced motion:** the same content renders as a stacked, static list. Nothing is hidden. If GSAP fails to start, the section switches to the static layout (`try/catch` in `PinnedSequence.tsx`).
- **Reduced motion:** Lenis is not started, so native scrolling is used. CSS transitions drop to 1 ms. Videos do not autoplay.
- **Route changes:** scroll to top, or to the hash target.
- **Videos:** muted, no audio, play only while on screen (IntersectionObserver), preload none.
- **Cleanup:** the GSAP context is reverted on unmount and on mode change. The Lenis ticker callback is removed and Lenis destroyed on unmount.

## Verified
- Pinned pour at 1440 px, step two, confirmed in a viewport screenshot. Other steps and the golden-hour sequence were not inspected individually.
- Static mode at 820 px and 390 px, and under `prefers-reduced-motion: reduce` (Playwright tests).

## Not verified
- Frame rate on real devices and in Safari or Firefox.
- Lenis behaviour with nested scroll containers (the strip uses native scrolling inside Lenis).
