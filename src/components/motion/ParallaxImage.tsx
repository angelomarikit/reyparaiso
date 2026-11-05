import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Picture } from '../ui/Picture'
import { useFinePointer, useReducedMotion } from '../../hooks/useMotionPrefs'

type Props = {
  id: string
  alt: string
  className?: string
  imgClassName?: string
  objectPosition?: string
  strength?: number
  priority?: boolean
  width?: number
  height?: number
}

export function ParallaxImage({
  id,
  alt,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  objectPosition,
  strength = 36,
  priority = false,
  width,
  height,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const allow = fine && !reduced
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={allow ? { y } : undefined} className={allow ? 'h-[118%] w-full' : 'h-full w-full'}>
        <Picture
          id={id}
          alt={alt}
          priority={priority}
          width={width}
          height={height}
          objectPosition={objectPosition}
          className="block h-full w-full"
          imgClassName={imgClassName}
        />
      </motion.div>
    </div>
  )
}
