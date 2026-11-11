import { useMemo, useState } from 'react'
import { Expand } from 'lucide-react'
import { motion } from 'motion/react'
import { hasNewCollections, newCollections } from '../../data/newCollections'
import { ease } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useMotionPrefs'
import { CollectionImage } from '../ui/CollectionImage'
import { CollectionLightbox } from '../ui/CollectionLightbox'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { SectionHeading } from '../ui/SectionHeading'

function isWide(width: number, height: number) {
  return width / height > 1.2
}

export function NewCollections() {
  const reduced = useReducedMotion()
  const populated = useMemo(
    () => newCollections.filter((collection) => collection.items.length > 0),
    [],
  )
  const [activeId, setActiveId] = useState(populated[0]?.id ?? '')
  const [open, setOpen] = useState<number | null>(null)

  if (!hasNewCollections || populated.length === 0) return null

  const active = populated.find((collection) => collection.id === activeId) ?? populated[0]
  const items = active.items

  return (
    <section id="new-collections" className="scroll-mt-20 bg-warm text-navy">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Fresh From the Stage"
            title={['New Collections', 'Recent Photographs']}
            description="The latest images from three recent sets — browse each collection and open any frame full size."
            tone="dark"
          />
        </RevealOnScroll>

        <div className="mt-10 flex flex-wrap gap-2" role="toolbar" aria-label="New image collections">
          {populated.map((collection) => {
            const selected = collection.id === active.id
            return (
              <button
                key={collection.id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setActiveId(collection.id)
                  setOpen(null)
                }}
                className={`min-h-11 px-4 text-[0.72rem] tracking-[0.16em] uppercase transition-colors duration-200 ${
                  selected ? 'bg-gold text-navy' : 'border border-navy/20 text-navy/75 hover:border-gold hover:text-navy'
                }`}
              >
                {collection.title}
              </button>
            )
          })}
        </div>

        <motion.div
          key={active.id}
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
              className={`group text-left ${isWide(item.width, item.height) ? 'sm:col-span-2' : ''}`}
              aria-label={item.alt}
            >
              <span className="relative block overflow-hidden bg-navy/5">
                <CollectionImage
                  src={item.src}
                  thumb={item.thumb}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  objectPosition={item.objectPosition}
                  imgClassName="aspect-auto w-full transition-transform duration-500 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                />
                <span className="pointer-events-none absolute inset-0 flex items-end bg-navy/0 p-4 opacity-0 transition-opacity duration-300 group-hover:bg-navy/25 group-hover:opacity-100 group-focus-visible:bg-navy/25 group-focus-visible:opacity-100">
                  <Expand aria-hidden="true" className="ml-auto h-5 w-5 text-warm" />
                </span>
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {open !== null ? (
        <CollectionLightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      ) : null}
    </section>
  )
}
