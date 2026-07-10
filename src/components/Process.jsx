import Reveal from './Reveal'
import { useReveal } from '../hooks/useReveal'

const steps = [
  {
    title: 'Discovery',
    description: 'We understand your business, objectives, existing systems, and project vision.',
    gradient: 'from-[#355C7D] to-[#4F46E5]',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    ),
  },
  {
    title: 'Requirement Analysis',
    description: 'We document functional needs, scope, workflows, and measurable success criteria.',
    gradient: 'from-[#4F46E5] to-[#06B6D4]',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    ),
  },
  {
    title: 'Planning',
    description: 'We define the roadmap, technology stack, milestones, and delivery timeline.',
    gradient: 'from-[#06B6D4] to-[#355C7D]',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    ),
  },
  {
    title: 'UI/UX Design',
    description: 'We craft intuitive interfaces, wireframes, and prototypes for exceptional user experiences.',
    gradient: 'from-violet-500 to-purple-600',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    ),
  },
  {
    title: 'Development',
    description: 'We build secure, scalable solutions using modern technologies and best practices.',
    gradient: 'from-[#355C7D] to-[#06B6D4]',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    ),
  },
  {
    title: 'Testing',
    description: 'Every feature is validated for functionality, security, performance, and reliability.',
    gradient: 'from-emerald-500 to-teal-600',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    title: 'Deployment',
    description: 'We launch your solution, provide training, and ensure a smooth go-live transition.',
    gradient: 'from-sky-500 to-[#4F46E5]',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    ),
  },
  {
    title: 'Maintenance',
    description: 'We provide ongoing support, updates, monitoring, and continuous improvements.',
    gradient: 'from-amber-500 to-orange-500',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    ),
  },
]

function ProcessTimeline() {
  const { ref, revealed } = useReveal(0.2)

  return (
    <div ref={ref} className="process-timeline-container">
      {/* Desktop / tablet horizontal timeline */}
      <div className="hidden md:block process-timeline-horizontal">
        <div className="process-glow-track">
          <div className="process-glow-track-bg" />
          <div className={`process-glow-track-fill ${revealed ? 'revealed' : ''}`} />
          <div className={`process-glow-pulse ${revealed ? 'revealed' : ''}`} />
        </div>

        <div className="process-timeline-row">
          {steps.map((item, i) => (
            <div
              key={item.title}
              className={`process-timeline-node ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="process-node-icon-wrap">
                <div className={`process-node-icon bg-gradient-to-br ${item.gradient}`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <span className="process-node-ring" />
              </div>
              <div className="process-node-content">
                <span className="process-node-step">Step {String(i + 1).padStart(2, '0')}</span>
                <h3 className="process-node-title">{item.title}</h3>
                <p className="process-node-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="md:hidden process-timeline-vertical">
        <div className={`process-vertical-line ${revealed ? 'revealed' : ''}`} />
        {steps.map((item, i) => (
          <div
            key={item.title}
            className={`process-vertical-step ${revealed ? 'revealed' : ''}`}
            style={{ transitionDelay: `${i * 80 + 150}ms` }}
          >
            <div className="process-node-icon-wrap shrink-0">
              <div className={`process-node-icon bg-gradient-to-br ${item.gradient}`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
              </div>
              <span className="process-node-ring" />
            </div>
            <div className="process-node-content pt-1">
              <span className="process-node-step">Step {String(i + 1).padStart(2, '0')}</span>
              <h3 className="process-node-title">{item.title}</h3>
              <p className="process-node-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="page-section relative overflow-hidden section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto section-header">
          <span className="section-label">Our Development Process</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display">
            From Idea to Launch
          </h2>
          <p className="mt-5 text-text-muted text-lg leading-relaxed">
            A proven, transparent workflow that takes your project from discovery through long-term success.
          </p>
        </Reveal>

        <Reveal variant="fade-up">
          <ProcessTimeline />
        </Reveal>
      </div>
    </section>
  )
}
