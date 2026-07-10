import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppChat from './WhatsAppChat'

export default function PageShell({ children, badge, title, description, heroVariant = 'default' }) {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar isSubpage />
      <main>
        <section className={`page-hero page-hero-${heroVariant} relative overflow-hidden section-light-theme`}>
          <div className={`page-hero-bg page-hero-bg-${heroVariant}`} aria-hidden="true" />
          <div className="page-hero-mesh" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-hero-inner">
            <span className="section-label">{badge}</span>
            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display leading-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-5 text-text-muted text-lg leading-relaxed max-w-2xl">
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
