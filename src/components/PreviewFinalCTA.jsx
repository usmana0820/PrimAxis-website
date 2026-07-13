import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

const LiveBackground = lazy(() => import('./LiveBackground'))

function CtaButton({ href, className, children }) {
  const isInternal = href.startsWith('/') && !href.includes('#')
  if (isInternal) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export default function PreviewFinalCTA({
  title = 'Ready to build your next digital solution?',
  primaryLabel = 'Start a Project',
  primaryHref = '/#contact',
  secondaryLabel = 'Meet Our Team',
  secondaryHref = '/team',
}) {
  return (
    <section className="cs-preview-cta theme-dark bg-hero-premium relative overflow-hidden">
      <Suspense fallback={null}>
        <LiveBackground variant="band" />
      </Suspense>
      <div className="cs-preview-cta-scrim" aria-hidden="true" />
      <div className="absolute inset-0 hero-premium-glow pointer-events-none" aria-hidden="true" />

      <div className="cs-preview-container cs-preview-cta-inner relative z-[1]">
        <Reveal>
          <h2>{title}</h2>
          <div className="cs-preview-cta-actions">
            <CtaButton href={primaryHref} className="cs-preview-btn-white">
              {primaryLabel}
            </CtaButton>
            <CtaButton href={secondaryHref} className="cs-preview-btn-outline">
              {secondaryLabel}
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
