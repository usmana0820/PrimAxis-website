import { animate, stagger } from '@motionone/dom'

const HOVER_SELECTOR = '.hero-btn-primary, .hero-btn-outline, .cta-btn-primary, .cta-btn-secondary, .portfolio-view-details-btn'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Motion One — delegated hover lift on primary CTAs */
export function setupMotionOneGlobal(root = document) {
  if (prefersReducedMotion()) return () => {}

  const onEnter = (event) => {
    const el = event.target.closest?.(HOVER_SELECTOR)
    if (!el) return
    animate(el, { scale: 1.03, y: -2 }, { duration: 0.22, easing: 'ease-out' })
  }

  const onLeave = (event) => {
    const el = event.target.closest?.(HOVER_SELECTOR)
    if (!el) return
    animate(el, { scale: 1, y: 0 }, { duration: 0.22, easing: 'ease-out' })
  }

  root.addEventListener('mouseover', onEnter)
  root.addEventListener('mouseout', onLeave)

  return () => {
    root.removeEventListener('mouseover', onEnter)
    root.removeEventListener('mouseout', onLeave)
  }
}

/** Motion One — stagger section divider beams */
export function animateSectionDividers(root = document) {
  if (prefersReducedMotion()) return

  const beams = root.querySelectorAll('.section-divider-beam')
  if (!beams.length) return

  animate(
    beams,
    { opacity: [0, 1], scaleX: [0.3, 1] },
    { duration: 0.9, delay: stagger(0.08), easing: 'ease-out' }
  )
}
