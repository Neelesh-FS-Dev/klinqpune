import { test } from 'node:test'
import assert from 'node:assert/strict'
import { eventStatus, splitByStatus, todayInKolkata, formatEventDate } from './events.ts'

const single = { startDate: '2026-11-27', endDate: '2026-11-27' }
const weekend = { startDate: '2026-11-27', endDate: '2026-11-29' }

test('a single-day event is upcoming, live, then past', () => {
  assert.equal(eventStatus(single, '2026-11-26'), 'upcoming')
  assert.equal(eventStatus(single, '2026-11-27'), 'live')
  assert.equal(eventStatus(single, '2026-11-28'), 'past')
})

test('a multi-day run stays live through its final day', () => {
  assert.equal(eventStatus(weekend, '2026-11-29'), 'live')
  assert.equal(eventStatus(weekend, '2026-11-30'), 'past')
})

test('splitByStatus sorts each bucket by start date', () => {
  const events = [
    { id: 'b', ...single, startDate: '2026-12-05', endDate: '2026-12-05' },
    { id: 'a', ...single, startDate: '2026-11-01', endDate: '2026-11-01' },
    { id: 'c', ...single, startDate: '2026-11-27', endDate: '2026-11-27' },
  ] as never[]
  const out = splitByStatus(events, '2026-11-27')
  assert.deepEqual(out.past.map((e) => e.id), ['a'])
  assert.deepEqual(out.live.map((e) => e.id), ['c'])
  assert.deepEqual(out.upcoming.map((e) => e.id), ['b'])
})

test('todayInKolkata uses Asia/Kolkata, not UTC', () => {
  // 20:00 UTC on 27 Nov is 01:30 on 28 Nov in Kolkata (UTC+5:30).
  assert.equal(todayInKolkata(new Date('2026-11-27T20:00:00Z')), '2026-11-28')
})

test('formatEventDate shows the weekday for the calendar date', () => {
  assert.match(formatEventDate('2026-11-27'), /Fri/)
})
