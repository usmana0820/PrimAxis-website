export default function PreviewHeroAside({ stats = [] }) {
  if (!stats.length) return null

  const [primary, ...secondary] = stats

  return (
    <div className="cs-preview-hero-aside">
      <div className="cs-preview-hero-aside-glow" aria-hidden="true" />
      <div className="cs-preview-hero-aside-orbit" aria-hidden="true">
        <span className="cs-preview-hero-aside-orbit-ring" />
        <span className="cs-preview-hero-aside-orbit-dot cs-preview-hero-aside-orbit-dot-1" />
        <span className="cs-preview-hero-aside-orbit-dot cs-preview-hero-aside-orbit-dot-2" />
        <span className="cs-preview-hero-aside-orbit-dot cs-preview-hero-aside-orbit-dot-3" />
      </div>

      <div className="cs-preview-hero-aside-bento">
        <article className="cs-preview-hero-aside-primary">
          <div className="cs-preview-hero-aside-primary-mesh" aria-hidden="true" />
          <div className="cs-preview-hero-aside-primary-ring" aria-hidden="true" />
          <p className="cs-preview-hero-aside-kicker">{primary.sub || 'Highlight'}</p>
          <p className={`cs-preview-hero-aside-value${primary.live ? ' is-live' : ''}`}>
            {primary.value}
          </p>
          <p className="cs-preview-hero-aside-label">{primary.label}</p>
          <div className="cs-preview-hero-aside-spark" aria-hidden="true">
            {[42, 68, 55, 82, 64, 90, 72].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </article>

        {secondary.map((stat, index) => (
          <article
            key={`${stat.label}-${index}`}
            className={`cs-preview-hero-aside-cell cs-preview-hero-aside-cell-${index + 1}`}
          >
            <div className="cs-preview-hero-aside-cell-accent" aria-hidden="true" />
            <p className={`cs-preview-hero-aside-value cs-preview-hero-aside-value-sm${stat.live ? ' is-live' : ''}`}>
              {stat.value}
            </p>
            <p className="cs-preview-hero-aside-label">{stat.label}</p>
            {stat.sub ? <p className="cs-preview-hero-aside-sub">{stat.sub}</p> : null}
          </article>
        ))}
      </div>
    </div>
  )
}
