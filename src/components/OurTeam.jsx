import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { getCardRevealVariant } from '../utils/revealVariants'
import { COMPANY_STATS, LEADERSHIP, TEAM_PREVIEW } from '../constants/team'

const DEPT_ICONS = {
  code: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  ),
  erp: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  ),
  design: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  ),
  qa: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  ),
  support: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  consulting: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  ),
}

export default function OurTeam() {
  return (
    <section id="team" className="page-section relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto section-header" variant="slide-top">
          <span className="section-label">Our Team</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display">
            Company Structure &amp; Leadership
          </h2>
          <p className="mt-5 text-text-muted text-lg leading-relaxed">
            A cross-functional team of developers, Zoho specialists, designers, and consultants
            working together to deliver exceptional digital solutions.
          </p>
        </Reveal>

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

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-10">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mt-12">
          {TEAM_PREVIEW.map((dept, i) => (
            <Reveal key={dept.id} delay={i * 80} variant={getCardRevealVariant(i, 4)} className="h-full">
              <TiltCard className="h-full" intensity={12}>
                <article className="team-dept-card tilt-card-surface group h-full">
                <div className={`team-dept-icon bg-gradient-to-br ${dept.gradient}`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {DEPT_ICONS[dept.icon]}
                  </svg>
                </div>
                <h3 className="team-dept-name">{dept.name}</h3>
                <p className="team-dept-head">{dept.head}</p>
                <p className="team-dept-summary">{dept.summary}</p>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 text-center">
          <p className="text-text-muted text-sm max-w-xl mx-auto mb-6">
            Explore our full organizational structure, all departments, and how we collaborate on every project.
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
