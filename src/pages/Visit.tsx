import { BUSINESS } from '../data/business'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { ReserveList } from '../components/ReserveCTA'

export function Visit() {
  useDocumentMeta('Visit · KLINQ, Viman Nagar, Pune', 'Address, phone numbers, opening hours, directions and reservation options for KLINQ — Cocktails & Cuisine.')
  return (
    <>
      <header className="page-hero container">
        <p className="chapter-num">Visit</p>
        <h1>Find us in <em>Viman Nagar.</em></h1>
        <p>Address, hours and phone numbers as published on the restaurant's listings. Book through one of the links below, or call.</p>
      </header>
      <section className="section">
        <div className="container visit-grid">
          <div className="visit-block">
            <h2>Address</h2>
            <address>
              {BUSINESS.address.lines.map((l) => <span key={l} style={{ display: 'block' }}>{l}</span>)}
            </address>
            <p style={{ marginTop: 16 }}>
              <a className="btn" href={BUSINESS.address.mapUrl} target="_blank" rel="noopener noreferrer">Get directions<span className="sr-only"> (opens in a new tab)</span> ↗</a>
            </p>
          </div>
          <div className="visit-block">
            <h2>Hours</h2>
            <p>{BUSINESS.hours.display}</p>
            <p className="chapter-num" style={{ marginTop: 10 }}>Verified against three listings on 27 Nov 2026. Confirm before you travel.</p>
          </div>
          <div className="visit-block">
            <h2>Phone</h2>
            {BUSINESS.phones.map((p) => (
              <p key={p.tel}><a href={`tel:${p.tel}`}>{p.display}</a></p>
            ))}
          </div>
          <div className="visit-block" id="reserve">
            <h2>Reserve a table</h2>
            <p>Reservations are handled by these platforms. KLINQ's own booking page is not available yet.</p>
            <ReserveList />
          </div>
          <div className="visit-block">
            <h2>Good to know</h2>
            <p>Dining: indoor and outdoor seating, rooftop dining, live music at weekends.</p>
            <p>Dietary options listed on Swiggy: {BUSINESS.dietaryListed.join(', ')}. Confirm with the restaurant.</p>
            <p>Parking, valet, accessibility and dress code are not confirmed here. Please call ahead.</p>
          </div>
          <div className="visit-block">
            <h2>Instagram</h2>
            <p><a href={BUSINESS.instagram.url} target="_blank" rel="noopener noreferrer">{BUSINESS.instagram.handle}<span className="sr-only"> (opens in a new tab)</span></a></p>
          </div>
        </div>
      </section>
    </>
  )
}
