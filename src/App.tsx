import { useState } from 'react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { About } from './components/sections/About'
import { Achievements } from './components/sections/Achievements'
import { BookingCTA } from './components/sections/BookingCTA'
import { Contact } from './components/sections/Contact'
import { Gallery } from './components/sections/Gallery'
import { Hero } from './components/sections/Hero'
import { Journey } from './components/sections/Journey'
import { PhotoBand } from './components/sections/PhotoBand'
import { Services } from './components/sections/Services'

export default function App() {
  const [service, setService] = useState('')

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services onInquire={setService} />
        <PhotoBand />
        <Achievements />
        <Gallery />
        <Journey />
        <BookingCTA />
        <Contact selectedService={service} />
      </main>
      <Footer />
    </>
  )
}
