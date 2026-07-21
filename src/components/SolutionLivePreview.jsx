import { normalizeExternalUrl } from '../utils/url'

export default function SolutionLivePreview({
  title,
  image,
  liveDemoUrl,
  isLive = false,
  aspect = 'landscape',
}) {
  const liveUrl = normalizeExternalUrl(liveDemoUrl)
  const showLive = Boolean(liveUrl || isLive)
  const aspectClass = aspect === 'portrait' ? 'portrait' : 'landscape'

  const displayUrl = liveUrl
    ? liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : 'project-preview.local'

  if (!image && !liveUrl) return null

  return (
    <div className={`cs-solution-live cs-solution-live--${aspectClass}`}>
      <div className="cs-solution-live-frame">
        <div className="cs-solution-live-chrome">
          <div className="cs-solution-live-dots" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className="cs-solution-live-url">{displayUrl}</div>
          {showLive && (
            <span className="cs-solution-live-badge">
              <span className="cs-solution-live-badge-dot" aria-hidden="true" />
              LIVE
            </span>
          )}
        </div>

        <div className={`cs-solution-live-viewport cs-solution-live-viewport--${aspectClass}`}>
          {image && (
            <div className="cs-solution-live-media">
              <img src={image} alt={`${title} live preview`} loading="lazy" />
            </div>
          )}

          <div className="cs-solution-live-shimmer" aria-hidden="true" />
          <div className="cs-solution-live-scanlines" aria-hidden="true" />
          <div className="cs-solution-live-vignette" aria-hidden="true" />
          <div className="cs-solution-live-rec" aria-hidden="true">
            <span className="cs-solution-live-rec-dot" />
            REC
          </div>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-solution-live-open"
            >
              Open live site
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
