import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useMotionValue } from 'motion/react'
import { ease } from '../../lib/motion'
import { useFinePointer, useReducedMotion } from '../../hooks/useMotionPrefs'

type ButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'gold' | 'ghost' | 'line' | 'navy'
  magnetic?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

const variants = {
  gold: 'bg-gold text-navy hover:bg-gold-soft',
  ghost: 'border border-warm/40 text-warm hover:border-gold hover:text-gold',
  line: 'border border-navy/25 bg-transparent text-navy hover:border-gold',
  navy: 'bg-navy text-warm hover:bg-deep',
}

export function Button({
  children,
  href,
  onClick,
  variant = 'gold',
  magnetic = false,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const pull = magnetic && fine && !reduced

  function onMove(event: React.MouseEvent) {
    if (!pull || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    x.set(Math.max(-8, Math.min(8, dx * 0.18)))
    y.set(Math.max(-6, Math.min(6, dy * 0.18)))
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  const classes = `inline-flex min-h-11 items-center justify-center gap-2 px-6 text-[0.72rem] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${className}`

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        onClick={onClick}
        className={classes}
        style={{ x, y }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        transition={{ duration: 0.2, ease }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      transition={{ duration: 0.2, ease }}
    >
      {children}
    </motion.button>
  )
}
