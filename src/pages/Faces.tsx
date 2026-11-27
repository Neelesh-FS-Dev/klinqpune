import { PHOTOS, photoSrcSet, photoUrl } from '../data/media'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { BUSINESS } from '../data/business'

export function Faces() {
  useDocumentMeta('Faces of KLINQ · Viman Nagar, Pune', 'Guests and evenings at KLINQ, from the restaurant\'s Instagram. Names withheld.')
  const hero = PHOTOS.portraitBar
  return (
    <>
      <header className="page-hero container">
        <p className="chapter-num">Faces of KLINQ</p>
        <h1>Evenings, <em>as the guests lived them.</em></h1>
        <p>A selection of guest photographs from KLINQ's Instagram. Names, occupations and stories are not shared. Publication needs the restaurant's and guests' permission before launch.</p>
      </header>
      <section className="section" aria-label="Faces photographs">
        <div className="container" style={{ display: 'grid', gap: 'clamp(24px, 4vw, 48px)' }}>
          <figure className="photo" style={{ maxWidth: 760 }}>
            <img src={photoUrl(hero.slug)} srcSet={photoSrcSet(hero.slug)} sizes="(min-width: 900px) 760px, 100vw" alt={hero.alt} width={1080} height={1350} loading="eager" decoding="async" />
          </figure>
          <div className="food-grid">
            {[PHOTOS.diningTrio, PHOTOS.toast, PHOTOS.rooftopFriends, PHOTOS.goldenHour].map((p) => (
              <figure key={p.slug} className="photo photo--side">
                <img src={photoUrl(p.slug)} srcSet={photoSrcSet(p.slug)} sizes="(min-width: 900px) 40vw, 100vw" alt={p.alt} width={1080} height={1350} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
          <p style={{ color: 'var(--fg-muted)' }}>Follow the restaurant on Instagram: <a href={BUSINESS.instagram.url} target="_blank" rel="noopener noreferrer">{BUSINESS.instagram.handle}<span className="sr-only"> (opens in a new tab)</span></a>.</p>
        </div>
      </section>
    </>
  )
}
