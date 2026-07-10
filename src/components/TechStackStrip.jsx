import { useRef, useEffect, useState, useCallback } from 'react'
import { TECH_STACK } from '../constants/techStack'
import TechIcon from './TechIcon'

function TechPill({ tech, variant = 'light' }) {
  return (
    <div className={`tech-pill tech-pill-${variant} shrink-0`}>
      <div className="tech-pill-icon">
        <TechIcon name={tech.name} icon={tech.icon} size={22} />
      </div>
      <span className="tech-pill-name">{tech.name}</span>
    </div>
  )
}

export default function TechStackStrip({ variant = 'dark', showLabel = true }) {
  const viewportRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const rafRef = useRef(null)

  const loopScroll = useCallback(() => {
    const el = viewportRef.current
    if (!el) return

    if (!paused) {
      el.scrollLeft += 0.6
      const loopPoint = el.scrollWidth / 3
      if (el.scrollLeft >= loopPoint * 2) {
        el.scrollLeft -= loopPoint
      }
    }
    rafRef.current = requestAnimationFrame(loopScroll)
  }, [paused])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loopScroll)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [loopScroll])

  const scrollBy = (direction) => {
    const el = viewportRef.current
    if (!el) return
    setPaused(true)
    el.scrollBy({ left: direction * 260, behavior: 'smooth' })
    window.setTimeout(() => setPaused(false), 1200)
  }

  const items = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK]

  return (
    <div className={`tech-stack-strip tech-stack-strip-${variant} theme-dark`}>
      {showLabel && (
        <p className="tech-stack-strip-label">Technology Stack</p>
      )}

      <div
        className="tech-stack-strip-inner"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          type="button"
          className="tech-stack-strip-arrow tech-stack-strip-arrow-prev"
          onClick={() => scrollBy(-1)}
          aria-label="Previous technologies"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="tech-stack-strip-glow-left" />
        <div className="tech-stack-strip-glow-right" />

        <div ref={viewportRef} className="tech-stack-strip-viewport">
          <div className="tech-stack-strip-track">
            {items.map((tech, i) => (
              <TechPill key={`${tech.name}-${i}`} tech={tech} variant={variant} />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="tech-stack-strip-arrow tech-stack-strip-arrow-next"
          onClick={() => scrollBy(1)}
          aria-label="Next technologies"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
