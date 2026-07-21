import { useEffect, useState } from 'react'
import SolutionLivePreview from './SolutionLivePreview'

export default function SolutionImpactLive({
  title,
  coverImage,
  steps = [],
  aspect = 'landscape',
  liveDemoUrl,
  isLive = false,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const visibleSteps = steps.slice(0, 4)

  useEffect(() => {
    if (visibleSteps.length <= 1) return undefined
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visibleSteps.length)
    }, 3400)
    return () => window.clearInterval(timer)
  }, [visibleSteps.length])

  if (!coverImage || !visibleSteps.length) return null

  return (
    <section className="cs-solution-impact theme-dark">
      <div
        className="cs-solution-impact-cover"
        style={{ backgroundImage: `url('${coverImage}')` }}
        aria-hidden="true"
      />
      <div className="cs-solution-impact-scrim" aria-hidden="true" />
      <div className="cs-solution-impact-grid" aria-hidden="true" />
      <div className="cs-solution-impact-glow" aria-hidden="true" />

      <div className="cs-preview-container cs-solution-impact-inner">
        <div className="cs-solution-impact-head">
          <span className="cs-solution-impact-badge">
            <span className="cs-solution-impact-badge-dot" aria-hidden="true" />
            Live Impact
          </span>
          <h2 className="cs-solution-impact-title">How delivery came together</h2>
          <p className="cs-solution-impact-sub">
            Cover preview with the four solution pillars that shaped {title}.
          </p>
        </div>

        <div className={`cs-solution-impact-layout cs-solution-impact-layout--${aspect}`}>
          <div className="cs-solution-impact-visual">
            <SolutionLivePreview
              title={title}
              image={coverImage}
              liveDemoUrl={liveDemoUrl}
              isLive={isLive}
              aspect={aspect}
            />
          </div>

          <ol className="cs-solution-impact-steps">
            {visibleSteps.map((step, index) => (
              <li
                key={`${step.title}-${index}`}
                className={`cs-solution-impact-step${activeIndex === index ? ' is-active' : ''}`}
                style={{ '--step-index': index }}
              >
                <span className="cs-solution-impact-step-num">{index + 1}</span>
                <div className="cs-solution-impact-step-body">
                  <strong>{step.title}</strong>
                  {step.desc ? <p>{step.desc}</p> : null}
                </div>
                <span className="cs-solution-impact-step-beam" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
