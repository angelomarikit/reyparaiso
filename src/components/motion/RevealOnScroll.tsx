import { useRef, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { ease } from '../../lib/motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { useFinePointer, useReducedMotion } from '../../hooks/useMotionPrefs'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
}

export function RevealOnScroll({ children, className, delay = 0, y = 28, x = 0 }: RevealProps) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInViewOnce(ref)
  const shiftX = fine ? x : 0

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={seen ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x: shiftX }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
