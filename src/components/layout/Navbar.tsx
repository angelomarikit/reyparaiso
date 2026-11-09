import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Button } from '../ui/Button'

const sectionIds = navLinks.map((link) => link.id)

export function Navbar() {
  const active = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-navy/90 shadow-[0_1px_0_rgba(198,167,106,0.45)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10 lg:px-16 ${scrolled ? 'h-16' : 'h-20'}`}>
        <a href="#home" className="leading-tight" onClick={() => setOpen(false)}>
          <span className="block font-display text-sm tracking-[0.22em] text-warm">REY PARAISO</span>
          <span className="block text-[0.62rem] tracking-[0.32em] text-gold">TEACHER REY</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const current = active === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={current ? 'true' : undefined}
                className="group relative text-[0.72rem] tracking-[0.16em] text-warm/90 uppercase"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ${
                    current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact" magnetic>
            Book Rey
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-warm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-menu" className="h-[calc(100svh-5rem)] overflow-y-auto px-6 pb-10 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={active === link.id ? 'true' : undefined}
                  className="block border-b border-white/10 py-4 font-display text-3xl text-warm"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="#contact" className="w-full" onClick={() => setOpen(false)}>
              Book Rey
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
