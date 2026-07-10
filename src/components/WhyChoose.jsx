import Reveal from './Reveal'

const reasons = [
  {
    title: 'Experienced Team',
    description: 'Our professionals possess expertise in business analysis, software development, Zoho implementation, AI technologies, and digital transformation.',
    color: 'from-primary to-secondary',
  },
  {
    title: 'Customized Solutions',
    description: 'Every business is unique. We design solutions tailored specifically to your objectives, industry, and operational requirements.',
    color: 'from-secondary to-accent',
  },
  {
    title: 'Agile Development',
    description: 'Our agile methodology ensures faster delivery, transparent communication, and continuous improvements throughout the project lifecycle.',
    color: 'from-accent to-accent-light',
  },
  {
    title: 'Quality Assurance',
    description: 'Every solution undergoes rigorous testing to ensure reliability, security, and exceptional performance before deployment.',
    color: 'from-accent-light to-warm',
  },
  {
    title: 'Ongoing Support',
    description: "Our relationship doesn't end after deployment. We provide continuous maintenance, updates, and technical support whenever you need us.",
    color: 'from-secondary to-primary',
  },
  {
    title: 'Affordable Pricing',
    description: 'We deliver enterprise-quality solutions at competitive prices, making digital transformation accessible to businesses of all sizes.',
    color: 'from-primary via-secondary to-accent',
  },
]

export default function WhyChoose() {
  return (
    <section className="py-20 lg:py-28 bg-why relative">
      <div className="wave-divider absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Why Choose PrimeAxis Technologies</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">
            Your Trusted Technology Partner
          </h2>
          <p className="mt-4 text-text-muted text-lg">
            At PrimeAxis Technologies, we combine technical expertise with strategic thinking to deliver
            solutions that create measurable business value.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 90} variant="flip">
              <div className="card-hover group bg-white rounded-2xl p-8 border border-primary/10 h-full relative overflow-hidden">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${reason.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <span className="text-lg font-bold">{reason.title.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-bold text-text mb-3">{reason.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{reason.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
