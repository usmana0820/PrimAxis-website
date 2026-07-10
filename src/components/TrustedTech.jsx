import { useRef, useEffect, useState, useCallback } from 'react'
import { TECH_STACK } from '../constants/techStack'
import TechIcon from './TechIcon'

function TechCard({ tech }) {
  return (
    <div className="tech-marquee-card group shrink-0">
      <div className="flex items-center gap-3.5 px-5 py-3.5 min-w-[172px]">
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 transition-all duration-300 group-hover:scale-105 group-hover:border-slate-200">
          <TechIcon name={tech.name} icon={tech.icon} size={28} />
        </div>
        <span className="text-sm font-semibold text-text whitespace-nowrap">{tech.name}</span>
      </div>
    </div>
  )
}

export default function TrustedTech() {
  const viewportRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const rafRef = useRef(null)

  const loopScroll = useCallback(() => {
    const el = viewportRef.current
    if (!el) return

    if (!paused) {
      el.scrollLeft += 0.75
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
    el.scrollBy({ left: direction * 300, behavior: 'smooth' })
    window.setTimeout(() => setPaused(false), 1200)
  }

  const items = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK]

  return (
    <section className="page-section overflow-hidden relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted mb-4">
          Technology Stack
        </p>

        <div className="tech-tag-flow-divider" aria-hidden="true">
          <div className="tech-tag-flow-track" />
          <div className="tech-tag-flow-beam" />
        </div>

        <h2 className="text-center text-xl sm:text-2xl font-bold text-text tracking-tight font-display mt-5">
          Built With Industry-Leading Tools
        </h2>
      </div>

      <div
        className="relative tech-slider-shell max-w-7xl mx-auto px-12 sm:px-16 pb-6 lg:pb-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <button
          type="button"
          className="tech-slider-arrow tech-slider-arrow-prev"
          onClick={() => scrollBy(-1)}
          aria-label="Previous technologies"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="relative">
          <div className="edge-glow-left" />
          <div className="edge-glow-right" />

          <div ref={viewportRef} className="tech-slider-viewport">
            <div className="tech-slider-track">
              {items.map((tech, i) => (
                <TechCard key={`${tech.name}-${i}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="tech-slider-arrow tech-slider-arrow-next"
          onClick={() => scrollBy(1)}
          aria-label="Next technologies"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
