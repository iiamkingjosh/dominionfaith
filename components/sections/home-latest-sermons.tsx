import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SermonGrid from '@/components/SermonGrid'
import type { Sermon } from '@/types/sermon'

const LATEST_SERMONS: Sermon[] = [
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
]

export default function HomeLatestSermons() {
  return (
    <section
      className="w-full py-24 md:py-32"
      style={{
        background: 'linear-gradient(180deg, #07071f 0%, #0a0a20 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
      aria-labelledby="sermons-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">

        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
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

            <h2
              id="sermons-heading"
              className="font-black leading-tight tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              Latest{' '}
              <span style={{ color: 'var(--color-live)' }}>Sermons</span>
            </h2>

            <p className="mt-2 max-w-md text-sm text-white/45">
              Spirit-filled messages to build your faith and ignite your purpose.
            </p>
          </div>

          <Link
            href="/sermons"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-white/70 transition-colors hover:border-white/20 hover:text-white"
          >
            View All
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <SermonGrid sermons={LATEST_SERMONS} />

      </div>
    </section>
  )
}
