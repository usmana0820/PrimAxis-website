const MAX_IMPACT_METRICS = 6

export { MAX_IMPACT_METRICS }

/** @returns {{ value: number, suffix: '%', statement: string, label: string } | null} */
export function normalizeImpactMetric(metric) {
  if (!metric) return null

  const statement = String(metric.statement || metric.label || '').trim()
  if (!statement) return null

  const rawValue = metric.value
  if (rawValue === '' || rawValue == null || Number.isNaN(Number(rawValue))) return null

  const value = Math.min(100, Math.max(0, Number(rawValue)))

  return {
    value,
    suffix: '%',
    statement,
    label: statement,
  }
}

export function normalizeImpactMetrics(metrics) {
  return (metrics || [])
    .map(normalizeImpactMetric)
    .filter(Boolean)
    .slice(0, MAX_IMPACT_METRICS)
}

function metricToOutcomeLine(metric) {
  return `${metric.value}% ${metric.statement}`.trim()
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
        const statement =
          line
            .replace(/\d+(?:\.\d+)?\s*%\s*/i, '')
            .replace(/^(increase in|reduction in|decrease in|improved|reduced)\s+/i, '')
            .trim() || line

        return normalizeImpactMetric({
          value: pct[1],
          statement,
        })
      }

      return null
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
  const summaryCandidates = lines.filter((line) => !/\d+\s*%/.test(line))

  return {
    summary:
      summaryCandidates[0] ||
      (metricsFromLines.length ? '' : lines[0]) ||
      String(result || '').trim(),
    metrics: metricsFromLines.length ? metricsFromLines : parseLegacyImpactMetrics(result),
  }
}

export function buildImpactKpis(metrics) {
  return normalizeImpactMetrics(metrics).map((metric, index) => ({
    variant: index % 2 === 0 ? 'a' : 'b',
    value: String(metric.value),
    suffix: '%',
    label: metric.statement,
    statement: metric.statement,
  }))
}

export function hydrateImpactFields(project) {
  const rawMetrics = Array.isArray(project?.impactMetrics) ? project.impactMetrics : []
  const mappedMetrics = rawMetrics.map((metric) => ({
    value: metric?.value ?? '',
    statement: String(metric?.statement || metric?.label || '').trim(),
  }))

  const existingMetrics = normalizeImpactMetrics(mappedMetrics)
  if (existingMetrics.length || mappedMetrics.some((m) => m.statement || m.value !== '')) {
    return {
      businessImpact: String(project?.businessImpact || '').trim(),
      impactMetrics: mappedMetrics,
    }
  }

  const legacy = parseLegacyBusinessImpact(project?.businessImpact, project?.result)
  return {
    businessImpact: legacy.summary,
    impactMetrics: legacy.metrics.map((metric) => ({
      value: metric.value,
      statement: metric.statement,
    })),
  }
}

export function getImpactGridCount(count) {
  if (count <= 1) return 1
  if (count === 2) return 2
  if (count === 3) return 3
  if (count === 4) return 4
  return 3
}
