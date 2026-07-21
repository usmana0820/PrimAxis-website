import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { canManageProject, deleteProject, fetchProjectsForAdmin } from '../../services/projects'
import { useAuth } from '../../context/useAuth'

export default function AdminProjects() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () => {
    if (!user?.uid) return
    setLoading(true)
    fetchProjectsForAdmin(user.uid)
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [user?.uid])

  const handleDelete = async (id, title) => {
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
          <h1>My Projects</h1>
          <p>Your drafts and published work. Contact messages are shared with all admins; projects stay in your workspace only.</p>
        </div>
        <Link to="/admin/projects/new" className="admin-btn admin-btn-primary">Add Project</Link>
      </header>

      {error && <p className="admin-form-error">{error}</p>}

      {loading ? (
        <p>Loading projects…</p>
      ) : projects.length === 0 ? (
        <div className="admin-empty">
          <p>You have not created any projects yet.</p>
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
                    {canManageProject(project, user?.uid) && (
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
