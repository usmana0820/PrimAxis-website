import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import ResourceLiveChat from '../components/ResourceLiveChat'
import NotFound from './NotFound'
import { getCaseStudyBySlug } from '../constants/caseStudies'

export default function CaseStudyDetail() {
  const slug = window.location.pathname.replace(/\/$/, '').split('/').pop()
  const study = getCaseStudyBySlug(slug)

  if (!study) {
    return <NotFound />
  }

  return (
    <PageShell
      heroVariant="case-study"
      badge={study.industry}
      title={study.title}
      description={study.summary}
    >
      <section className="page-section relative overflow-hidden section-light-theme section-edge-glow resource-article resource-detail-case">
        <div className="section-light-mesh" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="resource-meta resource-meta-lg">
              <span>{study.client}</span>
              <span aria-hidden="true">·</span>
              <span>{study.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{study.readTime}</span>
            </div>

            <div className={`case-study-result bg-gradient-to-r ${study.gradient}`}>
              <p className="case-study-result-label">Key Result</p>
              <p className="case-study-result-value">{study.result}</p>
            </div>

            <div className="case-study-tags">
              {study.tech.map((tag) => (
                <span key={tag} className="portfolio-tech-badge">{tag}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <article className="resource-article-body resource-case-body">
              <section className="resource-block resource-block-challenge">
                <p className="resource-block-label">The Challenge</p>
                <h2>Business Problem</h2>
                <p>{study.challenge}</p>
              </section>

              <section className="resource-block resource-block-solution">
                <p className="resource-block-label">Our Solution</p>
                <h2>What We Built</h2>
                <p>{study.solution}</p>
              </section>

              <section className="resource-block resource-block-outcomes">
                <p className="resource-block-label">Business Outcomes</p>
                <h2>Results Delivered</h2>
                <ul>
                  {study.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <aside className="case-study-service">
                <p className="text-sm font-semibold uppercase tracking-wider text-text-muted">Service Delivered</p>
                <p className="text-lg font-bold text-text font-display mt-2">{study.service}</p>
              </aside>
            </article>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <ResourceLiveChat variant="case-study" />
          </Reveal>

          <Reveal delay={120} className="mt-8 flex flex-col sm:flex-row gap-3 justify-between items-center">
            <a href="/case-studies" className="phase-link-btn phase-link-btn-outline">← All Case Studies</a>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/#portfolio" className="phase-link-btn phase-link-btn-outline">View Portfolio</a>
              <a href="/#contact" className="phase-link-btn">Start Your Project</a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
