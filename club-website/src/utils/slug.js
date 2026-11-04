/**
 * Convert a title into a URL-safe slug.
 * "Thermal Drift Compensation" -> "thermal-drift-compensation"
 */
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/['\u2019]/g, '') // drop apostrophes: "don't" -> "dont"
    .replace(/[^a-z0-9]+/g, '-') // anything else becomes a dash
    .replace(/^-+|-+$/g, '') // trim leading/trailing dashes
}
