import { Link } from 'react-router-dom'
import { getCaseStudyUrl } from '../constants/caseStudies'
import ProjectLinkActions from './ProjectLinkActions'

export function PreviewMockup({ type, gradient }) {
  return (
    <div className={`portfolio-preview-inner bg-gradient-to-br ${gradient}`}>
      <div className="portfolio-browser-bar">
        <span className="portfolio-dot bg-red-400/90" />
        <span className="portfolio-dot bg-amber-400/90" />
        <span className="portfolio-dot bg-emerald-400/90" />
        <div className="portfolio-url-bar" />
      </div>

      <div className="portfolio-preview-content">
        {type === 'dashboard' && (
          <>
            <div className="portfolio-sidebar">
              <div className="portfolio-sidebar-item active" />
              <div className="portfolio-sidebar-item" />
              <div className="portfolio-sidebar-item" />
              <div className="portfolio-sidebar-item" />
            </div>
            <div className="portfolio-main">
              <div className="portfolio-stat-row">
                <div className="portfolio-stat-card" />
                <div className="portfolio-stat-card" />
                <div className="portfolio-stat-card" />
              </div>
              <div className="portfolio-chart-area">
                <div className="portfolio-chart-bars">
                  {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {type === 'crm' && (
          <>
            <div className="portfolio-crm-header" />
            <div className="portfolio-crm-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="portfolio-crm-card">
                  <div className="portfolio-crm-avatar" />
                  <div className="portfolio-crm-lines">
                    <span /><span />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {type === 'erp' && (
          <>
            <div className="portfolio-erp-top">
              <div className="portfolio-erp-pill" />
              <div className="portfolio-erp-pill short" />
            </div>
            <div className="portfolio-erp-table">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="portfolio-erp-row">
                  <span /><span /><span /><span className="wide" />
                </div>
              ))}
            </div>
          </>
        )}

        {type === 'mobile' && (
          <div className="portfolio-phone">
            <div className="portfolio-phone-notch" />
            <div className="portfolio-phone-screen">
              <div className="portfolio-phone-header" />
              <div className="portfolio-phone-card" />
              <div className="portfolio-phone-card short" />
              <div className="portfolio-phone-btn" />
            </div>
          </div>
        )}

        {type === 'web' && (
          <>
            <div className="portfolio-web-hero" />
            <div className="portfolio-web-cards">
              <div className="portfolio-web-card" />
              <div className="portfolio-web-card" />
              <div className="portfolio-web-card" />
            </div>
          </>
        )}

        {type === 'analytics' && (
          <>
            <div className="portfolio-analytics-header">
              <div className="portfolio-analytics-title" />
              <div className="portfolio-analytics-badge" />
            </div>
            <div className="portfolio-analytics-body">
              <div className="portfolio-donut" />
              <div className="portfolio-line-chart">
                <svg viewBox="0 0 120 40" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="2"
                    points="0,35 20,28 40,32 60,18 80,22 100,8 120,12"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function PortfolioCard({ item, compact = false }) {
  const caseStudyUrl = getCaseStudyUrl(item.slug)
  const blurb = item.description || item.shortDescription || 'Project description will appear here.'

  return (
    <article className={`portfolio-premium-card portfolio-premium-card-minimal tilt-card-surface group h-full flex flex-col${compact ? ' portfolio-premium-card-compact' : ''}`}>
      <Link to={caseStudyUrl} className="portfolio-preview-wrap block">
        {item.coverImage ? (
          <img src={item.coverImage} alt={item.title} className="portfolio-cover-image" loading="lazy" />
        ) : (
          <PreviewMockup type={item.preview} gradient={item.gradient} />
        )}
        <div className="portfolio-preview-border" aria-hidden="true" />
        <div className="portfolio-preview-overlay">
          <span className="portfolio-view-pill">View Case Study</span>
        </div>
        {item.isSample ? (
          <span className="portfolio-card-badge portfolio-card-badge-sample">Sample</span>
        ) : item.featured ? (
          <span className="portfolio-card-badge portfolio-card-badge-featured">Featured</span>
        ) : item.fromCms ? (
          <span className="portfolio-card-badge">New</span>
        ) : null}
      </Link>

      <div className="portfolio-card-body flex flex-col flex-1">
        <span className="portfolio-industry-tag">{item.industry || 'Industry'}</span>

        <h3 className="portfolio-card-title">
          <Link to={caseStudyUrl}>{item.title || 'Project Title'}</Link>
        </h3>

        <p className="portfolio-card-summary">{blurb}</p>

        <ProjectLinkActions
          liveDemoUrl={item.liveDemoUrl}
          githubUrl={item.githubUrl}
          className="mb-3"
        />

        <Link to={caseStudyUrl} className="portfolio-details-btn mt-auto">
          View Case Study
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
