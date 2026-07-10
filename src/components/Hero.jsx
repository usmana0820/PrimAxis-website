import Reveal from './Reveal'
import { BRAND_NAME } from '../constants/branding'
import { HERO_FLOAT_TECH } from '../constants/techStack'
import TechIcon from './TechIcon'

const stats = [
  {
    value: '50+',
    label: 'Projects',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    value: '10+',
    label: 'Industries',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    ),
  },
  {
    value: '99%',
    label: 'Satisfaction',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
]

function HeroDashboard() {
  return (
    <div className="hero-dashboard-scene">
      <div className="hero-light-trail hero-light-trail-1" />
      <div className="hero-light-trail hero-light-trail-2" />

      {HERO_FLOAT_TECH.map((tech) => (
        <div key={tech.name} className={`hero-float-tile ${tech.style}`}>
          {tech.icon ? (
            <div className="hero-float-icon-box">
              <TechIcon name={tech.name} icon={tech.icon} size={22} className="w-[22px] h-[22px]" />
            </div>
          ) : (
            <div className="hero-float-icon-box hero-float-icon-box-label">
              <span className="text-[9px] font-bold text-[#355C7D] leading-tight text-center px-0.5">AI</span>
            </div>
          )}
          <span className="hero-float-label">{tech.label ?? tech.name}</span>
        </div>
      ))}

      <div className="hero-glow-base" />

      <div className="hero-dashboard-card">
        <div className="hero-dashboard-bar">
          <span /><span /><span />
        </div>
        <div className="hero-dashboard-grid">
          <div className="hero-dash-panel">
            <div className="hero-dash-chart">
              {[35, 55, 40, 70, 50, 85, 60].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="hero-dash-panel hero-dash-panel-sm">
            <div className="hero-dash-donut">
              <span>75%</span>
            </div>
          </div>
          <div className="hero-dash-panel hero-dash-list">
            <div className="hero-dash-list-item"><span />New Clients</div>
            <div className="hero-dash-list-item"><span />Recent Projects</div>
            <div className="hero-dash-list-item"><span />Analytics</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="theme-dark relative min-h-screen flex items-center bg-hero-premium overflow-hidden pt-28">
      <div className="absolute inset-0 hero-grid opacity-40" />
      <div className="absolute inset-0 hero-premium-glow pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Reveal variant="slide-right">
              <div className="hero-badge">
                <span className="text-cyan-400">✧</span>
                DIGITAL INNOVATION. MEASURABLE IMPACT.
              </div>
            </Reveal>

            <Reveal delay={100} variant="flip">
              <h1 className="mt-8 text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.08] tracking-tight font-display">
                Empowering Businesses Through{' '}
                <span className="hero-gradient-text">Smart Digital Solutions</span>
              </h1>
            </Reveal>

            <Reveal delay={200} variant="fade-up">
              <p className="mt-6 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-xl">
                {BRAND_NAME} delivers intelligent, scalable, and future-ready digital solutions — from
                Zoho ERP &amp; CRM to custom software, mobile apps, AI automation, and digital marketing.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="hero-btn-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Get Free Consultation
                  <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#portfolio" className="hero-btn-outline">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  View Portfolio
                  <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 flex flex-wrap gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="hero-stat-card">
                    <div className="hero-stat-icon">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {stat.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white leading-none">{stat.value}</p>
                      <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} variant="scale" className="relative hidden lg:block">
            <HeroDashboard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
