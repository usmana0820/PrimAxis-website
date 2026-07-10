import { LOGO_SRC, BRAND_NAME } from '../constants/branding'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Contact', href: '#contact' },
]

const serviceLinks = [
  'Zoho ERP & CRM',
  'Website Development',
  'Mobile Applications',
  'AI Solutions',
  'Digital Marketing',
  'Business Consulting',
]

export default function Footer() {
  return (
    <footer className="bg-footer relative overflow-hidden">
      <div className="wave-divider" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <img src={LOGO_SRC} alt={BRAND_NAME} className="h-11 w-11 object-contain" />
              <span className="text-white font-bold text-lg">{BRAND_NAME}</span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              Innovative technology solutions for businesses ready to scale.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 hover:text-warm text-sm transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-white/50 hover:text-accent-light text-sm transition-colors">{service}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:primeaxis.technologies19@gmail.com" className="text-white/50 hover:text-warm text-sm transition-colors flex items-start gap-2">
                  <span className="shrink-0">📧</span>
                  primeaxis.technologies19@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+923717461694" className="text-white/50 hover:text-warm text-sm transition-colors flex items-center gap-2">
                  <span>📞</span> +92 371 7461694
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/40 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
