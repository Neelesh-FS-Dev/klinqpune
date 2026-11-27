import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export function NotFound() {
  useDocumentMeta('Page not found · KLINQ', 'This page does not exist.')
  return (
    <header className="page-hero container">
      <p className="chapter-num">404</p>
      <h1>This table is <em>empty.</em></h1>
      <p><Link className="btn" to="/">Back to the start</Link></p>
    </header>
  )
}
