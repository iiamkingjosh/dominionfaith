import type { Metadata } from 'next'
import SermonGrid from '@/components/SermonGrid'
import { getSermons } from '@/lib/sermons'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Sermons — Dominion Faith',
  description: 'Watch and download sermons from Dominion Faith International Ministry.',
}

export default async function SermonsPage() {
  const sermons = await getSermons()

  return (
    <main
      className="min-h-screen px-6 py-32 md:px-16 lg:px-24"
      style={{ background: 'var(--hero-bg)' }}
    >
      <div className="mx-auto max-w-7xl">
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

        <SermonGrid sermons={sermons} />
      </div>
    </main>
  )
}
