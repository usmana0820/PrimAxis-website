import { useState } from 'react'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import TiltCard from './TiltCard'
import { getCardRevealVariant } from '../utils/revealVariants'

const faqs = [
  {
    q: 'What services do you provide?',
    a: 'We provide Zoho ERP & CRM implementation, website development, mobile app development, AI solutions, digital marketing, and business analysis & consulting — all tailored to your business needs.',
  },
  {
    q: 'How long does a project take?',
    a: 'Project timelines vary based on scope and complexity. A typical website takes 2–4 weeks, while Zoho ERP implementations may take 4–8 weeks. We provide a clear roadmap with milestones during the planning phase.',
  },
  {
    q: 'Do you provide support after deployment?',
    a: 'Yes. Our relationship continues after launch. We offer ongoing maintenance, updates, monitoring, and technical support to ensure your systems run smoothly.',
  },
  {
    q: 'Can you customize Zoho CRM?',
    a: 'Absolutely. We specialize in Zoho customization including custom modules, fields, workflow automation, API integrations, reports, dashboards, and user training.',
  },
  {
    q: 'Do you build mobile apps?',
    a: 'Yes. We build cross-platform apps with Flutter and React Native, plus native Android with Kotlin and Java. All projects include API integration, Firebase, push notifications, and performance optimization.',
  },
  {
    q: 'Do you offer AI solutions?',
    a: 'Yes. We deliver AI chatbots, business automation, machine learning integration, NLP solutions, intelligent recommendations, and AI-powered dashboards.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="page-section relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          label="FAQs"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about working with us."
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <Reveal key={faq.q} delay={i * 70} variant={getCardRevealVariant(i, 1)}>
                <TiltCard intensity={8} scale={1.01}>
                  <article className={`faq-card tilt-card-surface ${isOpen ? 'faq-card-open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="faq-trigger"
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question">{faq.q}</span>
                    <span className={`faq-chevron ${isOpen ? 'faq-chevron-open' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div className={`faq-panel ${isOpen ? 'faq-panel-open' : ''}`}>
                    <div className="faq-panel-inner">
                      <p className="faq-answer">{faq.a}</p>
                    </div>
                  </div>
                </article>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
