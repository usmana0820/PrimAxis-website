const MAX_UPLOAD_BYTES = 10 * 1024 * 1024
const MAX_WIDTH = 1920
const JPEG_QUALITY = 0.85

export function isCloudinaryConfigured() {
  return Boolean(
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim() &&
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim()
  )
}

/** Inject auto format + quality transforms into Cloudinary delivery URLs */
export function optimizeCloudinaryUrl(url) {
  if (!url || !url.includes('res.cloudinary.com')) return url
  if (url.includes('/upload/f_auto') || url.includes('/upload/q_auto')) return url
  return url.replace('/upload/', '/upload/f_auto,q_auto/')
}

/** Resize & compress large images in the browser before upload */
export async function prepareImageForUpload(file) {
  if (!file.type.startsWith('image/')) return file
  if (file.size <= 500_000) return file

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_WIDTH / bitmap.width)
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
  })

  if (!blob || blob.size >= file.size) return file

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'upload'
  return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' })
}

export async function uploadToCloudinary(file, folder = 'primeaxis/projects') {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim()
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim()

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env.local, then restart the dev server.')
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error('Image must be 10MB or smaller.')
  }

  const prepared = await prepareImageForUpload(file)

  const formData = new FormData()
  formData.append('file', prepared)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', folder)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || 'Image upload failed')
  }

  const data = await response.json()
  return optimizeCloudinaryUrl(data.secure_url)
}
