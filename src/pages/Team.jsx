import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppChat from '../components/WhatsAppChat'
import Reveal from '../components/Reveal'
import PreviewHeroBackground from '../components/PreviewHeroBackground'
import PreviewHeroAside from '../components/PreviewHeroAside'
import PreviewFinalCTA from '../components/PreviewFinalCTA'
import {
  COMPANY_STATS,
  LEADERSHIP_TEAM,
  TEAM_MEMBERS,
  CORE_LEADERSHIP,
  ALL_TEAM,
} from '../constants/team'

function SectionIntro({ label, title, subtitle }) {
  return (
    <header className="cs-preview-section-intro">
      {label && <span className="cs-preview-label">{label}</span>}
      <h2 className="cs-preview-section-head">{title}</h2>
      {subtitle && <p className="cs-preview-section-sub">{subtitle}</p>}
    </header>
  )
}

function TeamMemberCard({ person }) {
  return (
    <article
      className="cs-preview-team-card cs-preview-team-card-themed"
      data-team-theme={person.themeId}
    >
      <div className={`cs-preview-team-avatar bg-gradient-to-br ${person.gradient}`}>
        {person.initials}
      </div>
      <div className="cs-preview-team-body">
        <strong>{person.name}</strong>
        <span>{person.role}</span>
        <p className="cs-preview-team-bio">{person.bio}</p>
      </div>
    </article>
  )
}

export default function Team() {
  useEffect(() => {
    document.title = 'Our Team | PrimeAxis Technologies'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Meet the PrimeAxis Technologies leadership team: executives and specialists in software, Zoho consulting, marketing, AI, design, and business development.'
      )
    }
  }, [])

  return (
    <div className="cs-preview-page cs-preview-page-team">
      <Navbar isSubpage />

      {/* Hero */}
      <section className="cs-preview-hero theme-dark bg-hero-premium">
        <PreviewHeroBackground />

        <div className="cs-preview-hero-inner">
          <Reveal variant="slide-top">
            <Link to="/" className="cs-preview-back">← Back to Home</Link>
          </Reveal>

          <div className="cs-preview-hero-grid">
            <Reveal variant="slide-top" eager>
              <div>
                <div className="cs-preview-featured-badge">
                  <span className="cs-preview-featured-dot" aria-hidden="true" />
                  OUR TEAM
                </div>

                <h1 className="cs-preview-hero-title">
                  Meet the People Behind PrimeAxis
                </h1>

                <div className="cs-preview-hero-tags">
                  <span className="cs-preview-hero-tag">Leadership Team</span>
                  <span className="cs-preview-hero-tag">7 Core Members</span>
                  <span className="cs-preview-hero-tag cs-preview-hero-tag-status">Pakistan</span>
                </div>

                <dl className="cs-preview-hero-meta">
                  <div>
                    <dt>Leadership</dt>
                    <dd>Executive Led Structure</dd>
                  </div>
                  <div>
                    <dt>Expertise</dt>
                    <dd>Tech · Zoho · AI · Design · Sales</dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd>Pakistan</dd>
                  </div>
                </dl>

                <div className="cs-preview-hero-actions">
                  <Link to="/#contact" className="cs-preview-btn-white">🚀 Work With Us</Link>
                  <Link to="/about" className="cs-preview-btn-outline">📄 About Company</Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} variant="scale" eager>
              <PreviewHeroAside
                stats={[
                  ...COMPANY_STATS.map((stat) => ({
                    value: stat.value,
                    label: stat.label.split(' ')[0],
                    sub: stat.label,
                  })),
                  { value: '4', label: 'Leaders', sub: 'Executive Team', live: true },
                ]}
              />
            </Reveal>
          </div>
        </div>

        <div className="cs-preview-tech-bar">
          {ALL_TEAM.map((person) => (
            <span key={person.name} className="cs-preview-tech-chip">{person.role.split('&')[0].trim()}</span>
          ))}
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Structure"
              title="Organizational Structure"
              subtitle="Executive leadership with specialist teams delivering end to end digital solutions"
            />
          </Reveal>

          <Reveal delay={60}>
            <div className="cs-preview-org-chart cs-preview-org-chart-v2" aria-label="PrimeAxis organizational structure">
              <div className="cs-preview-org-top">
                <span className="cs-preview-label">Company</span>
                <strong>PrimeAxis Technologies</strong>
              </div>

              <div className="cs-preview-org-connector" aria-hidden="true" />

              <p className="cs-preview-org-tier-label">Leadership Team</p>
              <div className="cs-preview-org-founder-grid">
                {LEADERSHIP_TEAM.map((person) => (
                  <div
                    key={person.name}
                    className="cs-preview-org-person cs-preview-org-person-themed"
                    data-team-theme={person.themeId}
                  >
                    <strong>{person.name}</strong>
                    <span>{person.role}</span>
                  </div>
                ))}
              </div>

              <div className="cs-preview-org-divider" aria-hidden="true" />

              <p className="cs-preview-org-tier-label">Specialist Team</p>
              <div className="cs-preview-org-team-grid">
                {TEAM_MEMBERS.map((person) => (
                  <div
                    key={person.name}
                    className="cs-preview-org-person cs-preview-org-person-secondary cs-preview-org-person-themed"
                    data-team-theme={person.themeId}
                  >
                    <strong>{person.name}</strong>
                    <span>{person.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="cs-preview-core-leadership">
              <h3>Core Leadership</h3>
              <div className="cs-preview-core-leadership-grid">
                {CORE_LEADERSHIP.map((item) => (
                  <article
                    key={item.name}
                    className="cs-preview-core-leadership-card cs-preview-core-leadership-card-themed"
                    data-team-theme={item.themeId}
                  >
                    <strong>{item.name}</strong>
                    <span>{item.focus}</span>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="cs-preview-section">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Leadership"
              title="Executive Leadership Team"
              subtitle="Founder and executives leading strategy, technology, business, and growth"
            />
          </Reveal>

          <div className="cs-preview-team-grid cs-preview-team-grid-founders">
            {LEADERSHIP_TEAM.map((person, i) => (
              <Reveal key={person.name} delay={i * 70} variant="scale">
                <TeamMemberCard person={person} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Team"
              title="Specialist Team Members"
              subtitle="AI, design, and business development expertise supporting every project"
            />
          </Reveal>

          <div className="cs-preview-team-grid cs-preview-team-grid-members">
            {TEAM_MEMBERS.map((person, i) => (
              <Reveal key={person.name} delay={i * 70} variant="scale">
                <TeamMemberCard person={person} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Process */}
      <section className="cs-preview-section">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Collaboration"
              title="How We Work Together"
              subtitle="Cross-functional delivery from discovery through launch and support"
            />
          </Reveal>

          <div className="cs-preview-process-row">
            {[
              { icon: '🔍', label: 'Discovery' },
              { icon: '📐', label: 'Planning' },
              { icon: '🎨', label: 'Design' },
              { icon: '💻', label: 'Development' },
              { icon: '🤖', label: 'AI & Automation' },
              { icon: '🚀', label: 'Launch' },
              { icon: '🛟', label: 'Support' },
            ].map((step, i) => (
              <Reveal key={step.label} delay={i * 35}>
                <div className="cs-preview-process-item">
                  <div className="cs-preview-process-icon" aria-hidden="true">{step.icon}</div>
                  <span>{step.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="cs-preview-section">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro title="Team at a Glance" />
          </Reveal>
          <div className="cs-preview-kpi-grid cs-preview-kpi-grid-4">
            {COMPANY_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 60} variant="scale">
                <article className={`cs-preview-kpi-card cs-preview-kpi-card-${i % 2 === 0 ? 'a' : 'b'}`}>
                  <div className="cs-preview-kpi-value cs-preview-kpi-value-compact">{stat.value}</div>
                  <div className="cs-preview-kpi-label">{stat.label}</div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={180} variant="scale">
              <article className="cs-preview-kpi-card cs-preview-kpi-card-plain">
                <div className="cs-preview-kpi-value">7</div>
                <div className="cs-preview-kpi-label">People on Core Team</div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <PreviewFinalCTA
        title="Ready to work with our team?"
        secondaryLabel="Learn About Us"
        secondaryHref="/about"
      />

      <Footer />
      <WhatsAppChat />
    </div>
  )
}
