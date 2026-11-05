import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { achievements } from '../../data/achievements'
import { profile } from '../../data/profile'
import { AnimatedDivider } from '../motion/AnimatedDivider'
import { SplitTextReveal } from '../motion/SplitTextReveal'
import { SectionHeading } from '../ui/SectionHeading'
import { useReducedMotion } from '../../hooks/useMotionPrefs'
import { RevealOnScroll } from '../motion/RevealOnScroll'

gsap.registerPlugin(ScrollTrigger)

export function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [seen, setSeen] = useState<string[]>([])

  useEffect(() => {
    if (reduced) return
    const line = lineRef.current
    const section = sectionRef.current
    if (!line || !section) return

    const context = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'bottom 70%',
            scrub: 0.35,
          },
        },
      )
    }, section)

    return () => context.revert()
  }, [reduced])

  useEffect(() => {
    const nodes = sectionRef.current?.querySelectorAll<HTMLElement>('[data-year]')
    if (!nodes) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const year = entry.target.getAttribute('data-year')
          if (!year) return
          setSeen((current) => (current.includes(year) ? current : [...current, year]))
        })
      },
      { threshold: 0.55 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="achievements" ref={sectionRef} className="scroll-mt-20 bg-navy text-warm">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeading
          eyebrow={profile.achievementsEyebrow}
          title={profile.achievementsTitle}
          description={profile.achievementsCopy}
        />

        <div className="relative mt-16 pl-10 md:pl-16">
          <div className="absolute top-0 bottom-0 left-3 w-px bg-white/15 md:left-5" aria-hidden="true">
            <div
              ref={lineRef}
              className={`h-full w-full origin-top bg-gold ${reduced ? 'scale-y-100' : 'scale-y-0'}`}
            />
          </div>

          <ol className="space-y-8">
            {achievements.map((item) => {
              const active = seen.includes(item.year)
              return (
                <li key={item.year} data-year={item.year} className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute top-7 -left-10 h-3.5 w-3.5 rounded-full border md:-left-16 ${
                      active ? 'border-gold bg-gold' : 'border-gold/50 bg-navy'
                    }`}
                  />
                  <RevealOnScroll>
                    <article
                      className={`max-w-xl border px-6 py-6 md:px-8 ${
                        item.champion ? 'border-gold/70 bg-deep' : 'border-white/10 bg-deep/60'
                      }`}
                    >
                      <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-gold">{item.year}</p>
                      <h3 className="mt-3 font-display text-3xl leading-tight">{item.title}</h3>
                      <p className="mt-2 text-mist">{item.detail}</p>
                    </article>
                  </RevealOnScroll>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-20">
          <AnimatedDivider wide />
          <SplitTextReveal
            lines={[profile.bridgeTitle]}
            className="mt-8 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.08] text-warm"
          />
        </div>
      </div>
    </section>
  )
}
