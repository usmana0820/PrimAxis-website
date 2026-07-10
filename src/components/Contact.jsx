import { useState } from 'react'
import Reveal from './Reveal'

const serviceOptions = [
  'Zoho ERP & CRM', 'Website Development', 'Mobile App Development',
  'AI Solutions', 'Digital Marketing', 'Business Consulting', 'Other',
]

const budgetOptions = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $10,000', '$10,000+', 'Not sure yet']

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Consultation Request from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\nService: ${form.service}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:primeaxis.technologies19@gmail.com?subject=${subject}&body=${body}`
  }

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  return (
    <section id="contact" className="py-20 lg:py-28 bg-contact relative">
      <div className="wave-divider absolute top-0 left-0 right-0" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Contact Us</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="mt-4 text-text-muted text-lg">
            We&apos;d love to hear about your project and discuss how our technology solutions can
            support your business goals.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          <Reveal delay={100} variant="slide-right" className="lg:col-span-2">
            <div className="h-full bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-warm/20 rounded-full blur-2xl animate-float" />
              <h3 className="text-2xl font-bold mb-8 relative">Contact Information</h3>
              <div className="space-y-7 relative">
                <a href="tel:+923717461694" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-warm/30 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 font-medium">Phone</p>
                    <p className="group-hover:text-warm transition-colors">+92 371 7461694</p>
                  </div>
                </a>
                <a href="mailto:primeaxis.technologies19@gmail.com" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-warm/30 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 font-medium">Email</p>
                    <p className="group-hover:text-warm transition-colors break-all">primeaxis.technologies19@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 font-medium">Business Hours</p>
                    <p>Monday – Friday</p>
                    <p className="text-white/80">9:00 AM – 6:00 PM (PKT)</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} variant="slide-left" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="gradient-border bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-primary/5 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-2">Full Name *</label>
                  <input id="name" type="text" required value={form.name} onChange={update('name')} className="w-full px-4 py-3 rounded-xl border border-primary/15 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none bg-section/50" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">Email *</label>
                  <input id="email" type="email" required value={form.email} onChange={update('email')} className="w-full px-4 py-3 rounded-xl border border-primary/15 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none bg-section/50" placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">Phone</label>
                  <input id="phone" type="tel" value={form.phone} onChange={update('phone')} className="w-full px-4 py-3 rounded-xl border border-primary/15 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none bg-section/50" placeholder="+92 300 0000000" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-text mb-2">Company</label>
                  <input id="company" type="text" value={form.company} onChange={update('company')} className="w-full px-4 py-3 rounded-xl border border-primary/15 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none bg-section/50" placeholder="Your company" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-text mb-2">Service</label>
                  <select id="service" value={form.service} onChange={update('service')} className="w-full px-4 py-3 rounded-xl border border-primary/15 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none bg-section/50">
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-text mb-2">Budget</label>
                  <select id="budget" value={form.budget} onChange={update('budget')} className="w-full px-4 py-3 rounded-xl border border-primary/15 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none bg-section/50">
                    <option value="">Select budget range</option>
                    {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text mb-2">Message *</label>
                <textarea id="message" required rows={4} value={form.message} onChange={update('message')} className="w-full px-4 py-3 rounded-xl border border-primary/15 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none bg-section/50 resize-none" placeholder="Tell us about your project..." />
              </div>
              <button type="submit" className="w-full btn-primary py-4 text-base">Submit Request</button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
