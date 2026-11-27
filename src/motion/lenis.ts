import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenis: Lenis | null = null

/**
 * One animation frame loop for Lenis and GSAP. Loaded after the first paint.
 * Skipped under reduced motion so native scrolling stays in charge.
 */
export function startSmoothScroll(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  gsap.registerPlugin(ScrollTrigger)
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

/** Route changes start at the top. Falls back to the native scroll when Lenis is not running. */
export function scrollToTop(): void {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}
