import { BUSINESS } from '../data/business'

/** Three genuine booking destinations. No fake availability or booking calendar. */
export function ReserveList() {
  return (
    <ul className="reserve-list" aria-label="Reservation options">
      {BUSINESS.reservations.map((r) => (
        <li key={r.url}>
          <a href={r.url} target="_blank" rel="noopener noreferrer">
            <span>
              {r.label}
              <small> · {r.note}</small>
            </span>
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
      <li>
        <a href={`tel:${BUSINESS.phones[0].tel}`}>
          <span>Call to reserve · {BUSINESS.phones[0].display}</span>
          <span aria-hidden="true">→</span>
        </a>
      </li>
    </ul>
  )
}
