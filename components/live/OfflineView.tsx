// components/live/OfflineView.tsx
import Link from 'next/link'

export default function OfflineView() {
  return (
    <main className="min-h-screen" style={{ background: '#07071f' }}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">

        {/* Icon */}
        <div
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
          style={{
            background: 'rgba(42,47,170,0.12)',
            border: '1px solid rgba(42,47,170,0.25)',
          }}
          aria-hidden="true"
        >
          📡
        </div>

        {/* Heading */}
        <h1
          className="mb-3 font-black text-white leading-tight"
          style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}
        >
          We&apos;re not live right now
        </h1>

        {/* Subtext */}
        <p className="mb-8 max-w-md text-sm leading-relaxed text-white/45">
          Visit our channel for all our messages and be blessed
        </p>

        {/* YouTube button */}
        <a
          href="https://youtube.com/@dominionfaithhq"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-16 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{
            background: 'var(--color-give)',
            boxShadow: '0 4px 24px rgba(246,31,39,0.35)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
          </svg>
          Watch on YouTube
        </a>

        {/* Divider */}
        <div className="mb-8 w-full border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />

        {/* Service time */}
        <p
          className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ color: 'rgba(249,169,22,0.7)' }}
        >
          Join us live each week
        </p>
        <div
          className="mb-12 rounded-2xl px-10 py-5 text-center"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="mb-1 text-xs text-white/40">Every Sunday</p>
          <p className="text-3xl font-black text-white">9:00 AM</p>
          <p className="mt-1 text-xs text-white/30">West Africa Time</p>
        </div>

        {/* Giving nudge */}
        <div
          className="flex w-full max-w-sm items-center justify-between rounded-2xl px-5 py-4"
          style={{
            background: 'rgba(249,169,22,0.06)',
            border: '1px solid rgba(249,169,22,0.15)',
          }}
        >
          <div className="text-left">
            <p className="text-xs font-bold text-white/80">You can still give</p>
            <p className="mt-0.5 text-[11px] text-white/35">Giving is open 24/7</p>
          </div>
          <Link
            href="/give"
            className="rounded-full px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-give)' }}
          >
            Give Now
          </Link>
        </div>

      </div>
    </main>
  )
}
