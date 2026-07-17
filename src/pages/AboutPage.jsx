import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppChat from '../components/WhatsAppChat'
import Reveal from '../components/Reveal'
import aboutImage from '../assets/aboutsection.jpg'
import PreviewHeroBackground from '../components/PreviewHeroBackground'
import PreviewHeroAside from '../components/PreviewHeroAside'
import PreviewFinalCTA from '../components/PreviewFinalCTA'
import {
  COMPANY_STATS,
  COMPANY_STORY,
  CORE_VALUES,
  MILESTONES,
  WHAT_WE_DO,
  MISSION_VISION,
} from '../constants/companyAbout'

const VALUE_ICONS = ['🎯', '✨', '🤝', '🚀']
const SERVICE_ICONS = ['📊', '💻', '📱', '🤖', '📣', '🛠️']
const MILESTONE_ICONS = ['🏁', '📈', '🏗️', '✨']

function SectionIntro({ label, title, subtitle }) {
  return (
    <header className="cs-preview-section-intro">
      {label && <span className="cs-preview-label">{label}</span>}
      <h2 className="cs-preview-section-head">{title}</h2>
      {subtitle && <p className="cs-preview-section-sub">{subtitle}</p>}
    </header>
  )
}

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | PrimeAxis Technologies'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Learn how PrimeAxis Technologies helps businesses transform with Zoho, custom software, mobile apps, AI, and digital marketing.'
      )
    }
  }, [])

  return (
    <div className="cs-preview-page cs-preview-page-about">
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
                  ABOUT OUR COMPANY
                </div>

                <h1 className="cs-preview-hero-title">
                  Empowering Businesses Through Smart Digital Solutions
                </h1>

                <div className="cs-preview-hero-tags">
                  <span className="cs-preview-hero-tag">Lahore, Pakistan</span>
                  <span className="cs-preview-hero-tag">Technology Partner</span>
                  <span className="cs-preview-hero-tag cs-preview-hero-tag-status">Since 2019</span>
                </div>

                <dl className="cs-preview-hero-meta">
                  <div>
                    <dt>Focus</dt>
                    <dd>Zoho · Software · AI · Marketing</dd>
                  </div>
                  <div>
                    <dt>Clients</dt>
                    <dd>25+ Businesses Served</dd>
                  </div>
                  <div>
                    <dt>Delivery</dt>
                    <dd>End-to-End Digital Services</dd>
                  </div>
                </dl>

                <div className="cs-preview-hero-actions">
                  <Link to="/#contact" className="cs-preview-btn-white">🚀 Start a Project</Link>
                  <Link to="/team" className="cs-preview-btn-outline">👥 Meet Our Team</Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} variant="scale" eager>
              <PreviewHeroAside
                stats={COMPANY_STATS.map((stat) => ({
                  value: stat.value,
                  label: stat.label.split(' ')[0],
                  sub: stat.label,
                }))}
              />
            </Reveal>
          </div>
        </div>

        <div className="cs-preview-tech-bar">
          {['Zoho ERP', 'Custom Software', 'Mobile Apps', 'AI Automation', 'Digital Marketing'].map((tag) => (
            <span key={tag} className="cs-preview-tech-chip">{tag}</span>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Our Story"
              title="Who We Are"
              subtitle="Building technology that moves businesses forward"
            />
          </Reveal>

          <div className="cs-preview-about-story">
            <Reveal variant="scale">
              <div className="cs-preview-about-visual">
                <img src={aboutImage} alt="PrimeAxis Technologies team" loading="lazy" />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="cs-preview-cards-3 cs-preview-about-cards">
                <article className="cs-preview-card">
                  <div className="cs-preview-card-head">
                    <span className="cs-preview-card-icon cs-preview-card-icon-primary" aria-hidden="true">📄</span>
                    <h3 className="cs-preview-card-title">Our Beginning</h3>
                  </div>
                  <p className="cs-preview-card-text">{COMPANY_STORY.intro}</p>
                </article>

                <article className="cs-preview-card">
                  <div className="cs-preview-card-head">
                    <span className="cs-preview-card-icon cs-preview-card-icon-secondary" aria-hidden="true">🌍</span>
                    <h3 className="cs-preview-card-title">What We Do</h3>
                  </div>
                  <p className="cs-preview-card-text">{COMPANY_STORY.paragraphs[0]}</p>
                </article>

                <article className="cs-preview-card">
                  <div className="cs-preview-card-head">
                    <span className="cs-preview-card-icon cs-preview-card-icon-accent" aria-hidden="true">🤝</span>
                    <h3 className="cs-preview-card-title">How We Partner</h3>
                  </div>
                  <p className="cs-preview-card-text">{COMPANY_STORY.paragraphs[1]}</p>
                </article>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="cs-preview-outcome-banner">
              <h3>Our Commitment</h3>
              <p>{COMPANY_STORY.paragraphs[2]}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="cs-preview-section">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Purpose"
              title="Mission & Vision"
              subtitle="What drives us every day"
            />
          </Reveal>

          <div className="cs-preview-cards-2">
            <Reveal>
              <article className="cs-preview-card cs-preview-mission-card">
                <div className="cs-preview-card-head">
                  <span className="cs-preview-card-icon cs-preview-card-icon-primary" aria-hidden="true">🎯</span>
                  <h3 className="cs-preview-card-title">Our Mission</h3>
                </div>
                <p className="cs-preview-card-text">{MISSION_VISION.mission}</p>
              </article>
            </Reveal>
            <Reveal delay={60}>
              <article className="cs-preview-card cs-preview-mission-card cs-preview-mission-card-accent">
                <div className="cs-preview-card-head">
                  <span className="cs-preview-card-icon cs-preview-card-icon-secondary" aria-hidden="true">🔭</span>
                  <h3 className="cs-preview-card-title">Our Vision</h3>
                </div>
                <p className="cs-preview-card-text">{MISSION_VISION.vision}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Values"
              title="How We Work With Clients"
              subtitle="Principles that guide every engagement"
            />
          </Reveal>

          <div className="cs-preview-features-grid">
            {CORE_VALUES.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 40} variant="scale">
                <article className="cs-preview-feature-card">
                  <div className="cs-preview-feature-icon" aria-hidden="true">
                    {VALUE_ICONS[i % VALUE_ICONS.length]}
                  </div>
                  <h4>{item.title}</h4>
                  <p className="cs-preview-feature-desc">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="cs-preview-section">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Services"
              title="End-to-End Digital Services"
              subtitle="From strategy to launch and long-term support"
            />
          </Reveal>

          <div className="cs-preview-services-grid">
            {WHAT_WE_DO.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 40}>
                <article className="cs-preview-service-card cs-preview-service-card-tall">
                  <span className="cs-preview-service-icon" aria-hidden="true">
                    {SERVICE_ICONS[i % SERVICE_ICONS.length]}
                  </span>
                  <div>
                    <strong className="cs-preview-service-title">{item.title}</strong>
                    <p className="cs-preview-service-desc">{item.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Journey"
              title="Milestones Along the Way"
              subtitle="How PrimeAxis has grown with our clients"
            />
          </Reveal>

          <div className="cs-preview-process-row">
            {MILESTONES.map((item, i) => (
              <Reveal key={item.year} delay={i * 35}>
                <div className="cs-preview-process-item cs-preview-milestone-item">
                  <div className="cs-preview-process-icon" aria-hidden="true">
                    {MILESTONE_ICONS[i % MILESTONE_ICONS.length]}
                  </div>
                  <span className="cs-preview-milestone-year">{item.year}</span>
                  <strong className="cs-preview-milestone-title">{item.title}</strong>
                  <p className="cs-preview-milestone-desc">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="cs-preview-section">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro title="Our Impact in Numbers" />
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
          </div>
        </div>
      </section>

      <PreviewFinalCTA />

      <Footer />
      <WhatsAppChat />
    </div>
  )
}
