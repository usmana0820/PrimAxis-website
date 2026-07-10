import { useEffect, useState } from 'react'
import { useReveal } from './useReveal'

export function useCountUp(end, duration = 2000, suffix = '') {
  const { ref, revealed } = useReveal(0.3)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!revealed) return

    const numericEnd = parseInt(end, 10)
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * numericEnd))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [revealed, end, duration])

  return { ref, display: `${value}${suffix}` }
}
