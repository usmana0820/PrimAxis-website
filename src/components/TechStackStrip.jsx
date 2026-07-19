import { TECH_STACK } from '../constants/techStack'
import TechIcon from './TechIcon'

function TechPill({ tech, variant = 'light' }) {
  return (
    <div className={`tech-pill tech-pill-${variant} shrink-0`}>
      <div className="tech-pill-icon">
        <TechIcon name={tech.name} icon={tech.icon} size={22} />
      </div>
      <span className="tech-pill-name">{tech.name}</span>
    </div>
  )
}

export default function TechStackStrip({ variant = 'dark', showLabel = true }) {
  const items = [...TECH_STACK, ...TECH_STACK]

  return (
    <div className={`tech-stack-strip tech-stack-strip-${variant} tech-stack-strip-live theme-dark`}>
      <div className="tech-stack-strip-live-bg" aria-hidden="true">
        <span className="tech-stack-strip-live-orb tech-stack-strip-live-orb-a" />
        <span className="tech-stack-strip-live-orb tech-stack-strip-live-orb-b" />
        <span className="tech-stack-strip-live-grid" />
        <span className="tech-stack-strip-live-beam" />
      </div>

      {showLabel && (
        <p className="tech-stack-strip-label">
          <span className="tech-stack-strip-live-dot" aria-hidden="true" />
          Technology Stack
        </p>
      )}

      <div className="tech-stack-strip-inner tech-stack-strip-marquee-wrap">
        <div className="tech-stack-strip-glow-left" />
        <div className="tech-stack-strip-glow-right" />

        <div className="tech-stack-strip-viewport">
          <div className="tech-stack-strip-marquee-track">
            {items.map((tech, i) => (
              <TechPill key={`${tech.name}-${i}`} tech={tech} variant={variant} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
