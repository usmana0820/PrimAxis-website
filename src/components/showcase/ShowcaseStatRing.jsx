export default function ShowcaseStatRing({ value, label }) {
  const pct = Math.min(Math.max(value, 0), 100)
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="cs-showcase-stat-ring">
      <svg viewBox="0 0 128 128" aria-hidden="true">
        <circle className="cs-showcase-stat-ring-bg" cx="64" cy="64" r={radius} />
        <circle
          className="cs-showcase-stat-ring-fill"
          cx="64"
          cy="64"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="cs-showcase-stat-ring-value">{pct}%</div>
      <p className="cs-showcase-stat-ring-label">{label}</p>
    </div>
  )
}
