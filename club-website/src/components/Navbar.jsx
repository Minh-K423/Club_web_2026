import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { club } from '../data/club'
import { menuLinks, siteLinks } from '../navigation'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Close the dropdown on outside click or Escape key
  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    function onEscape(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to={siteLinks.home.to}
          className="flex items-center gap-3"
          aria-label={`${club.name} — go to Home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-lg font-bold text-white">
            {club.mark}
          </span>
          <span className="text-lg font-semibold tracking-wide">{club.name}</span>
        </Link>

        {/* Dropdown menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={open}
            className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium transition hover:border-teal hover:text-teal-light"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
            Menu
            <svg
              className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {open && (
            <ul className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-gray-100 bg-white text-ink shadow-2xl">
              {menuLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === siteLinks.home.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex w-full items-center justify-between gap-2 border-l-4 px-4 py-3 text-left text-sm transition ${
                        isActive
                          ? 'border-teal bg-teal/10 font-semibold text-teal'
                          : 'border-transparent hover:border-teal hover:bg-teal/10 hover:text-teal'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && (
                          <span
                            className="h-2 w-2 shrink-0 rounded-full bg-teal"
                            aria-hidden="true"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  )
}
