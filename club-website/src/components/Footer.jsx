import { Link } from 'react-router-dom'

const exploreLinks = [
  { to: '/research', label: 'Researching paper / Science paper' },
  { to: '/about', label: 'About us' },
  { to: '/competitions', label: 'Competitions' },
]

export default function Footer() {
  return (
    <footer className="border-t-4 border-teal bg-black text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <Link to="/about" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-lg font-bold text-white">
              C
            </span>
            <span className="text-lg font-semibold">Club Name</span>
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder
            text — replace with your club description.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-light">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            {exploreLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="transition hover:text-teal-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-light">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li>Email: placeholder@club.com</li>
            <li>Location: Placeholder Hall, Room 101</li>
            <li>Meeting: Fridays, 17:00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Club Name. All rights reserved. — Placeholder footer
      </div>
    </footer>
  )
}
