import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'
import { LOGO_SRC, BRAND_NAME } from '../../constants/branding'
import { useAuth } from '../../context/useAuth'

const LOCKED_FEATURES = [
  { label: 'Dashboard overview & stats', locked: true },
  { label: 'Add / edit projects', locked: true },
  { label: 'Publish to portfolio & case studies', locked: true },
  { label: 'Upload images & gallery', locked: true },
  { label: 'View contact messages', locked: true },
  { label: 'CMS settings', locked: true },
]

const AVAILABLE_NOW = [
  'View your approval status on this page',
  'Check again after a developer activates your account',
  'Sign out and return to the public website',
]

function AdminPendingContent() {
  const { user, profile, logout, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [checking, setChecking] = useState(false)
  const [message, setMessage] = useState('')

  const handleCheckStatus = async () => {
    setChecking(true)
    setMessage('')
    try {
      const updated = await refreshProfile()
      if (updated?.active === true) {
        navigate('/admin/dashboard', { replace: true })
        return
      }
      setMessage('Still pending — a developer has not activated your account yet.')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setChecking(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-pending-page">
      <header className="admin-pending-header">
        <Link to="/" className="admin-pending-brand">
          <img src={LOGO_SRC} alt={BRAND_NAME} />
          <span>{BRAND_NAME}</span>
        </Link>
        <button type="button" className="admin-btn admin-btn-outline" onClick={handleLogout}>
          Sign out
        </button>
      </header>

      <main className="admin-pending-main">
        <div className="admin-pending-hero">
          <span className="admin-pending-badge">Pending approval</span>
          <h1>Welcome{profile?.name ? `, ${profile.name}` : ''}</h1>
          <p>
            Your account is registered but not activated yet. Full CMS access unlocks after a PrimeAxis developer approves you.
          </p>
        </div>

        <div className="admin-pending-grid">
          <section className="admin-pending-card admin-pending-card-status">
            <h2>Account status</h2>
            <dl className="admin-pending-dl">
              <div>
                <dt>Email</dt>
                <dd>{profile?.email || user?.email}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd className="admin-pending-role">{profile?.role || 'pending'}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <span className="admin-pending-status-pill">Awaiting approval</span>
                </dd>
              </div>
              <div>
                <dt>User ID</dt>
                <dd><code className="admin-pending-uid">{user?.uid}</code></dd>
              </div>
            </dl>
            <p className="admin-pending-hint">
              Share your email or User ID with a developer if they need to activate you in Firebase Console
              (<code>admins/{user?.uid}</code> → <code>active: true</code>).
            </p>
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={handleCheckStatus}
              disabled={checking}
            >
              {checking ? 'Checking…' : 'Check approval status'}
            </button>
            {message && <p className="admin-pending-message">{message}</p>}
          </section>

          <section className="admin-pending-card">
            <h2>Available now</h2>
            <ul className="admin-pending-list admin-pending-list-ok">
              {AVAILABLE_NOW.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="admin-pending-card admin-pending-card-locked">
            <h2>Locked until approval</h2>
            <ul className="admin-pending-list admin-pending-list-locked">
              {LOCKED_FEATURES.map((item) => (
                <li key={item.label}>
                  <span className="admin-pending-lock-icon" aria-hidden="true">🔒</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="admin-pending-actions">
          <Link to="/admin/login" className="admin-link-btn">← Back to login</Link>
          <Link to="/" className="admin-link-btn">View public website</Link>
        </div>
      </main>
    </div>
  )
}

export default function AdminPending() {
  return (
    <ProtectedRoute requireActive={false}>
      <AdminPendingContent />
    </ProtectedRoute>
  )
}
