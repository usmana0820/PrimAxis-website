import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllProjects, fetchProjectStats } from '../../services/projects'
import { useInquiries } from '../../context/InquiriesContext'
import {
  formatInquiryDateTime,
  getInquiryStatusLabel,
  isInquiryUnread,
} from '../../utils/inquiryDates'

export default function AdminDashboard() {
  const { recent: recentMessages, unreadCount, loading: messagesLoading } = useInquiries()
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

      {unreadCount > 0 && (
        <Link to="/admin/messages" className="admin-new-messages-banner">
          <span className="admin-new-messages-banner-dot" aria-hidden="true" />
          <span>
            <strong>{unreadCount} unread contact message{unreadCount === 1 ? '' : 's'}</strong>
            {' '}from the website — view and reply
          </span>
          <span className="admin-new-messages-banner-cta">Open messages →</span>
        </Link>
      )}

      <div className="admin-stat-grid admin-stat-grid-premium">
        {[
          { label: 'Total Projects', value: stats.total, tone: 'blue' },
          { label: 'Published', value: stats.published, tone: 'green' },
          { label: 'Drafts', value: stats.draft, tone: 'amber' },
          {
            label: 'Unread Messages',
            value: messagesLoading ? '—' : unreadCount,
            tone: 'cyan',
            href: '/admin/messages',
          },
        ].map((item) => {
          const card = (
            <div className={`admin-stat-card admin-stat-card-${item.tone}`}>
              <span className="admin-stat-value">
                {!item.href && loading ? '—' : item.value}
              </span>
              <span className="admin-stat-label">{item.label}</span>
            </div>
          )

          return item.href ? (
            <Link key={item.label} to={item.href} className="admin-stat-card-link">
              {card}
            </Link>
          ) : (
            <div key={item.label}>{card}</div>
          )
        })}
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
            <h2>Recent Contact Messages</h2>
            <Link to="/admin/messages" className="admin-link-btn">View all →</Link>
          </div>
          {messagesLoading ? (
            <p className="admin-muted">Loading…</p>
          ) : recentMessages.length === 0 ? (
            <div className="admin-empty admin-empty-sm">
              <p>No contact messages yet.</p>
              <p className="admin-muted">Submissions from the homepage contact form appear here in real time.</p>
            </div>
          ) : (
            <div className="admin-recent-list">
              {recentMessages.map((item) => (
                <Link key={item.id} to="/admin/messages" className="admin-recent-item admin-recent-item-link">
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.email} · {formatInquiryDateTime(item.createdAt)}</span>
                  </div>
                  <div className="admin-recent-actions">
                    {isInquiryUnread(item) && (
                      <span className="admin-status-pill admin-status-new">
                        {getInquiryStatusLabel(item.status)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="admin-dash-grid admin-dash-grid-secondary">
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
            <Link to="/admin/messages" className="admin-quick-card">
              <span className="admin-quick-icon">✉️</span>
              <strong>Contact Messages</strong>
              <span>
                {unreadCount > 0 ? `${unreadCount} unread` : 'Website form submissions'}
              </span>
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
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-info-card admin-info-card-inline">
            <h3>Free stack active</h3>
            <ul>
              <li>Firebase Auth + Firestore</li>
              <li>Cloudinary for images</li>
              <li>Real-time contact form inbox</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
