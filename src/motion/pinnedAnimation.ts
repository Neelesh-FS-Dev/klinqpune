import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * GSAP timeline for a pinned, scroll-scrubbed layer crossfade. Loaded on demand so
 * GSAP stays out of the first paint. Only opacity and transform change.
 */
export function animatePinned(root: HTMLElement, stepCount: number): gsap.Context {
  return gsap.context(() => {
    const layers = gsap.utils.toArray<HTMLElement>('.pinned__layer', root)
    const captions = gsap.utils.toArray<HTMLElement>('.pinned__step', root)
    const dots = gsap.utils.toArray<HTMLElement>('.pinned__progress span', root)
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
    })
    layers.forEach((layer, i) => {
      if (i === 0) return
      tl.fromTo(layer, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1 }, i - 0.5)
      tl.fromTo(layer.querySelector('img'), { yPercent: 4 }, { yPercent: 0, duration: 1 }, i - 0.5)
      tl.to(layers[i - 1], { opacity: 0, duration: 0.2 }, i - 0.2)
    })
    captions.forEach((c, i) => {
      gsap.set(c, { autoAlpha: i === 0 ? 1 : 0 })
      if (i > 0) {
        tl.to(captions[i - 1], { autoAlpha: 0, duration: 0.2 }, i - 0.5)
        tl.fromTo(c, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.4 }, i - 0.3)
      }
    })
    const updateDots = (progress: number) => {
      const idx = Math.min(stepCount - 1, Math.floor(progress * stepCount))
      dots.forEach((d, i) => d.setAttribute('aria-current', i === idx ? 'step' : 'false'))
    }
    ScrollTrigger.create({ trigger: root, start: 'top top', end: 'bottom bottom', onUpdate: (self) => updateDots(self.progress) })
  }, root)
}
