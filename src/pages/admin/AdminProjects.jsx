import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllProjects, deleteProject } from '../../services/projects'
import { useAuth } from '../../context/useAuth'

export default function AdminProjects() {
  const { profile } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    fetchAllProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id, title) => {
    if (profile?.role === 'analyst' || profile?.role === 'marketing') {
      alert('Your role cannot delete projects.')
      return
    }
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await deleteProject(id)
      load()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="admin-page admin-page-wide">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>All Projects</h1>
          <p>Drafts and published items. Published projects appear on portfolio, case studies, and the home page.</p>
        </div>
        <Link to="/admin/projects/new" className="admin-btn admin-btn-primary">Add Project</Link>
      </header>

      {error && <p className="admin-form-error">{error}</p>}

      {loading ? (
        <p>Loading projects…</p>
      ) : projects.length === 0 ? (
        <div className="admin-empty">
          <p>No projects yet.</p>
          <Link to="/admin/projects/new" className="admin-btn admin-btn-primary">Create your first project</Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <strong>{project.title}</strong>
                    <span className="admin-table-sub">{project.client}</span>
                  </td>
                  <td>{project.category}</td>
                  <td>
                    <span className={`admin-status-pill admin-status-${project.status}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="admin-table-actions">
                    <Link to={`/admin/projects/${project.id}/edit`} className="admin-link-btn">Edit</Link>
                    {project.status === 'published' && (
                      <>
                        <a href={`/case-studies/${project.slug}`} className="admin-link-btn" target="_blank" rel="noreferrer">Case study</a>
                        <a href="/#portfolio" className="admin-link-btn" target="_blank" rel="noreferrer">Portfolio</a>
                      </>
                    )}
                    {profile?.role === 'developer' && (
                      <button type="button" className="admin-link-btn admin-link-danger" onClick={() => handleDelete(project.id, project.title)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
