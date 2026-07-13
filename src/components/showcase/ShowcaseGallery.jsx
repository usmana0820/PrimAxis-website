import { useRef, useState } from 'react'

export default function ShowcaseGallery({ images, title }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const slides = images.filter(Boolean)

  if (!slides.length) return null

  const scrollTo = (next) => {
    const clamped = Math.max(0, Math.min(next, slides.length - 1))
    setIndex(clamped)
    const track = trackRef.current
    if (!track) return
    const slide = track.children[clamped]
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <div className="cs-showcase-gallery">
      <button
        type="button"
        className="cs-showcase-gallery-nav cs-showcase-gallery-nav-prev"
        onClick={() => scrollTo(index - 1)}
        disabled={index === 0}
        aria-label="Previous screenshot"
      >
        ‹
      </button>

      <div className="cs-showcase-gallery-track" ref={trackRef}>
        {slides.map((img, i) => (
          <figure key={img} className="cs-showcase-gallery-slide">
            <img src={img} alt={`${title} screenshot ${i + 1}`} />
          </figure>
        ))}
      </div>

      <button
        type="button"
        className="cs-showcase-gallery-nav cs-showcase-gallery-nav-next"
        onClick={() => scrollTo(index + 1)}
        disabled={index >= slides.length - 1}
        aria-label="Next screenshot"
      >
        ›
      </button>

      <div className="cs-showcase-gallery-dots">
        {slides.map((img, i) => (
          <button
            key={img}
            type="button"
            className={`cs-showcase-gallery-dot${i === index ? ' active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to screenshot ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
