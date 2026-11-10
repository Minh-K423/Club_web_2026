export const siteLinks = {
  home: { to: '/', label: 'Home' },
  research: { to: '/research', label: 'Researching paper / Science paper' },
  about: { to: '/about', label: 'About us' },
  competitions: { to: '/competitions', label: 'Competitions' },
}

export const exploreLinks = [siteLinks.research, siteLinks.about, siteLinks.competitions]
export const menuLinks = [siteLinks.home, ...exploreLinks]

export const paperRoute = `${siteLinks.research.to}/:slug`

export function paperPath(slug) {
  return `${siteLinks.research.to}/${slug}`
}
