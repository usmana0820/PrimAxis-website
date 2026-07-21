import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

export default function ImageLightbox({ images, index, title = 'Project', onClose, onChangeIndex }) {
  const slides = images.filter(Boolean)
  const current = slides[index]

  const goPrev = useCallback(() => {
    if (slides.length <= 1) return
    onChangeIndex((index - 1 + slides.length) % slides.length)
  }, [index, onChangeIndex, slides.length])

  const goNext = useCallback(() => {
    if (slides.length <= 1) return
    onChangeIndex((index + 1) % slides.length)
  }, [index, onChangeIndex, slides.length])

  useEffect(() => {
    if (index == null || !current) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [index, current, onClose, goPrev, goNext])

  if (index == null || !current) return null

  return createPortal(
    <div
      className="project-gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery full view`}
      onClick={onClose}
    >
      <div className="project-gallery-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="project-gallery-lightbox-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {slides.length > 1 && (
          <button type="button" className="project-gallery-lightbox-nav prev" onClick={goPrev} aria-label="Previous image">
            ‹
          </button>
        )}

        <figure className="project-gallery-lightbox-figure">
          <img src={current} alt={`${title} screenshot ${index + 1}`} />
          <figcaption>
            {index + 1} / {slides.length}
          </figcaption>
        </figure>

        {slides.length > 1 && (
          <button type="button" className="project-gallery-lightbox-nav next" onClick={goNext} aria-label="Next image">
            ›
          </button>
        )}
      </div>
    </div>,
    document.body
  )
}
