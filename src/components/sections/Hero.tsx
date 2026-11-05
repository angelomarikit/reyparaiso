import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import { ease } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useMotionPrefs'
import { Button } from '../ui/Button'

const heroPoster = '/videos/hero-poster.webp'
const heroVideo = '/videos/hero.mp4'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -48])
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduced) return
    video.muted = true
    const play = video.play()
    if (play) play.catch(() => undefined)
  }, [reduced])

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-navy">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.05, ease }}
      >
        <img
          src={heroPoster}
          alt={reduced ? 'Rey Paraiso singing into a microphone while playing acoustic guitar' : ''}
          width={1916}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          fetchPriority="high"
          decoding="async"
        />
        {reduced ? null : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
            autoPlay
            muted
            loop
            playsInline
            poster={heroPoster}
            preload="auto"
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-navy/20 lg:bg-[linear-gradient(90deg,rgba(16,27,43,0.88)_0%,rgba(16,27,43,0.62)_22%,rgba(16,27,43,0.18)_42%,transparent_58%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-navy"
        initial={reduced ? { opacity: 0 } : { opacity: 0.45 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.9, ease }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-navy lg:h-16" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-6 pt-28 pb-16 md:px-10 md:pb-20 lg:mx-0 lg:max-w-[34rem] lg:justify-center lg:px-12"
        style={reduced ? undefined : { y: textY, opacity: textOpacity }}
      >
        <motion.p
          className="text-[0.72rem] font-semibold tracking-[0.22em] text-gold uppercase lg:tracking-[0.16em]"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
        >
          {profile.eyebrowHero}
        </motion.p>

        <h1 className="mt-5 max-w-[12ch] font-display text-[clamp(2.7rem,4.6vw,4.75rem)] leading-[0.98] tracking-[-0.03em] text-warm lg:max-w-none">
          <span className="sr-only">{profile.headline.join(' ')}</span>
          <span aria-hidden="true">
            {profile.headline.map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.85, delay: 0.48 + index * 0.12, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-warm/85 md:text-lg"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
        >
          {profile.heroCopy}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease }}
        >
          <Button href="#contact" magnetic className="whitespace-nowrap">
            Book Rey for an Event
          </Button>
          <Button href="#gallery" variant="ghost" className="whitespace-nowrap">
            Explore Performances
          </Button>
        </motion.div>

        <motion.p
          className="mt-8 inline-flex items-center gap-2 text-sm text-mist"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.25, ease }}
        >
          <MapPin aria-hidden="true" className="h-4 w-4 text-gold" />
          Based in General Trias City, Cavite, Philippines.
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.35, ease }}
        aria-hidden="true"
      >
        <motion.span
          className="mx-auto block h-14 w-px origin-top bg-gold"
          initial={reduced ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease }}
        />
      </motion.div>
    </section>
  )
}
