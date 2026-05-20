import type { Metadata } from 'next'
import { ALL_SERIES_DATA, getFeaturedSeries } from '@/lib/series'
import FeaturedSeries from '@/components/sections/featured-series'
import SeriesCard from '@/components/ui/series-card'

export const metadata: Metadata = {
  title: 'Sermon Series — Dominion Faith International Ministry',
  description: 'Explore all sermon series from Dominion Faith. Watch every message in sequence and go deep into the Word.',
}

export default function SeriesPage() {
  const featured = getFeaturedSeries()

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)' }}>
      {/* Hero */}
      <div className="pt-28 pb-10 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">Sermon Series</p>
          <h1 className="mb-8 font-black text-white" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            Go <span style={{ color: '#F9A916' }}>Deeper</span>
          </h1>
          <FeaturedSeries series={featured} />
        </div>
      </div>

      {/* All series grid */}
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-16">
        <h2 className="mb-8 text-xl font-bold text-white">All Series</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ALL_SERIES_DATA.map((s, i) => <SeriesCard key={s.id} series={s} index={i} />)}
        </div>
      </div>
    </main>
  )
}
