import type { ReactNode } from 'react'
import { education, hospitalityVenues, languages, performanceNotes, profile, teachingPlaces } from '../../data/profile'
import { ImageReveal } from '../motion/ImageReveal'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { SectionTransition } from '../motion/SectionTransition'
import { SectionHeading } from '../ui/SectionHeading'
import { useFinePointer, useReducedMotion } from '../../hooks/useMotionPrefs'

const blocks = [
  {
    title: 'Performance & Hospitality',
    image: 'venue-hall',
    alt: 'Rey smiling with an acoustic guitar during a venue performance',
    width: 1875,
    height: 1822,
    position: 'center 32%',
  },
  {
    title: 'Education & Leadership',
    image: 'classroom',
    alt: 'Rey standing with colleagues in a classroom',
    width: 960,
    height: 939,
    position: '58% 30%',
  },
  {
    title: 'Community & Ministry',
    image: 'christmas-host',
    alt: 'Rey hosting a community Christmas gathering',
    width: 824,
    height: 914,
    position: 'center 28%',
  },
] as const

export function Journey() {
  const reduced = useReducedMotion()
  const fine = useFinePointer()

  return (
    <SectionTransition className="scroll-mt-20 bg-ivory text-navy">
      <section id="journey" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-16 md:px-10 lg:border-l lg:border-gold/40 lg:px-16 lg:py-28">
        <SectionHeading eyebrow={profile.journeyEyebrow} title={profile.journeyTitle} tone="dark" />

        <div className="mt-16 space-y-20">
          <JourneyBlock
            title={blocks[0].title}
            image={blocks[0].image}
            alt={blocks[0].alt}
            width={blocks[0].width}
            height={blocks[0].height}
            position={blocks[0].position}
            reverse={false}
            x={reduced || !fine ? 0 : -28}
          >
            <p className="leading-relaxed text-navy/75">
              Rey’s performance life covers live singing, acoustic sets, busking, and hosting — in cafés, food parks, community programs, and church and school events.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-navy/80">
              {performanceNotes.map((note) => (
                <li key={note} className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
                  {note}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-navy/70">
              Hospitality and venue experience includes {hospitalityVenues.join(', ')}.
            </p>
            <div className="mt-6 max-w-[220px]">
              <ImageReveal
                id="early-guitar"
                alt="An early photograph of Rey playing guitar"
                width={716}
                height={380}
                className="w-full"
                imgClassName="h-auto w-full object-cover"
              />
            </div>
          </JourneyBlock>

          <JourneyBlock
            title={blocks[1].title}
            image={blocks[1].image}
            alt={blocks[1].alt}
            width={blocks[1].width}
            height={blocks[1].height}
            position={blocks[1].position}
            reverse
            x={reduced || !fine ? 0 : 28}
          >
            <ul className="space-y-5">
              {education.map((item) => (
                <li key={item.credential}>
                  <p className="font-display text-2xl leading-tight">{item.credential}</p>
                  <p className="mt-1 text-navy/75">{item.school}</p>
                  <p className="text-sm tracking-[0.08em] text-gold uppercase">{item.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-navy/75">
              Teaching-related experience includes {teachingPlaces.join(' and ')}.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy/75">
              Vice President — Amore Student Government, 2026–2027.
            </p>
          </JourneyBlock>

          <JourneyBlock
            title={blocks[2].title}
            image={blocks[2].image}
            alt={blocks[2].alt}
            width={blocks[2].width}
            height={blocks[2].height}
            position={blocks[2].position}
            reverse={false}
            x={0}
          >
            <p className="leading-relaxed text-navy/75">
              Ministry and community life remain part of the same story as the music. Rey is involved with FEED THE HUNGRY AND HELP THE NEEDY CHRISTIAN CHURCH.
            </p>
            <p className="mt-6 text-[0.72rem] font-semibold tracking-[0.18em] text-gold uppercase">Languages</p>
            <p className="mt-2 text-navy/80">{languages.join(', ')}.</p>
          </JourneyBlock>
        </div>
      </section>
    </SectionTransition>
  )
}

function JourneyBlock({
  title,
  image,
  alt,
  width,
  height,
  position,
  reverse,
  x,
  children,
}: {
  title: string
  image: string
  alt: string
  width: number
  height: number
  position: string
  reverse: boolean
  x: number
  children: ReactNode
}) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <RevealOnScroll x={x} className={reverse ? 'lg:order-2' : ''}>
        <ImageReveal
          id={image}
          alt={alt}
          width={width}
          height={height}
          objectPosition={position}
          direction={reverse ? 'side' : 'up'}
          className="aspect-[4/5] sm:aspect-[5/4]"
          imgClassName="h-full w-full object-cover"
        />
      </RevealOnScroll>
      <RevealOnScroll x={reverse ? -x : x} className={reverse ? 'lg:order-1' : ''}>
        <h3 className="font-display text-[clamp(2rem,3vw,3rem)] leading-tight">{title}</h3>
        <div className="mt-5">{children}</div>
      </RevealOnScroll>
    </div>
  )
}
