import { useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import IndustryIcon from './IndustryIcon'
import { getIndustryDisplayCards } from '../constants/industries'

const industries = getIndustryDisplayCards()
const ROW_SPEEDS = [46, 54, 50]

function chunkIntoRows(items, rowCount = 3) {
  const size = Math.ceil(items.length / rowCount)
  return Array.from({ length: rowCount }, (_, index) =>
    items.slice(index * size, (index + 1) * size)
  ).filter((row) => row.length > 0)
}

const industryRows = chunkIntoRows(industries, 3)

function IndustrySlideCard({ industry }) {
  return (
    <article className="industry-slide-card industry-premium-card">
      <div className="industry-slide-card-inner">
        <div className={`industry-slide-icon bg-gradient-to-br ${industry.gradient}`}>
          <IndustryIcon type={industry.icon} className="w-6 h-6" />
        </div>
        <span className="industry-slide-label">{industry.name}</span>
      </div>
    </article>
  )
}

function IndustryMarqueeRow({ items, reverse = false, duration = 48 }) {
  const reduceMotion = useReducedMotion()
  const track = reduceMotion ? items : [...items, ...items]

  return (
    <div className="industries-marquee-row">
      <div className={`industries-marquee-viewport${reduceMotion ? ' industries-marquee-viewport-static' : ''}`}>
        <div
          className={`industries-marquee-track${reverse && !reduceMotion ? ' industries-marquee-track-reverse' : ''}${reduceMotion ? ' industries-marquee-track-static' : ''}`}
          style={reduceMotion ? undefined : { animationDuration: `${duration}s` }}
        >
          {track.map((industry, index) => (
            <IndustrySlideCard key={`${industry.name}-${index}`} industry={industry} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Industries() {
  return (
    <section className="page-section relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          label="Industries We Serve"
          title="Solutions Across Every Sector"
          subtitle="From Zoho ERP and CRM to custom software — we support agencies, retail, healthcare, manufacturing, and many more."
          subtitleClassName="mt-4 text-text-muted text-lg max-w-3xl mx-auto"
        />

        <Reveal delay={80}>
          <div className="industries-slider" aria-label="Industries we serve">
            {industryRows.map((row, index) => (
              <IndustryMarqueeRow
                key={`industry-row-${index}`}
                items={row}
                reverse={index % 2 === 1}
                duration={ROW_SPEEDS[index] ?? 48}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
