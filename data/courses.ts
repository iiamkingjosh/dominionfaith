import { BookOpen, Target, Sparkles, BookMarked, Crown, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Course {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export const COURSES: Course[] = [
  {
    id: 'ministry',
    title: 'Ministry',
    icon: BookOpen,
    description: "Understanding the call to ministry, its functions, responsibilities, and how to operate effectively in God's house.",
  },
  {
    id: 'purpose-driven-church',
    title: 'Purpose Driven Church',
    icon: Target,
    description: "Discovering God's five purposes for the church and how every believer plays a role in fulfilling them.",
  },
  {
    id: 'new-creation-reality',
    title: 'The New Creation Reality',
    icon: Sparkles,
    description: 'A deep dive into who you are in Christ — your rights, identity, and authority as a new creation.',
  },
  {
    id: 'word-foundation',
    title: 'Word Foundation',
    icon: BookMarked,
    description: 'Building an unshakeable foundation on the Word of God through study, meditation, and application.',
  },
  {
    id: 'spiritual-leadership',
    title: 'Spiritual Leadership',
    icon: Crown,
    description: 'Principles of servant leadership drawn from Scripture, equipping you to lead with integrity and impact.',
  },
  {
    id: 'spiritual-warfare',
    title: 'Spiritual Warfare',
    icon: Shield,
    description: "Understanding the believer's authority, the weapons of our warfare, and how to stand firm in victory.",
  },
]
