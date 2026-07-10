const technologies = [
  'Zoho CRM', 'Zoho One', 'Zoho Creator', 'React', 'Flutter', 'Django',
  'Python', 'Node.js', 'PostgreSQL', 'Firebase', 'GitHub', 'Next.js',
]

export default function TrustedTech() {
  const doubled = [...technologies, ...technologies]

  return (
    <section className="py-10 bg-primary border-y border-white/10 overflow-hidden">
      <p className="text-center text-white/50 text-xs font-semibold uppercase tracking-widest mb-6">
        Trusted Technologies We Work With
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />
        <div className="marquee-track">
          {doubled.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="mx-6 px-5 py-2 rounded-full border border-white/15 text-white/70 text-sm font-medium whitespace-nowrap hover:border-accent hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
