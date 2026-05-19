import type { Metadata } from 'next'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'Visit Us — Dominion Faith',
  description:
    'Join us for Sunday Temple Celebration, Wednesday Housecare Fellowship, or Friday Dominion Service at Dominion Faith International Ministry.',
}

export default function VisitPage() {
  return (
    <main
      className="min-h-screen px-4 py-32"
      style={{ background: 'var(--hero-bg)' }}
    >
      <div className="mx-auto max-w-lg">
        <ServiceCard />
      </div>
    </main>
  )
}
