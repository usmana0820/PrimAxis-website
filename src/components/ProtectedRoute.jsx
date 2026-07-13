import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function ProtectedRoute({ children, requireActive = true }) {
  const { isActive, isPending, isAuthenticated, loading, firebaseReady } = useAuth()
  const location = useLocation()

  if (!firebaseReady) {
    return (
      <div className="admin-shell admin-center-message">
        <p>Firebase is not configured. Add keys to <code>.env.local</code> and restart the dev server.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="admin-shell admin-center-message">
        <p>Checking admin session…</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  if (requireActive && !isActive) {
    return <Navigate to="/admin/pending" replace />
  }

  if (!requireActive && isActive) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return children
}
