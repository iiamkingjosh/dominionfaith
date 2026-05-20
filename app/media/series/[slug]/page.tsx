import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Play, Calendar, MessageSquare } from 'lucide-react'
import { getSeriesBySlug, ALL_SERIES_DATA } from '@/lib/series'
import { getSermonsBySeriesSlug } from '@/lib/sermons'
import SeriesSermonList from '@/components/sections/series-sermon-list'

interface PageProps { params: { slug: string } }

export function generateStaticParams() {
  return ALL_SERIES_DATA.map(s => ({ slug: s.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const series = getSeriesBySlug(params.slug)
  if (!series) return { title: 'Series Not Found' }
  return {
    title: `${series.title} — Dominion Faith`,
    description: series.description,
  }
}

function fmtDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function SeriesDetailPage({ params }: PageProps) {
  const series = getSeriesBySlug(params.slug)
  if (!series) notFound()

  const sermons = getSermonsBySeriesSlug(params.slug)

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)' }}>
      {/* Hero */}
      <div className="relative overflow-hidden py-28 md:py-36" style={{ background: series.gradient }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-black text-white/8 select-none"
          style={{ fontSize: 'clamp(100px, 18vw, 220px)' }}>
          {series.title.split(' ').map(w => w[0]).slice(0, 2).join('')}
        </span>
        <div className="relative mx-auto max-w-5xl px-6 md:px-16">
          <Link href="/media/series" className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={15} /> All Series
          </Link>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">Sermon Series</p>
          <h1 className="mb-4 font-black text-white" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>{series.title}</h1>
          <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-white/70">{series.description}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/50">
            <span>{series.speakers.join(', ')}</span>
            <span className="flex items-center gap-1"><MessageSquare size={13} /> {series.sermonCount} messages</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {fmtDate(series.startDate)}{series.endDate && ` – ${fmtDate(series.endDate)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Sermon list */}
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-16">
        <h2 className="mb-8 text-lg font-bold text-white">Messages in This Series</h2>
        <SeriesSermonList sermons={sermons} />
      </div>

      {/* Related series */}
      <div className="border-t border-white/[0.06] px-6 py-12 text-center md:px-16">
        <Link href="/media/series" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85"
          style={{ background: '#2A2FAA' }}>
          Browse All Series
        </Link>
      </div>
    </main>
  )
}
