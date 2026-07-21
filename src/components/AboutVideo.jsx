import { useCallback, useEffect, useRef, useState } from 'react'
import aboutVideo from '../assets/primeaxis_about_video.mp4'
import aboutPoster from '../assets/aboutsection.jpg'

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H3v6h3l5 4V5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 9l4 4m0-4l-4 4" />
    </svg>
  )
}

function UnmuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H3v6h3l5 4V5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 8.5a5 5 0 010 7m2.5-9.5a8.5 8.5 0 010 12" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v14.72a1 1 0 001.5.86l11.04-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
    </svg>
  )
}

function isSlowConnection() {
  if (typeof navigator === 'undefined') return false

  const connection =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection

  if (!connection) return false
  if (connection.saveData) return true

  return ['slow-2g', '2g'].includes(connection.effectiveType)
}

export default function AboutVideo({
  className = '',
  wrapperClassName = '',
  aspect = '4/3',
  showMute = true,
  stats = [],
  label = 'PrimeAxis Technologies team at work',
}) {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [inView, setInView] = useState(false)
  const [videoSrc, setVideoSrc] = useState(null)
  const [posterOnly, setPosterOnly] = useState(false)
  const [buffering, setBuffering] = useState(false)
  const [failed, setFailed] = useState(false)
  const aspectClass = aspect === '16/9' ? 'about-video-wrap--16-9' : 'about-video-wrap--4-3'
  const visibleStats = stats.slice(0, 3)
  const showPoster = !videoSrc || failed || (posterOnly && !videoSrc)
  const showPlayPrompt = posterOnly && !failed

  useEffect(() => {
    setPosterOnly(isSlowConnection())
  }, [])

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { rootMargin: '160px', threshold: 0.12 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || posterOnly || failed) return
    setVideoSrc(aboutVideo)
  }, [inView, posterOnly, failed])

  const tryPlay = useCallback(async () => {
    const video = videoRef.current
    if (!video || !videoSrc) return

    try {
      video.muted = muted
      await video.play()
    } catch {
      // Autoplay may be blocked until user interaction.
    }
  }, [muted, videoSrc])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoSrc) return undefined

    const onCanPlay = () => {
      setBuffering(false)
      tryPlay()
    }

    const onWaiting = () => setBuffering(true)
    const onPlaying = () => setBuffering(false)

    const onError = () => {
      setFailed(true)
      setVideoSrc(null)
      setBuffering(false)
    }

    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('waiting', onWaiting)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('error', onError)

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      onCanPlay()
    }

    return () => {
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('waiting', onWaiting)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('error', onError)
    }
  }, [tryPlay, videoSrc])

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    if (videoRef.current) videoRef.current.muted = next
  }

  const startVideo = () => {
    setPosterOnly(false)
    setFailed(false)
    setInView(true)
    setVideoSrc(aboutVideo)
  }

  const wrapClasses = [
    'about-video-wrap',
    aspectClass,
    buffering ? 'about-video-wrap--buffering' : '',
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(' ')

  const mediaClassName = ['about-video', className].filter(Boolean).join(' ')

  return (
    <div ref={wrapRef} className={wrapClasses}>
      {showPoster ? (
        <img src={aboutPoster} alt={label} className={`${mediaClassName} about-video-poster`} />
      ) : (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={aboutPoster}
          className={mediaClassName}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        />
      )}

      {buffering && !showPoster && (
        <div className="about-video-buffer" aria-hidden="true">
          <img src={aboutPoster} alt="" className="about-video-buffer-img" />
        </div>
      )}

      {showPlayPrompt && (
        <button
          type="button"
          className="about-video-play-btn"
          onClick={startVideo}
          aria-label="Play team video"
        >
          <span className="about-video-play-icon">
            <PlayIcon />
          </span>
          <span className="about-video-play-text">Play video</span>
        </button>
      )}

      {visibleStats.length > 0 && (
        <div className="about-video-stats" aria-hidden="true">
          {visibleStats.map((stat) => (
            <div key={stat.label} className="about-video-stat">
              <span className="about-video-stat-value">{stat.value}</span>
              <span className="about-video-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {showMute && videoSrc && !failed && (
        <button
          type="button"
          className="about-video-mute-btn"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          aria-pressed={!muted}
        >
          {muted ? <MuteIcon /> : <UnmuteIcon />}
        </button>
      )}
    </div>
  )
}
