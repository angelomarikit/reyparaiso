import { profile } from '../../data/profile'
import { services } from '../../data/services'
import { SectionTransition } from '../motion/SectionTransition'
import { StaggerContainer, StaggerItem } from '../motion/StaggerContainer'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from '../ui/ServiceCard'

export function Services({ onInquire }: { onInquire: (service: string) => void }) {
  function inquire(value: string) {
    onInquire(value)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <SectionTransition className="scroll-mt-20 bg-ivory text-navy">
      <section id="services" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <SectionHeading
          eyebrow={profile.servicesEyebrow}
          title={profile.servicesTitle}
          description={profile.servicesCopy}
          tone="dark"
        />
        <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.number} className="h-full">
              <ServiceCard service={service} onInquire={inquire} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </SectionTransition>
  )
}
