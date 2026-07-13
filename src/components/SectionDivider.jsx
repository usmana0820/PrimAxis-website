const variants = ['navy-cyan', 'cyan-indigo', 'indigo-teal', 'teal-navy', 'tri-blend', 'warm-cool']

export default function SectionDivider({ variant, index = 0 }) {
  const style = variant || variants[index % variants.length]

  return (
    <div
      className={`section-divider section-divider-${style}`}
      aria-hidden="true"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <div className="section-divider-glow" />
      <div className="section-divider-line">
        <div className="section-divider-beam" />
      </div>
    </div>
  )
}
