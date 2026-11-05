import { profile } from '../../data/profile'
import { ParallaxImage } from '../motion/ParallaxImage'
import { SplitTextReveal } from '../motion/SplitTextReveal'

export function PhotoBand() {
  return (
    <section className="relative min-h-[52vh] overflow-hidden bg-navy" aria-label="Performance statement">
      <ParallaxImage
        id="secret-cafe-set"
        alt="Rey playing acoustic guitar outside Secret Cafe at night"
        width={2048}
        height={1536}
        objectPosition="32% 42%"
        className="absolute inset-0 h-full"
        imgClassName="h-full w-full object-cover"
        strength={28}
      />
      <div className="absolute inset-0 bg-navy/55" />
      <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-5xl items-center px-6 py-20 md:px-10">
        <SplitTextReveal
          lines={profile.bandTitle}
          className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] text-warm"
        />
      </div>
    </section>
  )
}
