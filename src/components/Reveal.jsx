import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { usePageReady } from '../context/PageReadyContext'
import { REVEAL_TRANSITION, REVEAL_VARIANTS } from '../lib/animationVariants'

const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  li: motion.li,
  span: motion.span,
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  as = 'div',
  eager = false,
}) {
  const pageReady = usePageReady()
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: eager ? 0 : 0.12,
    margin: eager ? '0px' : '0px 0px -6% 0px',
  })
  const MotionTag = MOTION_TAGS[as] || motion.div
  const variants = REVEAL_VARIANTS[variant] || REVEAL_VARIANTS['fade-up']
  const isVisible = pageReady && (eager || isInView)

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ ...REVEAL_TRANSITION, delay: delay / 1000 }}
      style={variant === 'flip' ? { perspective: 600 } : undefined}
    >
      {children}
    </MotionTag>
  )
}
