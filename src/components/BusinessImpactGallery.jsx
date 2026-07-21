import { buildImpactKpis, getImpactGridCount, normalizeImpactMetrics } from '../utils/impactMetrics'

export default function BusinessImpactGallery({
  metrics = [],
  kpis: kpisProp,
  className = '',
}) {
  const readyMetrics = normalizeImpactMetrics(metrics)
  const items = kpisProp?.length ? kpisProp : buildImpactKpis(readyMetrics.length ? readyMetrics : metrics)

  if (!items.length) return null

  const metricCount = items.length

  return (
    <div className={`cs-preview-impact-gallery cs-preview-impact-gallery--metrics${className ? ` ${className}` : ''}`}>
      <div
        className={`cs-preview-impact-metrics-grid cs-preview-impact-metrics-grid--count-${getImpactGridCount(metricCount)}`}
      >
        {items.map((item, index) => (
          <article
            key={`${item.statement || item.label}-${index}`}
            className={`cs-preview-kpi-card cs-preview-kpi-card-${item.variant} cs-preview-impact-metric-card`}
          >
            <div className="cs-preview-impact-metric-hero">
              <div className="cs-preview-kpi-value">{item.value}</div>
              <div className="cs-preview-kpi-suffix">{item.suffix || '%'}</div>
            </div>
            <div className="cs-preview-kpi-label">{item.statement || item.label}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
