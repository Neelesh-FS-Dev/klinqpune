import { useMemo } from 'react'
import { EVENTS } from '../data/events'
import { PHOTOS } from '../data/media'
import { splitByStatus, todayInKolkata, formatEventDate } from '../lib/events'
import type { EventItem } from '../types'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { Picture } from '../components/Picture'
import { BUSINESS } from '../data/business'

function EventRow({ e, status }: { e: EventItem; status: 'live' | 'upcoming' | 'past' }) {
  const label = status === 'live' ? 'On now' : status === 'upcoming' ? 'Upcoming' : 'Past'
  return (
    <li className="event">
      <div className="event__date">
        {e.startDate.slice(8)}
        <small>{formatEventDate(e.startDate)}</small>
      </div>
      <div>
        <h3>{e.title}</h3>
        <p>{e.description}</p>
        <p className="event__meta">
          <span className="status" data-status={status}>{label}</span>
          {e.startTime && <span>8 PM onwards</span>}
          <span>Reservations: {BUSINESS.phones[0].display}</span>
          <a href={e.source.url} target="_blank" rel="noopener noreferrer">Source: {e.source.label}<span className="sr-only"> (opens in a new tab)</span></a>
        </p>
      </div>
    </li>
  )
}

export function Events() {
  useDocumentMeta("What's On · KLINQ, Viman Nagar", 'This weekend and upcoming live music at KLINQ, Viman Nagar, Pune, from the restaurant\'s published lineup.')
  const { live, upcoming, past } = useMemo(() => splitByStatus(EVENTS, todayInKolkata()), [])

  return (
    <>
      <header className="page-hero container">
        <p className="chapter-num">What's On</p>
        <h1>Live music, <em>cocktails, and the weekend.</em></h1>
        <p>Dates and artists from KLINQ's published lineup. Check the restaurant's Instagram before you come, as lineups can change.</p>
      </header>

      <section className="section" aria-labelledby="events-title">
        <div className="container events-layout">
          <div>
            <h2 id="events-title" className="sr-only">Events</h2>
            <h3 style={{ fontSize: '1.75rem', marginBottom: 8 }}>This week</h3>
            {live.length > 0 ? (
              <ol className="event-list">{live.map((e) => <EventRow key={e.id} e={e} status="live" />)}</ol>
            ) : (
              <p style={{ color: 'var(--fg-muted)' }}>No event on today. See upcoming events below.</p>
            )}

            <h3 style={{ fontSize: '1.75rem', margin: '56px 0 8px' }}>Upcoming</h3>
            {upcoming.length > 0 ? (
              <ol className="event-list">{upcoming.map((e) => <EventRow key={e.id} e={e} status="upcoming" />)}</ol>
            ) : (
              <p style={{ color: 'var(--fg-muted)' }}>
                Nothing new is published yet. Follow <a href={BUSINESS.instagram.url} target="_blank" rel="noopener noreferrer">{BUSINESS.instagram.handle}<span className="sr-only"> (opens in a new tab)</span></a> for announcements.
              </p>
            )}

            <h3 style={{ fontSize: '1.75rem', margin: '56px 0 8px' }}>Past moments</h3>
            {past.length > 0 ? (
              <ol className="event-list">{past.map((e) => <EventRow key={e.id} e={e} status="past" />)}</ol>
            ) : (
              <p style={{ color: 'var(--fg-muted)' }}>
                Past events appear here once their dates are confirmed. For earlier celebrations, see the <a href="/gallery">gallery</a>.
              </p>
            )}
          </div>
          <aside className="events-layout__poster" aria-label="Published weekend lineup">
            <Picture photo={PHOTOS.lineupPoster} sizes="(min-width: 900px) 460px, 100vw" />
          </aside>
        </div>
      </section>
    </>
  )
}
