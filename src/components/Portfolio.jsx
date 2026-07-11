import Reveal from './Reveal'
import { getCardRevealVariant } from '../utils/revealVariants'
import { CASE_STUDIES, getCaseStudyUrl } from '../constants/caseStudies'

function PreviewMockup({ type, gradient }) {
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

export default function Portfolio() {
  return (
    <section id="portfolio" className="page-section relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto section-header" variant="slide-top">
          <span className="section-label">Portfolio</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display">
            Our Recent Work
          </h2>
          <p className="mt-5 text-text-muted text-lg leading-relaxed">
            Explore our projects across Zoho, web, mobile, AI, and digital marketing.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {CASE_STUDIES.map((item, i) => {
            const caseStudyUrl = getCaseStudyUrl(item.slug)

            return (
              <Reveal key={item.slug} delay={i * 90} variant={getCardRevealVariant(i, 3)} className="h-full">
                <article className="portfolio-premium-card group h-full flex flex-col">
                  <a href={caseStudyUrl} className="portfolio-preview-wrap block">
                    <PreviewMockup type={item.preview} gradient={item.gradient} />
                    <div className="portfolio-preview-overlay">
                      <span className="portfolio-view-pill">Read Case Study</span>
                    </div>
                  </a>

                  <div className="portfolio-card-body flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="portfolio-industry-tag">{item.industry}</span>
                    </div>

                    <h3 className="text-xl font-bold text-text font-display mb-3 group-hover:text-[#355C7D] transition-colors">
                      <a href={caseStudyUrl} className="hover:text-[#355C7D] transition-colors">
                        {item.title}
                      </a>
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tech.map((tag) => (
                        <span key={tag} className="portfolio-tech-badge">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-text-muted text-sm leading-relaxed flex-1 mb-6">
                      {item.description}
                    </p>

                    <a href={caseStudyUrl} className="portfolio-details-btn">
                      Read Article
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
