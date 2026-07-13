import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllProjects, fetchProjectStats } from '../../services/projects'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchProjectStats(), fetchAllProjects()])
      .then(([statsData, projects]) => {
        setStats(statsData)
        setRecent(projects.slice(0, 5))
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="admin-page admin-page-wide">
      <header className="admin-page-hero">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back — manage your portfolio and case studies from one place.</p>
        </div>
        <Link to="/admin/projects/new" className="admin-btn admin-btn-primary">
          + Add New Project
        </Link>
      </header>

      {error && <p className="admin-form-error">{error}</p>}

      <div className="admin-stat-grid admin-stat-grid-premium">
        {[
          { label: 'Total Projects', value: stats.total, tone: 'blue' },
          { label: 'Published', value: stats.published, tone: 'green' },
          { label: 'Drafts', value: stats.draft, tone: 'amber' },
          { label: 'Live on Site', value: stats.published, tone: 'indigo' },
        ].map((item) => (
          <div key={item.label} className={`admin-stat-card admin-stat-card-${item.tone}`}>
            <span className="admin-stat-value">{loading ? '—' : item.value}</span>
            <span className="admin-stat-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="admin-dash-grid">
        <section className="admin-panel">
          <div className="admin-panel-head">
            <h2>Recent Projects</h2>
            <Link to="/admin/projects" className="admin-link-btn">View all →</Link>
          </div>
          {loading ? (
            <p className="admin-muted">Loading…</p>
          ) : recent.length === 0 ? (
            <div className="admin-empty admin-empty-sm">
              <p>No projects yet.</p>
              <Link to="/admin/projects/new" className="admin-btn admin-btn-outline">Create first project</Link>
            </div>
          ) : (
            <div className="admin-recent-list">
              {recent.map((project) => (
                <div key={project.id} className="admin-recent-item">
                  <div>
                    <strong>{project.title}</strong>
                    <span>{project.category} · {project.client || 'No client'}</span>
                  </div>
                  <div className="admin-recent-actions">
                    <span className={`admin-status-pill admin-status-${project.status}`}>{project.status}</span>
                    <Link to={`/admin/projects/${project.id}/edit`} className="admin-link-btn">Edit</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="admin-panel">
          <div className="admin-panel-head">
            <h2>Quick Actions</h2>
          </div>
          <div className="admin-quick-grid">
            <Link to="/admin/projects/new" className="admin-quick-card">
              <span className="admin-quick-icon">+</span>
              <strong>Add Project</strong>
              <span>Create &amp; publish portfolio item</span>
            </Link>
            <Link to="/admin/portfolio" className="admin-quick-card">
              <span className="admin-quick-icon">🌐</span>
              <strong>Portfolio</strong>
              <span>Live on home &amp; /portfolio</span>
            </Link>
            <Link to="/admin/case-studies" className="admin-quick-card">
              <span className="admin-quick-icon">📊</span>
              <strong>Case Studies</strong>
              <span>Manage published showcases</span>
            </Link>
            <Link to="/admin/blog" className="admin-quick-card">
              <span className="admin-quick-icon">📝</span>
              <strong>Blog</strong>
              <span>View all articles</span>
            </Link>
          </div>

          <div className="admin-info-card admin-info-card-inline">
            <h3>Free stack active</h3>
            <ul>
              <li>Firebase Auth + Firestore</li>
              <li>Cloudinary for images</li>
              <li>No Firebase Storage costs</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
