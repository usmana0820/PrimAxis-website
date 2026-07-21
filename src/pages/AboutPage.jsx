import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppChat from '../components/WhatsAppChat'
import Reveal from '../components/Reveal'
import AboutVideo from '../components/AboutVideo'
import PreviewHeroBackground from '../components/PreviewHeroBackground'
import PreviewHeroAside from '../components/PreviewHeroAside'
import PreviewFinalCTA from '../components/PreviewFinalCTA'
import {
  COMPANY_STATS,
  OUR_STORY,
  WHO_WE_ARE,
  OUR_PURPOSE,
  CORE_VALUES,
  WHAT_WE_DO,
  EXPERTISE_AREAS,
  HOW_WE_WORK,
  COMMITMENT,
  WHY_CHOOSE,
  OUR_JOURNEY,
  IMPACT_DETAILS,
  LOOKING_AHEAD,
  MISSION_VISION,
} from '../constants/companyAbout'

function SectionIntro({ label, title, subtitle, className = '' }) {
  return (
    <header className={`cs-preview-section-intro about-section-intro ${className}`.trim()}>
      {label && <span className="cs-preview-label">{label}</span>}
      <h2 className="cs-preview-section-head">{title}</h2>
      {subtitle && <p className="cs-preview-section-sub">{subtitle}</p>}
    </header>
  )
}

function ProseBlock({ paragraphs, className = 'about-prose' }) {
  return (
    <div className={className}>
      {paragraphs.map((text) => (
        <p key={text.slice(0, 48)}>{text}</p>
      ))}
    </div>
  )
}

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | PrimeAxis Technologies'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Learn about PrimeAxis Technologies: our story, mission, values, expertise in Zoho ERP, custom software, AI automation, and digital transformation services.'
      )
    }
  }, [])

  return (
    <div className="cs-preview-page cs-preview-page-about">
      <Navbar isSubpage />

      <section className="cs-preview-hero theme-dark bg-hero-premium about-hero">
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
                  ABOUT US
                </div>

                <h1 className="cs-preview-hero-title">
                  Empowering Organizations Through Smart Digital Solutions
                </h1>

                <div className="cs-preview-hero-tags">
                  <span className="cs-preview-hero-tag">Technology Consulting</span>
                  <span className="cs-preview-hero-tag">Digital Transformation</span>
                  <span className="cs-preview-hero-tag cs-preview-hero-tag-status">Pakistan</span>
                </div>

                <dl className="cs-preview-hero-meta">
                  <div>
                    <dt>Focus</dt>
                    <dd>Zoho · Software · AI · Automation</dd>
                  </div>
                  <div>
                    <dt>Clients</dt>
                    <dd>25+ Businesses Served</dd>
                  </div>
                  <div>
                    <dt>Delivery</dt>
                    <dd>End to End Digital Services</dd>
                  </div>
                </dl>

                <div className="cs-preview-hero-actions">
                  <Link to="/#contact" className="cs-preview-btn-white">Start a Project</Link>
                  <Link to="/team" className="cs-preview-btn-outline">Meet Our Team</Link>
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
          {['Zoho ERP & CRM', 'Custom Software', 'Mobile Apps', 'AI Automation', 'Digital Marketing'].map((tag) => (
            <span key={tag} className="cs-preview-tech-chip">{tag}</span>
          ))}
        </div>
      </section>

      <section className="about-section about-section-story">
        <div className="cs-preview-container">
          <div className="about-story-showcase">
            <div className="about-story-copy">
              <Reveal>
                <SectionIntro
                  label="Our Story"
                  title="Building Technology That Drives Growth"
                  subtitle="Practical, scalable solutions for every stage of your digital journey"
                  className="about-section-intro-left"
                />
              </Reveal>

              <Reveal delay={60}>
                <ProseBlock paragraphs={OUR_STORY.paragraphs} />
              </Reveal>

              <Reveal delay={100}>
                <article className="about-highlight-panel">
                  <span className="about-highlight-label">Who We Are</span>
                  <ProseBlock paragraphs={WHO_WE_ARE.paragraphs} className="about-prose about-prose-compact" />
                </article>
              </Reveal>
            </div>

            <Reveal variant="scale" delay={80}>
              <div className="about-story-media">
                <div className="about-story-media-frame">
                  <AboutVideo
                    aspect="16/9"
                    label="PrimeAxis Technologies team"
                    stats={COMPANY_STATS.slice(0, 3)}
                  />
                  <div className="about-story-media-glow" aria-hidden="true" />
                </div>
                <div className="about-story-media-caption">
                  <span className="about-story-media-chip">Inside PrimeAxis</span>
                  <p>Watch our team build real solutions — from Zoho ERP to custom software and AI automation.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="about-section about-section-muted about-section-purpose">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Purpose"
              title="Our Purpose, Mission & Vision"
              subtitle="What guides us and where we are headed"
            />
          </Reveal>

          <div className="about-purpose-bento">
            <Reveal delay={40}>
              <article className="about-purpose-card about-purpose-card-wide">
                <span className="about-purpose-icon" aria-hidden="true">🌟</span>
                <h3>Our Purpose</h3>
                <ProseBlock paragraphs={OUR_PURPOSE.paragraphs} className="about-prose about-prose-compact" />
              </article>
            </Reveal>
            <Reveal delay={70}>
              <article className="about-purpose-card">
                <span className="about-purpose-icon" aria-hidden="true">🎯</span>
                <h3>Our Mission</h3>
                <p>{MISSION_VISION.mission}</p>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article className="about-purpose-card about-purpose-card-accent">
                <span className="about-purpose-icon" aria-hidden="true">🔭</span>
                <h3>Our Vision</h3>
                <p>{MISSION_VISION.vision}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="about-section about-section-values">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Values"
              title="Our Core Values"
              subtitle="Principles that shape every project and partnership"
            />
          </Reveal>

          <div className="about-values-grid">
            {CORE_VALUES.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 40} variant="scale">
                <article className="about-value-card">
                  <span className="about-value-icon" aria-hidden="true">{item.icon}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section-muted about-section-capabilities">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Capabilities"
              title="What We Do & Our Expertise"
              subtitle="End to end digital services tailored to your business"
            />
          </Reveal>

          <Reveal delay={40}>
            <p className="about-lead">{WHAT_WE_DO.intro}</p>
          </Reveal>

          <Reveal delay={60}>
            <div className="about-service-cloud">
              {WHAT_WE_DO.services.map((service) => (
                <span key={service} className="about-service-chip">{service}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="about-closing-note">{WHAT_WE_DO.closing}</p>
          </Reveal>

          <div className="about-expertise-grid">
            {EXPERTISE_AREAS.map((area, i) => (
              <Reveal key={area.title} delay={90 + (i % 3) * 35}>
                <article className="about-expertise-card">
                  <div className="about-expertise-head">
                    <span aria-hidden="true">{area.icon}</span>
                    <h3>{area.title}</h3>
                  </div>
                  <p>{area.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section-process">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Process"
              title="How We Work"
              subtitle="A structured, collaborative approach to successful delivery"
            />
          </Reveal>

          <div className="about-process-track">
            {HOW_WE_WORK.map((item, i) => (
              <Reveal key={item.step} delay={i * 35}>
                <article className="about-process-step">
                  <span className="about-process-num">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section-muted about-section-promise">
        <div className="cs-preview-container">
          <div className="about-promise-grid">
            <div>
              <Reveal>
                <SectionIntro
                  label="Commitment"
                  title="Our Commitment to You"
                  subtitle="Technology solutions built for lasting business value"
                  className="about-section-intro-left"
                />
              </Reveal>
              <Reveal delay={40}>
                <div className="about-trait-cloud">
                  {COMMITMENT.traits.map((trait) => (
                    <span key={trait} className="about-trait-chip">{trait}</span>
                  ))}
                </div>
                <p className="about-commitment-text">{COMMITMENT.text}</p>
              </Reveal>
            </div>

            <div>
              <Reveal delay={60}>
                <SectionIntro
                  title="Why Choose PrimeAxis?"
                  subtitle="What sets us apart as your technology partner"
                  className="about-section-intro-left"
                />
              </Reveal>
              <Reveal delay={90}>
                <ul className="about-why-list">
                  {WHY_CHOOSE.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-section-impact">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Journey"
              title="Our Journey & Impact"
              subtitle="Growing alongside the businesses we serve"
            />
          </Reveal>

          <Reveal delay={50}>
            <ProseBlock paragraphs={OUR_JOURNEY.paragraphs} className="about-prose about-journey-prose" />
          </Reveal>

          <div className="about-impact-stats">
            {COMPANY_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={70 + i * 40} variant="scale">
                <article className="about-impact-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="about-impact-details">
            {IMPACT_DETAILS.map((item, i) => (
              <Reveal key={item.stat} delay={100 + i * 35}>
                <article className="about-impact-detail">
                  <h3>{item.stat}</h3>
                  <p>{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section-muted about-section-future">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro label="Future" title="Looking Ahead" />
          </Reveal>
          <Reveal delay={60}>
            <blockquote className="about-future-quote">
              <p>{LOOKING_AHEAD}</p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <PreviewFinalCTA
        title="Ready to transform your business?"
        secondaryLabel="Meet Our Team"
        secondaryHref="/team"
      />

      <Footer />
      <WhatsAppChat />
    </div>
  )
}
