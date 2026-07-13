import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AnimationProvider from './components/AnimationProvider'
import PublicAnimatedLayout from './components/PublicAnimatedLayout'
import ScrollToHash from './components/ScrollToHash'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import CaseStudyDetail from './pages/CaseStudyDetail.jsx'
import PortfolioPage from './pages/PortfolioPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import Team from './pages/Team.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminRegister from './pages/admin/AdminRegister.jsx'
import AdminPending from './pages/admin/AdminPending.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminProjects from './pages/admin/AdminProjects.jsx'
import AdminProjectForm from './pages/admin/AdminProjectForm.jsx'
import AdminMessages from './pages/admin/AdminMessages.jsx'
import AdminPortfolio from './pages/admin/AdminPortfolio.jsx'
import AdminCaseStudies from './pages/admin/AdminCaseStudies.jsx'
import AdminBlog from './pages/admin/AdminBlog.jsx'
import AdminSettings from './pages/admin/AdminSettings.jsx'

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimationProvider>
          <ScrollToHash />
          <Routes>
            <Route element={<PublicAnimatedLayout />}>
              <Route path="/" element={<App />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/team" element={<Team />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/pending" element={<AdminPending />} />
            <Route path="/admin/signup" element={<Navigate to="/admin/register" replace />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="projects/new" element={<AdminProjectForm />} />
              <Route path="projects/:id/edit" element={<AdminProjectForm />} />
              <Route path="portfolio" element={<AdminPortfolio />} />
              <Route path="case-studies" element={<AdminCaseStudies />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </AnimationProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}
