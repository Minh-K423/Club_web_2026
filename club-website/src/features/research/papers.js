import { slugify } from '../../utils/slug'
import { paperRecords } from './paperRecords'
import { buildSamplePaperBody } from './samplePaperBody'

/** Papers shown per page — a 4-column x 3-row grid. */
export const PAPERS_PER_PAGE = 12

/** Catalog entries with URL slugs and Markdown bodies. */
export const papers = paperRecords.map((paper, i) => ({
  ...paper,
  id: i + 1,
  slug: slugify(paper.title),
  body: buildSamplePaperBody(paper.title),
}))

export const pageCount = Math.max(1, Math.ceil(papers.length / PAPERS_PER_PAGE))

/** Look up a single paper by its URL slug. */
export function getPaperBySlug(slug) {
  return papers.find((paper) => paper.slug === slug)
}

/** The slice of papers to show on a given 1-based page. */
export function getPapersForPage(page) {
  const start = (page - 1) * PAPERS_PER_PAGE
  return papers.slice(start, start + PAPERS_PER_PAGE)
}

/** The paper before / after the given slug, for the reading page footer. */
export function getAdjacentPapers(slug) {
  const index = papers.findIndex((paper) => paper.slug === slug)
  return {
    previous: index > 0 ? papers[index - 1] : null,
    next: index >= 0 && index < papers.length - 1 ? papers[index + 1] : null,
  }
}
