import { useState } from 'react'
import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import ResourceLiveChat from '../components/ResourceLiveChat'
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
      title="Insights, Guides & Technology Trends"
      description="Company news, Zoho expertise, AI automation tips, and SEO-friendly articles to help your business grow."
    >
      <section className="page-section relative overflow-hidden section-light-theme section-edge-glow">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mt-10">
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

          <Reveal delay={100} className="mt-12">
            <ResourceLiveChat variant="blog" />
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
