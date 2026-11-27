# Event content guide

Written for: whoever maintains the site after launch.

## Where events live
`src/data/events.ts` is the only source. Each entry needs:
- `startDate` and `endDate` as `YYYY-MM-DD`, Asia/Kolkata calendar dates.
- `startTime` in 24-hour form, for the audit trail.
- `source`: a published URL (Instagram post or listing). Required.
- `lastVerifiedAt`: the date you last checked the source.

## Status rules
Computed in `src/lib/events.ts` from today's Asia/Kolkata date:
- **On now:** today is between `startDate` and `endDate`, inclusive.
- **Upcoming:** `startDate` is in the future.
- **Past:** `endDate` has passed. Past events show in "Past moments" and are never labelled upcoming.

The date check uses a calendar-date string comparison, so a late-evening visitor in another timezone does not see yesterday's show as live.

## Weekly routine
1. Open the restaurant's Instagram and the three listings.
2. Add or update entries. Remove an event only after it has ended.
3. Update `lastVerifiedAt`.
4. Run `npm test` (the status logic has unit tests).
5. Rebuild and deploy.

## Rules
- Do not add an event without a published source.
- Do not infer a recurring schedule. Weekend lineups are one-off posts.
- Do not show ticket prices, entry fees, guest lists or DJ names that are not published.
- Past photographs without a confirmed date go in the gallery, not the events list.
- Keep the "Reservations" line on each event pointing at the confirmed phone number.
