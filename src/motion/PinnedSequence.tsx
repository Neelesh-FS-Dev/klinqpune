import { useEffect, useRef, type ReactNode } from 'react'
import { useMotionMode } from './useMotionMode'

export interface SequenceStep {
  id: string
  label: string
  src: string
  alt: string
  srcSet?: string
  caption: ReactNode
}

/**
 * Pinned, scroll-scrubbed layer crossfade on desktop. Stacked, fully readable
 * captions everywhere else. GSAP is imported only when a pinned sequence mounts
 * on a wide screen, so it does not block the first paint.
 */
export function PinnedSequence({ steps, eyebrow, title }: { steps: SequenceStep[]; eyebrow: string; title: ReactNode }) {
  const mode = useMotionMode()
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (mode !== 'pinned' || !root) return
    let cancelled = false
    let ctx: { revert: () => void } | undefined
    import('./pinnedAnimation')
      .then(({ animatePinned }) => {
        if (!cancelled) ctx = animatePinned(root, steps.length)
      })
      .catch(() => {
        // If the animation cannot load or start, keep every step readable in the static layout.
        root.setAttribute('data-mode', 'static')
      })
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [mode, steps.length])

  return (
    <section ref={rootRef} className="pinned section--deep" data-mode={mode} aria-labelledby="pinned-title">
      <div className="pinned__stage">
        {steps.map((s, i) => (
          <figure key={s.id} className="pinned__layer" aria-hidden={mode === 'pinned' && i > 0 ? true : undefined}>
            <img src={s.src} srcSet={s.srcSet} sizes="100vw" alt={mode === 'pinned' ? '' : s.alt} width={1080} height={1350} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
          </figure>
        ))}
        {mode === 'pinned' && <div className="pinned__shade" aria-hidden="true" />}
        <div className="pinned__caption">
          <p className="chapter-num">{eyebrow}</p>
          <h2 id="pinned-title" style={{ marginTop: 16 }}>{title}</h2>
          {steps.map((s) => (
            <div key={s.id} className="pinned__step">
              <p className="chapter-num">{s.label}</p>
              <div>{s.caption}</div>
            </div>
          ))}
        </div>
        {mode === 'pinned' && (
          <div className="pinned__progress" aria-hidden="true">
            {steps.map((s, i) => (
              <span key={s.id} aria-current={i === 0 ? 'step' : 'false'}>0{i + 1}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
