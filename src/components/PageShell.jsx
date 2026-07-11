import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppChat from './WhatsAppChat'

export default function PageShell({ children, badge, title, description, heroVariant = 'default' }) {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar isSubpage />
      <main>
        <section className={`page-hero page-hero-${heroVariant} page-hero-blue relative overflow-hidden section-blue-theme`}>
          <div className="section-blue-pattern" aria-hidden="true" />
          <div className="section-blue-glow section-blue-glow-left" aria-hidden="true" />
          <div className="section-blue-glow section-blue-glow-right" aria-hidden="true" />
          <div className={`page-hero-accent page-hero-accent-${heroVariant}`} aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-hero-inner">
            <span className="section-label section-label-on-dark">{badge}</span>
            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight font-display leading-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </section>
        {children}
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  )
}
