import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminPublishedGrid from '../../components/admin/AdminPublishedGrid'
import { fetchAllProjects } from '../../services/projects'

export default function AdminPortfolio() {
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
          <h1>Portfolio</h1>
          <p>
            Published projects appear on the <a href="/#portfolio" target="_blank" rel="noreferrer">home page portfolio</a>
            {' '}and <a href="/portfolio" target="_blank" rel="noreferrer">/portfolio</a>.
          </p>
        </div>
        <div className="admin-page-header-actions">
          <Link to="/admin/projects" className="admin-btn admin-btn-outline">All projects</Link>
          <Link to="/admin/projects/new" className="admin-btn admin-btn-primary">Add project</Link>
        </div>
      </header>

      {error && <p className="admin-form-error">{error}</p>}

      <div className="admin-panel admin-panel-flush">
        <div className="admin-panel-head">
          <h2>Live on website ({published.length})</h2>
          <a href="/portfolio" target="_blank" rel="noreferrer" className="admin-link-btn">Open portfolio page →</a>
        </div>

        <AdminPublishedGrid
          projects={published}
          loading={loading}
          emptyTitle="No published portfolio items yet."
          emptyHint="Create a project and click Publish — it will show on the landing page automatically."
          viewLabel="View on site"
          publicPath="portfolio"
        />
      </div>
    </div>
  )
}
