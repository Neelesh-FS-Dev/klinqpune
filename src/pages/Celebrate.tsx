import { BUSINESS } from '../data/business'
import { PHOTOS } from '../data/media'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { Picture } from '../components/Picture'

export function Celebrate() {
  useDocumentMeta('Celebrate at KLINQ · Viman Nagar, Pune', 'Social gatherings and special events at KLINQ. Call the restaurant to plan your evening.')
  return (
    <>
      <header className="page-hero container">
        <p className="chapter-num">Celebrate</p>
        <h1>Make the moment <em>yours.</em></h1>
        <p>KLINQ hosts social gatherings and special events. Packages, rates and capacities are not published, so the restaurant confirms them directly.</p>
      </header>
      <section className="section">
        <div className="container celebrate">
          <div>
            <h2>Tell us the occasion.</h2>
            <p>Call with your date, approximate group size and the occasion. The restaurant confirms what is possible.</p>
            <div className="celebrate__actions">
              {BUSINESS.phones.map((p, i) => (
                <a key={p.tel} className={i === 0 ? 'btn btn--solid' : 'btn'} href={`tel:${p.tel}`}>Call {p.display}</a>
              ))}
            </div>
          </div>
          <Picture photo={PHOTOS.pastParty} sizes="(min-width: 900px) 40vw, 100vw" />
        </div>
      </section>
    </>
  )
}
