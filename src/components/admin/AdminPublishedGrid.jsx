import { Link } from 'react-router-dom'
import { getCaseStudyUrl } from '../../constants/caseStudies'
import { normalizeProject } from '../../utils/projectAdapter'

export default function AdminPublishedGrid({
  projects,
  loading,
  emptyTitle,
  emptyHint,
  viewLabel = 'View live',
  publicPath = 'case-study',
}) {
  if (loading) {
    return <p className="admin-muted">Loading…</p>
  }

  if (!projects.length) {
    return (
      <div className="admin-empty">
        <p>{emptyTitle}</p>
        <p className="admin-muted">{emptyHint}</p>
        <Link to="/admin/projects/new" className="admin-btn admin-btn-primary">Add &amp; publish a project</Link>
      </div>
    )
  }

  return (
    <div className="admin-published-grid">
      {projects.map((project) => {
        const item = normalizeProject(project)
        const liveUrl = publicPath === 'portfolio'
          ? `/portfolio#portfolio-item-${item.slug}`
          : getCaseStudyUrl(item.slug)

        return (
          <article key={project.id} className="admin-published-card">
            <div className="admin-published-card-media">
              {item.coverImage ? (
                <img src={item.coverImage} alt={item.title} />
              ) : (
                <div className={`admin-published-card-fallback bg-gradient-to-br ${item.gradient}`} />
              )}
              <span className="admin-status-pill admin-status-published admin-published-card-badge">Live</span>
            </div>

            <div className="admin-published-card-body">
              <span className="admin-published-card-meta">{item.category} · {item.industry}</span>
              <h3>{item.title}</h3>
              {item.client && <p className="admin-published-card-client">{item.client}</p>}
              <p className="admin-published-card-excerpt">{item.summary || item.description}</p>

              <div className="admin-published-card-actions">
                <Link to={`/admin/projects/${project.id}/edit`} className="admin-btn admin-btn-outline admin-btn-sm">
                  Edit
                </Link>
                <a href={liveUrl} target="_blank" rel="noreferrer" className="admin-btn admin-btn-primary admin-btn-sm">
                  {viewLabel}
                </a>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
