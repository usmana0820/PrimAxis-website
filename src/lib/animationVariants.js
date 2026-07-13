/** Framer Motion — scroll reveal variants (used by Reveal + page transitions) */
export const REVEAL_VARIANTS = {
  'fade-up': {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-top': {
    hidden: { opacity: 0, y: -80 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-bottom': {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
  },
  flip: {
    hidden: { opacity: 0, rotateX: 12, y: 24 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
}

export const REVEAL_TRANSITION = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1],
}

export const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
}
