import { Link } from 'react-router-dom'

export default function SeeAllLink({ to, label, count }) {
  return (
    <Link to={to} className="portfolio-see-all-btn">
      {label}
      {count != null && <span className="portfolio-see-all-count">{count}</span>}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  )
}
