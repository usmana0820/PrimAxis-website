import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import ResourceLiveChat from '../components/ResourceLiveChat'
import { COMPANY_STATS, LEADERSHIP, DEPARTMENTS } from '../constants/team'
import { OFFICE_ADDRESS } from '../constants/contact'

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

export default function Team() {
  return (
    <PageShell
      heroVariant="case-study"
      badge="Our Team"
      title="Company Structure & Organization"
      description="Meet the leadership and departments that power PrimeAxis — from strategy and Zoho to development, design, QA, and support."
    >
      {/* White section — overview & org chart */}
      <section className="page-section relative overflow-hidden section-light-theme">
        <div className="section-light-mesh" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="team-stats-row team-stats-row-page">
              {COMPANY_STATS.map((stat) => (
                <div key={stat.label} className="team-stat-pill">
                  <span className="team-stat-value">{stat.value}</span>
                  <span className="team-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="team-org-chart" aria-label="Company structure overview">
              <div className="team-org-node team-org-node-top">
                <span className="team-org-label">Leadership</span>
                <span className="team-org-title">Executive Team</span>
              </div>
              <div className="team-org-connector" aria-hidden="true" />
              <div className="team-org-branches">
                {DEPARTMENTS.map((dept) => (
                  <div key={dept.id} className="team-org-branch">
                    <span className="team-org-branch-dot" />
                    <span>{dept.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blue section — leadership */}
      <section className="page-section relative overflow-hidden section-blue-theme">
        <div className="section-blue-pattern" aria-hidden="true" />
        <div className="section-blue-glow section-blue-glow-left" aria-hidden="true" />
        <div className="section-blue-glow section-blue-glow-right" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto section-header">
            <span className="section-label section-label-on-dark">Leadership</span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              Meet Our Executive Team
            </h2>
            <p className="mt-4 text-white/70 text-base leading-relaxed">
              Experienced leaders guiding strategy, technology, and client delivery across every project.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {LEADERSHIP.map((person, i) => (
              <Reveal key={person.name} delay={i * 70} variant="scale">
                <article className="team-leader-card team-leader-card-dark h-full">
                  <div className={`team-leader-avatar bg-gradient-to-br ${person.gradient}`}>
                    {person.initials}
                  </div>
                  <h3 className="team-leader-name team-leader-name-dark">{person.name}</h3>
                  <p className="team-leader-role">{person.role}</p>
                  <p className="team-leader-bio team-leader-bio-dark">{person.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* White section — departments */}
      <section className="page-section relative overflow-hidden section-light-theme">
        <div className="section-light-mesh" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto section-header">
            <span className="section-label">Departments</span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-text tracking-tight font-display">
              How We&apos;re Organized
            </h2>
            <p className="mt-4 text-text-muted text-base leading-relaxed">
              Six specialized teams working together to deliver end-to-end digital solutions.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {DEPARTMENTS.map((dept, i) => (
              <Reveal key={dept.id} delay={i * 60} variant="scale">
                <article className="team-dept-detail-card">
                  <div className="team-dept-detail-header">
                    <div className={`team-dept-icon bg-gradient-to-br ${dept.gradient}`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {DEPT_ICONS[dept.icon]}
                      </svg>
                    </div>
                    <div>
                      <h3 className="team-dept-name">{dept.name}</h3>
                      <p className="team-dept-head">{dept.head}</p>
                    </div>
                  </div>
                  <p className="team-dept-summary mt-4">{dept.summary}</p>
                  <ul className="team-dept-list">
                    {dept.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blue section — office & CTA */}
      <section className="page-section relative overflow-hidden section-blue-theme">
        <div className="section-blue-pattern" aria-hidden="true" />
        <div className="section-blue-glow section-blue-glow-center" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="team-office-card team-office-card-dark">
              <p className="team-office-label">Head Office</p>
              <p className="team-office-address team-office-address-dark">{OFFICE_ADDRESS}</p>
              <p className="team-office-desc team-office-desc-dark">
                Our Lahore hub brings together engineering, Zoho, design, and consulting teams under one roof for seamless collaboration.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <ResourceLiveChat variant="team" />
          </Reveal>

          <Reveal delay={120} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/#team" className="phase-link-btn phase-link-btn-light-outline">Back to Home</a>
            <a href="/#contact" className="phase-link-btn phase-link-btn-light">Work With Us</a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
