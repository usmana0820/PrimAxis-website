import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import TiltCard from './TiltCard'
import PortfolioCard from './PortfolioCard'
import { getCardRevealVariant } from '../utils/revealVariants'
import { usePublishedProjects } from '../hooks/usePublishedProjects'

const HOME_LIMIT = 3

export default function Portfolio() {
  const { projects } = usePublishedProjects()
  const preview = projects.slice(0, HOME_LIMIT)

  return (
    <section id="portfolio" className="relative page-section section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          label="Portfolio"
          title="Our Recent Work"
          subtitle="Real projects at a glance — open any card for the full case study."
        />

        <div className="portfolio-home-grid">
          {preview.map((item, i) => (
            <Reveal key={item.slug} delay={i * 90} variant={getCardRevealVariant(i, 3)} className="h-full">
              <TiltCard className="h-full">
                <PortfolioCard item={item} compact />
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {projects.length > 0 && (
          <Reveal delay={120} className="mt-12 flex justify-center">
            <Link to="/portfolio" className="hero-btn-primary portfolio-view-details-btn">
              View Details
              <span className="portfolio-see-all-count">{projects.length}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}
