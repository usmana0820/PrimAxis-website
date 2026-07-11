import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import ResourceLiveChat from '../components/ResourceLiveChat'
import { CASE_STUDIES, getCaseStudyUrl } from '../constants/caseStudies'

export default function CaseStudies() {
  const featured = CASE_STUDIES[0]
  const rest = CASE_STUDIES.slice(1)

  return (
    <PageShell
      heroVariant="case-study"
      badge="Case Studies"
      title="Real Projects. Measurable Outcomes."
      description="Explore how we solve business challenges with Zoho, custom software, mobile apps, and AI — including technologies used and proven results."
    >
      {/* White — stats & featured */}
      <section className="page-section relative overflow-hidden section-light-theme">
        <div className="section-light-mesh" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="resource-stats-strip">
              <div className="resource-stat">
                <span className="resource-stat-value">50+</span>
                <span className="resource-stat-label">Projects Delivered</span>
              </div>
              <div className="resource-stat">
                <span className="resource-stat-value">10+</span>
                <span className="resource-stat-label">Industries Served</span>
              </div>
              <div className="resource-stat">
                <span className="resource-stat-value">99%</span>
                <span className="resource-stat-label">Client Satisfaction</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <a href={getCaseStudyUrl(featured.slug)} className="resource-featured resource-featured-case group">
              <div className={`resource-featured-accent bg-gradient-to-r ${featured.gradient}`} />
              <div className="resource-featured-body">
                <span className="resource-chip">Featured Case Study · {featured.industry}</span>
                <h2 className="resource-featured-title">{featured.title}</h2>
                <p className="resource-featured-client">{featured.client}</p>
                <p className="resource-featured-excerpt">{featured.summary}</p>
                <div className="resource-case-result">{featured.result}</div>
                <span className="resource-read-link">Read Case Study →</span>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Blue — case study grid & live chat */}
      <section className="page-section relative overflow-hidden section-blue-theme">
        <div className="section-blue-pattern" aria-hidden="true" />
        <div className="section-blue-glow section-blue-glow-left" aria-hidden="true" />
        <div className="section-blue-glow section-blue-glow-right" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto section-header">
            <span className="section-label section-label-on-dark">Portfolio</span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              More Success Stories
            </h2>
            <p className="mt-4 text-white/70 text-base leading-relaxed">
              Real projects across Zoho, web, mobile, and AI with measurable business impact.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {rest.map((study, i) => (
              <Reveal key={study.slug} delay={i * 70} variant="scale">
                <a href={getCaseStudyUrl(study.slug)} className="resource-card resource-card-case group h-full">
                  <div className={`resource-card-accent bg-gradient-to-r ${study.gradient}`} />
                  <span className="resource-chip">{study.industry}</span>
                  <h2 className="resource-card-title">{study.title}</h2>
                  <p className="resource-card-client">{study.client}</p>
                  <p className="resource-card-service">{study.service}</p>
                  <p className="resource-card-excerpt">{study.summary}</p>
                  <div className="resource-case-footer">
                    <span className="resource-case-result-sm">{study.result}</span>
                    <span className="resource-read-link">Read Article →</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100} className="mt-12">
            <ResourceLiveChat variant="case-study" />
          </Reveal>

          <Reveal delay={120} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/#portfolio" className="phase-link-btn phase-link-btn-light">View Portfolio</a>
            <a href="/#contact" className="phase-link-btn phase-link-btn-light-outline">Start Your Project</a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
