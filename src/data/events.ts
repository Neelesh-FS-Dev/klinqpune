import type { EventItem } from '../types'
import { SOURCES } from './sources'

/**
 * Current listings from the owner's weekend lineup post (24 Nov 2026).
 * Past moments are only added once a date is published. Times are Asia/Kolkata.
 */
export const EVENTS: EventItem[] = [
  {
    id: 'fri-2026-11-27',
    title: 'Live music with Gaurav',
    artist: 'Gaurav',
    startDate: '2026-11-27',
    endDate: '2026-11-27',
    startTime: '20:00',
    description: 'Cocktails and live music from 8 PM onwards.',
    source: SOURCES.weekendPost,
    lastVerifiedAt: '2026-11-27',
  },
  {
    id: 'sat-2026-11-28',
    title: 'Live music with Akshat Mathur',
    artist: 'Akshat Mathur',
    startDate: '2026-11-28',
    endDate: '2026-11-28',
    startTime: '20:00',
    description: 'Cocktails and live music from 8 PM onwards.',
    source: SOURCES.weekendPost,
    lastVerifiedAt: '2026-11-27',
  },
  {
    id: 'sun-2026-11-29',
    title: 'Live music with Kalyan',
    artist: 'Kalyan',
    startDate: '2026-11-29',
    endDate: '2026-11-29',
    startTime: '20:00',
    description: 'Cocktails and live music from 8 PM onwards.',
    source: SOURCES.weekendPost,
    lastVerifiedAt: '2026-11-27',
  },
]
