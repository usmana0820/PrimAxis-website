import Reveal from './Reveal'
import SectionHead from './SectionHead'
import TiltCard from './TiltCard'
import IndustryIcon from './IndustryIcon'
import { getCardRevealVariant } from '../utils/revealVariants'
import { getIndustryDisplayCards } from '../constants/industries'

const industries = getIndustryDisplayCards()

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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
          {industries.map((industry, i) => (
            <Reveal key={industry.name} delay={i * 40} variant={getCardRevealVariant(i, 5)} className="h-full">
              <TiltCard className="h-full" intensity={12}>
                <div className="industry-premium-card tilt-card-surface group h-full">
                  <div className="p-5 sm:p-6 text-center flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center text-white shadow-lg mb-4 transition-all duration-400 group-hover:scale-110 group-hover:shadow-xl`}>
                      <IndustryIcon type={industry.icon} />
                    </div>
                    <span className="text-sm font-semibold text-text group-hover:text-[#355C7D] transition-colors leading-snug">
                      {industry.name}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
