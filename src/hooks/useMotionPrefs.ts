import { useEffect, useState } from 'react'

function queryMatches(query: string) {
  if (typeof window === 'undefined') return false
  return window.matchMedia(query).matches
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => queryMatches(query))

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function useFinePointer() {
  return useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
}
