import { useState } from 'react'
import { PHOTOS, VIDEOS } from '../data/media'
import { BUSINESS } from '../data/business'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { Picture } from '../components/Picture'
import { VideoLoop } from '../components/VideoLoop'
import { ReserveList } from '../components/ReserveCTA'

const SPACES = [
  {
    id: 'rooftop',
    name: 'The Rooftop',
    photo: PHOTOS.goldenHour,
    copy: 'Rooftop dining is one of KLINQ\'s published experiences. Lanterns, greenery and outdoor seating set the tone from dusk.',
    points: ['Rooftop seating and outdoor seating, as listed on Zomato', 'Live music on weekends, 8 PM onwards'],
  },
  {
    id: 'interior',
    name: 'The Interior',
    photo: PHOTOS.interior,
    copy: 'Warm wood, woven light and lounge seating. Indoor dining is published alongside the rooftop.',
    points: ['Indoor seating and lounge seating, as listed on Zomato', 'Warm light and botanical details'],
  },
  {
    id: 'bar',
    name: 'The Bar',
    photo: PHOTOS.barMono,
    copy: 'Signature cocktails and mocktails are part of the published menu. The bar is where most evenings begin.',
    points: ['Bar seating, as listed on Zomato', 'Signature cocktails: see the drinks list'],
  },
  {
    id: 'social',
    name: 'The Social Space',
    photo: PHOTOS.rooftopFriends,
    copy: 'Group gatherings, social dining and special events, as published by KLINQ.',
    points: ['Social gatherings and special events, as published', 'Call ahead to ask about group bookings'],
  },
]

export function Experience() {
  useDocumentMeta('The Experience · KLINQ, Viman Nagar', 'Rooftop, interior, bar and social spaces at KLINQ — Cocktails & Cuisine, Viman Nagar, Pune.')
  const [active, setActive] = useState(0)
  const space = SPACES[active]

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') setActive((i) => (i + 1) % SPACES.length)
    if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + SPACES.length) % SPACES.length)
  }

  return (
    <>
      <header className="page-hero container">
        <p className="chapter-num">The Experience</p>
        <h1>Rooftop, interior and <em>the evening between.</em></h1>
        <p>KLINQ is a rooftop restaurant and bar in Viman Nagar, with indoor and outdoor seating. Explore the spaces below.</p>
      </header>

      <section className="section" aria-labelledby="explorer-title">
        <div className="container">
          <h2 id="explorer-title" className="sr-only">Venue spaces</h2>
          <div className="tabs" role="tablist" aria-label="Venue spaces" onKeyDown={onKey}>
            {SPACES.map((s, i) => (
              <button
                key={s.id}
                id={`tab-${s.id}`}
                role="tab"
                type="button"
                className="tab"
                aria-selected={i === active}
                aria-controls="venue-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div id="venue-panel" role="tabpanel" aria-labelledby={`tab-${space.id}`} className="explorer">
            <Picture photo={space.photo} sizes="(min-width: 900px) 58vw, 100vw" />
            <div className="explorer__copy">
              <h3>{space.name}</h3>
              <p style={{ color: 'var(--fg-muted)', marginBottom: 20 }}>{space.copy}</p>
              <ul>{space.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--deep" aria-labelledby="night-title">
        <div className="container" style={{ display: 'grid', gap: 40 }}>
          <div className="section__head">
            <p className="chapter-num">After dark</p>
            <h2 id="night-title">Lanterns, lamps <em>and the night.</em></h2>
          </div>
          <figure style={{ margin: 0, maxWidth: 480 }}>
            <VideoLoop slug={VIDEOS.neonNight.slug} label={VIDEOS.neonNight.label} />
            <figcaption style={{ color: 'var(--fg-muted)', fontSize: 'var(--text-small)', marginTop: 10 }}>Muted, looping, no audio.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="visit-cta">
        <div className="container" style={{ display: 'grid', gap: 24 }}>
          <h2 id="visit-cta">Plan your <em>evening.</em></h2>
          <p style={{ color: 'var(--fg-muted)' }}>{BUSINESS.address.lines.join(', ')}.</p>
          <div style={{ maxWidth: 560 }}><ReserveList /></div>
        </div>
      </section>
    </>
  )
}
