import Reveal from './Reveal'

const industries = [
  'Healthcare', 'Real Estate', 'Construction', 'Education',
  'Restaurants', 'Travel & Tourism', 'Retail', 'Trading',
  'Manufacturing', 'Startups', 'Professional Services', 'E-Commerce',
]

const industryIcons = {
  Healthcare: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
  'Real Estate': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  Construction: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
  Education: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </>
  ),
  Restaurants: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  'Travel & Tourism': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  Retail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />,
  Trading: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />,
  Manufacturing: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </>
  ),
  Startups: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  'Professional Services': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  'E-Commerce': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
}

function IndustryCard({ industry }) {
  return (
    <div className="card-hover glass-panel rounded-xl px-5 py-4 flex items-center gap-3 shrink-0 mx-2 group">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/30 to-accent/30 flex items-center justify-center text-warm group-hover:from-secondary group-hover:to-accent group-hover:text-white transition-all duration-300">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{industryIcons[industry]}</svg>
      </div>
      <span className="text-sm font-medium text-white/80 group-hover:text-white whitespace-nowrap">{industry}</span>
    </div>
  )
}

export default function Industries() {
  const doubled = [...industries, ...industries]

  return (
    <section className="py-20 lg:py-28 bg-industries relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora-blob absolute -top-20 left-1/3 w-96 h-96 bg-accent/20 rounded-full" />
        <div className="aurora-blob absolute -bottom-32 right-1/4 w-80 h-80 bg-warm/10 rounded-full" style={{ animationDelay: '-6s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="section-label section-label-light">Industries We Serve</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Solutions Across Every Sector
          </h2>
          <p className="mt-4 text-white/60 text-lg">We proudly deliver technology solutions across multiple industries.</p>
        </Reveal>
      </div>

      <div className="relative overflow-hidden mb-12">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary-dark/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/80 to-transparent z-10 pointer-events-none" />
        <div className="marquee-track py-2">
          {doubled.map((industry, i) => (
            <IndustryCard key={`${industry}-${i}`} industry={industry} />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((industry, i) => (
            <Reveal key={industry} delay={i * 35} variant="scale">
              <div className="card-hover glass-panel rounded-xl p-5 text-center group h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-xl flex items-center justify-center text-warm mx-auto mb-3 group-hover:from-secondary group-hover:to-accent group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{industryIcons[industry]}</svg>
                </div>
                <span className="text-sm font-medium text-white/75 group-hover:text-white transition-colors">{industry}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
