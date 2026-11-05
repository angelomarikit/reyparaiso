import { useRef } from 'react'
import { motion } from 'motion/react'
import { ease } from '../../lib/motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { useReducedMotion } from '../../hooks/useMotionPrefs'
import { Picture } from '../ui/Picture'

type Props = {
  id: string
  alt: string
  className?: string
  imgClassName?: string
  objectPosition?: string
  width?: number
  height?: number
  direction?: 'up' | 'side'
}

export function ImageReveal({
  id,
  alt,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  objectPosition,
  width,
  height,
  direction = 'up',
}: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInViewOnce(ref)
  const hidden = direction === 'side' ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)'

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={false}
      animate={{ clipPath: reduced || seen ? 'inset(0% 0 0 0)' : hidden }}
      transition={{ duration: 1, ease }}
    >
      <Picture
        id={id}
        alt={alt}
        width={width}
        height={height}
        objectPosition={objectPosition}
        className="block h-full w-full"
        imgClassName={imgClassName}
      />
    </motion.div>
  )
}
