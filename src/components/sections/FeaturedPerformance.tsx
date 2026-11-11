import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { featuredPerformanceVideo, hasFeaturedVideo } from '../../data/newCollections'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { SectionHeading } from '../ui/SectionHeading'

export function FeaturedPerformance() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [showSoundHint, setShowSoundHint] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [])

  if (!hasFeaturedVideo || !featuredPerformanceVideo) return null
  const clip = featuredPerformanceVideo

  async function togglePlay(withSound = false) {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      if (withSound) {
        el.muted = false
        setMuted(false)
        setShowSoundHint(false)
      }
      try {
        await el.play()
      } catch {
        // autoplay policies — user must interact again
      }
    } else {
      el.pause()
    }
  }

  function toggleMute() {
    const el = videoRef.current
    if (!el) return
    const next = !el.muted
    el.muted = next
    setMuted(next)
    if (!next) setShowSoundHint(false)
  }

  return (
    <section id="featured-video" className="scroll-mt-20 bg-navy text-warm">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Listen In"
            title={[clip.title, 'Watch & Hear Rey']}
            description={clip.description}
          />
        </RevealOnScroll>

        <div className="relative mx-auto mt-10 w-full max-w-md md:max-w-lg">
          {showSoundHint ? (
            <p className="mb-4 max-w-md text-xs leading-relaxed text-mist">
              Tap <span className="text-gold">Play with sound</span> to hear Rey’s voice. Browsers require a tap before audio plays.
            </p>
          ) : null}

          <div className="overflow-hidden bg-black shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <video
              ref={videoRef}
              className="mx-auto block max-h-[min(78svh,56rem)] w-full object-contain"
              playsInline
              preload="metadata"
              poster={clip.poster}
              controls
              muted={muted}
            >
              <source src={clip.src} type="video/mp4" />
            </video>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-deep p-4 md:p-5">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => togglePlay(false)}
                className="inline-flex min-h-11 items-center gap-2 bg-gold px-5 text-[0.72rem] font-semibold tracking-[0.16em] text-navy uppercase"
              >
                {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
                {playing ? 'Pause' : 'Play'}
              </button>
              <button
                type="button"
                onClick={() => togglePlay(true)}
                className="inline-flex min-h-11 items-center gap-2 border border-warm/35 px-5 text-[0.72rem] font-semibold tracking-[0.16em] text-warm uppercase transition-colors hover:border-gold hover:text-gold"
              >
                <Volume2 className="h-4 w-4" aria-hidden="true" />
                Play with sound
              </button>
            </div>
            <button
              type="button"
              onClick={toggleMute}
              aria-pressed={!muted}
              className="inline-flex min-h-11 items-center gap-2 border border-warm/25 px-4 text-[0.72rem] tracking-[0.14em] text-warm uppercase transition-colors hover:border-gold hover:text-gold"
            >
              {muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
              {muted ? 'Sound off' : 'Sound on'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
