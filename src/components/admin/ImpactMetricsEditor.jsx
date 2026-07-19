import { MAX_IMPACT_METRICS, normalizeImpactMetric } from '../../utils/impactMetrics'

const EMPTY_METRIC = { label: '', value: '', suffix: '%' }

export default function ImpactMetricsEditor({ metrics = [], onChange }) {
  const updateMetric = (index, field, value) => {
    onChange(
      metrics.map((metric, i) => (i === index ? { ...metric, [field]: value } : metric))
    )
  }

  const addMetric = () => {
    if (metrics.length >= MAX_IMPACT_METRICS) return
    onChange([...metrics, { ...EMPTY_METRIC }])
  }

  const removeMetric = (index) => {
    onChange(metrics.filter((_, i) => i !== index))
  }

  return (
    <div className="admin-impact-metrics">
      <div className="admin-impact-metrics-head">
        <div>
          <h3>Impact Metrics</h3>
          <p className="admin-field-hint">
            Add 4–6 measurable results with percentages (e.g. Lead Conversion — 35%).
          </p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-outline admin-btn-sm"
          onClick={addMetric}
          disabled={metrics.length >= MAX_IMPACT_METRICS}
        >
          + Add Metric
        </button>
      </div>

      {metrics.length === 0 ? (
        <p className="admin-impact-metrics-empty">No impact metrics yet. Add your first percentage result.</p>
      ) : (
        <div className="admin-impact-metrics-list">
          {metrics.map((metric, index) => (
            <div key={`impact-metric-${index}`} className="admin-impact-metric-row">
              <label className="admin-label admin-impact-metric-label">
                Metric label
                <input
                  className="admin-input"
                  value={metric.label}
                  onChange={(e) => updateMetric(index, 'label', e.target.value)}
                  placeholder="e.g. Lead Conversion"
                />
              </label>
              <label className="admin-label admin-impact-metric-value">
                Value
                <input
                  className="admin-input"
                  type="number"
                  min="0"
                  max="999"
                  step="0.1"
                  value={metric.value}
                  onChange={(e) => updateMetric(index, 'value', e.target.value)}
                  placeholder="35"
                />
              </label>
              <label className="admin-label admin-impact-metric-suffix">
                Unit
                <select
                  className="admin-input"
                  value={metric.suffix || '%'}
                  onChange={(e) => updateMetric(index, 'suffix', e.target.value)}
                >
                  <option value="%">%</option>
                  <option value="x">x</option>
                </select>
              </label>
              <button
                type="button"
                className="admin-impact-metric-remove"
                onClick={() => removeMetric(index)}
                aria-label="Remove metric"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="admin-char-count">
        {metrics.length}/{MAX_IMPACT_METRICS} metrics
        {metrics.filter((metric) => normalizeImpactMetric(metric)).length > 0
          ? ` · ${metrics.filter((metric) => normalizeImpactMetric(metric)).length} ready to display`
          : ''}
      </p>
    </div>
  )
}
