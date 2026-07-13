import { useState } from 'react'
import { uploadProjectImage } from '../../lib/projectImages'

export default function ImageUpload({ label, value, onChange, folder, variant = 'default', showUrlFallback = false }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [urlInput, setUrlInput] = useState('')

  const processFile = async (file) => {
    if (!file) return

    setUploading(true)
    setError('')
    try {
      const url = await uploadProjectImage(file, folder)
      onChange(url)
      setUrlInput('')
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleFile = (event) => {
    processFile(event.target.files?.[0])
    event.target.value = ''
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragOver(false)
    processFile(event.dataTransfer.files?.[0])
  }

  const applyUrl = () => {
    const trimmed = urlInput.trim()
    if (!trimmed) return
    if (!/^https?:\/\/.+/i.test(trimmed)) {
      setError('Enter a valid image URL (https://…)')
      return
    }
    setError('')
    onChange(trimmed)
    setUrlInput('')
  }

  const dropClass = [
    variant === 'compact' ? 'admin-upload-drop admin-upload-drop-compact' : 'admin-upload-drop',
    dragOver ? 'admin-upload-drop-active' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className="admin-upload-field">
      {label && <span className="admin-label-text">{label}</span>}

      {value ? (
        <div className="admin-upload-preview">
          <img src={value} alt={label || 'Upload preview'} />
          <button type="button" className="admin-link-btn" onClick={() => onChange('')}>Remove</button>
        </div>
      ) : (
        <>
          <label
            className={dropClass}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
            <span className="admin-upload-icon">↑</span>
            <span>{uploading ? 'Processing…' : 'Choose from gallery'}</span>
            <span className="admin-upload-hint">Tap to open photos</span>
          </label>

          {showUrlFallback && (
            <div className="admin-upload-url-row">
              <input
                type="url"
                className="admin-input"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Or paste image URL"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), applyUrl())}
              />
              <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={applyUrl}>
                Use URL
              </button>
            </div>
          )}
        </>
      )}

      {error && <p className="admin-form-error">{error}</p>}
    </div>
  )
}
