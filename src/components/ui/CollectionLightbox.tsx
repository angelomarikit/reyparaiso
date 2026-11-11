import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { NewCollectionItem } from '../../data/newCollections'
import { CollectionImage } from './CollectionImage'

type Props = {
  items: NewCollectionItem[]
  index: number
  onClose: () => void
  onIndex: (index: number) => void
}

export function CollectionLightbox({ items, index, onClose, onIndex }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  const onIndexRef = useRef(onIndex)
  const indexRef = useRef(index)
  const countRef = useRef(items.length)
  onCloseRef.current = onClose
  onIndexRef.current = onIndex
  indexRef.current = index
  countRef.current = items.length
  const item = items[index]

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(event: KeyboardEvent) {
      const count = countRef.current
      const current = indexRef.current
      if (event.key === 'Escape') onCloseRef.current()
      if (event.key === 'ArrowRight') onIndexRef.current((current + 1) % count)
      if (event.key === 'ArrowLeft') onIndexRef.current((current - 1 + count) % count)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previous?.focus()
    }
  }, [])

  if (!item) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/98 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 inline-flex min-h-11 min-w-11 items-center justify-center text-warm"
        aria-label="Close image"
      >
        <X aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => onIndex((index - 1 + items.length) % items.length)}
        className="absolute left-2 inline-flex min-h-12 min-w-12 items-center justify-center text-warm md:left-6"
        aria-label="Previous image"
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <figure className="flex max-h-full max-w-5xl flex-col items-center">
        <CollectionImage
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          imgClassName="max-h-[78vh] w-auto max-w-[86vw] object-contain"
        />
        <figcaption className="mt-4 text-center text-sm tracking-[0.18em] text-gold">
          {index + 1} / {items.length}
        </figcaption>
      </figure>
      <button
        type="button"
        onClick={() => onIndex((index + 1) % items.length)}
        className="absolute right-2 inline-flex min-h-12 min-w-12 items-center justify-center text-warm md:right-6"
        aria-label="Next image"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </div>,
    document.body,
  )
}
