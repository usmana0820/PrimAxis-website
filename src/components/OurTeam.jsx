import Reveal from './Reveal'
import SectionHead from './SectionHead'
import TiltCard from './TiltCard'
import { getCardRevealVariant } from '../utils/revealVariants'
import { COMPANY_STATS, LEADERSHIP, TEAM_PREVIEW } from '../constants/team'

export default function OurTeam() {
  return (
    <section id="team" className="page-section relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          label="Our Team"
          title="Leadership Team"
          subtitle="Executives and specialists in software engineering, Zoho consulting, AI, design, and business development."
        />

        <Reveal delay={60} variant="slide-bottom">
          <div className="team-stats-row">
            {COMPANY_STATS.map((stat) => (
              <div key={stat.label} className="team-stat-pill">
                <span className="team-stat-value">{stat.value}</span>
                <span className="team-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mt-10">
          {LEADERSHIP.map((person, i) => (
            <Reveal key={person.name} delay={i * 90} variant={getCardRevealVariant(i, 3)} className="h-full">
              <TiltCard className="h-full">
                <article className="team-leader-card tilt-card-surface group h-full">
                <div className={`team-leader-avatar bg-gradient-to-br ${person.gradient}`}>
                  {person.initials}
                </div>
                <h3 className="team-leader-name">{person.name}</h3>
                <p className="team-leader-role">{person.role}</p>
                <p className="team-leader-bio">{person.bio}</p>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-7 mt-12">
          {TEAM_PREVIEW.map((person, i) => (
            <Reveal key={person.name} delay={i * 80} variant={getCardRevealVariant(i, 3)} className="h-full">
              <TiltCard className="h-full" intensity={12}>
                <article className="team-leader-card tilt-card-surface group h-full">
                  <div className={`team-leader-avatar bg-gradient-to-br ${person.gradient}`}>
                    {person.initials}
                  </div>
                  <h3 className="team-leader-name">{person.name}</h3>
                  <p className="team-leader-role">{person.role}</p>
                  <p className="team-leader-bio">{person.bio}</p>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 text-center">
          <p className="text-text-muted text-sm max-w-xl mx-auto mb-6">
            Explore our leadership team, organizational structure, and specialist roles.
          </p>
          <a href="/team" className="phase-link-btn inline-flex">
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
