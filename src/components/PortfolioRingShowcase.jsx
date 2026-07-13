import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { LOGO_SRC, BRAND_SHORT } from '../constants/branding'
import { getCaseStudyUrl } from '../constants/caseStudies'

function RingThumb({ item, angle, active, onSelect }) {
  return (
    <button
      type="button"
      className={`portfolio-ring-item${active ? ' active' : ''}${item.featured ? ' featured' : ''}`}
      style={{ '--ring-angle': `${angle}deg` }}
      onClick={() => onSelect(item.slug)}
      aria-label={`View ${item.title}`}
      aria-pressed={active}
    >
      {item.featured && <span className="portfolio-ring-featured-badge">Featured</span>}
      <span className="portfolio-ring-item-inner">
        {item.coverImage ? (
          <img src={item.coverImage} alt={item.title} />
        ) : (
          <span className={`portfolio-ring-gradient bg-gradient-to-br ${item.gradient}`} />
        )}
      </span>
      <span className="portfolio-ring-item-label">{item.title}</span>
      <span className="portfolio-ring-item-tag">{item.category}</span>
    </button>
  )
}

function DetailPanel({ project }) {
  if (!project) return null

  return (
    <aside className="portfolio-detail-panel portfolio-detail-panel-v2">
      <div className="portfolio-detail-panel-media">
        {project.coverImage ? (
          <img src={project.coverImage} alt={project.title} />
        ) : (
          <div className={`portfolio-detail-panel-fallback bg-gradient-to-br ${project.gradient}`} />
        )}
      </div>
      <div className="portfolio-detail-panel-body">
        <div className="portfolio-detail-panel-head">
          <h3>{project.title}</h3>
          {project.featured && <span className="portfolio-detail-featured">Featured</span>}
        </div>
        <p className="portfolio-detail-industry">{project.industry}</p>
        <p className="portfolio-detail-desc">{project.description || project.shortDescription}</p>
        {project.result && (
          <p className="portfolio-detail-result-line">{project.result}</p>
        )}
        <Link to={getCaseStudyUrl(project.slug)} className="portfolio-detail-cta">
          View Case Study →
        </Link>
      </div>
    </aside>
  )
}

export default function PortfolioRingShowcase({ projects }) {
  const [activeSlug, setActiveSlug] = useState(null)

  const ringItems = useMemo(() => projects.slice(0, 8), [projects])

  const activeProject = useMemo(() => {
    if (!ringItems.length) return null
    if (activeSlug) {
      return ringItems.find((p) => p.slug === activeSlug) || ringItems[0]
    }
    return ringItems[0]
  }, [ringItems, activeSlug])

  useEffect(() => {
    if (ringItems.length && !ringItems.some((p) => p.slug === activeSlug)) {
      setActiveSlug(ringItems[0]?.slug ?? null)
    }
  }, [ringItems, activeSlug])

  if (ringItems.length === 0) return null

  return (
    <section className="cs-preview-section">
      <div className="cs-preview-container">
        <Reveal>
          <header className="cs-preview-section-intro">
            <span className="cs-preview-label">Interactive Gallery</span>
            <h2 className="cs-preview-section-head">Explore Our Work</h2>
            <p className="cs-preview-section-sub">
              Auto-rotating project ring — hover to pause, click any case to preview
            </p>
          </header>
        </Reveal>

        <Reveal delay={60}>
          <div className="portfolio-showcase-stage portfolio-showcase-stage-compact cs-preview-ring-stage">
            <div className="portfolio-showcase-ring-wrap">
              <div className="portfolio-ring-orbit portfolio-ring-orbit-lg">
                <div className="portfolio-showcase-hub">
                  <img src={LOGO_SRC} alt={BRAND_SHORT} className="portfolio-showcase-hub-logo" />
                  <span className="portfolio-showcase-hub-brand">{BRAND_SHORT}</span>
                  <strong>{projects.length}+ Successful Projects</strong>
                  <span className="portfolio-showcase-hub-hint">Click a project to preview</span>
                </div>

                <div className="portfolio-ring-carousel" aria-hidden="false">
                  <div className="portfolio-ring-track" />
                  {ringItems.map((item, index) => (
                    <RingThumb
                      key={item.slug}
                      item={item}
                      angle={(360 / ringItems.length) * index - 90}
                      active={item.slug === activeProject?.slug}
                      onSelect={setActiveSlug}
                    />
                  ))}
                </div>
              </div>

              <p className="portfolio-showcase-hints">
                <span>Auto-rotating gallery</span>
                <span>Hover to pause</span>
                <span>Click to preview</span>
              </p>
            </div>

            <DetailPanel project={activeProject} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
