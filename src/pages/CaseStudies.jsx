import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppChat from '../components/WhatsAppChat'
import Reveal from '../components/Reveal'
import PreviewFinalCTA from '../components/PreviewFinalCTA'
import PreviewProjectCard from '../components/PreviewProjectCard'
import aboutHeroImage from '../assets/about_more.jpg'
import { usePublishedProjects } from '../hooks/usePublishedProjects'

function SectionIntro({ label, title, subtitle }) {
  return (
    <header className="cs-preview-section-intro">
      {label && <span className="cs-preview-label">{label}</span>}
      <h2 className="cs-preview-section-head">{title}</h2>
      {subtitle && <p className="cs-preview-section-sub">{subtitle}</p>}
    </header>
  )
}

export default function CaseStudies() {
  const { projects, loading } = usePublishedProjects()

  useEffect(() => {
    document.title = 'Case Studies | PrimeAxis Technologies'
  }, [])

  return (
    <div className="cs-preview-page">
      <Navbar isSubpage />

      <section className="cs-preview-hero">
        <div
          className="cs-preview-hero-bg"
          style={{ backgroundImage: `url('${aboutHeroImage}')` }}
          aria-hidden="true"
        />
        <div className="cs-preview-hero-overlay" aria-hidden="true" />

        <div className="cs-preview-hero-inner">
          <Reveal variant="slide-top">
            <Link to="/portfolio" className="cs-preview-back">← View Portfolio</Link>
          </Reveal>

          <Reveal variant="slide-top" eager>
            <div>
              <div className="cs-preview-featured-badge">
                <span className="cs-preview-featured-dot" aria-hidden="true" />
                CASE STUDIES
              </div>
              <h1 className="cs-preview-hero-title">Case Studies Showcase</h1>
              <div className="cs-preview-hero-tags">
                <span className="cs-preview-hero-tag">Full Stories</span>
                <span className="cs-preview-hero-tag">Results &amp; Impact</span>
                <span className="cs-preview-hero-tag cs-preview-hero-tag-status">{projects.length} Projects</span>
              </div>
              <p className="cs-preview-hero-lead">
                Pick any project to read the full story — overview, gallery, technology stack,
                business impact, and team behind the delivery.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              title="Choose a Case Study"
              subtitle="Click any project for the complete showcase"
            />
          </Reveal>

          {loading ? (
            <p className="cs-preview-loading">Loading case studies…</p>
          ) : projects.length === 0 ? (
            <p className="cs-preview-loading">No published case studies yet. Check back soon.</p>
          ) : (
            <div className="cs-preview-related-grid cs-preview-portfolio-grid">
              {projects.map((study, i) => (
                <Reveal key={study.slug} delay={(i % 3) * 60} variant="scale">
                  <PreviewProjectCard project={study} className="h-full" />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <PreviewFinalCTA secondaryLabel="View Portfolio" secondaryHref="/portfolio" />

      <Footer />
      <WhatsAppChat />
    </div>
  )
}
