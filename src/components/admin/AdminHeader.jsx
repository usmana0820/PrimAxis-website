import { useAuth } from '../../context/useAuth'
import { IconBell, IconSearch } from './AdminIcons'

export default function AdminHeader({ title, subtitle }) {
  const { profile } = useAuth()
  const initials = (profile?.name || profile?.email || 'A')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        {title && (
          <div className="admin-topbar-titles">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}
        <div className="admin-search">
          <IconSearch />
          <input type="search" placeholder="Search projects, blog posts…" aria-label="Search" />
          <kbd>⌘ K</kbd>
        </div>
      </div>

      <div className="admin-topbar-right">
        <button type="button" className="admin-icon-btn admin-notify-btn" aria-label="Notifications">
          <IconBell />
          <span className="admin-notify-badge">3</span>
        </button>

        <div className="admin-theme-toggle">
          <span className="active">Light</span>
          <span>Dark</span>
        </div>

        <div className="admin-user-chip">
          <div className="admin-user-avatar">{initials}</div>
          <div className="admin-user-meta">
            <span className="admin-user-chip-name">{profile?.name || 'Admin User'}</span>
            <span className="admin-user-chip-role">{profile?.role || 'admin'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
