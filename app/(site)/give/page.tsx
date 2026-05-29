import type { Metadata } from 'next'
import GiveSection from '@/components/GiveSection'

export const metadata: Metadata = {
  title: 'Give — Dominion Faith',
  description: 'Partner with Dominion Faith International Ministry. Your generosity fuels the mission of raising champions.',
}

export default function GivePage() {
  return (
    <main className="give-bg min-h-screen">
      <GiveSection />
    </main>
  )
}
