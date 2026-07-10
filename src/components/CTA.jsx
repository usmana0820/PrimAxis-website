import Reveal from './Reveal'

export default function CTA() {
  return (
    <section className="page-section relative overflow-hidden theme-dark">
      <div className="cta-gradient-bg absolute inset-0" />

      {/* Geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cta-shape cta-shape-circle cta-shape-1" />
        <div className="cta-shape cta-shape-circle cta-shape-2" />
        <div className="cta-shape cta-shape-ring cta-shape-3" />
        <div className="cta-shape cta-shape-grid" />
        <div className="cta-glow cta-glow-1" />
        <div className="cta-glow cta-glow-2" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="scale">
          <div className="cta-glass-panel text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight font-display leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              Whether you need a modern website, custom mobile application, Zoho ERP &amp; CRM
              implementation, AI-powered automation, or a complete digital transformation strategy,
              PrimeAxis Technologies is here to help.
            </p>
            <p className="mt-3 text-white/60 text-sm sm:text-base">
              Let&apos;s discuss your project and build a solution that drives measurable results.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="cta-btn-primary">
                Request a Free Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#contact" className="cta-btn-secondary">
                Contact Our Team
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
