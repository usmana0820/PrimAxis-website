import { useState } from 'react'
import Reveal from './Reveal'

const testimonials = [
  {
    name: 'Ahmed Khan',
    company: 'Retail Solutions Co.',
    review: 'PrimeAxis delivered a flawless Zoho CRM setup with custom workflows that transformed how we manage leads. Professional, responsive, and truly experts in their field.',
    rating: 5,
  },
  {
    name: 'Sarah Malik',
    company: 'HealthCare Plus',
    review: 'Our patient management system was built on time and exceeded expectations. The team understood our requirements deeply and provided excellent ongoing support.',
    rating: 5,
  },
  {
    name: 'Usman Ali',
    company: 'BuildRight Construction',
    review: 'From ERP implementation to mobile app development, PrimeAxis handled everything seamlessly. Their agile approach kept us informed at every milestone.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const t = testimonials[active]

  return (
    <section className="py-20 lg:py-28 bg-section relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="section-label">Testimonials</span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-text">What Our Clients Say</h2>
        </Reveal>

        <Reveal variant="scale">
          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-primary/10 shadow-xl text-center relative">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-warm" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-text-muted text-lg leading-relaxed italic">&ldquo;{t.review}&rdquo;</p>
            <div className="mt-8">
              <p className="font-bold text-text">{t.name}</p>
              <p className="text-sm text-accent">{t.company}</p>
            </div>
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === active ? 'bg-accent w-8' : 'bg-primary/20 hover:bg-primary/40'}`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
