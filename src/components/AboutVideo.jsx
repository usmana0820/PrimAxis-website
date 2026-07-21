import { useRef, useState } from 'react'
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

export default function AboutVideo({
  className = '',
  wrapperClassName = '',
  aspect = '4/3',
  showMute = true,
  stats = [],
  label = 'PrimeAxis Technologies team at work',
}) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const aspectClass = aspect === '16/9' ? 'about-video-wrap--16-9' : 'about-video-wrap--4-3'
  const visibleStats = stats.slice(0, 3)

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    if (videoRef.current) videoRef.current.muted = next
  }

  return (
    <div className={`about-video-wrap ${aspectClass}${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
      <video
        ref={videoRef}
        src={aboutVideo}
        poster={aboutPoster}
        className={`about-video${className ? ` ${className}` : ''}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={label}
      />
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
      {showMute && (
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
