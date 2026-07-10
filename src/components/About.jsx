import Reveal from './Reveal'

const achievements = [
  { title: 'Business Focused', desc: 'Solutions aligned with your goals' },
  { title: 'Agile Development', desc: 'Fast, iterative delivery' },
  { title: 'Dedicated Support', desc: 'We stay with you after launch' },
  { title: 'Innovation Driven', desc: 'Modern tech, smart solutions' },
]

export default function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28 bg-about overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-accent to-warm hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">About Us</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">
            Transforming Ideas into Powerful Digital Solutions
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          <Reveal delay={100} variant="slide-right" className="space-y-6 text-text-muted leading-relaxed">
            <p>
              PrimeAxis Technologies is committed to helping businesses embrace digital transformation
              through innovative technology solutions. Our expertise spans business analysis, enterprise
              software, custom web and mobile applications, AI integration, and digital marketing.
            </p>
            <p>
              We believe every business has unique challenges. That&apos;s why we don&apos;t deliver
              one-size-fits-all products—we build customized solutions designed around your goals,
              workflows, and long-term growth strategy.
            </p>
            <p>
              From startups to established enterprises, we partner with our clients to automate
              processes, enhance customer experiences, and create scalable systems that drive measurable
              business success.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((item, i) => (
              <Reveal key={item.title} delay={150 + i * 80} variant="scale">
                <div className="card-hover bg-white rounded-2xl p-6 border border-primary/10 h-full">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-3">
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <h3 className="font-bold text-text mb-1">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal delay={100} variant="slide-right">
            <div className="gradient-border rounded-2xl p-8 bg-white h-full">
              <h3 className="text-xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-text-muted leading-relaxed">
                To empower businesses with innovative, reliable, and scalable technology solutions that
                simplify operations, enhance productivity, and create sustainable growth.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200} variant="slide-left">
            <div className="gradient-border rounded-2xl p-8 bg-white h-full">
              <h3 className="text-xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-text-muted leading-relaxed">
                To become a trusted global technology partner recognized for delivering innovative
                software solutions that transform businesses and create lasting value.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
