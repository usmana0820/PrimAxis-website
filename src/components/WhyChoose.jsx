import Reveal from './Reveal'

const reasons = [
  {
    title: 'Fast Delivery',
    description: 'Agile workflow with clear milestones so your project ships on time, every time.',
    gradient: 'from-[#355C7D] to-[#4F46E5]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    title: 'Zoho Specialists',
    description: 'Deep expertise in the full Zoho ecosystem, far beyond surface-level setup.',
    gradient: 'from-[#4F46E5] to-[#06B6D4]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
  },
  {
    title: 'Dedicated Support',
    description: "Our relationship doesn't end after deployment — continuous maintenance and support when you need us.",
    gradient: 'from-[#06B6D4] to-[#355C7D]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />,
  },
  {
    title: 'Secure Development',
    description: 'Every solution undergoes rigorous security testing to ensure reliability and data protection.',
    gradient: 'from-[#355C7D] to-[#06B6D4]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  },
  {
    title: 'Scalable Solutions',
    description: 'Architecture built to grow with your business — from startup to enterprise scale.',
    gradient: 'from-[#4F46E5] to-[#355C7D]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />,
  },
  {
    title: 'Affordable Pricing',
    description: 'Enterprise-quality solutions at competitive prices, accessible to businesses of all sizes.',
    gradient: 'from-[#06B6D4] to-[#4F46E5]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
]

export default function WhyChoose() {
  return (
    <section className="page-section relative overflow-hidden section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto section-header">
          <span className="section-label">Why Choose Us</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display leading-tight">
            Your Trusted Technology Partner
          </h2>
          <p className="mt-5 text-text-muted text-lg leading-relaxed">
            At PrimeAxis Technologies, we combine technical expertise with strategic thinking to deliver
            solutions that create measurable business value.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 80} variant="scale">
              <article className="why-feature-card group h-full">
                <div className="p-8 lg:p-9 h-full flex flex-col">
                  <div className={`why-icon-wrap bg-gradient-to-br ${reason.gradient}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {reason.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text mb-3 font-display mt-6 group-hover:text-[#355C7D] transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed flex-1">{reason.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
