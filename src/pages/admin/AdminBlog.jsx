import { Link } from 'react-router-dom'
import { BLOG_POSTS, getBlogPostUrl } from '../../constants/blogPosts'

export default function AdminBlog() {
  return (
    <div className="admin-page admin-page-wide">
      <header className="admin-page-header admin-page-header-row">
        <div>
          <h1>Blog</h1>
          <p>
            Articles shown on the <a href="/#blog" target="_blank" rel="noreferrer">home blog section</a>
            {' '}and <a href="/blog" target="_blank" rel="noreferrer">/blog</a>.
          </p>
        </div>
        <a href="/blog" target="_blank" rel="noreferrer" className="admin-btn admin-btn-outline">
          View live blog
        </a>
      </header>

      <div className="admin-panel admin-panel-flush">
        <div className="admin-panel-head">
          <h2>All articles ({BLOG_POSTS.length})</h2>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {BLOG_POSTS.map((post) => (
                <tr key={post.slug}>
                  <td>
                    <strong>{post.title}</strong>
                    {post.featured && <span className="admin-table-sub"> · Featured</span>}
                    <span className="admin-table-sub block">{post.excerpt}</span>
                  </td>
                  <td>{post.categoryLabel}</td>
                  <td>{post.publishedAt}</td>
                  <td className="admin-table-actions">
                    <a href={getBlogPostUrl(post.slug)} target="_blank" rel="noreferrer" className="admin-link-btn">
                      View live
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="admin-upload-info admin-upload-info-inline">
          Blog posts are currently managed in code (<code>src/constants/blogPosts.js</code>).
          Firestore blog CMS can be added next if you need add/edit from the dashboard.
        </p>
      </div>
    </div>
  )
}
