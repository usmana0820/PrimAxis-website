import { lazy, Suspense } from 'react'

const LiveBackground = lazy(() => import('./LiveBackground'))

export default function PreviewHeroBackground({ coverImage }) {
  return (
    <>
      <Suspense fallback={null}>
        <LiveBackground variant="hero" />
      </Suspense>

      {coverImage ? (
        <div
          className="cs-preview-hero-cover"
          style={{ backgroundImage: `url('${coverImage}')` }}
          aria-hidden="true"
        />
      ) : null}

      <div
        className="absolute inset-0 hero-grid cs-preview-hero-grid-layer opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hero-premium-glow cs-preview-hero-glow-layer pointer-events-none"
        aria-hidden="true"
      />
      <div className="cs-preview-hero-overlay cs-preview-hero-live-scrim" aria-hidden="true" />
    </>
  )
}
