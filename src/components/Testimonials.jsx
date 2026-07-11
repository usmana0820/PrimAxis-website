import { useState, useEffect, useCallback } from 'react'
import Reveal from './Reveal'
import { getCardRevealVariant } from '../utils/revealVariants'

const testimonials = [
  {
    name: 'Ahmed Khan',
    role: 'Operations Director',
    company: 'Retail Solutions Co.',
    logo: 'RS',
    logoGradient: 'from-violet-500 to-purple-600',
    photo: 'https://ui-avatars.com/api/?name=Ahmed+Khan&background=355C7D&color=fff&size=128&bold=true',
    review: 'PrimeAxis delivered a flawless Zoho CRM setup with custom workflows that transformed how we manage leads. Professional, responsive, and truly experts in their field.',
    rating: 5,
  },
  {
    name: 'Sarah Malik',
    role: 'CEO',
    company: 'HealthCare Plus',
    logo: 'HP',
    logoGradient: 'from-emerald-500 to-teal-600',
    photo: 'https://ui-avatars.com/api/?name=Sarah+Malik&background=06B6D4&color=fff&size=128&bold=true',
    review: 'Our patient management system was built on time and exceeded expectations. The team understood our requirements deeply and provided excellent ongoing support.',
    rating: 5,
  },
  {
    name: 'Usman Ali',
    role: 'Project Manager',
    company: 'BuildRight Construction',
    logo: 'BR',
    logoGradient: 'from-amber-500 to-orange-600',
    photo: 'https://ui-avatars.com/api/?name=Usman+Ali&background=4F46E5&color=fff&size=128&bold=true',
    review: 'From ERP implementation to mobile app development, PrimeAxis handled everything seamlessly. Their agile approach kept us informed at every milestone.',
    rating: 5,
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index) => {
    if (index === active || animating) return
    setAnimating(true)
    setActive(index)
    setTimeout(() => setAnimating(false), 400)
  }, [active, animating])

  const next = useCallback(() => {
    goTo((active + 1) % testimonials.length)
  }, [active, goTo])

  const prev = useCallback(() => {
    goTo((active - 1 + testimonials.length) % testimonials.length)
  }, [active, goTo])

  useEffect(() => {
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [next])

  const t = testimonials[active]

  return (
    <section className="page-section relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto section-header" variant="slide-top">
          <span className="section-label">Testimonials</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display">
            What Our Clients Say
          </h2>
          <p className="mt-5 text-text-muted text-lg leading-relaxed">
            Trusted by businesses across industries to deliver exceptional technology solutions.
          </p>
        </Reveal>

        <Reveal variant="slide-bottom">
          <div className="testimonial-slider-wrap">
            <button
              type="button"
              onClick={prev}
              className="testimonial-nav-btn testimonial-nav-prev"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <article className={`testimonial-glass-card ${animating ? 'testimonial-fade' : ''}`}>
              <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>

              <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-start">
                <div className="flex flex-col items-center lg:items-start shrink-0">
                  <div className="testimonial-avatar-wrap">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="testimonial-avatar"
                      width={96}
                      height={96}
                      loading="lazy"
                    />
                  </div>
                  <div className={`testimonial-company-logo bg-gradient-to-br ${t.logoGradient} mt-5`}>
                    {t.logo}
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <StarRating count={t.rating} />

                  <blockquote className="mt-5 text-text-muted text-base sm:text-lg leading-relaxed">
                    {t.review}
                  </blockquote>

                  <footer className="mt-8 pt-6 border-t border-slate-100">
                    <p className="font-bold text-text font-display text-lg">{t.name}</p>
                    <p className="text-sm text-[#355C7D] font-medium mt-0.5">{t.role}</p>
                    <p className="text-sm text-text-muted mt-0.5">{t.company}</p>
                  </footer>
                </div>
              </div>
            </article>

            <button
              type="button"
              onClick={next}
              className="testimonial-nav-btn testimonial-nav-next"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center gap-2.5 mt-10">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => goTo(i)}
                className={`testimonial-dot ${i === active ? 'active' : ''}`}
                aria-label={`View testimonial from ${item.name}`}
                aria-current={i === active ? 'true' : undefined}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
