import { useRef, useCallback, useEffect, useState } from 'react'

export default function TiltCard({
  children,
  className = '',
  intensity = 14,
  scale = 1.03,
  glare = true,
  disabled = false,
}) {
  const wrapRef = useRef(null)
  const frameRef = useRef(null)
  const [touchDevice, setTouchDevice] = useState(false)
  const stateRef = useRef({ rx: 0, ry: 0, sx: 1, sy: 1, gx: 50, gy: 50, hover: false })
  const isDisabled = disabled || touchDevice

  useEffect(() => {
    setTouchDevice(window.matchMedia('(hover: none)').matches)
  }, [])

  const applyTransform = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    const s = stateRef.current
    el.style.transform = `perspective(1000px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) scale3d(${s.sx}, ${s.sy}, 1)`
    const glareEl = el.querySelector('.tilt-card-glare')
    if (glareEl) {
      glareEl.style.opacity = s.hover ? '1' : '0'
      glareEl.style.background = `radial-gradient(circle at ${s.gx}% ${s.gy}%, rgba(255,255,255,0.28) 0%, rgba(103,232,249,0.08) 28%, transparent 58%)`
    }
  }, [])

  const schedule = useCallback(() => {
    if (frameRef.current) return
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null
      applyTransform()
    })
  }, [applyTransform])

  const onMove = useCallback((event) => {
    if (isDisabled) return
    const el = wrapRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const px = x / rect.width - 0.5
    const py = y / rect.height - 0.5

    stateRef.current = {
      rx: -py * intensity,
      ry: px * intensity,
      sx: scale,
      sy: scale,
      gx: (x / rect.width) * 100,
      gy: (y / rect.height) * 100,
      hover: true,
    }
    schedule()
  }, [isDisabled, intensity, scale, schedule])

  const onLeave = useCallback(() => {
    stateRef.current = { rx: 0, ry: 0, sx: 1, sy: 1, gx: 50, gy: 50, hover: false }
    schedule()
  }, [schedule])

  return (
    <div
      ref={wrapRef}
      className={`tilt-card ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {glare && <div className="tilt-card-glare" aria-hidden="true" />}
      <div className="tilt-card-inner">
        {children}
      </div>
    </div>
  )
}
