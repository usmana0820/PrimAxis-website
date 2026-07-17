import { lazy, Suspense } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppChat from './WhatsAppChat'

const LiveBackground = lazy(() => import('./LiveBackground'))

export default function PageShell({ children, badge, title, description, heroVariant = 'default' }) {
  const isPremium = heroVariant === 'premium'

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar isSubpage />
      <main>
        <section
          className={`page-hero page-hero-${heroVariant} relative overflow-hidden${
            isPremium ? ' theme-dark bg-hero-premium' : ' section-blue-theme'
          }`}
        >
          {isPremium ? (
            <>
              <Suspense fallback={null}>
                <LiveBackground variant="hero" />
              </Suspense>
              <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" aria-hidden="true" />
              <div className="absolute inset-0 hero-premium-glow pointer-events-none" aria-hidden="true" />
              <div className="page-hero-premium-scrim absolute inset-0 pointer-events-none" aria-hidden="true" />
            </>
          ) : (
            <>
              <div className="section-blue-pattern" aria-hidden="true" />
              <div className="section-blue-glow section-blue-glow-left" aria-hidden="true" />
              <div className="section-blue-glow section-blue-glow-right" aria-hidden="true" />
              <div className={`page-hero-accent page-hero-accent-${heroVariant}`} aria-hidden="true" />
            </>
          )}
          <div
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-hero-inner z-[1]"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            <span
              className={`section-label${isPremium ? '' : ' section-label-on-dark'}`}
              data-aos="fade-down"
              data-aos-delay="80"
            >
              {badge}
            </span>
            <h1
              className={`mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight font-display leading-tight${
                isPremium ? ' text-white' : ' text-white'
              }`}
              data-aos="fade-up"
              data-aos-delay="120"
            >
              {isPremium ? (
                <>
                  {title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="hero-gradient-text">{title.split(' ').slice(-1)}</span>
                </>
              ) : (
                title
              )}
            </h1>
            {description && (
              <p
                className={`mt-5 text-lg leading-relaxed max-w-2xl${isPremium ? ' text-white/75' : ' text-white/70'}`}
                data-aos="fade-up"
                data-aos-delay="180"
              >
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
