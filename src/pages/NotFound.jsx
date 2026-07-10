import { LOGO_SRC, BRAND_NAME } from '../constants/branding'
import TechStackStrip from '../components/TechStackStrip'
import WhatsAppChat from '../components/WhatsAppChat'

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-bg-glow notfound-bg-glow-1" />
      <div className="notfound-bg-glow notfound-bg-glow-2" />

      <div className="notfound-scene">
        <div className="notfound-float notfound-float-1">
          <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div className="notfound-float notfound-float-2">
          <svg className="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="notfound-float notfound-float-3">
          <svg className="w-6 h-6 text-white/45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>

        <div className="notfound-cube-wrap">
          <div className="notfound-cube">
            <div className="notfound-cube-face notfound-cube-front" />
            <div className="notfound-cube-face notfound-cube-back" />
            <div className="notfound-cube-face notfound-cube-right" />
            <div className="notfound-cube-face notfound-cube-left" />
            <div className="notfound-cube-face notfound-cube-top" />
            <div className="notfound-cube-face notfound-cube-bottom" />
          </div>
        </div>
      </div>

      <div className="notfound-content">
        <img src={LOGO_SRC} alt={BRAND_NAME} className="notfound-logo" />
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-desc">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <a href="/" className="notfound-btn">
          Return Home
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </a>
      </div>

      <div className="notfound-tech-strip">
        <TechStackStrip variant="dark" showLabel={false} />
      </div>

      <WhatsAppChat />
    </div>
  )
}
