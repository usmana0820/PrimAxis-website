import { useState, useEffect } from 'react'
import { LOGO_SRC, BRAND_NAME, BRAND_SHORT } from '../constants/branding'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-primary/98 backdrop-blur-lg shadow-lg shadow-primary/20 border-b border-white/10'
          : 'bg-primary/90 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#home" className="flex items-center gap-2.5 group">
            <img
              src={LOGO_SRC}
              alt={BRAND_NAME}
              className="h-10 w-10 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-white font-bold text-lg tracking-tight">{BRAND_SHORT}</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-white/75 hover:text-white text-sm font-medium transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Get a Free Quote
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-primary-dark border-t border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-white/75 hover:text-accent-light text-sm font-medium py-2 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block btn-primary text-sm px-5 py-2.5 text-center"
            onClick={() => setOpen(false)}
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </nav>
  )
}
