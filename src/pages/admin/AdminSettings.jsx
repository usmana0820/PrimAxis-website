import { isCloudinaryConfigured } from '../../lib/cloudinary'
import { firebaseReady } from '../../lib/firebase'

export default function AdminSettings() {
  const cloudinaryReady = isCloudinaryConfigured()

  return (
    <div className="admin-page admin-page-wide">
      <header className="admin-page-hero">
        <div>
          <h1>Settings</h1>
          <p>Configure CMS preferences and integrations.</p>
        </div>
      </header>

      <div className="admin-panel">
        <h2>Integrations</h2>
        <ul className="admin-settings-list">
          <li>
            <strong>Firebase</strong> — Auth &amp; Firestore
            <span className={`admin-settings-status ${firebaseReady ? 'ok' : 'warn'}`}>
              {firebaseReady ? 'Connected' : 'Missing .env.local keys'}
            </span>
          </li>
          <li>
            <strong>Cloudinary</strong> — Image uploads
            <span className={`admin-settings-status ${cloudinaryReady ? 'ok' : 'warn'}`}>
              {cloudinaryReady ? 'Configured' : 'Not configured'}
            </span>
          </li>
          <li><strong>Vercel</strong> — Hosting &amp; deployments</li>
        </ul>
      </div>

      {!cloudinaryReady && (
        <div className="admin-panel admin-panel-highlight">
          <h2>Cloudinary setup (free tier)</h2>
          <ol className="admin-setup-steps">
            <li>Create a free account at <a href="https://cloudinary.com" target="_blank" rel="noreferrer">cloudinary.com</a></li>
            <li>In the dashboard, copy your <strong>Cloud name</strong></li>
            <li>Go to <strong>Settings → Upload → Upload presets → Add upload preset</strong></li>
            <li>Set signing mode to <strong>Unsigned</strong>, name it e.g. <code>primeaxis_upload</code></li>
            <li>Add to <code>.env.local</code>:</li>
          </ol>
          <pre className="admin-code-block">{`VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=primeaxis_upload`}</pre>
          <p className="admin-setup-note">
            Restart <code>npm run dev</code> after saving. Uploads are auto-compressed in the browser and optimized (WebP/quality) via Cloudinary on delivery.
          </p>
        </div>
      )}
    </div>
  )
}
