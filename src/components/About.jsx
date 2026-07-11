import Reveal from './Reveal'
import { getCardRevealVariant } from '../utils/revealVariants'
import aboutImage from '../assets/aboutsection.jpg'

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
  { value: '50+', label: 'Projects' },
  { value: '25+', label: 'Clients' },
  { value: '10+', label: 'Industries' },
]

export default function About() {
  return (
    <section id="about" className="relative page-section section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal variant="slide-right" className="order-2 lg:order-1">
            <div className="about-visual-wrap">
              <div className="about-visual-frame">
                <img
                  src={aboutImage}
                  alt="PrimeAxis Technologies team at work"
                  className="about-visual-img"
                  loading="lazy"
                />
                <div className="about-visual-overlay" aria-hidden="true" />
              </div>

              <div className="about-visual-badge">
                <span className="about-visual-badge-value">5+</span>
                <span className="about-visual-badge-label">Years of Excellence</span>
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

          <Reveal delay={100} variant="slide-left" className="order-1 lg:order-2 space-y-8">
            <div>
              <span className="section-label">About Us</span>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display leading-tight">
                Transforming Ideas into Powerful Digital Solutions
              </h2>
              <p className="mt-5 text-text-muted text-base lg:text-[17px] leading-relaxed">
                PrimeAxis Technologies helps businesses embrace digital transformation through
                Zoho ERP, custom software, mobile apps, AI, and digital marketing — built around
                your goals, not generic templates.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <Reveal key={item.title} delay={i * 70} variant={getCardRevealVariant(i)} className="h-full">
                  <div className="about-highlight-card h-full">
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
                </Reveal>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Reveal delay={80} variant="slide-left">
                <div className="about-mission-card h-full">
                  <p className="about-mission-label">Our Mission</p>
                  <p className="about-mission-text">
                    Empower businesses with reliable, scalable technology that simplifies operations and drives growth.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={140} variant="slide-right">
                <div className="about-mission-card about-mission-card-accent h-full">
                  <p className="about-mission-label">Our Vision</p>
                  <p className="about-mission-text">
                    Become the trusted digital partner for SMEs and enterprises across Pakistan and beyond.
                  </p>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
