import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Pagination from '../components/Pagination'
import PaperCard from '../features/research/PaperCard'
import {
  getPapersForPage,
  NO_PAPER_MESSAGE,
  pageCount,
  papers,
  PAPERS_PER_PAGE,
} from '../features/research/papers'

export default function Research() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read ?page=N, guarding against bad values and pages past the end
  const requestedPage = Number.parseInt(searchParams.get('page') ?? '1', 10)
  const page =
    Number.isNaN(requestedPage) || requestedPage < 1
      ? 1
      : Math.min(requestedPage, pageCount)

  const visiblePapers = getPapersForPage(page)
  const firstResult = (page - 1) * PAPERS_PER_PAGE + 1
  const lastResult = page * PAPERS_PER_PAGE

  function goToPage(nextPage) {
    if (nextPage < 1 || nextPage > pageCount || nextPage === page) return
    // Page 1 keeps a clean address: /research
    setSearchParams(nextPage === 1 ? {} : { page: nextPage })
  }

  return (
    <>
      <PageHeader
        title={
          <>
            Researching paper <span className="text-teal-light">/ Science paper</span>
          </>
        }
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder
        introduction for the research section — replace with a description of
        your club's publications.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-4 py-12 pb-16">
        {papers.length === 0 ? (
          <h2 className="text-center text-2xl font-bold">{NO_PAPER_MESSAGE}</h2>
        ) : (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-2xl font-bold">All papers (placeholder)</h2>
              <p className="text-sm text-gray-500">
                Showing {firstResult}–{Math.min(lastResult, papers.length)} of{' '}
                {papers.length} papers · page {page} of {pageCount}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visiblePapers.map((paper) => (
                <PaperCard key={paper.slug} paper={paper} />
              ))}
            </div>

            <Pagination page={page} pageCount={pageCount} onPageChange={goToPage} />
          </>
        )}
      </section>
    </>
  )
}
