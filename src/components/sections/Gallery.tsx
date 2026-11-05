import { useState } from 'react'
import { Expand } from 'lucide-react'
import { motion } from 'motion/react'
import { gallery, galleryFilters, isWide, type GalleryFilter } from '../../data/gallery'
import { profile } from '../../data/profile'
import { ease } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useMotionPrefs'
import { GalleryLightbox } from '../ui/GalleryLightbox'
import { Picture } from '../ui/Picture'
import { SectionHeading } from '../ui/SectionHeading'

export function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const [open, setOpen] = useState<number | null>(null)
  const reduced = useReducedMotion()
  const items = gallery.filter((item) => filter === 'all' || item.category === filter)

  function choose(next: GalleryFilter) {
    setFilter(next)
    setOpen(null)
  }

  return (
    <section id="gallery" className="scroll-mt-20 bg-deep text-warm">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <SectionHeading
          eyebrow={profile.galleryEyebrow}
          title={profile.galleryTitle}
          description={profile.galleryCopy}
        />

        <div className="mt-10 flex flex-wrap gap-2" role="toolbar" aria-label="Gallery categories">
          {galleryFilters.map((item) => {
            const selected = filter === item.id
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => choose(item.id)}
                className={`min-h-11 px-4 text-[0.72rem] tracking-[0.16em] uppercase transition-colors duration-200 ${
                  selected ? 'bg-gold text-navy' : 'border border-white/15 text-mist hover:border-gold hover:text-warm'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <motion.div
          key={filter}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpen(index)}
              className={`group text-left ${isWide(item) ? 'sm:col-span-2' : ''}`}
              aria-label={`Open image: ${item.caption}`}
            >
              <span className="relative block overflow-hidden bg-navy">
                <Picture
                  id={item.id}
                  alt={item.alt}
                  thumb
                  width={item.width}
                  height={item.height}
                  objectPosition={item.objectPosition}
                  imgClassName="aspect-auto w-full transition-transform duration-500 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 flex items-end bg-navy/0 p-4 opacity-0 transition-opacity duration-300 group-hover:bg-navy/35 group-hover:opacity-100 group-focus-visible:bg-navy/35 group-focus-visible:opacity-100">
                  <Expand aria-hidden="true" className="ml-auto h-5 w-5 text-warm" />
                </span>
              </span>
              <span className="mt-3 block text-sm text-mist">{item.caption}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {open !== null ? (
        <GalleryLightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      ) : null}
    </section>
  )
}
