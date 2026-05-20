import { Calendar, Link2, Users, Droplets, Heart } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Step {
  number: number
  title: string
  description: string
  detail: string
  icon: LucideIcon
  color: string
}

export const JOIN_STEPS: Step[] = [
  {
    number: 1,
    title: 'Visit a Service',
    description: 'Experience worship with us',
    detail: 'Join us for any of our weekly services. Come as you are and experience the presence of God with the Dominion Faith family.',
    icon: Calendar,
    color: '#2A2FAA',
  },
  {
    number: 2,
    title: 'Connect',
    description: 'Fill out a connection card',
    detail: "Let us know you're here. A connection card helps our pastoral team reach out personally and ensure you feel at home.",
    icon: Link2,
    color: '#4B52C0',
  },
  {
    number: 3,
    title: 'Join a Ministry',
    description: 'Find your place to serve',
    detail: "Every member has a role. From music to children's ministry to hospitality — find where your gift belongs.",
    icon: Users,
    color: '#F61F27',
  },
  {
    number: 4,
    title: 'Get Baptized',
    description: 'Make your faith public',
    detail: 'Water baptism is a public declaration of your faith in Jesus Christ — an act of obedience and a milestone of celebration.',
    icon: Droplets,
    color: '#F97020',
  },
  {
    number: 5,
    title: 'Become a Member',
    description: 'Commit to the family',
    detail: 'Formal membership means committing to the vision of DFIM, the Twelve Visions, and the family of believers here.',
    icon: Heart,
    color: '#F9A916',
  },
]
