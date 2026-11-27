import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'

// Secondary routes load on demand so the homepage stays light.
const Experience = lazy(() => import('./pages/Experience').then((m) => ({ default: m.Experience })))
const Menu = lazy(() => import('./pages/Menu').then((m) => ({ default: m.Menu })))
const Events = lazy(() => import('./pages/Events').then((m) => ({ default: m.Events })))
const Faces = lazy(() => import('./pages/Faces').then((m) => ({ default: m.Faces })))
const Celebrate = lazy(() => import('./pages/Celebrate').then((m) => ({ default: m.Celebrate })))
const Gallery = lazy(() => import('./pages/Gallery').then((m) => ({ default: m.Gallery })))
const Visit = lazy(() => import('./pages/Visit').then((m) => ({ default: m.Visit })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

export function App() {
  const { pathname, hash } = useLocation()

  // Smooth scrolling loads after the first paint, so it never delays the hero.
  useEffect(() => {
    let stop: (() => void) | undefined
    let cancelled = false
    void import('./motion/lenis').then(({ startSmoothScroll }) => {
      if (!cancelled) stop = startSmoothScroll()
    })
    return () => {
      cancelled = true
      stop?.()
    }
  }, [])

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
    } else {
      void import('./motion/lenis').then(({ scrollToTop }) => scrollToTop())
    }
  }, [pathname, hash])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="container" style={{ padding: '160px 0' }} role="status">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/food" element={<Menu />} />
            <Route path="/drinks" element={<Menu />} />
            <Route path="/events" element={<Events />} />
            <Route path="/faces" element={<Faces />} />
            <Route path="/celebrate" element={<Celebrate />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
