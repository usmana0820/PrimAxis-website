const MOBILE_PORTRAIT_TECH = [
  'flutter',
  'swift',
  'android',
  'kotlin',
  'java',
  'react native',
]

/** True when project should use 9:16 preview (mobile app stack). */
export function isMobilePortraitProject(study) {
  if (!study) return false

  const category = String(study.category || '').toLowerCase()
  if (category.includes('mobile')) return true

  const techList = [...(study.tech || []), ...(study.technologies || [])]
  return techList.some((item) => {
    const lower = String(item).toLowerCase()
    return MOBILE_PORTRAIT_TECH.some((key) => lower.includes(key))
  })
}

/** @returns {'portrait' | 'landscape'} */
export function getSolutionPreviewAspect(study) {
  return isMobilePortraitProject(study) ? 'portrait' : 'landscape'
}

export function getProjectCoverImage(study) {
  if (!study) return ''
  return study.coverImage || study.galleryImages?.[0] || ''
}
