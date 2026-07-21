import { MAX_IMPACT_METRICS, normalizeImpactMetric } from '../../utils/impactMetrics'
import BusinessImpactGallery from '../BusinessImpactGallery'

const EMPTY_METRIC = { value: '', statement: '' }

const PERCENTAGE_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

export default function BusinessImpactEditor({ summary = '', onSummaryChange, metrics = [], onChange }) {
  const safeMetrics = Array.isArray(metrics) ? metrics : []
  const readyCount = safeMetrics.filter((metric) => normalizeImpactMetric(metric)).length

  const updateMetric = (index, field, value) => {
    onChange(safeMetrics.map((metric, i) => (i === index ? { ...metric, [field]: value } : metric)))
  }

  const addMetric = () => {
    if (safeMetrics.length >= MAX_IMPACT_METRICS) return
    onChange([...safeMetrics, { ...EMPTY_METRIC }])
  }

  const removeMetric = (index) => {
    onChange(safeMetrics.filter((_, i) => i !== index))
  }

  return (
    <div className="admin-business-impact">
      <div className="admin-business-impact-head">
        <div>
          <h3>Business Impact</h3>
          <p className="admin-field-hint">
            Add up to six impact cards. For each card, choose a percentage first, then write one statement.
            The gallery preview below matches the case study layout ({readyCount} impact line
            {readyCount === 1 ? '' : 's'} ready).
          </p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-outline admin-btn-sm"
          onClick={addMetric}
          disabled={safeMetrics.length >= MAX_IMPACT_METRICS}
        >
          + Add Impact Card
        </button>
      </div>

      <label className="admin-label">
        Section intro <span className="admin-optional-tag">Optional</span>
        <span className="admin-field-hint">Plain text under the Business Impact heading. Percentage cards appear below.</span>
        <textarea
          className="admin-input admin-textarea"
          rows={2}
          maxLength={320}
          value={summary}
          onChange={(e) => onSummaryChange?.(e.target.value)}
          placeholder="e.g. The implementation significantly improved operational efficiency and provided real-time business insights."
        />
      </label>

      {safeMetrics.length === 0 ? (
        <p className="admin-impact-metrics-empty">No impact cards yet. Add your first percentage and statement.</p>
      ) : (
        <div className="admin-impact-cards">
          {safeMetrics.map((metric, index) => (
            <article key={`impact-card-${index}`} className="admin-impact-card admin-impact-card-form">
              <div className="admin-impact-card-toolbar">
                <strong>Impact card {index + 1}</strong>
                <button
                  type="button"
                  className="admin-impact-metric-remove"
                  onClick={() => removeMetric(index)}
                  aria-label={`Remove impact card ${index + 1}`}
                >
                  ×
                </button>
              </div>

              <div className="admin-impact-card-fields">
                <label className="admin-label admin-impact-card-percent">
                  Percentage
                  <select
                    className="admin-input"
                    value={metric.value === '' || metric.value == null ? '' : String(metric.value)}
                    onChange={(e) => updateMetric(index, 'value', e.target.value)}
                  >
                    <option value="">Choose %</option>
                    {PERCENTAGE_OPTIONS.map((pct) => (
                      <option key={pct} value={pct}>{pct}%</option>
                    ))}
                  </select>
                </label>

                <label className="admin-label admin-impact-card-statement">
                  Impact statement
                  <textarea
                    className="admin-input admin-textarea"
                    rows={3}
                    maxLength={220}
                    value={metric.statement ?? metric.label ?? ''}
                    onChange={(e) => updateMetric(index, 'statement', e.target.value)}
                    placeholder="e.g. Faster lead response"
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
      )}

      {(summary.trim() || readyCount > 0) && (
        <div className="admin-impact-gallery-preview">
          <p className="admin-impact-gallery-preview-label">Case study gallery preview</p>
          {summary.trim() && (
            <p className="admin-impact-preview-statement">{summary}</p>
          )}
          {readyCount > 0 && (
            <BusinessImpactGallery
              key={`impact-preview-${readyCount}-${safeMetrics.map((metric) => `${metric.value}-${metric.statement}`).join('|')}`}
              metrics={safeMetrics}
              className="admin-impact-gallery-preview-inner"
            />
          )}
        </div>
      )}

      <p className="admin-char-count">
        {safeMetrics.length}/{MAX_IMPACT_METRICS} cards · {readyCount} impact line{readyCount === 1 ? '' : 's'} in gallery
      </p>
    </div>
  )
}
