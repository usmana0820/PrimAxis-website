import { useEffect } from 'react'
import { initAos, useAosRefresh } from '../hooks/useAos'
import { animateSectionDividers, setupMotionOneGlobal } from '../lib/motionOneEffects'

export default function AnimationProvider({ children }) {
  useAosRefresh()

  useEffect(() => {
    initAos()
    const cleanupMotion = setupMotionOneGlobal()
    const frame = requestAnimationFrame(() => animateSectionDividers())

    return () => {
      cancelAnimationFrame(frame)
      cleanupMotion()
    }
  }, [])

  return children
}
