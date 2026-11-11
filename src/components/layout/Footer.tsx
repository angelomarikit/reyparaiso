import { hasFeaturedVideo, hasNewCollections } from '../../data/newCollections'
import { footerLinks, site } from '../../data/site'

const visibleFooterLinks = footerLinks.filter((link) => {
  if (link.id === 'new-collections') return hasNewCollections
  if (link.id === 'featured-video') return hasFeaturedVideo
  return true
})
import { AnimatedDivider } from '../motion/AnimatedDivider'
import { RevealOnScroll } from '../motion/RevealOnScroll'

export function Footer() {
  return (
    <footer className="bg-navy text-warm">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:px-10 lg:px-16">
        <AnimatedDivider wide />
        <RevealOnScroll className="mt-10 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl tracking-[0.16em]">REY PARAISO</p>
            <p className="mt-2 text-[0.68rem] tracking-[0.28em] text-gold">{site.secondaryName.toUpperCase()}</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">{site.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {visibleFooterLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="text-mist transition-colors duration-200 hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm leading-relaxed text-mist">
            <p>{site.location}</p>
            <a className="mt-2 inline-block hover:text-gold" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </RevealOnScroll>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Rey Paraiso. All Rights Reserved.</p>
          <p>Website by Apex Technology</p>
        </div>
      </div>
    </footer>
  )
}
