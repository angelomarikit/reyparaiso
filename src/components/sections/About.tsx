import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { profile } from '../../data/profile'
import { AnimatedDivider } from '../motion/AnimatedDivider'
import { ImageReveal } from '../motion/ImageReveal'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { SectionHeading } from '../ui/SectionHeading'
import { useFinePointer, useReducedMotion } from '../../hooks/useMotionPrefs'

function AboutPortrait() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [18, -18])

  return (
    <div ref={ref} className="relative aspect-[4/5] overflow-hidden">
      <motion.div className="absolute -inset-y-6 inset-x-0" style={fine && !reduced ? { y } : undefined}>
        <ImageReveal
          id="portrait-chair"
          alt="Rey seated outdoors, smiling toward the camera"
          width={960}
          height={1177}
          objectPosition="center 28%"
          className="h-full"
          imgClassName="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-navy text-warm">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:px-10 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-5">
          <AboutPortrait />
        </div>
        <div className="lg:col-span-7">
          <SectionHeading eyebrow={profile.aboutEyebrow} title={profile.aboutTitle} tone="light" />
          <div className="mt-8 space-y-5">
            {profile.about.map((paragraph, index) => (
              <RevealOnScroll key={paragraph.slice(0, 24)} delay={0.08 * index}>
                <p className="text-base leading-relaxed text-mist md:text-lg">{paragraph}</p>
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll delay={0.28} className="mt-10">
            <blockquote className="border-l border-gold pl-6">
              <p className="font-display text-2xl leading-snug text-warm italic md:text-[1.7rem]">
                “{profile.quote}”
              </p>
            </blockquote>
          </RevealOnScroll>
          <AnimatedDivider className="mt-12" wide />
        </div>
      </div>
    </section>
  )
}
