import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppChat from '../components/WhatsAppChat'
import Reveal from '../components/Reveal'
import PreviewHeroBackground from '../components/PreviewHeroBackground'
import PreviewHeroAside from '../components/PreviewHeroAside'
import PreviewFinalCTA from '../components/PreviewFinalCTA'
import { COMPANY_STATS, LEADERSHIP, DEPARTMENTS } from '../constants/team'
import { OFFICE_ADDRESS } from '../constants/contact'

const DEPT_EMOJI = {
  code: '💻',
  erp: '📊',
  design: '🎨',
  qa: '🧪',
  support: '🛟',
  consulting: '💼',
}

const ORG_PILLARS = [
  {
    title: 'Executive Leadership',
    icon: '👔',
    tone: 'primary',
    text: 'Strategy, client partnerships, and delivery governance across every engagement.',
  },
  {
    title: 'Cross-Functional Teams',
    icon: '🔗',
    tone: 'secondary',
    text: 'Engineering, Zoho, design, QA, and support working in sync from discovery to launch.',
  },
  {
    title: 'Client Success Focus',
    icon: '🎯',
    tone: 'accent',
    text: 'Dedicated consulting and support so solutions keep performing after go-live.',
  },
]

function SectionIntro({ label, title, subtitle }) {
  return (
    <header className="cs-preview-section-intro">
      {label && <span className="cs-preview-label">{label}</span>}
      <h2 className="cs-preview-section-head">{title}</h2>
      {subtitle && <p className="cs-preview-section-sub">{subtitle}</p>}
    </header>
  )
}

export default function Team() {
  useEffect(() => {
    document.title = 'Our Team | PrimeAxis Technologies'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Meet the leadership and departments that power PrimeAxis — from strategy and Zoho to development, design, QA, and support.'
      )
    }
  }, [])

  return (
    <div className="cs-preview-page">
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
                  Company Structure &amp; Organization
                </h1>

                <div className="cs-preview-hero-tags">
                  <span className="cs-preview-hero-tag">Leadership</span>
                  <span className="cs-preview-hero-tag">6 Departments</span>
                  <span className="cs-preview-hero-tag cs-preview-hero-tag-status">Lahore HQ</span>
                </div>

                <dl className="cs-preview-hero-meta">
                  <div>
                    <dt>Team Size</dt>
                    <dd>25+ Professionals</dd>
                  </div>
                  <div>
                    <dt>Structure</dt>
                    <dd>Cross-Functional Delivery</dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd>Lahore, Pakistan</dd>
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
                  { value: '3', label: 'Leaders', sub: 'Executive Team', live: true },
                ]}
              />
            </Reveal>
          </div>
        </div>

        <div className="cs-preview-tech-bar">
          {DEPARTMENTS.map((dept) => (
            <span key={dept.id} className="cs-preview-tech-chip">{dept.name}</span>
          ))}
        </div>
      </section>

      {/* Organization Overview */}
      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Structure"
              title="How We're Organized"
              subtitle="A clear hierarchy with specialized teams delivering end-to-end digital solutions"
            />
          </Reveal>

          <div className="cs-preview-cards-3">
            {ORG_PILLARS.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <article className="cs-preview-card">
                  <div className="cs-preview-card-head">
                    <span className={`cs-preview-card-icon cs-preview-card-icon-${item.tone}`} aria-hidden="true">
                      {item.icon}
                    </span>
                    <h3 className="cs-preview-card-title">{item.title}</h3>
                  </div>
                  <p className="cs-preview-card-text">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="cs-preview-org-chart" aria-label="Company structure overview">
              <div className="cs-preview-org-top">
                <span className="cs-preview-label">Leadership</span>
                <strong>Executive Team</strong>
              </div>
              <div className="cs-preview-org-connector" aria-hidden="true" />
              <div className="cs-preview-org-branches">
                {DEPARTMENTS.map((dept) => (
                  <span key={dept.id} className="cs-preview-org-branch">
                    {DEPT_EMOJI[dept.icon]} {dept.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Executive Team */}
      <section className="cs-preview-section">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Leadership"
              title="Meet Our Executive Team"
              subtitle="Experienced leaders guiding strategy, technology, and client delivery"
            />
          </Reveal>

          <div className="cs-preview-team-grid">
            {LEADERSHIP.map((person, i) => (
              <Reveal key={person.name} delay={i * 70} variant="scale">
                <article className="cs-preview-team-card">
                  <div className={`cs-preview-team-avatar bg-gradient-to-br ${person.gradient}`}>
                    {person.initials}
                  </div>
                  <div className="cs-preview-team-body">
                    <strong>{person.name}</strong>
                    <span>{person.role}</span>
                    <p className="cs-preview-team-bio">{person.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Departments"
              title="Specialized Delivery Teams"
              subtitle="Six teams working together on every project"
            />
          </Reveal>

          <div className="cs-preview-dept-grid">
            {DEPARTMENTS.map((dept, i) => (
              <Reveal key={dept.id} delay={i * 50} variant="scale">
                <article className="cs-preview-card cs-preview-dept-card">
                  <div className="cs-preview-card-head">
                    <span className="cs-preview-dept-emoji" aria-hidden="true">
                      {DEPT_EMOJI[dept.icon]}
                    </span>
                    <div>
                      <h3 className="cs-preview-card-title">{dept.name}</h3>
                      <p className="cs-preview-dept-head">{dept.head}</p>
                    </div>
                  </div>
                  <p className="cs-preview-card-text">{dept.summary}</p>
                  <ul className="cs-preview-list cs-preview-dept-list">
                    {dept.responsibilities.map((item) => (
                      <li key={item}>
                        <span className="cs-preview-list-arrow" aria-hidden="true">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
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
              title="How Teams Work Together"
              subtitle="From discovery through launch and long-term support"
            />
          </Reveal>

          <div className="cs-preview-process-row">
            {[
              { icon: '🔍', label: 'Discovery' },
              { icon: '📐', label: 'Planning' },
              { icon: '🎨', label: 'Design' },
              { icon: '💻', label: 'Development' },
              { icon: '🧪', label: 'QA' },
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

      {/* Head Office */}
      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro label="Location" title="Head Office" />
          </Reveal>
          <Reveal delay={60}>
            <div className="cs-preview-outcome-banner cs-preview-office-banner">
              <h3>Lahore, Pakistan</h3>
              <p className="cs-preview-office-address">{OFFICE_ADDRESS}</p>
              <p>
                Our Lahore hub brings together engineering, Zoho, design, and consulting teams under one roof for seamless collaboration.
              </p>
            </div>
          </Reveal>
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
                <div className="cs-preview-kpi-value">3</div>
                <div className="cs-preview-kpi-label">Executive Leaders</div>
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
