import aboutVideoWeb from '../assets/primeaxis_about_video_web.mp4'
import aboutVideoMobile from '../assets/primeaxis_about_video_mobile.mp4'

export const ABOUT_VIDEO_URL = aboutVideoWeb
export const ABOUT_VIDEO_MOBILE_URL = aboutVideoMobile

export function isMobileVideoPreferred() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
}

export function getAboutVideoUrl() {
  return isMobileVideoPreferred() ? ABOUT_VIDEO_MOBILE_URL : ABOUT_VIDEO_URL
}

export function prefetchAboutVideo() {
  if (typeof document === 'undefined') return

  const href = getAboutVideoUrl()
  const existing = document.querySelector(`link[data-about-video-prefetch="${href}"]`)
  if (existing) return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.as = 'video'
  link.href = href
  link.setAttribute('data-about-video-prefetch', href)
  document.head.appendChild(link)
}
