import Reveal from './Reveal'
import SectionHead from './SectionHead'
import TiltCard from './TiltCard'
import { getCardRevealVariant } from '../utils/revealVariants'
import { useCountUp } from '../hooks/useCountUp'

const stats = [
  { value: '50', suffix: '+', label: 'Projects', gradient: 'from-[#355C7D] to-[#4F46E5]' },
  { value: '25', suffix: '+', label: 'Happy Clients', gradient: 'from-[#4F46E5] to-[#06B6D4]' },
  { value: '10', suffix: '+', label: 'Industries', gradient: 'from-[#06B6D4] to-[#355C7D]' },
  { value: '99', suffix: '%', label: 'Client Satisfaction', gradient: 'from-[#355C7D] to-[#06B6D4]' },
  { value: '5', suffix: '+', label: 'Core Services', gradient: 'from-[#4F46E5] to-[#355C7D]' },
]

function StatCard({ value, suffix, label, gradient, delay, index }) {
  const { ref, display } = useCountUp(value, 2000, suffix)

  return (
    <Reveal delay={delay} variant={getCardRevealVariant(index)} className="h-full">
      <TiltCard className="h-full" intensity={12}>
        <div ref={ref} className="stats-glass-card tilt-card-surface group h-full">
        <div className={`stats-glass-accent bg-gradient-to-br ${gradient}`} />
        <div className="relative p-7 lg:p-8 text-center h-full flex flex-col items-center justify-center">
          <p className="stats-counter-value">{display}</p>
          <p className="mt-3 text-sm font-semibold text-text-muted group-hover:text-[#355C7D] transition-colors">
            {label}
          </p>
        </div>
        </div>
      </TiltCard>
    </Reveal>
  )
}

export default function Stats() {
  return (
    <section className="page-section relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          label="Our Impact"
          title="Delivering Results That Matter"
          subtitle="Numbers that reflect our commitment to quality, scale, and client success."
        />

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 80} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
