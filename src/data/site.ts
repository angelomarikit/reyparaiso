export const site = {
  url: 'https://reyparaiso.vercel.app',
  name: 'Rey Paraiso',
  secondaryName: 'Teacher Rey',
  legalName: 'Reynald E. Paraiso',
  title: 'Rey Paraiso | Singer, Acoustic Performer & Event Host in Cavite',
  description:
    'Discover Rey Paraiso (Teacher Rey), a Filipino singer, acoustic performer, songwriter, event host, and music tutor based in General Trias, Cavite. Explore his performances and inquire about bookings.',
  email: 'reyparaiso78@gmail.com',
  phoneDisplay: '0995-106-3741',
  phoneTel: '+639951063741',
  location: 'General Trias City, Cavite, Philippines',
  tagline: 'Singer • Acoustic Performer • Host • Songwriter • Music Tutor',
} as const

export const navLinks = [
  { href: '#home', id: 'home', label: 'Home' },
  { href: '#about', id: 'about', label: 'About' },
  { href: '#services', id: 'services', label: 'Services' },
  { href: '#achievements', id: 'achievements', label: 'Achievements' },
  { href: '#gallery', id: 'gallery', label: 'Gallery' },
  { href: '#new-collections', id: 'new-collections', label: 'Recent Sets' },
  { href: '#featured-video', id: 'featured-video', label: 'Performance Video' },
  { href: '#contact', id: 'contact', label: 'Contact' },
] as const

export const footerLinks = navLinks
