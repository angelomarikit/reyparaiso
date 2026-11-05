import { useRef } from 'react'
import { motion } from 'motion/react'
import { ease } from '../../lib/motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { useReducedMotion } from '../../hooks/useMotionPrefs'

type SplitProps = {
  lines: readonly string[]
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  delay?: number
}

export function SplitTextReveal({ lines, className, as = 'h2', delay = 0 }: SplitProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLHeadingElement>(null)
  const seen = useInViewOnce(ref)
  const Tag = motion[as]
  const text = lines.join(' ')

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{text}</Plain>
  }

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {lines.map((line, index) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={false}
              animate={seen ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.8, delay: delay + index * 0.12, ease }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
