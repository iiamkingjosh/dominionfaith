import type { Metadata } from 'next'
import TestimoniesSection from '@/components/TestimoniesSection'
import { TESTIMONY_SLIDES } from '@/lib/testimonies'

export const metadata: Metadata = {
  title: 'Testimonies — Dominion Faith',
  description:
    'Real lives transformed at Dominion Faith International Ministry. Hear stories of healing, restoration, financial breakthrough, and divine miracles.',
}

export default function TestimoniesPage() {
  return (
    <main
      className="min-h-screen px-6 py-32 md:px-16 lg:px-24"
      style={{ background: 'var(--hero-bg)' }}
    >
      <TestimoniesSection slides={TESTIMONY_SLIDES} />
    </main>
  )
}
