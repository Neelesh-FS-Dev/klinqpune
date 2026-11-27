import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { BUSINESS } from '../data/business'

const MAIN_LINKS = [
  { to: '/experience', label: 'The Experience' },
  { to: '/menu', label: 'Food & Drinks' },
  { to: '/events', label: "What's On" },
  { to: '/faces', label: 'Faces of KLINQ' },
]

export function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu on route change; closing restores focus to the toggle (native dialog behaviour).
  useEffect(() => {
    dialogRef.current?.close()
  }, [location.pathname])

  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    const onClose = () => {
      setOpen(false)
      document.documentElement.classList.remove('is-menu-open')
      toggleRef.current?.focus()
    }
    dlg.addEventListener('close', onClose)
    return () => dlg.removeEventListener('close', onClose)
  }, [])

  const openMenu = () => {
    dialogRef.current?.showModal()
    document.documentElement.classList.add('is-menu-open')
    setOpen(true)
  }

  return (
    <header className="site-header" data-solid={solid || open ? 'true' : 'false'}>
      <div className="container site-header__inner">
        <Logo />
        <nav className="nav-main" aria-label="Primary">
          {MAIN_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <NavLink to="/visit" className="btn btn--visit">
            Visit
          </NavLink>
          <Link className="btn btn--solid" to="/visit#reserve">
            Reserve a Table
          </Link>
          <button ref={toggleRef} className="nav-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={openMenu}>
            <span className="sr-only">Open menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 8h18M3 16h18" />
            </svg>
          </button>
        </div>
      </div>

      <dialog id="mobile-menu" ref={dialogRef} className="mobile-menu" aria-label="Site menu">
        <div className="mobile-menu__inner">
          <div className="mobile-menu__top">
            <Logo />
            <button type="button" className="nav-toggle" style={{ display: 'inline-flex' }} onClick={() => dialogRef.current?.close()}>
              <span className="sr-only">Close menu</span>
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile">
            {[...MAIN_LINKS, { to: '/celebrate', label: 'Celebrate' }, { to: '/gallery', label: 'Gallery' }, { to: '/visit', label: 'Visit' }].map((l) => (
              <NavLink key={l.to} to={l.to} onClick={() => dialogRef.current?.close()}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <Link className="btn btn--solid mobile-menu__cta" to="/visit#reserve" onClick={() => dialogRef.current?.close()}>
            Reserve a Table
          </Link>
          <p className="sr-only">Call {BUSINESS.phones[0].display}</p>
        </div>
      </dialog>
    </header>
  )
}
