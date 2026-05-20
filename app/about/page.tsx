import type { Metadata } from 'next'
import VisionSection from '@/components/sections/vision-section'
import JoinProcessSection from '@/components/sections/join-process-section'

export const metadata: Metadata = {
  title: 'About Us — Dominion Faith International Ministry',
  description:
    'Learn about Dominion Faith International Ministry — our history, mission, vision, and the twelve points that guide our ministry.',
}

export default function AboutPage() {
  return (
    <>
      <VisionSection />
      <JoinProcessSection />
    </>
  )
}
