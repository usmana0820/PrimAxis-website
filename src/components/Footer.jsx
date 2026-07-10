import { useState } from 'react'
import { LOGO_SRC, BRAND_NAME } from '../constants/branding'
import { getWhatsAppUrl } from '../constants/contact'

const quickLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Process', href: '/#process' },
  { label: 'Contact', href: '/#contact' },
]

const resourceLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
]

const serviceLinks = [
  { label: 'Zoho ERP & CRM', href: '/#services' },
  { label: 'Website Development', href: '/#services' },
  { label: 'Mobile Applications', href: '/#services' },
  { label: 'AI Solutions', href: '/#services' },
  { label: 'Digital Marketing', href: '/#services' },
  { label: 'Business Consulting', href: '/#services' },
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
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
    <footer className="footer-premium theme-dark relative overflow-hidden">
      <div className="footer-top-glow" aria-hidden="true" />
      <div className="footer-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <a href="/" className="footer-brand inline-flex items-center gap-3 group">
              <div className="footer-logo-wrap">
                <img src={LOGO_SRC} alt={BRAND_NAME} className="h-10 w-10 object-contain" />
              </div>
              <div>
                <span className="block text-white font-bold text-base font-display leading-tight group-hover:text-cyan-300 transition-colors">
                  {BRAND_NAME}
                </span>
                <span className="block text-[11px] text-slate-500 tracking-wide mt-0.5">
                  Enterprise Digital Solutions
                </span>
              </div>
            </a>

            <p className="footer-tagline mt-5 text-sm text-slate-400 leading-relaxed max-w-sm">
              We build scalable software, Zoho ecosystems, and AI-powered platforms that help
              businesses grow with confidence.
            </p>

            <div className="flex gap-2.5 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-link-list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-link-list">
              {serviceLinks.map((service) => (
                <li key={service.label}>
                  <a href={service.href} className="footer-link">{service.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-link-list">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter-card mt-14">
          <div className="footer-newsletter-content">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400/90 mb-2">
                Stay Updated
              </p>
              <h3 className="text-lg font-bold text-white font-display">Subscribe to Our Newsletter</h3>
              <p className="text-sm text-slate-400 mt-1.5 max-w-md">
                Get insights on technology trends, product updates, and digital transformation tips.
              </p>
            </div>

            <form onSubmit={handleNewsletter} className="footer-newsletter-form">
              <div className="footer-newsletter-wrap">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="footer-newsletter-input"
                  required
                  aria-label="Email address"
                />
                <button type="submit" className="footer-newsletter-btn">
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="text-emerald-400 text-xs mt-2.5" role="status">
                  Thank you for subscribing!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom mt-12 pt-8">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <nav className="footer-legal-nav" aria-label="Legal">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <span className="footer-legal-sep" aria-hidden="true" />
            <a href="#" className="footer-legal-link">Terms &amp; Conditions</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
