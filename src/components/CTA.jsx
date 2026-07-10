import Reveal from './Reveal'

export default function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-cta relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora-blob absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/25 rounded-full" />
        <div className="aurora-blob absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-warm/15 rounded-full" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="scale">
          <div className="glass-panel rounded-3xl p-10 sm:p-14 text-center border border-white/15 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
              Whether you need a modern website, a custom mobile application, Zoho ERP &amp; CRM
              implementation, AI-powered automation, or a complete digital transformation strategy,
              PrimeAxis Technologies is here to help.
            </p>
            <p className="mt-4 text-white/60">
              Let&apos;s discuss your project and build a solution that drives measurable results.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary inline-flex items-center justify-center px-10 py-4">
                Request a Free Consultation
              </a>
              <a href="#contact" className="inline-flex items-center justify-center border border-white/30 hover:border-warm hover:bg-warm/10 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300">
                Contact Our Team
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
