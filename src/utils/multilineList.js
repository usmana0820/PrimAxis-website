/** Split textarea content into list items (one per non-empty line; blank lines ignored). */
export function parseMultilineList(text) {
  if (!text) return []
  return String(text)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

/** Join list items for textarea display. */
export function formatMultilineList(items) {
  return (items || []).filter(Boolean).join('\n')
}

/** Append parsed lines from bulk paste; skips duplicates already in list. */
export function mergeMultilineList(existing, text) {
  const incoming = parseMultilineList(text)
  if (!incoming.length) return existing || []
  const seen = new Set((existing || []).map((item) => item.toLowerCase()))
  const merged = [...(existing || [])]
  incoming.forEach((item) => {
    const key = item.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      merged.push(item)
    }
  })
  return merged
}
