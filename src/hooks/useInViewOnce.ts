import { useLayoutEffect, useState, type RefObject } from 'react'

export function useInViewOnce<T extends Element>(ref: RefObject<T | null>) {
  const [seen, setSeen] = useState(false)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const visible = () => {
      const rect = element.getBoundingClientRect()
      return rect.top < window.innerHeight * 0.92 && rect.bottom > 32
    }

    if (visible()) {
      setSeen(true)
      return
    }

    let done = false
    const finish = () => {
      if (done) return
      done = true
      setSeen(true)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) finish()
      },
      { threshold: 0.18 },
    )
    const onScroll = () => {
      if (visible()) finish()
    }

    observer.observe(element)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ref])

  return seen
}
