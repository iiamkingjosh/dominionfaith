import type { Metadata } from 'next'
import SermonArchiveClient from '@/components/sections/sermon-archive-client'

export const metadata: Metadata = {
  title: 'Sermon Archive — Dominion Faith International Ministry',
  description: 'Search and filter every message from Dominion Faith — by title, speaker, scripture, series, or topic.',
}

export default function SermonArchivePage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)' }}
    >
      {/* ── Hero ── */}
      <div className="relative overflow-hidden py-28 md:py-36">
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #2A2FAA 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F9A916 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
            Sermon Archive
          </p>
          <h1
            className="mb-4 font-black text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            The <span style={{ color: '#F9A916' }}>Word</span> on Demand
          </h1>
          <p className="text-[14px] text-white/50">
            Search, filter, and listen to every message from Dominion Faith International Ministry.
          </p>
        </div>
      </div>

      {/* ── Search / Filter / Grid ── */}
      <SermonArchiveClient />
    </main>
  )
}
