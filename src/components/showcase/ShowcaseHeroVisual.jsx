export default function ShowcaseHeroVisual({ study }) {
  const gallery = study.galleryImages?.filter(Boolean) || []
  const accent = gallery[0] || study.coverImage

  return (
    <div className="cs-showcase-visual">
      <div className="cs-showcase-visual-glow cs-showcase-visual-glow-a" />
      <div className="cs-showcase-visual-glow cs-showcase-visual-glow-b" />

      <div className="cs-showcase-visual-main">
        {study.coverImage ? (
          <img src={study.coverImage} alt={study.title} className="cs-showcase-visual-cover" />
        ) : (
          <div className={`cs-showcase-visual-fallback bg-gradient-to-br ${study.gradient}`}>
            <div className="cs-preview-mockup-bar">
              <span /><span /><span />
            </div>
            <div className="cs-preview-mockup-body">
              <div className="cs-preview-mockup-sidebar" />
              <div className="cs-preview-mockup-main">
                <div className="cs-preview-mockup-stats">
                  <span /><span /><span />
                </div>
                <div className="cs-preview-mockup-chart" />
              </div>
            </div>
          </div>
        )}
      </div>

      {accent && (
        <div className="cs-showcase-float cs-showcase-float-mobile">
          <img src={accent} alt="" aria-hidden="true" />
          <div className="cs-showcase-float-bar">
            <span /><span /><span />
          </div>
        </div>
      )}

      <div className="cs-showcase-float cs-showcase-float-stats">
        <div className="cs-showcase-float-stat-row">
          <span /><span /><span />
        </div>
        <div className="cs-showcase-float-chart" />
      </div>

      <div className="cs-showcase-float cs-showcase-float-widget">
        <div className="cs-showcase-float-widget-head" />
        <div className="cs-showcase-float-widget-line" />
        <div className="cs-showcase-float-widget-line short" />
      </div>
    </div>
  )
}
