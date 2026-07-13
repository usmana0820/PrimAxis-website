import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LOGO_SRC, BRAND_NAME, BRAND_SHORT } from '../../constants/branding'
import { useAuth } from '../../context/useAuth'

export default function AdminRegister() {
  const { signup, isActive, isPending, loading, firebaseReady } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!loading && isActive) {
    return <Navigate to="/admin/dashboard" replace />
  }

  if (!loading && isPending) {
    return <Navigate to="/admin/pending" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const result = await signup(email.trim(), password, name.trim())
      if (result.status === 'active') {
        navigate('/admin/dashboard', { replace: true })
      } else {
        navigate('/admin/pending', { replace: true })
      }
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-auth-page admin-auth-register">
      <aside className="admin-auth-visual">
        <div className="admin-auth-visual-inner">
          <img src={LOGO_SRC} alt={BRAND_NAME} className="admin-auth-logo" />
          <p className="admin-auth-company-tag">Request access</p>
          <h1>Join {BRAND_SHORT} CMS</h1>
          <p className="admin-auth-company-about">
            Create your account to request admin access. A developer will approve your account before you can publish content.
          </p>
          <ol className="admin-auth-register-steps">
            <li>Submit this form with your work email</li>
            <li>Wait for approval from a PrimeAxis developer</li>
            <li>Sign in on the login page once activated</li>
          </ol>
        </div>
      </aside>

      <div className="admin-auth-form-wrap">
        <div className="admin-auth-card">
          <p className="admin-auth-badge">Register</p>
          <h2>Request admin access</h2>
          <p className="admin-auth-desc">Your account starts as pending until approved.</p>

          {!firebaseReady && (
            <p className="admin-form-error">Firebase is not configured. Check `.env.local` and restart the dev server.</p>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <label className="admin-label">
              Full name
              <input
                type="text"
                className="admin-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </label>
            <label className="admin-label">
              Work email
              <input
                type="email"
                className="admin-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@primeaxis.com"
                required
                autoComplete="email"
              />
            </label>
            <label className="admin-label">
              Password
              <input
                type="password"
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                autoComplete="new-password"
                minLength={6}
              />
            </label>
            {error && <p className="admin-form-error">{error}</p>}
            <button
              type="submit"
              className="admin-btn admin-btn-primary admin-btn-lg w-full"
              disabled={submitting || !firebaseReady}
            >
              {submitting ? 'Creating account…' : 'Request access'}
            </button>
          </form>

          <p className="admin-auth-switch">
            Already have an account? <Link to="/admin/login">Sign in</Link>
          </p>
          <Link to="/" className="admin-back-link">← Back to {BRAND_SHORT}</Link>
        </div>
      </div>
    </div>
  )
}
