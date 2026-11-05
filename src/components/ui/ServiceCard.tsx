import { ArrowUpRight } from 'lucide-react'
import type { Service } from '../../data/services'

export function ServiceCard({
  service,
  onInquire,
}: {
  service: Service
  onInquire: (value: string) => void
}) {
  const Icon = service.icon

  return (
    <article className="group relative flex h-full flex-col border border-navy/10 bg-warm p-7 transition-transform duration-300 hover:-translate-y-1.5 md:p-8">
      <div className="flex items-start justify-between">
        <span className="font-display text-lg text-gold">{service.number}</span>
        <Icon
          aria-hidden="true"
          className="h-6 w-6 text-navy/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-gold"
          strokeWidth={1.5}
        />
      </div>
      <h3 className="mt-8 font-display text-[1.7rem] leading-tight text-navy">{service.title}</h3>
      <p className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-navy/75">{service.description}</p>
      <button
        type="button"
        onClick={() => onInquire(service.inquiry)}
        className="mt-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy"
      >
        Inquire
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full"
      />
    </article>
  )
}
