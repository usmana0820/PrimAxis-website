/** Trim and ensure https for optional project links. */
export function normalizeExternalUrl(value) {
  const trimmed = String(value ?? '').trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}
