import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import CaseStudyDetail from './pages/CaseStudyDetail.jsx'
import Team from './pages/Team.jsx'

const path = window.location.pathname.replace(/\/$/, '') || '/'

function resolvePage() {
  if (path.startsWith('/case-studies/') && path !== '/case-studies') {
    return CaseStudyDetail
  }

  if (path.startsWith('/blog/') && path !== '/blog') {
    return BlogPost
  }

  const routes = {
    '/': App,
    '/blog': Blog,
    '/case-studies': CaseStudies,
    '/team': Team,
  }

  return routes[path] ?? NotFound
}

const Page = resolvePage()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
