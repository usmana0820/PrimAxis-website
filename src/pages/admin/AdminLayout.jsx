import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { InquiriesProvider, useInquiries } from '../../context/InquiriesContext'
import { LOGO_SRC, BRAND_NAME, BRAND_SHORT } from '../../constants/branding'
import AdminHeader from '../../components/admin/AdminHeader'
import {
  IconAdd,
  IconBlog,
  IconCaseStudy,
  IconDashboard,
  IconLogout,
  IconMessages,
  IconPortfolio,
  IconProjects,
  IconSettings,
} from '../../components/admin/AdminIcons'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: IconDashboard, end: true },
  { to: '/admin/portfolio', label: 'Portfolio', icon: IconPortfolio },
  { to: '/admin/case-studies', label: 'Case Studies', icon: IconCaseStudy },
  { to: '/admin/blog', label: 'Blog', icon: IconBlog },
  { to: '/admin/projects', label: 'My Projects', icon: IconProjects },
  { to: '/admin/projects/new', label: 'Add Project', icon: IconAdd },
  { to: '/admin/messages', label: 'Contact Messages', icon: IconMessages },
  { to: '/admin/settings', label: 'Settings', icon: IconSettings },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <InquiriesProvider>
      <AdminLayoutShell onLogout={handleLogout} />
    </InquiriesProvider>
  )
}

function AdminLayoutShell({ onLogout }) {
  const { newCount } = useInquiries()

  return (
    <div className="admin-shell admin-shell-premium">
      <aside className="admin-sidebar admin-sidebar-light">
        <Link to="/" className="admin-brand admin-brand-light admin-brand-link" aria-label={`${BRAND_NAME} — back to website`}>
          <img src={LOGO_SRC} alt={BRAND_NAME} className="admin-brand-logo" />
          <div>
            <span className="admin-brand-title">{BRAND_NAME}</span>
            <span className="admin-brand-sub">PrimeAxis CMS</span>
          </div>
        </Link>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            const showBadge = item.to === '/admin/messages' && newCount > 0
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `admin-nav-link admin-nav-link-light${isActive ? ' active' : ''}`
                }
              >
                <Icon />
                {item.label}
                {showBadge && (
                  <span className="admin-nav-badge" aria-label={`${newCount} unread contact messages`}>
                    {newCount}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="admin-sidebar-promo">
          <p className="admin-sidebar-promo-label">About {BRAND_SHORT}</p>
          <p>Digital transformation partner for Zoho, custom software, mobile apps, and AI solutions.</p>
        </div>

        <button type="button" className="admin-logout-btn admin-logout-btn-light" onClick={onLogout}>
          <IconLogout />
          Logout
        </button>
      </aside>

      <div className="admin-content-wrap">
        <AdminHeader />
        <main className="admin-main admin-main-premium">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
