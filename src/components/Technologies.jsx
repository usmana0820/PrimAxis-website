import Reveal from './Reveal'

const techCategories = [
  { category: 'CRM & ERP', items: ['Zoho CRM', 'Zoho One', 'Zoho Creator', 'Zoho Desk'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
  { category: 'Backend', items: ['Django', 'Python', 'Node.js', 'Express.js'] },
  { category: 'Mobile', items: ['Flutter', 'React Native'] },
  { category: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { category: 'Cloud & Tools', items: ['Firebase', 'AWS', 'Vercel', 'GitHub', 'VS Code', 'Postman'] },
]

export default function Technologies() {
  return (
    <section id="technologies" className="py-20 lg:py-28 bg-tech relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Technologies We Use</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">Modern Tech Stack</h2>
          <p className="mt-4 text-text-muted text-lg">
            We utilize modern technologies to build secure, scalable, and high-performance digital solutions.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((cat, i) => (
            <Reveal key={cat.category} delay={i * 80} variant={i % 2 === 0 ? 'slide-right' : 'slide-left'}>
              <div className="card-hover group bg-white rounded-2xl p-8 border border-primary/10 h-full">
                <h3 className="text-lg font-bold text-text mb-5 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </span>
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <span key={tech} className="bg-section text-text-muted text-sm font-medium px-3 py-1.5 rounded-full border border-primary/10 hover:border-accent hover:text-accent hover:scale-105 transition-all duration-300 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
