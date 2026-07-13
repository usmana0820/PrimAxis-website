import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOGO_SRC, BRAND_NAME, BRAND_SHORT } from '../constants/branding'
import { useAuth } from '../context/useAuth'

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Team', href: '/#team' },
  { label: 'Process', href: '/#process' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar({ isSubpage = false }) {
  const { isAdmin, loading: authLoading, profile, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const hero = document.getElementById('home')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '-80px 0px 0px 0px' }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const onHero = !isSubpage && overHero && !scrolled
  const navTheme = isSubpage || scrolled ? 'nav-glass nav-glass-scrolled' : onHero ? 'nav-glass-hero' : 'nav-glass'

  const handleLogout = async () => {
    await logout()
    setOpen(false)
    navigate('/')
  }

  const authBtnOutline = onHero ? 'btn-nav-auth-outline-hero' : 'btn-nav-auth-outline'
  const authBtnSolid = onHero ? 'btn-nav-quote-hero' : 'btn-nav-quote'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 ease-out font-display ${navTheme}`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            <a href="/#home" className="flex items-center gap-2.5 group shrink-0">
              <img
                src={LOGO_SRC}
                alt={BRAND_NAME}
                className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className={`hidden sm:block text-[15px] font-semibold tracking-tight transition-colors duration-500 ${onHero ? 'text-white' : 'text-text'}`}>
                {BRAND_SHORT}
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link px-2 xl:px-3.5 py-2 text-xs xl:text-[13px] font-medium rounded-lg whitespace-nowrap ${
                    onHero ? 'nav-link-hero' : 'nav-link-light'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {!authLoading && (
                isAdmin ? (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className={`text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-all duration-500 ${authBtnSolid}`}
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className={`text-[13px] font-medium px-3 py-2.5 rounded-xl transition-all duration-500 ${authBtnOutline}`}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/admin/login"
                    className={`text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-all duration-500 ${authBtnSolid}`}
                  >
                    Admin
                  </Link>
                )
              )}
              <a
                href="/#contact"
                className={`text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-500 ${
                  onHero ? 'btn-nav-quote-hero' : 'btn-nav-quote'
                }`}
              >
                Let's Talk
              </a>
            </div>

            <button
              type="button"
              className={`lg:hidden p-2 rounded-lg ${onHero ? 'nav-mobile-hero' : 'nav-mobile-light'}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            open ? 'max-h-[36rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`px-4 pb-4 pt-1 border-t ${onHero ? 'border-white/10' : 'border-slate-100/80'}`}>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2.5 text-sm font-medium rounded-lg ${
                    onHero ? 'nav-mobile-hero' : 'nav-mobile-light'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {!authLoading && (
                <div className={`mt-2 pt-2 border-t flex flex-col gap-2 ${onHero ? 'border-white/10' : 'border-slate-100/80'}`}>
                  {isAdmin ? (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className={`text-sm font-semibold px-5 py-3 rounded-xl text-center ${onHero ? 'btn-nav-quote-hero' : 'btn-nav-quote'}`}
                        onClick={() => setOpen(false)}
                      >
                        Dashboard {profile?.name ? `· ${profile.name}` : ''}
                      </Link>
                      <button
                        type="button"
                        className={`text-sm font-medium px-5 py-3 rounded-xl text-center ${onHero ? 'btn-nav-auth-outline-hero' : 'btn-nav-auth-outline'}`}
                        onClick={handleLogout}
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/admin/login"
                      className={`text-sm font-semibold px-5 py-3 rounded-xl text-center ${onHero ? 'btn-nav-quote-hero' : 'btn-nav-quote'}`}
                      onClick={() => setOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                </div>
              )}

              <a
                href="/#contact"
                className={`mt-2 text-sm font-semibold px-5 py-3 rounded-xl text-center ${onHero ? 'btn-nav-quote-hero' : 'btn-nav-quote'}`}
                onClick={() => setOpen(false)}
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
