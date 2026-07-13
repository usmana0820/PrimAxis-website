/** Fixed navbar offset (px) when scrolling to in-page sections */
export const NAV_SCROLL_OFFSET = 92

export function scrollToSection(sectionId, { behavior = 'smooth' } = {}) {
  if (!sectionId || sectionId === 'home') {
    window.scrollTo({ top: 0, behavior })
    return true
  }

  const el = document.getElementById(sectionId)
  if (!el) return false

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior })
  return true
}

export function scrollToHash(hash, options) {
  const id = (hash || '').replace(/^#/, '')
  return scrollToSection(id || 'home', options)
}

/** Retry until section exists (e.g. after route mount or loading screen) */
export function scrollToHashWhenReady(hash, { maxAttempts = 40, intervalMs = 75 } = {}) {
  let attempts = 0
  let timerId = null

  const run = () => {
    if (scrollToHash(hash, { behavior: attempts === 0 ? 'auto' : 'smooth' })) {
      return
    }
    attempts += 1
    if (attempts < maxAttempts) {
      timerId = window.setTimeout(run, intervalMs)
    }
  }

  run()

  return () => {
    if (timerId) window.clearTimeout(timerId)
  }
}
