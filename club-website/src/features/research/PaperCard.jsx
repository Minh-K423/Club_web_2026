import { Link } from 'react-router-dom'
import { paperPath } from '../../navigation'

export default function PaperCard({ paper }) {
  const url = paperPath(paper.slug)

  return (
    <article
      className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-teal hover:shadow-lg"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <span className="rounded-full bg-teal/10 px-2 py-1 font-medium text-teal">
          {paper.year}
        </span>
        {paper.featured && (
          <span className="rounded-full bg-teal px-2 py-1 font-semibold text-white">
            Featured
          </span>
        )}
      </div>

      <h3 className="mt-3 font-semibold leading-snug">
        <Link to={url} className="transition hover:text-teal">
          {paper.title}
        </Link>
      </h3>

      <p className="mt-1 text-xs text-gray-500">{paper.journal}</p>
      <p className="mt-2 flex-1 text-sm text-gray-600">{paper.abstract}</p>

      <Link
        to={url}
        className="mt-4 self-start text-sm font-medium text-teal transition hover:text-teal-dark"
      >
        Read more →
      </Link>
    </article>
  )
}
