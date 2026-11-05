import { motion, useScroll, useSpring } from 'motion/react'
import { useReducedMotion } from '../../hooks/useMotionPrefs'

export function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-[60] h-0.5 origin-left bg-gold"
      style={{ scaleX }}
    />
  )
}
