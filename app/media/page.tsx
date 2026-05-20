import type { Metadata } from 'next'
import Link from 'next/link'
import { Play, BookOpen, Mic } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Media — Dominion Faith International Ministry',
  description: 'Watch sermons, explore series, and listen to audio messages from Dominion Faith.',
}

const HUBS = [
  {
    href: '/media/sermons',
    icon: Play,
    title: 'Sermon Archive',
    description: 'Search and filter every message — by speaker, series, topic, or scripture.',
    gradient: 'linear-gradient(135deg, #0d1240 0%, #2A2FAA 100%)',
    color: '#6670d0',
  },
  {
    href: '/media/series',
    icon: BookOpen,
    title: 'Sermon Series',
    description: 'Go deeper with curated message series. Watch every message in sequence.',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #F9A916 100%)',
    color: '#F9A916',
  },
  {
    href: '/sermons',
    icon: Mic,
    title: 'Latest Messages',
    description: 'The most recent sermons from our Sunday services.',
    gradient: 'linear-gradient(135deg, #0e5f70 0%, #06b6d4 100%)',
    color: '#06b6d4',
  },
]

export default function MediaPage() {
  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)' }}>
      <div className="relative overflow-hidden py-28 md:py-40">
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #2A2FAA 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F9A916 0%, transparent 70%)' }} aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl px-6 md:px-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">Media Hub</p>
          <h1 className="mb-4 font-black text-white" style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
            Word On <span style={{ color: '#F9A916' }}>Demand</span>
          </h1>
          <p className="mb-16 max-w-xl text-[15px] text-white/50">
            Every sermon, series, and teaching from Dominion Faith — available anytime, anywhere.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {HUBS.map(hub => {
              const Icon = hub.icon
              return (
                <Link
                  key={hub.href}
                  href={hub.href}
                  className="group flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex h-28 items-center justify-center" style={{ background: hub.gradient }}>
                    <Icon size={36} className="text-white/80" />
                  </div>
                  <div className="flex-1 p-5" style={{ background: 'rgba(12,12,40,0.7)' }}>
                    <h2 className="mb-1.5 text-[15px] font-bold text-white group-hover:transition-colors"
                      style={{ color: undefined }}>
                      <span className="group-hover:text-[color:var(--hub-color)]">{hub.title}</span>
                    </h2>
                    <p className="text-[13px] leading-relaxed text-white/45">{hub.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
