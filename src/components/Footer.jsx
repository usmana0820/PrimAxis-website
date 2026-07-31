import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { LOGO_SRC, BRAND_NAME, BRAND_SHORT } from '../constants/branding'
import {
  CONTACT_EMAIL,
  getWhatsAppUrl,
  WHATSAPP_DISPLAY,
} from '../constants/contact'
import { SOCIAL_ICONS, SOCIAL_LINKS } from '../constants/social'
import { firebaseReady } from '../lib/firebase'
import { emailNotificationsReady, sendNewsletterEmail } from '../services/contactEmail'
import { submitNewsletterSubscription, validateNewsletterEmail } from '../services/newsletter'

const quickLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Process', href: '/#process' },
  { label: 'Contact', href: '/#contact' },
]

const serviceLinks = [
  { label: 'Zoho ERP & CRM', href: '/#services' },
  { label: 'Web Development', href: '/#services' },
  { label: 'Mobile Apps', href: '/#services' },
  { label: 'AI Solutions', href: '/#services' },
  { label: 'Digital Marketing', href: '/#services' },
]

const resourceLinks = [
  // { label: 'Blog', to: '/blog' },
  // { label: 'Case Studies', to: '/case-studies' },
  { label: 'Our Team', to: '/team' },
]

const LiveBackground = lazy(() => import('./LiveBackground'))

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const openNewsletterMailto = (subscriberEmail) => {
    const subject = encodeURIComponent('Newsletter subscription')
    const body = encodeURIComponent(`Please add me to the PrimeAxis newsletter: ${subscriberEmail}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  const handleNewsletter = async (e) => {
    e.preventDefault()
    setStatus({ type: '', message: '' })

    const validation = validateNewsletterEmail(email)
    if (!validation.valid) {
      setStatus({ type: 'error', message: validation.error })
      return
    }

    if (!firebaseReady && !emailNotificationsReady) {
      openNewsletterMailto(validation.value)
      setEmail('')
      setStatus({
        type: 'success',
        message: 'Your email app is opening so you can complete the subscription.',
      })
      return
    }

    setSubmitting(true)
    try {
      const tasks = []

      if (firebaseReady) {
        tasks.push(submitNewsletterSubscription(validation.value).then(() => 'firestore'))
      }
      if (emailNotificationsReady) {
        tasks.push(sendNewsletterEmail(validation.value).then(() => 'email'))
      }

      const results = await Promise.allSettled(tasks)
      const succeeded = results.filter((result) => result.status === 'fulfilled')

      if (!succeeded.length) {
        const reason = results.find((result) => result.status === 'rejected')
        throw reason?.reason || new Error('Could not complete your subscription.')
      }

      setEmail('')
      setStatus({
        type: 'success',
        message: 'Thanks! You\'re subscribed.',
      })
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Could not subscribe right now. Please try again or email us directly.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className="footer-v2 footer-premium theme-dark bg-hero-premium relative overflow-hidden">
      <div className="footer-live-base absolute inset-0 pointer-events-none" aria-hidden="true" />
      <Suspense fallback={null}>
        <LiveBackground variant="footer" />
      </Suspense>
      <div className="hero-grid footer-live-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 hero-premium-glow footer-live-glow pointer-events-none" aria-hidden="true" />
      <div className="footer-live-scrim absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="footer-v2-mesh footer-mesh" aria-hidden="true" />
      <div className="footer-v2-pattern" aria-hidden="true" />
      <div className="footer-top-glow" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 lg:pt-16 pb-8">
        <div className="footer-v2-main-grid">
          {/* Brand */}
          <div className="footer-v2-brand-col">
            <Link to="/" className="footer-v2-brand group">
              <div className="footer-v2-logo">
                <img src={LOGO_SRC} alt={BRAND_NAME} />
              </div>
              <div>
                <strong>{BRAND_SHORT}</strong>
                <span>Enterprise Digital Solutions</span>
              </div>
            </Link>
            <p className="footer-v2-tagline">
              Scalable software, Zoho ecosystems, and AI-powered platforms for growing businesses.
            </p>
            <div className="footer-v2-social">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-v2-social-btn"
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    {SOCIAL_ICONS[social.label]}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="footer-v2-links-col">
            <h4 className="footer-v2-heading">Company</h4>
            <ul className="footer-v2-links">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-v2-links-col">
            <h4 className="footer-v2-heading">Services</h4>
            <ul className="footer-v2-links">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-v2-links-col">
            <h4 className="footer-v2-heading">Resources</h4>
            <ul className="footer-v2-links">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-v2-contact-col">
            <h4 className="footer-v2-heading">Contact</h4>
            <ul className="footer-v2-contact-list">
              <li>
                <span className="footer-v2-contact-icon" aria-hidden="true">💬</span>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  WhatsApp · {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <span className="footer-v2-contact-icon" aria-hidden="true">✉️</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-v2-newsletter">
          <div className="footer-v2-newsletter-text">
            <span className="footer-v2-newsletter-label">Newsletter</span>
            <h3>Stay ahead with tech insights</h3>
            <p>Product updates, case studies, and digital transformation tips. No spam.</p>
          </div>
          <form onSubmit={handleNewsletter} className="footer-v2-newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (status.message) setStatus({ type: '', message: '' })
              }}
              placeholder="Your email address"
              required
              disabled={submitting}
              aria-label="Email address"
              aria-invalid={status.type === 'error' ? 'true' : undefined}
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Subscribing…' : 'Subscribe'}
            </button>
            {status.message && (
              <p
                className={status.type === 'error' ? 'footer-v2-newsletter-error' : 'footer-v2-subscribed'}
                role="status"
              >
                {status.message}
              </p>
            )}
          </form>
        </div>

        {/* Bottom */}
        <div className="footer-v2-bottom">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <nav aria-label="Legal">
            <a href="#">Privacy</a>
            <span aria-hidden="true">·</span>
            <a href="#">Terms</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
