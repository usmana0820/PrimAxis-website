import { useState } from 'react'
import Reveal from './Reveal'

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
    a: 'Yes. We build cross-platform Android and iOS apps using Flutter and React Native, with API integration, Firebase, push notifications, and performance optimization.',
  },
  {
    q: 'Do you offer AI solutions?',
    a: 'Yes. We deliver AI chatbots, business automation, machine learning integration, NLP solutions, intelligent recommendations, and AI-powered dashboards.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="py-20 lg:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="section-label">FAQs</span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-text">Frequently Asked Questions</h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 60}>
              <div className="border border-primary/10 rounded-2xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-section/50 transition-colors"
                >
                  <span className="font-semibold text-text">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-accent shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48' : 'max-h-0'}`}>
                  <p className="px-6 pb-5 text-text-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
