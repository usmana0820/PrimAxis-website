import { Link } from 'react-router-dom'
import { getCaseStudyUrl } from '../constants/caseStudies'

export default function PreviewProjectCard({ project, className = '' }) {
  const url = getCaseStudyUrl(project.slug)
  const summary = project.description || project.shortDescription || project.summary

  return (
    <Link to={url} className={`cs-preview-related-card cs-preview-portfolio-card ${className}`.trim()}>
      <div className="cs-preview-related-media">
        {project.coverImage ? (
          <img src={project.coverImage} alt={project.title} loading="lazy" />
        ) : (
          <div className={`cs-preview-related-fallback bg-gradient-to-br ${project.gradient}`} />
        )}
        {project.featured && (
          <span className="cs-preview-portfolio-featured-badge">Featured</span>
        )}
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
        <span className="cs-preview-related-link">View Case Study →</span>
      </div>
    </Link>
  )
}
