import Reveal from './Reveal'
import { useCountUp } from '../hooks/useCountUp'

function StatItem({ value, suffix, label }) {
  const { ref, display } = useCountUp(value, 2000, suffix)

  return (
    <div ref={ref} className="text-center p-6">
      <p className="text-4xl sm:text-5xl font-extrabold gradient-text">{display}</p>
      <p className="mt-2 text-text-muted text-sm font-medium">{label}</p>
    </div>
  )
}

const stats = [
  { value: '50', suffix: '+', label: 'Projects Delivered' },
  { value: '25', suffix: '+', label: 'Happy Clients' },
  { value: '10', suffix: '+', label: 'Industries Served' },
  { value: '99', suffix: '%', label: 'Client Satisfaction' },
  { value: '5', suffix: '+', label: 'Core Services' },
]

export default function Stats() {
  return (
    <section className="py-16 lg:py-20 bg-why relative">
      <div className="wave-divider absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="section-label">Our Impact</span>
          <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-text">Delivering Results That Matter</h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 bg-white rounded-3xl border border-primary/10 shadow-lg shadow-primary/5 p-4 lg:p-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} variant="scale">
              <StatItem {...stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
