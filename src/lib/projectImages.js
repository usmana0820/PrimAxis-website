import {
  isCloudinaryConfigured,
  uploadToCloudinary,
} from './cloudinary'

const LOCAL_MAX_WIDTH = 1000
const LOCAL_QUALITY = 0.72
const LOCAL_TARGET_BYTES = 140_000

export function getImageStorageMode() {
  return isCloudinaryConfigured() ? 'cloudinary' : 'local'
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/** Compress image in-browser and return a data URL for Firestore (no Cloudinary needed) */
async function compressToDataUrl(file) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (PNG or JPG).')
  }

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, LOCAL_MAX_WIDTH / bitmap.width)
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  let quality = LOCAL_QUALITY
  let dataUrl = ''

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', quality)
    })

    if (!blob) throw new Error('Could not compress image.')

    dataUrl = await blobToDataUrl(blob)
    if (blob.size <= LOCAL_TARGET_BYTES || quality <= 0.45) break
    quality -= 0.08
  }

  return dataUrl
}

export async function uploadProjectImage(file, folder = 'primeaxis/projects') {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image must be 10MB or smaller.')
  }

  if (isCloudinaryConfigured()) {
    return uploadToCloudinary(file, folder)
  }

  return compressToDataUrl(file)
}

export async function uploadProjectImagesBatch(files, { folder = 'primeaxis/projects', onProgress } = {}) {
  const imageFiles = [...files].filter((file) => file.type.startsWith('image/'))
  if (!imageFiles.length) {
    throw new Error('No image files selected.')
  }

  const urls = []
  for (let i = 0; i < imageFiles.length; i += 1) {
    onProgress?.({
      current: i + 1,
      total: imageFiles.length,
      fileName: imageFiles[i].name,
    })
    const url = await uploadProjectImage(imageFiles[i], folder)
    urls.push(url)
  }

  return urls
}

/** Map uploaded URLs into cover + gallery fields (first image → cover if empty) */
export function assignImagesToProject(coverImage, galleryImages, urls) {
  let cover = coverImage || ''
  let gallery = [...galleryImages]
  let index = 0

  if (!cover && index < urls.length) {
    cover = urls[index]
    index += 1
  }

  while (index < urls.length) {
    const emptySlot = gallery.findIndex((url) => !url)
    if (emptySlot >= 0) {
      gallery[emptySlot] = urls[index]
    } else {
      gallery.push(urls[index])
    }
    index += 1
  }

  return { coverImage: cover, galleryImages: gallery }
}

export function estimateImagePayloadBytes(coverImage, galleryImages = []) {
  const all = [coverImage, ...galleryImages].filter(Boolean)
  return all.reduce((sum, url) => sum + (typeof url === 'string' ? url.length : 0), 0)
}
