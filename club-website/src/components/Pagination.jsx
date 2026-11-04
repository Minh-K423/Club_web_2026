/** Page numbers to render, with `null` marking an ellipsis gap. */
function buildRange(page, pageCount) {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }

  const pages = new Set([1, pageCount, page])
  for (const offset of [-1, 1]) {
    const n = page + offset
    if (n > 1 && n < pageCount) pages.add(n)
  }

  const sorted = [...pages].sort((a, b) => a - b)
  const result = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push(null)
    result.push(sorted[i])
  }
  return result
}

export default function Pagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null

  const base =
    'flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition'

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`${base} border-gray-300 text-gray-700 hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:text-gray-700`}
      >
        ← Previous
      </button>

      {buildRange(page, pageCount).map((n, i) =>
        n === null ? (
          <span key={`gap-${i}`} className="px-1 text-gray-400" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange(n)}
            aria-current={n === page ? 'page' : undefined}
            className={
              n === page
                ? `${base} border-teal bg-teal text-white`
                : `${base} border-gray-300 text-gray-700 hover:border-teal hover:text-teal`
            }
          >
            {n}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        className={`${base} border-gray-300 text-gray-700 hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:text-gray-700`}
      >
        Next →
      </button>
    </nav>
  )
}
