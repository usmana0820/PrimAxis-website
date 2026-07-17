import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import Reveal from './Reveal'
import TextFlow from './TextFlow'
import TiltCard from './TiltCard'
import { usePageReady } from '../context/PageReadyContext'
import { BRAND_NAME } from '../constants/branding'
import { HERO_FLOAT_TECH } from '../constants/techStack'
import TechIcon from './TechIcon'

const HeroThreeScene = lazy(() => import('./HeroThreeScene'))

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
  const heroMetrics = [
    { value: '50+', label: 'Projects', sub: 'Delivered' },
    { value: '10+', label: 'Industries', sub: 'Served' },
    { value: '99%', label: 'Satisfaction', sub: 'Client Rating', live: true },
  ]

  return (
    <div className="hero-visual-v2">
      <div className="hero-visual-v2-glow" aria-hidden="true" />
      <div className="hero-visual-v2-orbit" aria-hidden="true">
        <span className="hero-visual-v2-orbit-ring" />
      </div>

      {HERO_FLOAT_TECH.slice(0, 6).map((tech, index) => (
        <div
          key={tech.name}
          className={`hero-visual-v2-chip hero-visual-v2-chip-${index + 1}`}
        >
          {tech.icon ? (
            <TechIcon name={tech.name} icon={tech.icon} size={18} className="w-[18px] h-[18px]" />
          ) : (
            <span className="hero-visual-v2-chip-ai">AI</span>
          )}
          <span>{tech.label ?? tech.name}</span>
        </div>
      ))}

      <div className="hero-visual-v2-bento">
        <article className="hero-visual-v2-primary">
          <div className="hero-visual-v2-primary-mesh" aria-hidden="true" />
          <p className="hero-visual-v2-kicker">Live Analytics</p>
          <p className="hero-visual-v2-value">75%</p>
          <p className="hero-visual-v2-label">Growth Trajectory</p>
          <div className="hero-visual-v2-chart" aria-hidden="true">
            {[35, 55, 40, 70, 50, 85, 60, 78].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="hero-visual-v2-feed">
            <div><span />New Clients</div>
            <div><span />Recent Projects</div>
            <div><span />AI Automation</div>
          </div>
        </article>

        {heroMetrics.map((metric, index) => (
          <article key={metric.label} className={`hero-visual-v2-cell hero-visual-v2-cell-${index + 1}`}>
            <div className="hero-visual-v2-cell-accent" aria-hidden="true" />
            <p className={`hero-visual-v2-value hero-visual-v2-value-sm${metric.live ? ' is-live' : ''}`}>
              {metric.value}
            </p>
            <p className="hero-visual-v2-label">{metric.label}</p>
            <p className="hero-visual-v2-sub">{metric.sub}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const dashboardRef = useRef(null)
  const pageReady = usePageReady()

  useEffect(() => {
    if (!pageReady || !dashboardRef.current) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.hero-visual-v2-chip', {
        opacity: 0,
        y: 20,
        scale: 0.88,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.2,
      })
      gsap.from('.hero-visual-v2-bento', {
        opacity: 0,
        y: 32,
        rotateX: 8,
        duration: 1,
        ease: 'power3.out',
        delay: 0.35,
      })
      gsap.from('.hero-visual-v2-glow', {
        opacity: 0,
        scale: 0.8,
        duration: 1.1,
        ease: 'power2.out',
      })
    }, dashboardRef)

    return () => ctx.revert()
  }, [pageReady])

  return (
    <section id="home" className="theme-dark relative min-h-screen flex items-center bg-hero-premium overflow-hidden pt-28">
      <Suspense fallback={null}>
        <HeroThreeScene />
      </Suspense>
      <div className="absolute inset-0 hero-grid opacity-40" />
      <div className="absolute inset-0 hero-premium-glow pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div className="hero-badge">
              <span className="text-cyan-400">✧</span>
              <TextFlow
                as="span"
                mode="chars"
                eager
                className="hero-badge-text"
                text="DIGITAL INNOVATION. MEASURABLE IMPACT."
              />
            </div>

            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.08] tracking-tight font-display">
              <TextFlow
                as="span"
                mode="words"
                eager
                delay={80}
                className="block sm:inline"
                text="Empowering Businesses Through"
              />
              {' '}
              <TextFlow
                as="span"
                mode="words"
                eager
                delay={420}
                className="hero-gradient-text block sm:inline"
                text="Smart Digital Solutions"
              />
            </h1>

            <TextFlow
              as="p"
              mode="words"
              eager
              delay={200}
              className="mt-6 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-xl"
              text={`${BRAND_NAME} delivers intelligent, scalable, and future-ready digital solutions — from Zoho ERP & CRM to custom software, mobile apps, AI automation, and digital marketing.`}
            />

            <Reveal delay={300} eager>
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

            <Reveal delay={400} eager>
              <div className="mt-10 flex flex-wrap gap-3">
                {stats.map((stat) => (
                  <TiltCard key={stat.label} intensity={10} scale={1.04}>
                    <div className="hero-stat-card tilt-card-surface">
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
                  </TiltCard>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} variant="scale" eager className="relative hidden lg:block">
            <TiltCard intensity={8} scale={1.02} className="w-full">
              <div ref={dashboardRef}>
                <HeroDashboard />
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
