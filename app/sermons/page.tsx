import type { Metadata } from 'next'
import SermonGrid from '@/components/SermonGrid'
import type { Sermon } from '@/types/sermon'

export const metadata: Metadata = {
  title: 'Sermons — Dominion Faith',
  description: 'Watch and download sermons from Dominion Faith International Ministry.',
}

const SERMONS: Sermon[] = [
  {
    id: '1',
    videoId: 'dQw4w9WgXcQ',
    title: 'Walking in Dominion',
    speaker: 'Pastor Joshua',
    date: '2024-03-10',
    series: 'Kingdom Foundations',
  },
  {
    id: '2',
    videoId: 'dQw4w9WgXcQ',
    title: 'The Power of Faith',
    speaker: 'Pastor Joshua',
    date: '2024-03-03',
    series: 'Kingdom Foundations',
  },
  {
    id: '3',
    videoId: 'dQw4w9WgXcQ',
    title: 'Champions Are Made',
    speaker: 'Pastor Joshua',
    date: '2024-02-25',
    series: 'Raising Champions',
  },
  {
    id: '4',
    videoId: 'dQw4w9WgXcQ',
    title: 'Seated in High Places',
    speaker: 'Pastor Joshua',
    date: '2024-02-18',
    series: 'Raising Champions',
  },
  {
    id: '5',
    videoId: 'dQw4w9WgXcQ',
    title: 'Dominion Over Circumstances',
    speaker: 'Pastor Joshua',
    date: '2024-02-11',
  },
  {
    id: '6',
    videoId: 'dQw4w9WgXcQ',
    title: "The Overcomer's Mindset",
    speaker: 'Pastor Joshua',
    date: '2024-02-04',
    series: 'Kingdom Foundations',
  },
]

export default function SermonsPage() {
  return (
    <main
      className="min-h-screen px-4 py-32"
      style={{ background: 'var(--hero-bg)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(255,255,255,0.10)',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-live)' }}
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
              Messages
            </span>
          </div>
          <h1
            className="font-black text-white leading-none tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Sermons
          </h1>
          <p className="mt-3 text-white/45 text-sm max-w-md mx-auto">
            Spirit-filled messages to build your faith and ignite your purpose.
          </p>
        </div>

        <SermonGrid sermons={SERMONS} />
      </div>
    </main>
  )
}
