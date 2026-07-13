import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppChat from '../components/WhatsAppChat'
import Reveal from '../components/Reveal'
import PreviewFinalCTA from '../components/PreviewFinalCTA'
import PortfolioShowcase from '../components/PortfolioShowcase'
import aboutHeroImage from '../assets/about_more.jpg'

export default function PortfolioPage() {
  useEffect(() => {
    document.title = 'Portfolio | PrimeAxis Technologies'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Browse PrimeAxis portfolio — web apps, mobile, Zoho ERP, CRM, and custom software projects with measurable results.'
      )
    }
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
            <Link to="/" className="cs-preview-back">← Back to Home</Link>
          </Reveal>

          <Reveal variant="slide-top" eager>
            <div className="cs-preview-hero-grid cs-preview-hero-grid-single">
              <div>
                <div className="cs-preview-featured-badge">
                  <span className="cs-preview-featured-dot" aria-hidden="true" />
                  OUR PORTFOLIO
                </div>

                <h1 className="cs-preview-hero-title">Projects That Drive Real Results</h1>

                <div className="cs-preview-hero-tags">
                  <span className="cs-preview-hero-tag">Web &amp; Mobile</span>
                  <span className="cs-preview-hero-tag">Zoho ERP &amp; CRM</span>
                  <span className="cs-preview-hero-tag cs-preview-hero-tag-status">Case Studies</span>
                </div>

                <p className="cs-preview-hero-lead">
                  Browse all projects — filter by category or industry, explore featured work,
                  and open any case study for the full story, gallery, and measurable impact.
                </p>

                <div className="cs-preview-hero-actions">
                  <a href="#portfolio-projects" className="cs-preview-btn-white">Explore Projects</a>
                  <Link to="/#contact" className="cs-preview-btn-outline">Start a Project</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="cs-preview-tech-bar">
          {['Web Applications', 'Mobile Apps', 'Zoho CRM', 'ERP Systems', 'AI Solutions', 'UI/UX Design'].map((tag) => (
            <span key={tag} className="cs-preview-tech-chip">{tag}</span>
          ))}
        </div>
      </section>

      <PortfolioShowcase />

      <PreviewFinalCTA
        secondaryLabel="About Our Company"
        secondaryHref="/about"
      />

      <Footer />
      <WhatsAppChat />
    </div>
  )
}
