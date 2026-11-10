import { Link } from 'react-router-dom'
import { club } from '../data/club'
import { exploreLinks, siteLinks } from '../navigation'

export default function Footer() {
  return (
    <footer className="border-t-4 border-teal bg-black text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <Link to={siteLinks.about.to} className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-lg font-bold text-white">
              {club.mark}
            </span>
            <span className="text-lg font-semibold">{club.name}</span>
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            {club.description}
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
            <li>{`Email: ${club.contact.email}`}</li>
            <li>{`Location: ${club.contact.location}`}</li>
            <li>{`Meeting: ${club.contact.meeting}`}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()}{` ${club.name}. All rights reserved. — Placeholder footer`}
      </div>
    </footer>
  )
}
