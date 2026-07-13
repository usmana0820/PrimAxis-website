import { useState } from 'react'
import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import { BLOG_CATEGORIES, BLOG_POSTS, getBlogPostUrl, getFeaturedPost } from '../constants/blogPosts'

const THEME_CLASS = {
  zoho: 'resource-card-zoho',
  mobile: 'resource-card-mobile',
  ai: 'resource-card-ai',
  web: 'resource-card-web',
  company: 'resource-card-company',
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const featured = getFeaturedPost()

  const filteredPosts = BLOG_POSTS.filter(
    (post) => activeCategory === 'all' || post.category === activeCategory
  ).filter((post) => !post.featured || activeCategory !== 'all')

  const listPosts = activeCategory === 'all'
    ? filteredPosts.filter((post) => post.slug !== featured.slug)
    : filteredPosts

  return (
    <PageShell
      heroVariant="blog"
      badge="Blog"
      title="Blog Showcase"
      description="Browse all articles below — pick any topic to read insights on Zoho, AI, mobile, web, and company news."
    >
      {/* White — featured & filters */}
      <section className="page-section relative overflow-hidden section-light-theme">
        <div className="section-light-mesh" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeCategory === 'all' && (
            <Reveal>
              <a href={getBlogPostUrl(featured.slug)} className={`resource-featured ${THEME_CLASS[featured.theme]}`}>
                <div className="resource-featured-accent" />
                <div className="resource-featured-body">
                  <span className="resource-chip">Featured · {featured.categoryLabel}</span>
                  <h2 className="resource-featured-title">{featured.title}</h2>
                  <p className="resource-featured-excerpt">{featured.excerpt}</p>
                  <div className="resource-meta">
                    <span>{featured.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <span className="resource-read-link">Read Article →</span>
                </div>
              </a>
            </Reveal>
          )}

          <Reveal delay={60} className="resource-filter-row">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`resource-filter-pill${activeCategory === cat.id ? ' resource-filter-pill-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Blue — article grid */}
      <section className="page-section relative overflow-hidden section-blue-theme">
        <div className="section-blue-pattern" aria-hidden="true" />
        <div className="section-blue-glow section-blue-glow-left" aria-hidden="true" />
        <div className="section-blue-glow section-blue-glow-right" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto section-header">
            <span className="section-label section-label-on-dark">Articles</span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              Choose an article to read
            </h2>
            <p className="mt-4 text-white/70 text-base leading-relaxed">
              {activeCategory === 'all'
                ? 'Pick any topic below — Zoho, AI, mobile, web, and company updates.'
                : BLOG_CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {listPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60} variant="scale">
                <a href={getBlogPostUrl(post.slug)} className={`resource-card group h-full ${THEME_CLASS[post.theme]}`}>
                  <div className="resource-card-accent" />
                  <span className="resource-chip">{post.categoryLabel}</span>
                  <h2 className="resource-card-title">{post.title}</h2>
                  <p className="resource-card-excerpt">{post.excerpt}</p>
                  <div className="resource-meta">
                    <span>{post.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="resource-read-link">Read Article →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
