import { profile } from '../../data/profile'
import { useReducedMotion } from '../../hooks/useMotionPrefs'
import { AnimatedDivider } from '../motion/AnimatedDivider'
import { ParallaxImage } from '../motion/ParallaxImage'
import { SplitTextReveal } from '../motion/SplitTextReveal'
import { Button } from '../ui/Button'
import { RevealOnScroll } from '../motion/RevealOnScroll'

export function BookingCTA() {
  const reduced = useReducedMotion()

  return (
    <section className="relative min-h-[88svh] overflow-hidden bg-navy text-warm">
      <ParallaxImage
        id="string-lights"
        alt="Rey performing with an acoustic guitar under string lights at night"
        width={1024}
        height={1013}
        objectPosition="center 22%"
        className="absolute inset-0 h-full"
        imgClassName="h-full w-full object-cover"
        strength={32}
      />
      <div className="absolute inset-0 bg-navy/60" />
      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-5xl flex-col justify-center px-6 py-24 md:px-10">
        <AnimatedDivider />
        <SplitTextReveal
          as="h2"
          lines={profile.bookingTitle}
          className="mt-6 font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.02] tracking-[-0.03em]"
        />
        <RevealOnScroll>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-warm/85 md:text-lg">{profile.bookingCopy}</p>
        </RevealOnScroll>
        <RevealOnScroll delay={reduced ? 0 : 0.12} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="#contact" magnetic>
            Book Rey Now
          </Button>
          <Button href="mailto:reyparaiso78@gmail.com" variant="ghost">
            Send an Email
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  )
}
