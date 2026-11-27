import type { EventItem } from '../types'

export type EventStatus = 'live' | 'upcoming' | 'past'

export const EVENT_TIMEZONE = 'Asia/Kolkata'

/** Today's calendar date in Asia/Kolkata as YYYY-MM-DD. */
export function todayInKolkata(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: EVENT_TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

/**
 * Compares calendar dates as strings, so there is no timezone drift.
 * An event is live on any day between its start and end (inclusive).
 */
export function eventStatus(event: Pick<EventItem, 'startDate' | 'endDate'>, today: string): EventStatus {
  if (today < event.startDate) return 'upcoming'
  if (today > event.endDate) return 'past'
  return 'live'
}

export function splitByStatus(events: EventItem[], today: string) {
  const live: EventItem[] = []
  const upcoming: EventItem[] = []
  const past: EventItem[] = []
  for (const event of events) {
    const status = eventStatus(event, today)
    if (status === 'live') live.push(event)
    else if (status === 'upcoming') upcoming.push(event)
    else past.push(event)
  }
  const byStart = (a: EventItem, b: EventItem) => a.startDate.localeCompare(b.startDate)
  return { live: live.sort(byStart), upcoming: upcoming.sort(byStart), past: past.sort(byStart) }
}

/** "Fri 27 Nov" style label, computed without the viewer's timezone. */
export function formatEventDate(date: string): string {
  const [y, m, d] = date.split('-').map(Number)
  return new Intl.DateTimeFormat('en-IN', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short' }).format(
    new Date(Date.UTC(y, m - 1, d)),
  )
}
