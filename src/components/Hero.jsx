import Reveal from './Reveal'
import { FAVICON_SRC, BRAND_NAME } from '../constants/branding'

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '10+', label: 'Industries' },
  { value: '5+', label: 'Core Services' },
  { value: 'Fast', label: 'Delivery' },
]

const orbitItems = ['Zoho', 'React', 'Flutter', 'AI', 'Cloud']

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-hero overflow-hidden pt-20">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-secondary/30 rounded-full" />
        <div className="aurora-blob absolute bottom-[5%] right-[10%] w-[450px] h-[450px] bg-accent/25 rounded-full" style={{ animationDelay: '-4s' }} />
        <div className="aurora-blob absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-warm/15 rounded-full animate-blob" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <Reveal variant="slide-right">
              <div className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 bg-warm rounded-full animate-pulse" />
                <span className="text-warm text-sm font-medium tracking-wide">{BRAND_NAME}</span>
              </div>
            </Reveal>

            <Reveal delay={100} variant="flip">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                Empowering Businesses Through{' '}
                <span className="gradient-text">Smart Digital Solutions</span>
              </h1>
            </Reveal>

            <Reveal delay={200} variant="fade-up">
              <p className="mt-6 text-lg text-white/75 leading-relaxed">
                {BRAND_NAME} is a technology solutions company specializing in Zoho ERP &amp; CRM
                implementation, custom software development, mobile applications, AI-powered solutions,
                and digital marketing. We help businesses streamline operations, improve efficiency, and
                accelerate growth with scalable technology.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="btn-primary inline-flex items-center justify-center px-8 py-4">
                  Get Free Consultation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#portfolio" className="glass-panel inline-flex items-center justify-center text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all">
                  View Our Portfolio
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <p className="mt-8 text-sm text-white/50 leading-relaxed">
                Trusted by businesses seeking innovative, reliable, and future-ready digital solutions.
              </p>
            </Reveal>

            <Reveal delay={500}>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                {stats.map((stat) => (
                  <div key={stat.label} className="stat-glow rounded-xl p-3 text-center">
                    <p className="text-xl sm:text-2xl font-extrabold text-white">{stat.value}</p>
                    <p className="text-xs text-white/55 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} variant="scale" className="hidden lg:flex justify-center items-center">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow" />
              <div className="absolute inset-6 rounded-full border border-dashed border-accent/40 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '28s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-3xl bg-primary/40 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl shadow-accent/40 animate-pulse-ring p-5">
                  <img src={FAVICON_SRC} alt={BRAND_NAME} className="w-full h-full object-contain drop-shadow-lg" />
                </div>
              </div>
              {orbitItems.map((item, i) => (
                <div key={item} className="orbit-dot absolute top-1/2 left-1/2 -mt-5 -ml-10" style={{ animationDelay: `${i * -3}s` }}>
                  <span className="inline-block px-4 py-2 rounded-full glass-panel text-white text-sm font-semibold whitespace-nowrap">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
