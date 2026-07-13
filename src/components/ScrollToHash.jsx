import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToHashWhenReady } from '../utils/scrollToSection'

/** Scroll to top or hash target whenever route/hash changes (footer & nav section links) */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      return scrollToHashWhenReady(hash)
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
    return undefined
  }, [pathname, hash])

  return null
}
