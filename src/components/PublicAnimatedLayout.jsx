import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PAGE_TRANSITION } from '../lib/animationVariants'

export default function PublicAnimatedLayout() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <Outlet />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={PAGE_TRANSITION.initial}
        animate={PAGE_TRANSITION.animate}
        exit={PAGE_TRANSITION.exit}
        transition={PAGE_TRANSITION.transition}
        style={{ width: '100%' }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}
