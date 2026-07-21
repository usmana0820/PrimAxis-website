import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import TextFlow from './TextFlow'
import TiltCard from './TiltCard'
import { getCardRevealVariant } from '../utils/revealVariants'
import AboutVideo from './AboutVideo'
import { COMPANY_STATS } from '../constants/companyAbout'

const highlights = [
  {
    title: 'Business Focused',
    desc: 'Solutions aligned with your goals',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    ),
  },
  {
    title: 'Agile Delivery',
    desc: 'Fast, iterative releases',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    title: 'Dedicated Support',
    desc: 'We stay after launch',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'Innovation Driven',
    desc: 'Modern tech, smart solutions',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    ),
  },
]

const stats = [
  { value: COMPANY_STATS[1].value, label: 'Projects' },
  { value: COMPANY_STATS[2].value, label: 'Clients' },
  { value: COMPANY_STATS[3].value, label: 'Industries' },
]

export default function About() {
  return (
    <section id="about" className="relative page-section section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-stretch">
          <Reveal variant="slide-right" className="order-2 lg:order-1 h-full">
            <div className="about-visual-wrap about-visual-wrap-extended about-visual-wrap--stretch">
              <div className="about-visual-frame about-visual-frame-wide about-visual-frame--stretch">
                <AboutVideo
                  aspect="16/9"
                  className="about-visual-img"
                  label="PrimeAxis Technologies team at work"
                />
                <div className="about-visual-overlay" aria-hidden="true" />
              </div>

              <div className="about-visual-badge">
                <span className="about-visual-badge-value">2+</span>
                <span className="about-visual-badge-label">Years of Experience</span>
              </div>

              <div className="about-visual-stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="about-visual-stat">
                    <span className="about-visual-stat-value">{stat.value}</span>
                    <span className="about-visual-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} variant="slide-left" className="order-1 lg:order-2 h-full space-y-6 lg:space-y-7">
            <div>
              <TextFlow as="span" mode="chars" className="section-label block" text="About Us" />
              <TextFlow
                as="h2"
                mode="words"
                delay={90}
                className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display leading-tight"
                text="Transforming Ideas into Powerful Digital Solutions"
              />
              <TextFlow
                as="p"
                mode="words"
                delay={180}
                className="mt-5 text-text-muted text-base lg:text-[17px] leading-relaxed"
                text="PrimeAxis Technologies helps businesses embrace digital transformation through Zoho ERP, custom software, mobile apps, AI, and digital marketing, built around your goals, not generic templates."
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <Reveal key={item.title} delay={i * 70} variant={getCardRevealVariant(i)} className="h-full">
                  <TiltCard className="h-full" intensity={12}>
                    <div className="about-highlight-card tilt-card-surface h-full">
                    <div className="about-highlight-icon">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <h3 className="about-highlight-title">{item.title}</h3>
                      <p className="about-highlight-desc">{item.desc}</p>
                    </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="about-mission-row grid sm:grid-cols-2 gap-4">
          <Reveal delay={80} variant="slide-left" className="h-full">
            <TiltCard className="h-full" intensity={10}>
              <div className="about-mission-card tilt-card-surface h-full">
                <p className="about-mission-label">Our Mission</p>
                <p className="about-mission-text">
                  Empower businesses with reliable, scalable technology that simplifies operations and drives growth.
                </p>
              </div>
            </TiltCard>
          </Reveal>
          <Reveal delay={140} variant="slide-right" className="h-full">
            <TiltCard className="h-full" intensity={10}>
              <div className="about-mission-card about-mission-card-accent tilt-card-surface h-full">
                <p className="about-mission-label">Our Vision</p>
                <p className="about-mission-text">
                  Become the trusted digital partner for SMEs and enterprises across Pakistan and beyond.
                </p>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <Reveal delay={160} className="about-section-cta">
          <Link to="/about" className="hero-btn-primary portfolio-view-details-btn">
            Know More About Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
