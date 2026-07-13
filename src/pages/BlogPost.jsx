import { useParams } from 'react-router-dom'
import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'
import { getBlogPostBySlug } from '../constants/blogPosts'

const THEME_CLASS = {
  zoho: 'resource-detail-zoho',
  mobile: 'resource-detail-mobile',
  ai: 'resource-detail-ai',
  web: 'resource-detail-web',
  company: 'resource-detail-company',
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return <NotFound />
  }

  return (
    <PageShell
      heroVariant="blog"
      badge={post.categoryLabel}
      title={post.title}
      description={post.excerpt}
    >
      {/* White — intro */}
      <section className={`page-section relative overflow-hidden section-light-theme resource-article ${THEME_CLASS[post.theme]}`}>
        <div className="section-light-mesh" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="resource-meta resource-meta-lg">
              <span>{post.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
            <p className="resource-article-intro">{post.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* White — article content */}
      <section className={`page-section relative overflow-hidden section-light-theme resource-article ${THEME_CLASS[post.theme]}`}>
        <div className="section-light-mesh" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal delay={80}>
            <article className="resource-article-body">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </section>
              ))}

              {post.takeaways?.length > 0 && (
                <aside className="resource-takeaways">
                  <p className="resource-takeaways-label">Key Takeaways</p>
                  <ul>
                    {post.takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </aside>
              )}
            </article>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
