import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminPublishedGrid from '../../components/admin/AdminPublishedGrid'
import { fetchAllProjects } from '../../services/projects'

export default function AdminCaseStudies() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAllProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const published = useMemo(
    () => projects.filter((p) => p.status === 'published'),
    [projects]
  )

  return (
    <div className="admin-page admin-page-wide">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>Case Studies</h1>
          <p>
            Published projects appear on <a href="/#case-studies" target="_blank" rel="noreferrer">home case studies</a>
            {' '}and full pages at <a href="/case-studies" target="_blank" rel="noreferrer">/case-studies</a>.
          </p>
        </div>
        <div className="admin-page-header-actions">
          <Link to="/admin/projects" className="admin-btn admin-btn-outline">All projects</Link>
          <Link to="/admin/projects/new" className="admin-btn admin-btn-primary">Add case study</Link>
        </div>
      </header>

      {error && <p className="admin-form-error">{error}</p>}

      <div className="admin-panel admin-panel-flush">
        <div className="admin-panel-head">
          <h2>Published case studies ({published.length})</h2>
          <a href="/case-studies" target="_blank" rel="noreferrer" className="admin-link-btn">Open case studies page →</a>
        </div>

        <AdminPublishedGrid
          projects={published}
          loading={loading}
          emptyTitle="No published case studies yet."
          emptyHint="Publish a project from Projects — it becomes a live case study with the showcase layout."
          viewLabel="Open case study"
          publicPath="case-study"
        />
      </div>
    </div>
  )
}
