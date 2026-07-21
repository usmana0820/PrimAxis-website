import { useState } from 'react'
import ImageLightbox from './ImageLightbox'

export default function ProjectGalleryGrid({
  images = [],
  title = 'Project',
  className = 'cs-preview-gallery-grid',
  itemClassName = 'project-gallery-thumb',
}) {
  const slides = images.filter(Boolean)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!slides.length) return null

  return (
    <>
      <div className={className}>
        {slides.map((img, i) => (
          <button
            key={`${img}-${i}`}
            type="button"
            className={itemClassName}
            onClick={() => setLightboxIndex(i)}
            aria-label={`View ${title} screenshot ${i + 1} full size`}
          >
            <img src={img} alt={`${title} screenshot ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      <ImageLightbox
        images={slides}
        index={lightboxIndex}
        title={title}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </>
  )
}
