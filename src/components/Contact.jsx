import { useState } from 'react'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { getCardRevealVariant } from '../utils/revealVariants'
import {
  OFFICE_ADDRESS,
  OFFICE_ADDRESS_SHORT,
  OFFICE_MAP_EMBED,
  OFFICE_MAP_URL,
} from '../constants/contact'

const serviceOptions = [
  'Zoho ERP & CRM', 'Website Development', 'Mobile App Development',
  'AI Solutions', 'Digital Marketing', 'Business Consulting', 'Other',
]

const budgetOptions = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $10,000', '$10,000+', 'Not sure yet']

const contactLinks = [
  {
    label: 'Phone',
    value: '+92 371 7461694',
    href: 'tel:+923717461694',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
    gradient: 'from-[#355C7D] to-[#4F46E5]',
  },
  {
    label: 'Email',
    value: 'primeaxis.technologies19@gmail.com',
    href: 'mailto:primeaxis.technologies19@gmail.com',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    gradient: 'from-[#4F46E5] to-[#06B6D4]',
  },
  {
    label: 'WhatsApp',
    value: '+92 371 7461694',
    href: 'https://wa.me/923717461694',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    ),
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    label: 'LinkedIn',
    value: 'PrimeAxis Technologies',
    href: 'https://linkedin.com',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2V9zm2-6a2 2 0 110 4 2 2 0 010-4z" />
    ),
    gradient: 'from-sky-500 to-[#355C7D]',
  },
  {
    label: 'GitHub',
    value: 'primeaxis-technologies',
    href: 'https://github.com',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    ),
    gradient: 'from-slate-600 to-slate-800',
  },
  {
    label: 'Office',
    value: OFFICE_ADDRESS,
    sub: 'Remote & on-site services available',
    href: OFFICE_MAP_URL,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    ),
    gradient: 'from-[#06B6D4] to-[#4F46E5]',
  },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Consultation Request from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\nService: ${form.service}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:primeaxis.technologies19@gmail.com?subject=${subject}&body=${body}`
  }

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  return (
    <section id="contact" className="page-section relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto section-header" variant="slide-top">
          <span className="section-label">Contact Us</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="mt-5 text-text-muted text-lg leading-relaxed">
            We&apos;d love to hear about your project and discuss how our technology solutions can
            support your business goals.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-4">
            <Reveal delay={40} variant="slide-right">
              <h3 className="text-lg font-bold text-text font-display mb-6">Get in Touch</h3>
            </Reveal>
            {contactLinks.map((item, i) => (
              <Reveal key={item.label} delay={i * 60} variant={getCardRevealVariant(i)}>
                <TiltCard intensity={10}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-info-card tilt-card-surface group block"
                  >
                  <div className={`contact-info-icon bg-gradient-to-br ${item.gradient}`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">{item.label}</p>
                    <p className="text-sm font-semibold text-text group-hover:text-[#355C7D] transition-colors truncate">
                      {item.value}
                    </p>
                    {item.sub && <p className="text-xs text-text-muted mt-0.5">{item.sub}</p>}
                  </div>
                  </a>
                </TiltCard>
              </Reveal>
            ))}

            <Reveal delay={contactLinks.length * 60} variant="slide-bottom">
              <div className="contact-map-preview mt-8">
                <iframe
                  title="Office location map"
                  src={OFFICE_MAP_EMBED}
                  className="contact-map-iframe"
                  loading="lazy"
                />
                <div className="contact-map-overlay">
                  <span className="contact-map-badge">{OFFICE_ADDRESS_SHORT}</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} variant="slide-left">
            <form onSubmit={handleSubmit} className="contact-form-glass">
              <h3 className="text-lg font-bold text-text font-display mb-6">Send a Message</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="contact-label">Full Name *</label>
                  <input id="name" type="text" required value={form.name} onChange={update('name')} className="contact-glass-input" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="contact-label">Email *</label>
                  <input id="email" type="email" required value={form.email} onChange={update('email')} className="contact-glass-input" placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="contact-label">Phone</label>
                  <input id="phone" type="tel" value={form.phone} onChange={update('phone')} className="contact-glass-input" placeholder="+92 300 0000000" />
                </div>
                <div>
                  <label htmlFor="company" className="contact-label">Company</label>
                  <input id="company" type="text" value={form.company} onChange={update('company')} className="contact-glass-input" placeholder="Your company" />
                </div>
                <div>
                  <label htmlFor="service" className="contact-label">Service</label>
                  <select id="service" value={form.service} onChange={update('service')} className="contact-glass-input">
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="contact-label">Budget</label>
                  <select id="budget" value={form.budget} onChange={update('budget')} className="contact-glass-input">
                    <option value="">Select budget range</option>
                    {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="message" className="contact-label">Message *</label>
                <textarea id="message" required rows={4} value={form.message} onChange={update('message')} className="contact-glass-input resize-none" placeholder="Tell us about your project..." />
              </div>
              <button type="submit" className="contact-submit-btn mt-6">
                Submit Request
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
