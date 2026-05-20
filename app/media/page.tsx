import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Play, BookOpen, Radio, ArrowRight, Clock, BookMarked } from 'lucide-react'
import { ALL_SERMONS } from '@/lib/sermons'
import { ALL_SERIES_DATA } from '@/lib/series'

export const metadata: Metadata = {
  title: 'Media — Dominion Faith International Ministry',
  description: 'Watch sermons, explore series, and listen to audio messages from Dominion Faith.',
}

// ── helpers ────────────────────────────────────────────────────
function fmtDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

const HUBS = [
  {
    href: '/media/sermons',
    icon: BookOpen,
    label: 'Sermon Archive',
    sub: `${ALL_SERMONS.length} messages`,
    description: 'Search every message by title, speaker, scripture, or series.',
    gradient: 'linear-gradient(135deg, #0d1240 0%, #2A2FAA 100%)',
    glow: 'rgba(42,47,170,0.35)',
    border: 'rgba(42,47,170,0.3)',
  },
  {
    href: '/media/series',
    icon: BookMarked,
    label: 'Sermon Series',
    sub: `${ALL_SERIES_DATA.length} series`,
    description: 'Go deeper with curated message series from start to finish.',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #F9A916 100%)',
    glow: 'rgba(249,169,22,0.3)',
    border: 'rgba(249,169,22,0.3)',
  },
  {
    href: '/live',
    icon: Radio,
    label: 'Watch Live',
    sub: 'Sundays 9 AM & 11 AM',
    description: 'Join our live Sunday services from anywhere in the world.',
    gradient: 'linear-gradient(135deg, #1a0000 0%, #F61F27 100%)',
    glow: 'rgba(246,31,39,0.3)',
    border: 'rgba(246,31,39,0.3)',
  },
]

const STATS = [
  { value: `${ALL_SERMONS.length}+`, label: 'Messages' },
  { value: `${ALL_SERIES_DATA.length}`, label: 'Series' },
  { value: '20+', label: 'Hours' },
  { value: '1', label: 'Speaker' },
]

export default function MediaPage() {
  // Sort by date desc to get the latest
  const latest = [...ALL_SERMONS].sort((a, b) => b.date.localeCompare(a.date))[0]
  const thumb = `https://img.youtube.com/vi/${latest.videoId}/maxresdefault.jpg`

  return (
    <main className="min-h-screen" style={{ background: '#07071f' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-16"
        style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 45%, #0d1240 100%)' }}
      >
        {/* Orbs */}
        <div className="pointer-events-none absolute -left-48 -top-48 h-[700px] w-[700px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #2A2FAA 0%, transparent 68%)' }} aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-[500px] w-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #F9A916 0%, transparent 68%)' }} aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F61F27 0%, transparent 68%)' }} aria-hidden="true" />

        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl px-6 md:px-16">
          {/* Eyebrow */}
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-white/35">
            Media Hub
          </p>

          {/* Title */}
          <h1
            className="mb-8 font-black leading-[0.9] tracking-[-0.04em] text-white"
            style={{ fontSize: 'clamp(60px, 11vw, 150px)' }}
          >
            Word<br />
            On{' '}
            <span style={{ color: '#F9A916', WebkitTextStroke: '0px' }}>Demand</span>
          </h1>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8">
            {STATS.map(s => (
              <div key={s.label}>
                <p className="text-[28px] font-black text-white leading-none">{s.value}</p>
                <p className="text-[12px] text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LATEST SERMON ───────────────────────────── */}
      <section className="w-full py-16" style={{ background: '#07071f' }}>
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">Latest Message</p>
              <h2 className="text-xl font-black text-white">Fresh from the Pulpit</h2>
            </div>
            <Link href="/media/sermons" className="flex items-center gap-1.5 text-[13px] font-semibold text-white/50 hover:text-white transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {/* Featured card */}
          <Link
            href={`https://youtube.com/watch?v=${latest.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-3xl md:flex-row"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(12,12,40,0.6)' }}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden md:w-[55%] md:aspect-auto md:min-h-[320px]">
              <Image
                src={thumb}
                alt={latest.title}
                fill
                sizes="(max-width:768px) 100vw, 55vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#07071f] hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              {/* Play circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(42,47,170,0.85)', backdropFilter: 'blur(8px)' }}
                >
                  <Play size={24} className="fill-white text-white ml-1" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
              {latest.series && (
                <span
                  className="mb-3 inline-block self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide"
                  style={{ background: 'rgba(249,169,22,0.15)', color: '#F9A916', border: '1px solid rgba(249,169,22,0.3)' }}
                >
                  {latest.series}
                </span>
              )}
              <h3
                className="mb-3 font-black text-white leading-tight"
                style={{ fontSize: 'clamp(20px, 3vw, 32px)' }}
              >
                {latest.title}
              </h3>
              <p className="mb-2 text-[13px] text-white/50">{latest.speaker}</p>
              <div className="mb-6 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-white/35">
                <span>{fmtDate(latest.date)}</span>
                {latest.duration && (
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {latest.duration}
                  </span>
                )}
                {latest.scripture && <span>{latest.scripture}</span>}
              </div>
              <p className="mb-8 text-[14px] leading-relaxed text-white/55 line-clamp-3">
                {latest.description}
              </p>
              <div className="flex gap-3">
                <span
                  className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white"
                  style={{ background: '#2A2FAA' }}
                >
                  <Play size={15} className="fill-white" /> Watch Now
                </span>
                <Link
                  href="/media/sermons"
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white/60 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  Browse Archive
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── HUB TILES ────────────────────────────────────────── */}
      <section className="w-full pb-24" style={{ background: '#07071f' }}>
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {HUBS.map(hub => {
              const Icon = hub.icon
              return (
                <Link
                  key={hub.href}
                  href={hub.href}
                  className="group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-2"
                  style={{ border: `1px solid ${hub.border}` }}
                >
                  {/* Glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${hub.glow} 0%, transparent 70%)` }}
                    aria-hidden="true"
                  />
                  {/* Icon header */}
                  <div
                    className="relative flex h-36 items-center justify-center overflow-hidden"
                    style={{ background: hub.gradient }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                      aria-hidden="true"
                    />
                    <Icon
                      size={40}
                      className="relative text-white/80 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  {/* Body */}
                  <div className="p-6" style={{ background: 'rgba(10,10,30,0.85)' }}>
                    <div className="mb-1 flex items-baseline justify-between">
                      <h3 className="text-[16px] font-bold text-white">{hub.label}</h3>
                      <span className="text-[11px] text-white/35">{hub.sub}</span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-white/45">{hub.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold" style={{ color: hub.glow.replace('0.35', '1').replace('0.3', '1') }}>
                      Explore <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

    </main>
  )
}
