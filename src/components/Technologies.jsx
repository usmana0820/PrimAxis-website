import Reveal from './Reveal'
import { TECH_CATEGORIES, getTechByName } from '../constants/techStack'
import TechIcon from './TechIcon'

const CATEGORY_ICONS = {
  Frontend: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  ),
  Mobile: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  ),
  Backend: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  ),
  Database: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  ),
  Cloud: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  ),
  CRM: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  ),
}

function TechLogoItem({ name }) {
  const tech = getTechByName(name)

  return (
    <div className="tech-logo-item group/item">
      <div className="tech-logo-icon-wrap">
        <TechIcon name={name} icon={tech?.icon} size={28} />
      </div>
      <span className="tech-logo-name">{name}</span>
    </div>
  )
}

export default function Technologies() {
  return (
    <section id="technologies" className="page-section relative overflow-hidden section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto section-header">
          <span className="section-label">Technology Stack</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display">
            Modern Tech Stack
          </h2>
          <p className="mt-5 text-text-muted text-lg leading-relaxed">
            We utilize industry-leading technologies to build secure, scalable, and high-performance digital solutions.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {TECH_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.category} delay={i * 70} variant="scale">
              <article className="tech-stack-card group h-full">
                <div className="p-6 lg:p-7 h-full flex flex-col">
                  <div className={`tech-stack-category-icon bg-gradient-to-br ${cat.gradient}`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {CATEGORY_ICONS[cat.category]}
                    </svg>
                  </div>

                  <h3 className="tech-stack-category-title text-base font-bold text-text font-display mt-5 mb-1.5 transition-colors">
                    {cat.category}
                  </h3>
                  <p className="tech-stack-category-desc text-text-muted text-xs leading-relaxed mb-6">{cat.description}</p>

                  <div className={`tech-stack-logos ${cat.items.length === 1 ? 'tech-stack-logos-single' : ''}`}>
                    {cat.items.map((name) => (
                      <TechLogoItem key={name} name={name} />
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
