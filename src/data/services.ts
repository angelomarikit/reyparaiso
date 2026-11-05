import { Church, GraduationCap, Guitar, Mic, PenLine, Presentation, type LucideIcon } from 'lucide-react'

export type Service = {
  number: string
  title: string
  description: string
  inquiry: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Live Singing & Vocal Performance',
    description:
      'Solo vocal performances for celebrations, private functions, community events, and special programs.',
    inquiry: 'Live Singing',
    icon: Mic,
  },
  {
    number: '02',
    title: 'Acoustic Entertainment & Busking',
    description:
      'Live acoustic music for cafés, restaurants, food parks, and intimate gatherings.',
    inquiry: 'Acoustic Performance',
    icon: Guitar,
  },
  {
    number: '03',
    title: 'Hosting & Emceeing',
    description:
      'Event hosting, program introductions, audience engagement, and stage coordination.',
    inquiry: 'Hosting',
    icon: Presentation,
  },
  {
    number: '04',
    title: 'Songwriting & Music',
    description:
      'Creative songwriting, musical expression, and song interpretation for performances and ministry settings.',
    inquiry: 'Songwriting Collaboration',
    icon: PenLine,
  },
  {
    number: '05',
    title: 'Music Tutoring',
    description:
      'Beginner-friendly singing and basic music development support, subject to scheduling and arrangement.',
    inquiry: 'Music Tutoring',
    icon: GraduationCap,
  },
  {
    number: '06',
    title: 'Church & Worship Ministry',
    description: 'Music participation and support for church services and ministry events.',
    inquiry: 'Church or Ministry Event',
    icon: Church,
  },
]

export const inquiryOptions = [
  'Live Singing',
  'Acoustic Performance',
  'Hosting',
  'Music Tutoring',
  'Songwriting Collaboration',
  'Church or Ministry Event',
  'Other',
] as const
