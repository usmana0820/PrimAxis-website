import Reveal from './Reveal'

const portfolioItems = [
  { title: 'Real Estate CRM', industry: 'Real Estate', tech: 'Zoho CRM', description: 'Custom CRM for property management, lead tracking, and sales pipeline automation.', gradient: 'from-primary to-secondary' },
  { title: 'Construction ERP', industry: 'Construction', tech: 'Zoho One', description: 'End-to-end ERP for project management, inventory, and contractor workflows.', gradient: 'from-secondary to-accent' },
  { title: 'Patient Management System', industry: 'Healthcare', tech: 'Django · React', description: 'Secure patient records, appointments, and billing for healthcare providers.', gradient: 'from-accent to-accent-light' },
  { title: 'Restaurant CRM', industry: 'Restaurants', tech: 'Zoho CRM', description: 'Customer loyalty, reservations, and feedback management for restaurant chains.', gradient: 'from-secondary to-primary' },
  { title: 'Travel Booking CRM', industry: 'Travel & Tourism', tech: 'Zoho · Flutter', description: 'Booking management, itinerary tracking, and customer communication platform.', gradient: 'from-accent-light to-warm' },
  { title: 'Inventory ERP', industry: 'Trading', tech: 'Zoho ERP', description: 'Stock management, purchase orders, and real-time inventory reporting.', gradient: 'from-primary via-secondary to-accent' },
  { title: 'AI Business Dashboard', industry: 'Professional Services', tech: 'AI · Python', description: 'Intelligent analytics dashboard with automated insights and reporting.', gradient: 'from-secondary to-accent-light' },
  { title: 'Corporate Website', industry: 'Professional Services', tech: 'React · Tailwind', description: 'Modern, SEO-optimized corporate website with CMS integration.', gradient: 'from-primary to-accent' },
  { title: 'E-Commerce Store', industry: 'E-Commerce', tech: 'Next.js · Node.js', description: 'Full-featured online store with payment gateway and inventory sync.', gradient: 'from-accent to-warm' },
  { title: 'Mobile Banking App', industry: 'Finance', tech: 'Flutter · Firebase', description: 'Secure mobile banking app with biometric auth and real-time transactions.', gradient: 'from-primary to-secondary' },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-portfolio relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Portfolio</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">Our Recent Work</h2>
          <p className="mt-4 text-text-muted text-lg">
            Explore our projects across Zoho, web, mobile, AI, and digital marketing.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} variant="scale">
              <article className="card-tilt group bg-white rounded-2xl overflow-hidden border border-primary/10 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className={`h-44 bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-end relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
                  <span className="relative text-xs font-bold text-white/90 uppercase tracking-widest">{item.industry}</span>
                  <span className="relative text-xs text-white/70 mt-1">{item.tech}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed flex-1">{item.description}</p>
                  <a href="#contact" className="mt-4 inline-flex items-center text-sm font-semibold text-accent hover:text-accent-light transition-colors">
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
