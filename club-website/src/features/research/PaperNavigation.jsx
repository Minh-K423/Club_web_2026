import { Link } from 'react-router-dom'
import { paperPath } from '../../navigation'

export default function PaperNavigation({ previous, next }) {
  return (
    <nav className="mt-14 grid gap-4 border-t border-gray-200 pt-8 sm:grid-cols-2">
      {previous ? (
        <Link
          to={paperPath(previous.slug)}
          className="group rounded-xl border border-gray-200 p-4 transition hover:border-teal"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400">
            ← Previous
          </span>
          <span className="mt-1 block font-medium transition group-hover:text-teal">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next && (
        <Link
          to={paperPath(next.slug)}
          className="group rounded-xl border border-gray-200 p-4 text-right transition hover:border-teal"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400">
            Next →
          </span>
          <span className="mt-1 block font-medium transition group-hover:text-teal">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  )
}
