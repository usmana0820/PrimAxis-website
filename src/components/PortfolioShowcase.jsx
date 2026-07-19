import { useMemo, useState } from 'react'
import Reveal from './Reveal'
import PreviewProjectCard from './PreviewProjectCard'
import PortfolioRingShowcase from './PortfolioRingShowcase'
import { PROJECT_CATEGORIES, PROJECT_INDUSTRIES } from '../constants/cmsOptions'
import { usePublishedProjects } from '../hooks/usePublishedProjects'

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'featured', label: 'Featured first' },
  { value: 'az', label: 'A–Z' },
]

function SectionIntro({ label, title, subtitle }) {
  return (
    <header className="cs-preview-section-intro">
      {label && <span className="cs-preview-label">{label}</span>}
      <h2 className="cs-preview-section-head">{title}</h2>
      {subtitle && <p className="cs-preview-section-sub">{subtitle}</p>}
    </header>
  )
}

export default function PortfolioShowcase() {
  const { projects, loading } = usePublishedProjects()
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [industryFilter, setIndustryFilter] = useState('All')
  const [listMode, setListMode] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')

  const filtered = useMemo(() => {
    let list = [...projects]

    if (listMode === 'featured') {
      list = list.filter((p) => p.featured)
    }
    if (categoryFilter !== 'All') {
      list = list.filter((p) => p.category === categoryFilter)
    }
    if (industryFilter !== 'All') {
      list = list.filter((p) => p.industry === industryFilter)
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.summary?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.industry?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.client?.toLowerCase().includes(q)
      )
    }
    if (sort === 'featured') {
      list.sort((a, b) => Number(b.featured) - Number(a.featured))
    } else if (sort === 'az') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    }
    return list
  }, [projects, categoryFilter, industryFilter, listMode, search, sort])

  const featuredProject = useMemo(
    () => projects.find((p) => p.featured) || projects[0],
    [projects]
  )

  const stats = [
    { value: `${projects.length || 0}`, suffix: '+', label: 'Projects Delivered' },
    { value: '10', suffix: '+', label: 'Industries Served' },
    { value: '6', suffix: '+', label: 'Core Services' },
    { value: '99', suffix: '%', label: 'Client Satisfaction' },
  ]

  const hasActiveFilters =
    categoryFilter !== 'All' ||
    industryFilter !== 'All' ||
    listMode !== 'all' ||
    search.trim()

  const clearFilters = () => {
    setCategoryFilter('All')
    setIndustryFilter('All')
    setListMode('all')
    setSearch('')
  }

  return (
    <>
      {/* Stats */}
      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Impact"
              title="Portfolio at a Glance"
              subtitle="Real client work across industries and technologies"
            />
          </Reveal>
          <div className="cs-preview-kpi-grid cs-preview-kpi-grid-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 50} variant="scale">
                <article className={`cs-preview-kpi-card cs-preview-kpi-card-${i % 2 === 0 ? 'a' : 'b'}`}>
                  <div className="cs-preview-kpi-value cs-preview-kpi-value-compact">{stat.value}</div>
                  {stat.suffix && <div className="cs-preview-kpi-suffix">{stat.suffix}</div>}
                  <div className="cs-preview-kpi-label">{stat.label}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Auto-revolving ring gallery */}
      {!loading && projects.length > 0 && (
        <PortfolioRingShowcase projects={projects} />
      )}

      {/* Featured highlight */}
      {featuredProject && !loading && (
        <section className="cs-preview-section">
          <div className="cs-preview-container">
            <Reveal>
              <SectionIntro label="Featured" title="Highlighted Project" />
            </Reveal>
            <Reveal delay={60} variant="scale">
              <PreviewProjectCard project={featuredProject} className="cs-preview-portfolio-featured-card" />
            </Reveal>
          </div>
        </section>
      )}

      {/* Filters + grid */}
      <section id="portfolio-projects" className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro
              label="Browse"
              title="All Projects"
              subtitle="Filter by category, industry, or search. Click any project for the full case study"
            />
          </Reveal>

          <Reveal delay={40}>
            <div className="cs-preview-portfolio-filters">
              <div className="cs-preview-portfolio-filters-grid">
                <label className="cs-preview-filter-field">
                  <span>Search</span>
                  <input
                    type="search"
                    className="cs-preview-filter-input"
                    placeholder="Search projects…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
                <label className="cs-preview-filter-field">
                  <span>Category</span>
                  <select
                    className="cs-preview-filter-input"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="All">All categories</option>
                    {PROJECT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </label>
                <label className="cs-preview-filter-field">
                  <span>Industry</span>
                  <select
                    className="cs-preview-filter-input"
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                  >
                    <option value="All">All industries</option>
                    {PROJECT_INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </label>
                <label className="cs-preview-filter-field">
                  <span>View</span>
                  <select
                    className="cs-preview-filter-input"
                    value={listMode}
                    onChange={(e) => setListMode(e.target.value)}
                  >
                    <option value="all">All projects</option>
                    <option value="featured">Featured only</option>
                  </select>
                </label>
                <label className="cs-preview-filter-field">
                  <span>Sort</span>
                  <select
                    className="cs-preview-filter-input"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="cs-preview-portfolio-filters-footer">
                <span>Showing {filtered.length} of {projects.length} projects</span>
                {hasActiveFilters && (
                  <button type="button" className="cs-preview-filter-clear" onClick={clearFilters}>
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          {loading ? (
            <p className="cs-preview-loading">Loading portfolio…</p>
          ) : filtered.length === 0 ? (
            <div className="cs-preview-portfolio-empty">
              <p>No projects found matching your filters.</p>
              <button type="button" className="cs-preview-btn-white" onClick={clearFilters}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="cs-preview-related-grid cs-preview-portfolio-grid">
              {filtered.map((item, i) => (
                <Reveal key={item.slug} delay={(i % 3) * 60} variant="scale">
                  <div id={`portfolio-item-${item.slug}`} className="scroll-mt-28 h-full">
                    <PreviewProjectCard project={item} className="h-full" />
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
