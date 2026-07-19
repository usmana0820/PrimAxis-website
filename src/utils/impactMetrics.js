const MAX_IMPACT_METRICS = 6

export { MAX_IMPACT_METRICS }

export function normalizeImpactMetric(metric) {
  if (!metric) return null
  const label = String(metric.label || '').trim()
  if (!label) return null

  const rawValue = metric.value
  const value =
    rawValue === '' || rawValue == null || Number.isNaN(Number(rawValue))
      ? null
      : Math.min(999, Math.max(0, Number(rawValue)))

  return {
    label,
    value,
    suffix: String(metric.suffix || '%').trim() || '%',
  }
}

export function normalizeImpactMetrics(metrics) {
  return (metrics || [])
    .map(normalizeImpactMetric)
    .filter(Boolean)
    .slice(0, MAX_IMPACT_METRICS)
}

function metricToOutcomeLine(metric) {
  if (metric.value == null) return metric.label
  return `${metric.value}${metric.suffix} ${metric.label}`.trim()
}

export function impactMetricsToOutcomes(metrics) {
  return normalizeImpactMetrics(metrics).map(metricToOutcomeLine)
}

export function parseLegacyImpactMetrics(text) {
  if (!text) return []

  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const pct = line.match(/(\d+(?:\.\d+)?)\s*%/)
      if (pct) {
        return normalizeImpactMetric({
          value: pct[1],
          suffix: '%',
          label: line
            .replace(/\d+(?:\.\d+)?\s*%\s*/i, '')
            .replace(/^(increase in|reduction in|decrease in|improved|reduced)\s+/i, '')
            .trim() || line,
        })
      }

      const mult = line.match(/([\d.]+)\s*[×x]/i)
      if (mult) {
        return normalizeImpactMetric({
          value: mult[1],
          suffix: 'x',
          label: line.replace(/[\d.]+\s*[×x]\s*/i, '').trim() || line,
        })
      }

      return normalizeImpactMetric({ label: line, value: null, suffix: '%' })
    })
    .filter(Boolean)
    .slice(0, MAX_IMPACT_METRICS)
}

export function parseLegacyBusinessImpact(text, result = '') {
  const lines = String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (!lines.length) {
    return {
      summary: String(result || '').trim(),
      metrics: parseLegacyImpactMetrics(result),
    }
  }

  const metricsFromLines = parseLegacyImpactMetrics(lines.join('\n'))
  const summaryCandidates = lines.filter((line) => !/\d/.test(line))

  return {
    summary:
      summaryCandidates[0] ||
      (metricsFromLines.length ? '' : lines[0]) ||
      String(result || '').trim(),
    metrics: metricsFromLines.length ? metricsFromLines : parseLegacyImpactMetrics(result),
  }
}

export function buildImpactKpis(metrics, { result, outcomes } = {}) {
  const normalized = normalizeImpactMetrics(metrics)
  if (normalized.length) {
    return normalized.map((metric, index) => ({
      variant: metric.suffix === 'x' ? 'plain' : index % 2 === 0 ? 'a' : 'b',
      value: metric.value != null ? String(metric.value) : null,
      suffix: metric.value != null ? metric.suffix : '',
      label: metric.label,
    }))
  }

  const source = [...(outcomes || []), ...(result ? [result] : [])]
  const items = []

  source.forEach((text, index) => {
    const pct = text.match(/(\d+(?:\.\d+)?)\s*%/)
    if (pct) {
      items.push({
        variant: index % 2 === 0 ? 'a' : 'b',
        value: pct[1],
        suffix: '%',
        label: text
          .replace(/\d+(?:\.\d+)?\s*%\s*/i, '')
          .replace(/^(increase in|reduction in|decrease in)\s+/i, '')
          .trim() || text,
      })
      return
    }

    const mult = text.match(/([\d.]+)\s*[×x]/i)
    if (mult) {
      items.push({
        variant: 'plain',
        value: mult[1],
        suffix: 'x',
        label: text.replace(/[\d.]+\s*[×x]\s*/i, '').trim() || text,
      })
      return
    }

    items.push({
      variant: index % 2 === 0 ? 'a' : 'b',
      value: null,
      suffix: '',
      label: text,
    })
  })

  return items.slice(0, MAX_IMPACT_METRICS)
}

export function hydrateImpactFields(project) {
  const existingMetrics = normalizeImpactMetrics(project?.impactMetrics)
  if (existingMetrics.length) {
    return {
      businessImpact: String(project?.businessImpact || '').trim(),
      impactMetrics: existingMetrics,
    }
  }

  const legacy = parseLegacyBusinessImpact(project?.businessImpact, project?.result)
  return {
    businessImpact: legacy.summary,
    impactMetrics: legacy.metrics,
  }
}
