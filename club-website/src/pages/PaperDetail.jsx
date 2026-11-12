import { Link, useParams } from 'react-router-dom'
import PaperBody from '../features/research/PaperBody'
import PaperNavigation from '../features/research/PaperNavigation'
import { getAdjacentPapers, getPaperBySlug, NO_PAPER_MESSAGE } from '../features/research/papers'
import { siteLinks } from '../navigation'

export default function PaperDetail() {
  const { slug } = useParams()
  const paper = getPaperBySlug(slug)

  if (!paper) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">{NO_PAPER_MESSAGE}</h1>
        <Link
          to={siteLinks.research.to}
          className="mt-8 inline-block rounded-lg bg-teal px-6 py-3 font-semibold text-white transition hover:bg-teal-dark"
        >
          ← Back to Research
        </Link>
      </section>
    )
  }

  const { previous, next } = getAdjacentPapers(paper.slug)

  return (
    <article>
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-4 text-sm text-gray-500">
          <Link to={siteLinks.home.to} className="transition hover:text-teal">
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link to={siteLinks.research.to} className="transition hover:text-teal">
            Research
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-gray-700">{paper.title}</span>
        </div>
      </div>

      {/* Title block */}
      <header className="border-b-4 border-teal bg-black text-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-teal px-2 py-1 font-semibold text-white">
              {paper.year}
            </span>
            {paper.featured && (
              <span className="rounded-full border border-teal px-2 py-1 font-semibold text-teal-light">
                Featured
              </span>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
            {paper.title}
          </h1>
          <p className="mt-4 text-gray-300">{paper.authors}</p>
          <p className="mt-1 text-sm text-gray-400">{paper.journal}</p>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <section className="rounded-2xl border-2 border-teal bg-teal/5 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-teal">
            Abstract
          </h2>
          <p className="mt-3 leading-relaxed text-gray-700">{paper.abstract}</p>
        </section>

        <PaperBody markdown={paper.body} />

        <div className="mt-12 flex flex-wrap gap-4">
          <button className="rounded-lg bg-teal px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-dark">
            Download PDF (placeholder)
          </button>
          <button className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-teal hover:text-teal">
            Cite (placeholder)
          </button>
        </div>

        <PaperNavigation previous={previous} next={next} />

        <div className="mt-10 text-center">
          <Link
            to={siteLinks.research.to}
            className="inline-block rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-teal hover:text-teal"
          >
            ← Back to all papers
          </Link>
        </div>
      </div>
    </article>
  )
}
