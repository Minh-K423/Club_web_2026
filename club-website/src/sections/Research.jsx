import { Link, useSearchParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import { papers, pageCount, getPapersForPage, PAPERS_PER_PAGE } from '../data/papers'

export default function Research() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read ?page=N, guarding against bad values and pages past the end
  const requested = Number.parseInt(searchParams.get('page') ?? '1', 10)
  const page =
    Number.isNaN(requested) || requested < 1 ? 1 : Math.min(requested, pageCount)

  const visible = getPapersForPage(page)
  const firstResult = (page - 1) * PAPERS_PER_PAGE + 1
  const lastResult = page * PAPERS_PER_PAGE

  function goToPage(n) {
    if (n < 1 || n > pageCount || n === page) return
    // Page 1 keeps a clean address: /research
    setSearchParams(n === 1 ? {} : { page: n })
  }

  return (
    <>
      {/* Page header */}
      <section className="border-b-4 border-teal bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-3xl font-bold md:text-5xl">
            Researching paper <span className="text-teal-light">/ Science paper</span>
          </h1>
          <p className="mt-4 max-w-2xl text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder
            introduction for the research section — replace with a description of
            your club's publications.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 pb-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold">All papers (placeholder)</h2>
          <p className="text-sm text-gray-500">
            Showing {firstResult}–{Math.min(lastResult, papers.length)} of{' '}
            {papers.length} papers · page {page} of {pageCount}
          </p>
        </div>

        {/* 4 columns x 3 rows = 12 papers per page */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((paper) => (
            <article
              key={paper.slug}
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
                <Link
                  to={`/research/${paper.slug}`}
                  className="transition hover:text-teal"
                >
                  {paper.title}
                </Link>
              </h3>

              <p className="mt-1 text-xs text-gray-500">{paper.journal}</p>
              <p className="mt-2 flex-1 text-sm text-gray-600">{paper.abstract}</p>

              <Link
                to={`/research/${paper.slug}`}
                className="mt-4 self-start text-sm font-medium text-teal transition hover:text-teal-dark"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>

        <Pagination page={page} pageCount={pageCount} onPageChange={goToPage} />
      </section>
    </>
  )
}
