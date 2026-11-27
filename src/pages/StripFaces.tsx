import { useRef } from 'react'
import { PHOTOS, photoSrcSet, photoUrl } from '../data/media'

const FACES = [PHOTOS.portraitBar, PHOTOS.diningTrio, PHOTOS.toast, PHOTOS.rooftopFriends, PHOTOS.goldenHour]

/** Horizontal scroll strip: native scroll with snap, plus buttons and arrow keys. */
export function StripFaces() {
  const ref = useRef<HTMLDivElement>(null)
  const step = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('figure')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 24), behavior: 'smooth' })
  }
  return (
    <div className="strip-wrap">
      <div
        className="strip"
        ref={ref}
        role="region"
        aria-label="Faces of KLINQ photographs"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
        }}
      >
        {FACES.map((p) => (
          <figure key={p.slug} className="photo">
            <img src={photoUrl(p.slug)} srcSet={photoSrcSet(p.slug)} sizes="(min-width: 900px) 360px, 72vw" alt={p.alt} width={1080} height={1350} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
      <div className="strip-controls">
        <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous photographs">←</button>
        <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next photographs">→</button>
      </div>
    </div>
  )
}
