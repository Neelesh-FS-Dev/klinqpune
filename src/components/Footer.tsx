import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="site-footer__wordmark" aria-hidden="true">KLINQ</p>
        <div className="site-footer__grid">
          <div className="site-footer__col">
            <h2>Visit</h2>
            {BUSINESS.address.lines.map((l) => (
              <span key={l} style={{ display: 'block' }}>{l}</span>
            ))}
            <a href={BUSINESS.address.mapUrl} target="_blank" rel="noopener noreferrer">Directions ↗<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
          <div className="site-footer__col">
            <h2>Hours &amp; phone</h2>
            <span style={{ display: 'block' }}>{BUSINESS.hours.display}</span>
            {BUSINESS.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`}>{p.display}</a>
            ))}
          </div>
          <div className="site-footer__col">
            <h2>Explore</h2>
            <Link to="/experience">The Experience</Link>
            <Link to="/menu">Food &amp; Drinks</Link>
            <Link to="/events">What's On</Link>
            <Link to="/faces">Faces of KLINQ</Link>
            <Link to="/celebrate">Celebrate</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
          <div className="site-footer__col">
            <h2>Reserve</h2>
            <Link to="/visit#reserve">Reserve a Table</Link>
            <a href={BUSINESS.instagram.url} target="_blank" rel="noopener noreferrer">Instagram {BUSINESS.instagram.handle}<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
        <div className="site-footer__legal">
          <span>© KLINQ — Cocktails &amp; Cuisine. Business details from public listings, checked 27 Nov 2026.</span>
          <span>Independent creative concept by Codevirel Studio. Not commissioned, approved or launched by KLINQ.</span>
        </div>
      </div>
    </footer>
  )
}
