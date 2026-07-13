import { LOGO_SRC, BRAND_NAME } from '../constants/branding'

export default function LoadingScreen({ fading }) {
  return (
    <div className={`loading-screen ${fading ? 'loading-screen-fade' : ''}`}>
      <div className="loading-bg-glow loading-bg-glow-1" />
      <div className="loading-bg-glow loading-bg-glow-2" />

      <div className="loading-orbit loading-orbit-1" />
      <div className="loading-orbit loading-orbit-2" />
      <div className="loading-orbit loading-orbit-3" />

      <div className="loading-center">
        <div className="loading-logo-ring">
          <div className="loading-logo-inner">
            <img src={LOGO_SRC} alt={BRAND_NAME} className="loading-logo-img" />
          </div>
        </div>
        <p className="loading-brand-name">{BRAND_NAME}</p>
        <p className="loading-tagline">Loading your experience…</p>
        <div className="loading-bar">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  )
}
