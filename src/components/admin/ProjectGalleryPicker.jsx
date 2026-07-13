import { useRef, useState } from 'react'
import {
  assignImagesToProject,
  getImageStorageMode,
  uploadProjectImagesBatch,
} from '../../lib/projectImages'

export default function ProjectGalleryPicker({ coverImage, galleryImages, onApply }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')

  const storageMode = getImageStorageMode()

  const openGallery = () => {
    setError('')
    inputRef.current?.click()
  }

  const handleSelect = async (event) => {
    const files = event.target.files
    if (!files?.length) return

    setUploading(true)
    setProgress({ current: 0, total: files.length, fileName: files[0].name })
    setError('')

    try {
      const urls = await uploadProjectImagesBatch(files, {
        onProgress: setProgress,
      })

      const next = assignImagesToProject(coverImage, galleryImages, urls)
      onApply(next)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      setProgress(null)
      event.target.value = ''
    }
  }

  const pct = progress ? Math.round((progress.current / progress.total) * 100) : 0

  return (
    <div className="admin-gallery-picker">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="admin-gallery-picker-input"
        onChange={handleSelect}
        disabled={uploading}
      />

      <button
        type="button"
        className="admin-gallery-picker-btn"
        onClick={openGallery}
        disabled={uploading}
      >
        <span className="admin-gallery-picker-icon" aria-hidden="true">🖼️</span>
        <span className="admin-gallery-picker-text">
          <strong>{uploading ? 'Processing photos…' : 'Choose from Gallery'}</strong>
          <small>
            {uploading && progress
              ? `Image ${progress.current} of ${progress.total} — ${progress.fileName}`
              : storageMode === 'cloudinary'
                ? 'Pick photos — auto-compress, upload to Cloudinary & set in project'
                : 'Pick photos — auto-compress & save directly in project (no Cloudinary needed)'}
          </small>
        </span>
      </button>

      {uploading && (
        <div className="admin-gallery-picker-progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="admin-gallery-picker-progress-bar" style={{ width: `${pct}%` }} />
        </div>
      )}

      {error && <p className="admin-form-error">{error}</p>}
    </div>
  )
}
