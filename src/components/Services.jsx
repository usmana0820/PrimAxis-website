import Reveal from './Reveal'
import SectionHead from './SectionHead'
import TiltCard from './TiltCard'
import { getCardRevealVariant } from '../utils/revealVariants'

const services = [
  {
    title: 'Zoho ERP & CRM',
    description: 'Complete Zoho implementation — setup, customization, automation, and integration to streamline operations and improve customer relationships.',
    gradient: 'from-[#355C7D] to-[#4F46E5]',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    ),
  },
  {
    title: 'Website Development',
    description: 'Modern, responsive, high-performing websites that strengthen your online presence and drive business growth.',
    gradient: 'from-[#4F46E5] to-[#06B6D4]',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    ),
  },
  {
    title: 'Mobile App Development',
    description: 'Flutter, React Native, Kotlin, and Java — powerful Android and iOS apps with seamless UX, keeping your business connected anywhere.',
    gradient: 'from-[#06B6D4] to-[#355C7D]',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    ),
  },
  {
    title: 'AI Solutions',
    description: 'Leverage AI to automate tasks, gain insights, and improve decision-making with chatbots, ML, and intelligent dashboards.',
    gradient: 'from-[#355C7D] to-[#06B6D4]',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    title: 'Digital Marketing',
    description: 'Data-driven SEO, social media, and paid campaigns to increase visibility and attract more customers to your brand.',
    gradient: 'from-[#4F46E5] to-[#355C7D]',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </>
    ),
  },
  {
    title: 'Business Analysis',
    description: 'Expert analysts who understand your challenges and design technology solutions aligned with your operational goals.',
    gradient: 'from-[#06B6D4] to-[#4F46E5]',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="page-section relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          label="Our Services"
          title="Comprehensive Technology Solutions"
          subtitle="End-to-end digital services tailored to help your business grow and thrive."
          subtitleClassName="mt-4 text-text-muted text-lg"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 90} variant={getCardRevealVariant(i, 3)} className="h-full">
              <TiltCard className="h-full">
                <article className="service-luxury-card tilt-card-surface group h-full">
                <div className="relative p-8 h-full flex flex-col">
                  <div className={`service-icon-wrap bg-gradient-to-br ${service.gradient} mb-6`}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {service.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text mb-3 font-display group-hover:text-[#355C7D] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed flex-1">{service.description}</p>
                  <div className="service-card-more mt-6 flex items-center text-sm font-semibold text-[#06B6D4] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
