import { useMemo, useRef, useState } from 'react'
import { PHOTOS, photoSrcSet, photoUrl } from '../data/media'
import type { GalleryCategory, Photo } from '../types'
import { useDocumentMeta } from '../lib/useDocumentMeta'

const ALL = Object.values(PHOTOS)
const CATEGORIES: ('All' | GalleryCategory)[] = ['All', 'Food', 'Drinks', 'Rooftop & Interior', 'Faces', 'Events', 'Celebrations']

export function Gallery() {
  useDocumentMeta('Gallery · KLINQ, Viman Nagar', 'Food, drinks, rooftop, interior and guest photographs from KLINQ — Cocktails & Cuisine.')
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All')
  const [index, setIndex] = useState(0)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const items = useMemo(() => ALL.filter((p) => category === 'All' || p.categories.includes(category)), [category])
  const current: Photo | undefined = items[index]

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const move = (d: 1 | -1) => setIndex((i) => (i + d + items.length) % items.length)

  return (
    <>
      <header className="page-hero container">
        <p className="chapter-num">Gallery</p>
        <h1>Curated <em>photographs.</em></h1>
        <p>Frames from KLINQ's Instagram, grouped by subject. Select an image to view it larger.</p>
      </header>
      <section className="section" aria-label="Gallery">
        <div className="container">
          <div className="chips" role="group" aria-label="Filter photographs">
            {CATEGORIES.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={category === c} onClick={() => { setCategory(c); setIndex(0) }}>
                {c}
              </button>
            ))}
          </div>
          <ul className="gallery-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map((p, i) => (
              <li key={p.slug}>
                <button type="button" onClick={() => open(i)} aria-label={`Open photograph: ${p.alt}`}>
                  <img src={photoUrl(p.slug, 'small')} srcSet={photoSrcSet(p.slug)} sizes="(min-width: 1200px) 20vw, (min-width: 900px) 25vw, (min-width: 700px) 33vw, 50vw" alt={p.alt} width={1080} height={1350} loading="lazy" decoding="async" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Photograph viewer"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') move(1)
          if (e.key === 'ArrowLeft') move(-1)
        }}
      >
        {current && (
          <div className="lightbox__frame">
            <img src={photoUrl(current.slug)} srcSet={photoSrcSet(current.slug)} sizes="90vw" alt={current.alt} width={1080} height={1350} />
            <div className="lightbox__bar">
              <span>{index + 1} / {items.length} · {current.categories.join(', ')}</span>
              <div>
                <button type="button" className="icon-btn" onClick={() => move(-1)} aria-label="Previous photograph">←</button>
                <button type="button" className="icon-btn" onClick={() => move(1)} aria-label="Next photograph">→</button>
                <button type="button" className="icon-btn" onClick={() => dialogRef.current?.close()} aria-label="Close viewer">✕</button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
