import { useEffect, useRef, useState } from 'react'
import { usePageReady } from '../context/PageReadyContext'

export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const pageReady = usePageReady()

  useEffect(() => {
    if (!pageReady) {
      setRevealed(false)
      return undefined
    }

    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' }
    )

    const frame = requestAnimationFrame(() => observer.observe(el))

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [threshold, pageReady])

  return { ref, revealed }
}
