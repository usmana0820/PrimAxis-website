import Reveal from './Reveal'

const services = [
  {
    title: 'Zoho ERP & CRM Solutions',
    description: 'Transform your business with complete Zoho implementation services. We configure, customize, automate, and integrate Zoho applications to streamline your business operations and improve customer relationships.',
    items: ['Zoho CRM Setup', 'Zoho One Implementation', 'Workflow Automation', 'Business Process Optimization', 'Custom Modules', 'API Integration', 'Reports & Dashboards', 'User Training & Support'],
  },
  {
    title: 'Website Development',
    description: 'We design and develop modern, responsive, and high-performing websites that strengthen your online presence and generate business growth.',
    items: ['Fully Responsive', 'SEO Friendly', 'Fast Loading', 'Secure', 'Conversion Focused', 'Easy to Maintain'],
  },
  {
    title: 'Mobile Application Development',
    description: 'Build powerful Android and iOS applications that provide seamless user experiences and help businesses stay connected with their customers anytime, anywhere.',
    items: ['Flutter Development', 'React Native Development', 'API Integration', 'Firebase Integration', 'Push Notifications', 'Performance Optimization'],
  },
  {
    title: 'AI Solutions',
    description: 'Leverage Artificial Intelligence to automate repetitive tasks, gain business insights, and improve decision-making.',
    items: ['AI Chatbots', 'Business Automation', 'Machine Learning Integration', 'NLP Solutions', 'Intelligent Recommendations', 'AI-Powered Dashboards'],
  },
  {
    title: 'Digital Marketing',
    description: 'Increase your online visibility and attract more customers through data-driven digital marketing strategies.',
    items: ['Search Engine Optimization (SEO)', 'Social Media Marketing', 'Google Ads', 'Meta Ads', 'Content Marketing', 'Brand Development'],
  },
  {
    title: 'Business Analysis & Consulting',
    description: 'Our business analysts work closely with clients to understand business challenges and design technology solutions that align with operational goals.',
    items: ['Requirement Gathering', 'Business Process Analysis', 'BRD & FRD Documentation', 'Workflow Design', 'Gap Analysis', 'User Acceptance Testing (UAT)'],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-services relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Our Services</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">
            Comprehensive Technology Solutions
          </h2>
          <p className="mt-4 text-text-muted text-lg">
            End-to-end digital services tailored to help your business grow and thrive.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 80} variant="scale">
              <div className="card-hover bg-white rounded-2xl p-8 border border-primary/10 h-full group">
                <div className="w-12 h-1 bg-gradient-to-r from-secondary via-accent to-warm rounded-full mb-6 group-hover:w-full transition-all duration-500" />
                <h3 className="text-xl font-bold text-text mb-3">{service.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-5">{service.description}</p>
                <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">Services include:</p>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                      <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
