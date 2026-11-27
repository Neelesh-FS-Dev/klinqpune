import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PHOTOS, photoSrcSet, photoUrl } from '../data/media'
import { BUSINESS } from '../data/business'
import { EVENTS } from '../data/events'
import { FOOD } from '../data/menu'
import { splitByStatus, todayInKolkata, formatEventDate } from '../lib/events'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { Picture } from '../components/Picture'
import { VideoLoop } from '../components/VideoLoop'
import { PinnedSequence, type SequenceStep } from '../motion/PinnedSequence'
import { VIDEOS } from '../data/media'
import { ReserveList } from '../components/ReserveCTA'
import { StripFaces } from './StripFaces'

const GOLDEN: SequenceStep[] = [
  {
    id: 'golden',
    label: 'Golden hour',
    src: photoUrl(PHOTOS.goldenHour.slug),
    srcSet: photoSrcSet(PHOTOS.goldenHour.slug),
    alt: PHOTOS.goldenHour.alt,
    caption: <p>Friends on the rooftop as the lanterns come on.</p>,
  },
  {
    id: 'after',
    label: 'After hours',
    src: photoUrl(PHOTOS.afterHours.slug),
    srcSet: photoSrcSet(PHOTOS.afterHours.slug),
    alt: PHOTOS.afterHours.alt,
    caption: <p>Warm lamps, palms and the evening settling in.</p>,
  },
]

const POUR: SequenceStep[] = [
  { id: 'p1', label: 'Pour one', src: photoUrl(PHOTOS.pourPeppery.slug), srcSet: photoSrcSet(PHOTOS.pourPeppery.slug), alt: PHOTOS.pourPeppery.alt, caption: <p>A pale rose serve in a fluted glass.</p> },
  { id: 'p2', label: 'Pour two', src: photoUrl(PHOTOS.pourPink.slug), srcSet: photoSrcSet(PHOTOS.pourPink.slug), alt: PHOTOS.pourPink.alt, caption: <p>Pink coupe, lit from the side.</p> },
  { id: 'p3', label: 'Pour three', src: photoUrl(PHOTOS.pourNaughty.slug), srcSet: photoSrcSet(PHOTOS.pourNaughty.slug), alt: PHOTOS.pourNaughty.alt, caption: <p>Naughty 30: a KLINQ signature with whisky, as published by the restaurant.</p> },
  { id: 'p4', label: 'Pour four', src: photoUrl(PHOTOS.barMono.slug), srcSet: photoSrcSet(PHOTOS.barMono.slug), alt: PHOTOS.barMono.alt, caption: <p>Then back to the bar, where every serve starts.</p> },
]

export function Home() {
  useDocumentMeta('KLINQ — The night is yours · Viman Nagar, Pune', 'Creative cuisine, signature cocktails and live music on a rooftop in Viman Nagar, Pune. Reserve a table or see what is on this weekend.')
  const { live, upcoming } = useMemo(() => splitByStatus(EVENTS, todayInKolkata()), [])
  const highlighted = [...live, ...upcoming].slice(0, 3)
  const foodPreview = ['Small plates', 'From the grill', 'Pasta & pizza'].map((g) => ({ group: g, items: FOOD.filter((f) => f.group === g).slice(0, 5) }))

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <img src={photoUrl(PHOTOS.heroGlass.slug)} srcSet={photoSrcSet(PHOTOS.heroGlass.slug)} sizes="100vw" alt={PHOTOS.heroGlass.alt} width={1080} height={1350} fetchPriority="high" decoding="async" />
        </div>
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__location">Viman Nagar, Pune</p>
            <h1 id="hero-title">The night <em>is yours.</em></h1>
            <p className="hero__sub">{BUSINESS.positioning} Open 12:30 PM to 1:00 AM.</p>
            <div className="hero__actions" style={{ marginTop: 28 }}>
              <Link className="btn btn--solid" to="/visit#reserve">Reserve a Table</Link>
              <Link className="btn" to="/menu">Explore the menu</Link>
            </div>
          </div>
        </div>
      </section>

      <PinnedSequence steps={GOLDEN} eyebrow="02 — Golden hour" title={<>From golden hour <em>to after hours.</em></>} />

      <PinnedSequence steps={POUR} eyebrow="03 — The Art of the Pour" title={<>The art <em>of the pour.</em></>} />
      <div className="container">
        <p className="chapter-num" style={{ padding: '24px 0 0' }}>
          Drinks are shown for atmosphere. Legal drinking age applies.
        </p>
      </div>

      <section className="section" aria-labelledby="cuisine-title">
        <div className="container">
          <div className="section__head">
            <p className="chapter-num">04 — Creative cuisine</p>
            <h2 id="cuisine-title">Shared plates, <em>made to be passed around.</em></h2>
            <p>Dishes below are named in KLINQ's own Instagram posts or on the Swiggy Dineout listing. Confirm the full menu before you order.</p>
          </div>
          <div className="food-grid">
            <Picture photo={PHOTOS.smallPlates} className="photo--big" sizes="(min-width: 900px) 58vw, 100vw" caption="Small plates on the timber table" />
            <Picture photo={PHOTOS.chicken} className="photo--side" sizes="(min-width: 900px) 40vw, 100vw" />
            <Picture photo={PHOTOS.flatbread} className="photo--side" sizes="(min-width: 900px) 40vw, 100vw" />
          </div>
          <div className="food-list">
            {foodPreview.map((g) => (
              <div key={g.group}>
                <h3>{g.group}</h3>
                <ul>{g.items.map((i) => <li key={i.name}>{i.name}</li>)}</ul>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 32 }}><Link className="btn" to="/menu">See the full food &amp; drinks list</Link></p>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="faces-title">
        <div className="container section__head">
          <p className="chapter-num">05 — Faces of KLINQ</p>
          <h2 id="faces-title">Guests, <em>in their own light.</em></h2>
          <p>Photographs from KLINQ's Instagram. Names are withheld; permission to publish is needed before launch.</p>
        </div>
        <StripFaces />
      </section>

      <section className="section" aria-labelledby="whats-on-title">
        <div className="container">
          <div className="section__head">
            <p className="chapter-num">06 — What's On</p>
            <h2 id="whats-on-title">Live music, <em>from 8 PM.</em></h2>
            <p>The weekend lineup as published on Instagram on 24 November 2026.</p>
          </div>
          <div className="events-layout">
            <div>
              <ol className="event-list">
                {highlighted.map((e) => {
                  const status = live.includes(e) ? 'live' : 'upcoming'
                  return (
                    <li key={e.id} className="event">
                      <div className="event__date" aria-hidden="true">
                        {e.startDate.slice(8)}
                        <small>{formatEventDate(e.startDate).split(',')[0]}</small>
                      </div>
                      <div>
                        <h3>{e.title}</h3>
                        <p>{e.description}</p>
                        <p className="event__meta">
                          <span className="status" data-status={status}>{status === 'live' ? 'On now' : 'Upcoming'}</span>
                          {e.startTime && <span>From 8 PM</span>}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
              <p style={{ marginTop: 28 }}><Link className="btn" to="/events">All events and past moments</Link></p>
            </div>
            <div className="events-layout__poster">
              <Picture photo={PHOTOS.lineupPoster} sizes="(min-width: 900px) 460px, 100vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--deep" aria-labelledby="experience-title">
        <div className="container explorer">
          <Picture photo={PHOTOS.interior} sizes="(min-width: 900px) 50vw, 100vw" />
          <div className="explorer__copy">
            <p className="chapter-num">07 — Rooftop &amp; interior</p>
            <h2 id="experience-title" style={{ fontSize: 'var(--text-h2)', margin: '14px 0 16px' }}>Warm wood, greenery and <em>outdoor seating.</em></h2>
            <p style={{ color: 'var(--fg-muted)' }}>Indoor and outdoor seating, with the rooftop listed among KLINQ's published experiences.</p>
            <p style={{ marginTop: 24 }}><Link className="btn" to="/experience">Explore the venue</Link></p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="celebrate-title">
        <div className="container celebrate">
          <div>
            <p className="chapter-num">08 — Celebrate at KLINQ</p>
            <h2 id="celebrate-title">Make the moment <em>yours.</em></h2>
            <p>Social gatherings and special events are part of KLINQ's published offer. Packages and capacities are confirmed when you call.</p>
            <div className="celebrate__actions">
              <a className="btn btn--solid" href={`tel:${BUSINESS.phones[0].tel}`}>Call {BUSINESS.phones[0].display}</a>
              <Link className="btn" to="/celebrate">About celebrations</Link>
            </div>
          </div>
          <Picture photo={PHOTOS.pastParty} sizes="(min-width: 900px) 40vw, 100vw" />
        </div>
      </section>

      <section className="section section--deep" aria-labelledby="craft-title">
        <div className="container">
          <div className="section__head">
            <p className="chapter-num">09 — Craft</p>
            <h2 id="craft-title">The detail <em>behind the moment.</em></h2>
          </div>
          <div className="video-pair">
            <figure>
              <VideoLoop slug={VIDEOS.chefPlating.slug} label={VIDEOS.chefPlating.label} />
              <figcaption>Plating, from KLINQ's Instagram. Muted, no audio.</figcaption>
            </figure>
            <figure>
              <VideoLoop slug={VIDEOS.kitchenPrep.slug} label={VIDEOS.kitchenPrep.label} />
              <figcaption>Kitchen preparation. Muted, no audio.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="final" aria-labelledby="final-title">
        <div className="container" style={{ display: 'grid', gap: 32 }}>
          <p className="chapter-num">10 — Make it a KLINQ evening</p>
          <h2 id="final-title">Make it a KLINQ <em>kind of evening.</em></h2>
          <div className="final__actions">
            <Link className="btn btn--solid" to="/visit#reserve">Reserve a Table</Link>
            <Link className="btn" to="/menu">Explore the menu</Link>
          </div>
          <div style={{ maxWidth: 560 }}><ReserveList /></div>
        </div>
      </section>
    </>
  )
}
