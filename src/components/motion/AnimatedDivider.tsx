import { useRef } from 'react'
import { motion } from 'motion/react'
import { ease } from '../../lib/motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { useReducedMotion } from '../../hooks/useMotionPrefs'

export function AnimatedDivider({
  className = '',
  wide = false,
}: {
  className?: string
  wide?: boolean
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInViewOnce(ref)

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className={`block h-px origin-left bg-gold ${wide ? 'w-full max-w-xs' : 'w-14'} ${className}`}
      initial={false}
      animate={{ scaleX: reduced || seen ? 1 : 0 }}
      transition={{ duration: 0.8, ease }}
    />
  )
}
