import { useMemo, useState } from 'react'
import { getCaseStudyUrl } from '../constants/caseStudies'
import { Link } from 'react-router-dom'
import ImageLightbox from './ImageLightbox'

function RingThumb({ item, angle, active, onSelect }) {
  const visual = item.coverImage

  return (
    <button
      type="button"
      className={`portfolio-ring-item${active ? ' active' : ''}`}
      style={{ '--ring-angle': `${angle}deg` }}
      onClick={() => onSelect(item.slug)}
      aria-label={`View ${item.title}`}
      aria-pressed={active}
    >
      <span className="portfolio-ring-item-inner">
        {visual ? (
          <img src={visual} alt={item.title} />
        ) : (
          <span className={`portfolio-ring-gradient bg-gradient-to-br ${item.gradient}`} />
        )}
      </span>
      <span className="portfolio-ring-item-label">{item.title}</span>
    </button>
  )
}

export default function PortfolioRingGallery({ projects, activeSlug, onSelect }) {
  const ringItems = useMemo(() => projects.slice(0, 10), [projects])
  const activeProject = ringItems.find((p) => p.slug === activeSlug) || ringItems[0]
  const gallerySlides = activeProject?.galleryImages?.filter(Boolean) || []
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (ringItems.length === 0) return null

  return (
    <div className="portfolio-ring-section">
      <div className="portfolio-ring-orbit" aria-hidden="false">
        <div className="portfolio-ring-center">
          <span className="portfolio-ring-center-label">Explore</span>
          <strong>{activeProject?.title || 'Portfolio'}</strong>
          {activeProject && (
            <Link to={getCaseStudyUrl(activeProject.slug)} className="portfolio-ring-center-link">
              Open project →
            </Link>
          )}
        </div>

        <div className="portfolio-ring-carousel">
          <div className="portfolio-ring-track" />
          {ringItems.map((item, index) => (
            <RingThumb
              key={item.slug}
              item={item}
              angle={(360 / ringItems.length) * index - 90}
              active={item.slug === (activeSlug || ringItems[0]?.slug)}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      {gallerySlides.length > 0 && (
        <div className="portfolio-ring-gallery-row">
          <p className="portfolio-ring-gallery-label">Project gallery</p>
          <div className="portfolio-ring-gallery">
            {gallerySlides.map((img, i) => (
              <button
                key={`${activeProject.slug}-gallery-${i}`}
                type="button"
                className="portfolio-ring-gallery-thumb project-gallery-thumb"
                onClick={() => setLightboxIndex(i)}
                aria-label={`View ${activeProject.title} screenshot ${i + 1} full size`}
              >
                <img src={img} alt={`${activeProject.title} screenshot ${i + 1}`} />
              </button>
            ))}
          </div>
          <ImageLightbox
            images={gallerySlides}
            index={lightboxIndex}
            title={activeProject.title}
            onClose={() => setLightboxIndex(null)}
            onChangeIndex={setLightboxIndex}
          />
        </div>
      )}
    </div>
  )
}
