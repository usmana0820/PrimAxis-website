import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import SeeAllLink from './SeeAllLink'
import { getCardRevealVariant } from '../utils/revealVariants'
import { BLOG_POSTS, getBlogPostUrl } from '../constants/blogPosts'

const HOME_LIMIT = 3

const THEME_CLASS = {
  zoho: 'home-resource-card-zoho',
  mobile: 'home-resource-card-mobile',
  ai: 'home-resource-card-ai',
  web: 'home-resource-card-web',
  company: 'home-resource-card-company',
}

export default function BlogPreview() {
  const preview = BLOG_POSTS.slice(0, HOME_LIMIT)

  return (
    <section id="blog" className="page-section relative section-light-theme section-edge-glow">
      <div className="section-light-mesh" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          label="Blog"
          title="Insights & Technology Trends"
          subtitle="Zoho tips, AI automation guides, and practical advice for growing your business."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {preview.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90} variant={getCardRevealVariant(i, 3)} className="h-full">
              <Link
                to={getBlogPostUrl(post.slug)}
                className={`home-resource-card group h-full ${THEME_CLASS[post.theme] || ''}`}
              >
                <span className="home-resource-chip">{post.categoryLabel}</span>
                <h3 className="home-resource-title">{post.title}</h3>
                <p className="home-resource-excerpt">{post.excerpt}</p>
                <div className="home-resource-meta">
                  <span>{post.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
                <span className="home-resource-link">Read Article →</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 flex justify-center">
          <SeeAllLink to="/blog" label="See all articles" count={BLOG_POSTS.length} />
        </Reveal>
      </div>
    </section>
  )
}
