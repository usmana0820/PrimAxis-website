import Reveal from './Reveal'
import aboutImage from '../assets/aboutsection.jpg'

const achievements = [
  { title: 'Business Focused', desc: 'Solutions aligned with your goals', position: 'top-4 -left-4 lg:-left-8', delay: 200 },
  { title: 'Agile Development', desc: 'Fast, iterative delivery', position: 'top-8 -right-2 lg:-right-6', delay: 300 },
  { title: 'Dedicated Support', desc: 'We stay with you after launch', position: 'bottom-16 -left-2 lg:-left-4', delay: 400 },
  { title: 'Innovation Driven', desc: 'Modern tech, smart solutions', position: 'bottom-8 -right-4 lg:-right-10', delay: 500 },
]

function OfficeIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto lg:max-w-none">
      <div className="about-illustration-bg absolute inset-0 rounded-3xl overflow-hidden">
        <img
          src={aboutImage}
          alt="PrimeAxis Technologies team at work"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#355C7D]/20 via-transparent to-transparent" />
      </div>

      {achievements.map((item) => (
        <Reveal key={item.title} delay={item.delay} variant="scale">
          <div className={`about-float-card absolute ${item.position} z-10 max-w-[160px]`}>
            <div className="glass-card-light p-4 rounded-2xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#355C7D] to-[#06B6D4] mb-2 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <h4 className="text-xs font-bold text-text leading-tight">{item.title}</h4>
              <p className="text-[10px] text-text-muted mt-1 leading-snug">{item.desc}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative page-section overflow-hidden section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto section-header">
          <span className="section-label">About Us</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display leading-tight">
            Transforming Ideas into Powerful Digital Solutions
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal delay={100} variant="slide-right" className="space-y-8">
            <div className="space-y-5 text-text-muted leading-relaxed">
              <p className="text-base lg:text-[17px]">
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
            </div>

            <div className="glass-card-light rounded-2xl p-6 lg:p-8 border border-slate-100">
              <h3 className="text-lg font-bold text-[#355C7D] mb-3 font-display">Our Mission</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                To empower businesses with innovative, reliable, and scalable technology solutions that
                simplify operations, enhance productivity, and create sustainable growth.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200} variant="slide-left" className="relative lg:min-h-[420px]">
            <OfficeIllustration />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
