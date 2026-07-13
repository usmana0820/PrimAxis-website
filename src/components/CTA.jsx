import { lazy, Suspense } from 'react'
import Reveal from './Reveal'

const LiveBackground = lazy(() => import('./LiveBackground'))

export default function CTA() {
  return (
    <section className="home-cta-section page-section relative overflow-hidden theme-dark bg-hero-premium">
      <Suspense fallback={null}>
        <LiveBackground variant="band" />
      </Suspense>

      <div className="hero-grid home-cta-grid absolute inset-0 opacity-35 pointer-events-none" aria-hidden="true" />
      <div className="cta-shape-grid cta-shape" aria-hidden="true" />
      <div className="cta-glow cta-glow-1" aria-hidden="true" />
      <div className="cta-glow cta-glow-2" aria-hidden="true" />
      <div className="cta-shape cta-shape-circle cta-shape-1" aria-hidden="true" />
      <div className="cta-shape cta-shape-circle cta-shape-2" aria-hidden="true" />
      <div className="cta-shape cta-shape-ring" aria-hidden="true" />
      <div className="home-cta-scrim absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 hero-premium-glow pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 z-[2] text-center home-cta-inner">
        <Reveal variant="scale">
          <h2 className="home-cta-title font-display">
            Ready to Transform Your Business?
          </h2>
          <p className="home-cta-lead">
            Whether you need a modern website, custom mobile application, Zoho ERP &amp; CRM
            implementation, AI-powered automation, or a complete digital transformation strategy,
            PrimeAxis Technologies is here to help.
          </p>
          <p className="home-cta-sub">
            Let&apos;s discuss your project and build a solution that drives measurable results.
          </p>

          <div className="home-cta-actions">
            <a href="/#contact" className="cta-btn-primary">
              Request a Free Consultation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="/#contact" className="cta-btn-secondary">
              Contact Our Team
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
