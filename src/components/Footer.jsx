import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LOGO_SRC, BRAND_NAME, BRAND_SHORT } from '../constants/branding'
import {
  getWhatsAppUrl,
  WHATSAPP_DISPLAY,
  OFFICE_ADDRESS_SHORT,
  OFFICE_MAP_URL,
} from '../constants/contact'

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
  { label: 'Blog', to: '/blog' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Our Team', to: '/team' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2V9zm2-6a2 2 0 110 4 2 2 0 010-4z" />
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    ),
  },
  {
    label: 'WhatsApp',
    href: getWhatsAppUrl(),
    icon: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="footer-v2 footer-premium theme-dark relative overflow-hidden">
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
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-v2-social-btn"
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon}
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
                <span className="footer-v2-contact-icon" aria-hidden="true">📍</span>
                <a href={OFFICE_MAP_URL} target="_blank" rel="noopener noreferrer">
                  {OFFICE_ADDRESS_SHORT}
                </a>
              </li>
              <li>
                <span className="footer-v2-contact-icon" aria-hidden="true">📞</span>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <span className="footer-v2-contact-icon" aria-hidden="true">✉️</span>
                <a href="mailto:primeaxis.technologies19@gmail.com">
                  primeaxis.technologies19@gmail.com
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
            <p>Product updates, case studies, and digital transformation tips — no spam.</p>
          </div>
          <form onSubmit={handleNewsletter} className="footer-v2-newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              aria-label="Email address"
            />
            <button type="submit">Subscribe</button>
            {subscribed && (
              <p className="footer-v2-subscribed" role="status">Thanks — you&apos;re subscribed!</p>
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
