import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LOGO_SRC, BRAND_NAME, BRAND_SHORT } from '../../constants/branding'
import { useAuth } from '../../context/useAuth'

export default function AdminLogin() {
  const { login, resetPassword, isActive, isPending, loading, firebaseReady } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const from = location.state?.from || '/admin/dashboard'

  if (!loading && isActive) {
    return <Navigate to={from} replace />
  }

  if (!loading && isPending) {
    return <Navigate to="/admin/pending" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      const result = await login(email.trim(), password)
      if (result.status === 'pending') {
        navigate('/admin/pending', { replace: true })
      } else {
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError(err.message || 'Sign in failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-auth-page admin-auth-login-only">
      <aside className="admin-auth-visual">
        <div className="admin-auth-visual-inner">
          <img src={LOGO_SRC} alt={BRAND_NAME} className="admin-auth-logo" />
          <p className="admin-auth-company-tag">PrimeAxis CMS</p>
          <h1>{BRAND_NAME}</h1>
          <p className="admin-auth-company-about">
            Sign in to manage portfolio projects, case studies, and published content on the website.
          </p>
          <ul className="admin-auth-login-points">
            <li>Approved admins — full dashboard access</li>
            <li>Pending accounts — status page until activated</li>
            <li>New team members — request access first</li>
          </ul>
        </div>
      </aside>

      <div className="admin-auth-form-wrap">
        <div className="admin-auth-card admin-auth-card-login">
          <p className="admin-auth-badge">Sign in</p>
          <h2>Admin login</h2>
          <p className="admin-auth-desc">
            Use your work email and password. Only login — no registration on this page.
          </p>

          {!firebaseReady && (
            <p className="admin-form-error">Firebase is not configured. Check `.env.local` and restart the dev server.</p>
          )}

          {success && <p className="admin-form-success">{success}</p>}

          <form onSubmit={handleSubmit} className="admin-form">
            <label className="admin-label">
              Email
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
                placeholder="••••••••"
                required
                autoComplete="current-password"
                minLength={6}
              />
            </label>
            {error && <p className="admin-form-error">{error}</p>}
            <button
              type="button"
              className="admin-forgot-password"
              onClick={async () => {
                if (!email.trim()) {
                  setError('Enter your email first, then click Forgot password.')
                  return
                }
                setError('')
                setSuccess('')
                try {
                  await resetPassword(email)
                  setSuccess(`Password reset email sent to ${email.trim().toLowerCase()}.`)
                } catch (err) {
                  setError(err.message)
                }
              }}
            >
              Forgot password?
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn-primary admin-btn-lg w-full"
              disabled={submitting || !firebaseReady}
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="admin-auth-login-footer">
            <p>
              Don&apos;t have access yet?{' '}
              <Link to="/admin/register">Request access</Link>
            </p>
            <Link to="/" className="admin-back-link">← Back to {BRAND_SHORT}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
