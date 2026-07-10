import Reveal from './Reveal'
import { useReveal } from '../hooks/useReveal'

const steps = [
  { step: '01', title: 'Discovery', description: 'We begin by understanding your business, objectives, existing systems, and project requirements.' },
  { step: '02', title: 'Planning', description: 'Our team prepares a strategic roadmap including timelines, technology selection, workflows, and project milestones.' },
  { step: '03', title: 'Design & Development', description: 'We build secure, scalable, and user-friendly solutions using modern technologies and industry best practices.' },
  { step: '04', title: 'Testing', description: 'Every feature is thoroughly tested to ensure functionality, security, performance, and reliability.' },
  { step: '05', title: 'Deployment', description: 'We deploy your solution, provide user training, and ensure a smooth transition into production.' },
  { step: '06', title: 'Support & Maintenance', description: 'We continue supporting your business with updates, enhancements, monitoring, and technical assistance.' },
]

function ProcessLine() {
  const { ref, revealed } = useReveal(0.3)
  return (
    <div ref={ref} className="hidden lg:block absolute top-[3.25rem] left-[6%] right-[6%] h-1 rounded-full overflow-hidden bg-primary/10">
      <div className={`process-line h-full rounded-full ${revealed ? 'revealed' : ''}`} />
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="py-20 lg:py-28 bg-process relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Our Development Process</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">
            From Idea to Launch
          </h2>
        </Reveal>

        <div className="relative">
          <ProcessLine />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((item, i) => (
              <Reveal key={item.step} delay={i * 100} variant="fade-up">
                <div className="process-step card-hover relative bg-white rounded-2xl p-8 border border-primary/10 h-full group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-secondary via-accent to-warm text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
                      {item.step.replace('0', '')}
                    </span>
                    <span className="text-xs font-bold text-accent uppercase tracking-widest">Step {item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-text mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
