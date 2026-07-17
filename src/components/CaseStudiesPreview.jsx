import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import SeeAllLink from './SeeAllLink'
import { getCardRevealVariant } from '../utils/revealVariants'
import { getCaseStudyUrl } from '../constants/caseStudies'
import { usePublishedProjects } from '../hooks/usePublishedProjects'

const HOME_LIMIT = 3

export default function CaseStudiesPreview() {
  const { projects } = usePublishedProjects()
  const preview = projects.slice(0, HOME_LIMIT)

  if (!preview.length) return null

  return (
    <section id="case-studies" className="page-section relative section-blue-theme overflow-hidden">
      <div className="section-blue-pattern" aria-hidden="true" />
      <div className="section-blue-glow section-blue-glow-left" aria-hidden="true" />
      <div className="section-blue-glow section-blue-glow-right" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          dark
          label="Case Studies"
          title="Real Projects. Measurable Results."
          subtitle="Deep dives into how we solve business challenges — with technologies used and proven impact."
          titleClassName="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight font-display"
          subtitleClassName="mt-5 text-white/70 text-lg leading-relaxed"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {preview.map((study, i) => (
            <Reveal key={study.slug} delay={i * 90} variant={getCardRevealVariant(i, 3)} className="h-full">
              <Link to={getCaseStudyUrl(study.slug)} className="home-case-card group h-full">
                {study.coverImage ? (
                  <img src={study.coverImage} alt={study.title} className="home-case-cover" />
                ) : (
                  <div className={`home-case-cover home-case-cover-fallback bg-gradient-to-br ${study.gradient}`} />
                )}
                <div className="home-case-body">
                  <span className="home-case-chip">{study.industry}</span>
                  <h3 className="home-case-title">{study.title}</h3>
                  <p className="home-case-client">{study.client}</p>
                  <p className="home-case-excerpt">{study.summary || study.description}</p>
                  {study.result && <p className="home-case-result">{study.result}</p>}
                  <span className="home-case-link">Read Case Study →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 flex justify-center">
          <SeeAllLink to="/case-studies" label="See all case studies" count={projects.length} />
        </Reveal>
      </div>
    </section>
  )
}
