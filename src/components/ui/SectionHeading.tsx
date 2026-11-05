import { AnimatedDivider } from '../motion/AnimatedDivider'
import { SplitTextReveal } from '../motion/SplitTextReveal'
import { RevealOnScroll } from '../motion/RevealOnScroll'

type Props = {
  eyebrow: string
  title: string | readonly string[]
  description?: string
  tone?: 'light' | 'dark'
}

export function SectionHeading({ eyebrow, title, description, tone = 'light' }: Props) {
  const lines = Array.isArray(title) ? title : [title]
  const heading = tone === 'light' ? 'text-warm' : 'text-navy'
  const copy = tone === 'light' ? 'text-mist' : 'text-navy/75'

  return (
    <div className="max-w-3xl">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <AnimatedDivider className="mt-5" />
      <SplitTextReveal
        lines={lines}
        className={`mt-6 font-display text-[clamp(2.15rem,4.8vw,4.4rem)] leading-[1.08] tracking-[-0.02em] ${heading}`}
      />
      {description ? (
        <RevealOnScroll>
          <p className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${copy}`}>{description}</p>
        </RevealOnScroll>
      ) : null}
    </div>
  )
}
