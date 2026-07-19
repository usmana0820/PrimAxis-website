import { Link } from 'react-router-dom'
import { getCaseStudyUrl } from '../constants/caseStudies'
import ProjectLinkActions from './ProjectLinkActions'

export default function PreviewProjectCard({ project, className = '' }) {
  const url = getCaseStudyUrl(project.slug)
  const summary = project.description || project.shortDescription || project.summary

  return (
    <article className={`cs-preview-related-card cs-preview-portfolio-card ${className}`.trim()}>
      <Link to={url} className="cs-preview-portfolio-card-main">
        <div className="cs-preview-related-media">
          {project.coverImage ? (
            <img src={project.coverImage} alt={project.title} loading="lazy" />
          ) : (
            <div className={`cs-preview-related-fallback bg-gradient-to-br ${project.gradient}`} />
          )}
          {project.isSample ? (
            <span className="cs-preview-portfolio-featured-badge cs-preview-portfolio-sample-badge">Sample</span>
          ) : project.featured ? (
            <span className="cs-preview-portfolio-featured-badge">Featured</span>
          ) : null}
        </div>
        <div className="cs-preview-related-body">
          <span>{project.industry}</span>
          <h4>{project.title}</h4>
          {project.client && (
            <p className="cs-preview-portfolio-client">{project.client}</p>
          )}
          {summary && (
            <p className="cs-preview-portfolio-excerpt">{summary}</p>
          )}
          {project.result && (
            <p className="cs-preview-portfolio-result">{project.result}</p>
          )}
        </div>
      </Link>

      <div className="cs-preview-portfolio-card-footer">
        <ProjectLinkActions
          liveDemoUrl={project.liveDemoUrl}
          githubUrl={project.githubUrl}
          variant="preview"
          className="cs-preview-portfolio-links"
        />

        <Link to={url} className="cs-preview-portfolio-cta">
          View Case Study
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
