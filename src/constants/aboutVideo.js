import aboutVideo from '../assets/primeaxis_about_video_web.mp4'

export const ABOUT_VIDEO_URL = aboutVideo

export function prefetchAboutVideo() {
  if (typeof document === 'undefined') return

  const existing = document.querySelector('link[data-about-video-prefetch]')
  if (existing) return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.as = 'video'
  link.href = ABOUT_VIDEO_URL
  link.setAttribute('data-about-video-prefetch', 'true')
  document.head.appendChild(link)
}
