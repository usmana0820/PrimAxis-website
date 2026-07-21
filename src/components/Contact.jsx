import { useState } from 'react'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import TiltCard from './TiltCard'
import { getCardRevealVariant } from '../utils/revealVariants'
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from '../constants/contact'
import { firebaseReady } from '../lib/firebase'
import { submitInquiry } from '../services/inquiries'
import { emailNotificationsReady, sendContactEmail } from '../services/contactEmail'
import { CONTACT_LIMITS, validateContactForm } from '../utils/contactFormValidation'

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: '',
}

const serviceOptions = [
  'Zoho ERP & CRM', 'Website Development', 'Mobile App Development',
  'AI Solutions', 'Digital Marketing', 'UI/UX Design', 'Other',
]

const budgetOptions = ['Under $1,000', '$1,000 to $5,000', '$5,000 to $10,000', '$10,000+', 'Not sure yet']

const contactLinks = [
  {
    label: 'Phone',
    value: WHATSAPP_DISPLAY,
    href: 'tel:+923717461694',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
    gradient: 'from-[#355C7D] to-[#4F46E5]',
  },
  {
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    gradient: 'from-[#4F46E5] to-[#06B6D4]',
  },
  {
    label: 'WhatsApp',
    value: WHATSAPP_DISPLAY,
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
]

function openMailtoFallback(form) {
  const subject = encodeURIComponent(`Consultation Request from ${form.name}`)
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\nService: ${form.service}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`
  )
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: '', message: '' })

    const validation = validateContactForm(form)
    if (!validation.valid) {
      setErrors(validation.errors)
      setStatus({
        type: 'error',
        message: 'Please fix the highlighted fields and try again.',
      })
      return
    }

    const cleanForm = validation.values

    if (!firebaseReady && !emailNotificationsReady) {
      openMailtoFallback(cleanForm)
      return
    }

    setSubmitting(true)
    try {
      const tasks = []

      if (firebaseReady) {
        tasks.push(submitInquiry(cleanForm).then(() => 'firestore'))
      }
      if (emailNotificationsReady) {
        tasks.push(sendContactEmail(cleanForm).then(() => 'email'))
      }

      const results = await Promise.allSettled(tasks)
      const succeeded = results.filter((r) => r.status === 'fulfilled')

      if (!succeeded.length) {
        const reason = results.find((r) => r.status === 'rejected')
        throw reason?.reason || new Error('Could not send your message.')
      }

      setForm(INITIAL_FORM)
      setErrors({})
      setStatus({
        type: 'success',
        message: 'Thank you! Your message was sent successfully. Our team will get back to you shortly.',
      })
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Could not send your message. Please try again or email us directly.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const update = (field) => (e) => {
    const value = e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const fieldClass = (field) =>
    `contact-glass-input${errors[field] ? ' contact-glass-input-invalid' : ''}`

  return (
    <section id="contact" className="page-section relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          label="Contact Us"
          title="Let's Build Something Great Together"
          subtitle="We'd love to hear about your project and discuss how our technology solutions can support your business goals."
        />

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
                      <p className="contact-info-value text-sm font-semibold text-text group-hover:text-[#355C7D] transition-colors">
                        {item.value}
                      </p>
                      {item.sub && <p className="text-xs text-text-muted mt-0.5">{item.sub}</p>}
                    </div>
                  </a>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160} variant="slide-left">
            <form onSubmit={handleSubmit} className="contact-form-glass">
              <h3 className="text-lg font-bold text-text font-display mb-6">Send a Message</h3>

              {status.message && (
                <div className={`contact-form-status contact-form-status-${status.type}`} role="status">
                  {status.message}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="contact-label">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={CONTACT_LIMITS.name.max}
                    value={form.name}
                    onChange={update('name')}
                    className={fieldClass('name')}
                    placeholder="Your name"
                    disabled={submitting}
                    aria-invalid={errors.name ? 'true' : undefined}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <p id="name-error" className="contact-field-error">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="contact-label">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={CONTACT_LIMITS.email.max}
                    value={form.email}
                    onChange={update('email')}
                    className={fieldClass('email')}
                    placeholder="you@company.com"
                    disabled={submitting}
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <p id="email-error" className="contact-field-error">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="contact-label">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={CONTACT_LIMITS.phone.max}
                    value={form.phone}
                    onChange={update('phone')}
                    className={fieldClass('phone')}
                    placeholder="+92 300 0000000"
                    disabled={submitting}
                    aria-invalid={errors.phone ? 'true' : undefined}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && <p id="phone-error" className="contact-field-error">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="company" className="contact-label">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    maxLength={CONTACT_LIMITS.company.max}
                    value={form.company}
                    onChange={update('company')}
                    className={fieldClass('company')}
                    placeholder="Your company"
                    disabled={submitting}
                    aria-invalid={errors.company ? 'true' : undefined}
                    aria-describedby={errors.company ? 'company-error' : undefined}
                  />
                  {errors.company && <p id="company-error" className="contact-field-error">{errors.company}</p>}
                </div>
                <div>
                  <label htmlFor="service" className="contact-label">Service</label>
                  <select id="service" name="service" value={form.service} onChange={update('service')} className="contact-glass-input" disabled={submitting}>
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="contact-label">Budget</label>
                  <select id="budget" name="budget" value={form.budget} onChange={update('budget')} className="contact-glass-input" disabled={submitting}>
                    <option value="">Select budget range</option>
                    {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="message" className="contact-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={CONTACT_LIMITS.message.max}
                  value={form.message}
                  onChange={update('message')}
                  className={`${fieldClass('message')} resize-none`}
                  placeholder="Tell us about your project..."
                  disabled={submitting}
                  aria-invalid={errors.message ? 'true' : undefined}
                  aria-describedby={errors.message ? 'message-error message-hint' : 'message-hint'}
                />
                <div className="contact-field-meta">
                  {errors.message ? (
                    <p id="message-error" className="contact-field-error">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <span id="message-hint" className="contact-char-count">
                    {form.message.length}/{CONTACT_LIMITS.message.max}
                  </span>
                </div>
              </div>
              <button type="submit" className="contact-submit-btn mt-6" disabled={submitting}>
                {submitting ? 'Sending…' : 'Submit Request'}
                {!submitting && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
