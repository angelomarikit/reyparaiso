import { useEffect, useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { inquiryOptions } from '../../data/services'
import { profile } from '../../data/profile'
import { site } from '../../data/site'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

type Fields = {
  name: string
  email: string
  phone: string
  service: string
  date: string
  location: string
  duration: string
  message: string
}

const empty: Fields = {
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  location: '',
  duration: '',
  message: '',
}

const fieldClass =
  'w-full border border-navy/15 bg-white px-4 py-3 text-navy outline-none transition-colors duration-200 focus:border-gold'

export function Contact({ selectedService }: { selectedService: string }) {
  const [fields, setFields] = useState<Fields>(empty)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [inquiryText, setInquiryText] = useState('')

  useEffect(() => {
    if (!selectedService) return
    setFields((current) => ({ ...current, service: selectedService }))
  }, [selectedService])

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }))
  }

  function buildInquiry(values: Fields) {
    return [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Contact number: ${values.phone}`,
      `Service: ${values.service}`,
      `Event date: ${values.date || 'Not specified'}`,
      `Event location: ${values.location || 'Not specified'}`,
      `Expected duration: ${values.duration || 'Not specified'}`,
      '',
      values.message,
    ].join('\n')
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())
    if (!fields.name.trim() || !emailOk || !fields.phone.trim() || !fields.service || !fields.message.trim()) {
      setNotice('')
      setError('Add your name, a valid email, a contact number, a service, and a message.')
      return
    }

    const body = buildInquiry(fields)
    const subject = `Booking inquiry from ${fields.name.trim()}`
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setError('')
    setInquiryText(`To: ${site.email}\nSubject: ${subject}\n\n${body}`)

    if (href.length > 1800) {
      const copied = await copyText(body)
      setNotice(
        copied
          ? 'This inquiry is too long for an automatic email draft. It has been copied. Paste it into a new email to Rey and press send yourself. Nothing has been sent yet.'
          : 'This inquiry is too long for an automatic email draft. Copy it below and send it yourself. Nothing has been sent yet.',
      )
      return
    }

    window.location.href = href
    setNotice(
      'Your email app should open with this inquiry. Please press send to deliver it. Nothing has been sent from this page.',
    )
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-warm text-navy">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:px-10 lg:grid-cols-12 lg:px-16 lg:py-28">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={profile.contactEyebrow} title={profile.contactTitle} tone="dark" />
          <RevealOnScroll className="mt-10 space-y-5 text-sm leading-relaxed">
            <p>
              <span className="block text-[0.68rem] tracking-[0.2em] text-gold uppercase">Name</span>
              {site.legalName}
            </p>
            <p>
              <span className="block text-[0.68rem] tracking-[0.2em] text-gold uppercase">Professional name</span>
              Rey Paraiso / KURA YEY
            </p>
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <span className="block text-[0.68rem] tracking-[0.2em] text-gold uppercase">Location</span>
                {site.location}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <span className="block text-[0.68rem] tracking-[0.2em] text-gold uppercase">Mobile</span>
                <a href={`tel:${site.phoneTel}`} className="underline decoration-gold/50 underline-offset-4">
                  {site.phoneDisplay}
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <span className="block text-[0.68rem] tracking-[0.2em] text-gold uppercase">Email</span>
                <a href={`mailto:${site.email}`} className="underline decoration-gold/50 underline-offset-4">
                  {site.email}
                </a>
              </span>
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className="border border-navy/10 bg-ivory p-6 md:p-8">
            <p className="min-h-6 text-sm text-red-800" role="alert">
              {error}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                Full name
                <input
                  className={`${fieldClass} mt-2`}
                  name="name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(event) => update('name', event.target.value)}
                  required
                />
              </label>
              <label className="block text-sm">
                Email address
                <input
                  className={`${fieldClass} mt-2`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(event) => update('email', event.target.value)}
                  required
                />
              </label>
              <label className="block text-sm">
                Contact number
                <input
                  className={`${fieldClass} mt-2`}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={fields.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  required
                />
              </label>
              <label className="block text-sm">
                Service type
                <select
                  className={`${fieldClass} mt-2`}
                  name="service"
                  value={fields.service}
                  onChange={(event) => update('service', event.target.value)}
                  required
                >
                  <option value="">Select a service</option>
                  {inquiryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                Event date
                <input
                  className={`${fieldClass} mt-2`}
                  type="date"
                  name="date"
                  value={fields.date}
                  onChange={(event) => update('date', event.target.value)}
                />
              </label>
              <label className="block text-sm">
                Event location
                <input
                  className={`${fieldClass} mt-2`}
                  name="location"
                  value={fields.location}
                  onChange={(event) => update('location', event.target.value)}
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                Expected duration
                <input
                  className={`${fieldClass} mt-2`}
                  name="duration"
                  value={fields.duration}
                  onChange={(event) => update('duration', event.target.value)}
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                Message
                <textarea
                  className={`${fieldClass} mt-2 min-h-32 resize-y`}
                  name="message"
                  value={fields.message}
                  onChange={(event) => update('message', event.target.value)}
                  required
                />
              </label>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="navy">
                Open email draft
              </Button>
              <Button type="button" variant="line" disabled={!inquiryText}
                onClick={() => {
                  if (!inquiryText) return
                  void copyText(inquiryText).then((copied) => {
                    setNotice(
                      copied
                        ? 'Inquiry copied. Paste it into your email and press send. Nothing has been sent yet.'
                        : 'Copying was blocked by the browser. Select the inquiry text below and send it yourself.',
                    )
                  })
                }}
              >
                Copy inquiry
              </Button>
            </div>
            <p className="mt-4 min-h-12 text-sm leading-relaxed text-navy/80" role="status">
              {notice}
            </p>
            {inquiryText ? (
              <pre className="mt-2 overflow-x-auto border border-navy/10 bg-white p-4 text-xs leading-relaxed whitespace-pre-wrap text-navy">
                {inquiryText}
              </pre>
            ) : null}
          </form>
        </RevealOnScroll>
      </div>
    </section>
  )
}
