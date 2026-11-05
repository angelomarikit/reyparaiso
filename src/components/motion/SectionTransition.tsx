import type { ReactNode } from 'react'
import { AnimatedDivider } from './AnimatedDivider'

export function SectionTransition({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <div className="mx-auto max-w-7xl px-6 pt-10 md:px-10 lg:px-16">
        <AnimatedDivider wide />
      </div>
      {children}
    </div>
  )
}
