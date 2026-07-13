import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

let aosInitialized = false

export function initAos() {
  if (aosInitialized) return
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 72,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  })
  aosInitialized = true
}

/** Refresh AOS after route changes and dynamic content */
export function useAosRefresh() {
  const { pathname } = useLocation()

  useEffect(() => {
    initAos()
    const frame = requestAnimationFrame(() => {
      AOS.refreshHard()
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])
}
