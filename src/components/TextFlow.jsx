import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { usePageReady } from '../context/PageReadyContext'
import {
  TEXT_FLOW_CHAR,
  TEXT_FLOW_CHAR_CONTAINER,
  TEXT_FLOW_CONTAINER,
  TEXT_FLOW_ITEM,
} from '../lib/animationVariants'

const MOTION_TAGS = {
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  div: motion.div,
}

function splitWords(text) {
  return String(text).split(/\s+/).filter(Boolean)
}

function splitChars(text) {
  return String(text).split('')
}

export default function TextFlow({
  text = '',
  as = 'span',
  className = '',
  mode = 'words',
  delay = 0,
  eager = false,
  style,
}) {
  const pageReady = usePageReady()
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: eager ? 0 : 0.2,
    margin: eager ? '0px' : '0px 0px -8% 0px',
  })
  const isVisible = pageReady && (eager || isInView)
  const MotionTag = MOTION_TAGS[as] || motion.span
  const isChars = mode === 'chars'
  const containerVariants = isChars ? TEXT_FLOW_CHAR_CONTAINER : TEXT_FLOW_CONTAINER
  const itemVariants = isChars ? TEXT_FLOW_CHAR : TEXT_FLOW_ITEM

  if (reduceMotion || !text) {
    const Tag = as
    return <Tag className={className} style={style}>{text}</Tag>
  }

  if (isChars) {
    return (
      <MotionTag
        ref={ref}
        className={`text-flow ${className}`.trim()}
        style={{ ...style, perspective: 700 }}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={containerVariants}
        transition={{ delay: delay / 1000 }}
        aria-label={text}
      >
        {splitChars(text).map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="text-flow-char"
            variants={itemVariants}
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </MotionTag>
    )
  }

  const words = splitWords(text)

  return (
    <MotionTag
      ref={ref}
      className={`text-flow ${className}`.trim()}
      style={{ ...style, perspective: 700 }}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      transition={{ delay: delay / 1000 }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="text-flow-word-wrap">
          <motion.span className="text-flow-word" variants={itemVariants}>
            {word}
          </motion.span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </MotionTag>
  )
}
