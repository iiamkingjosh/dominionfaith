import type { Metadata } from 'next'
import Link from 'next/link'
import MinistriesFilter from '@/components/sections/ministries-filter'

export const metadata: Metadata = {
  title: 'Ministries — Dominion Faith International Ministry',
  description:
    'Find your place to serve in Dominion Faith. Browse all departments, ministries, and outreach arms — and join the one that matches your calling.',
}

export default function MinistriesPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="relative w-full overflow-hidden py-32 md:py-40"
        style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 45%, #0d1240 100%)' }}
        aria-label="Ministries hero"
      >
        {/* Brand colour orbs */}
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #2A2FAA 0%, transparent 68%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #F61F27 0%, transparent 68%)' }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-16">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
            Get Involved
          </p>
          <h1
            className="mb-6 font-black leading-tight tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
          >
            Find Your{' '}
            <span style={{ color: '#F9A916' }}>Place</span>
          </h1>
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-white/55 md:text-base">
            Every member is called. Every gift is needed. Discover the ministry or department where your passion meets God's purpose — and join a team that is changing lives.
          </p>

          {/* Mission reminder */}
          <div
            className="mx-auto mt-8 inline-block rounded-2xl px-6 py-3 text-[13px] text-white/60"
            style={{ background: 'rgba(42,47,170,0.12)', border: '1px solid rgba(42,47,170,0.25)' }}
          >
            "A Place Where Champions Are Made" — our mission drives every ministry we run.
          </div>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <MinistriesFilter />

      {/* ── CTA ── */}
      <section
        className="w-full py-20"
        style={{
          background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="mx-auto max-w-2xl px-6 text-center md:px-16">
          <h2
            className="mb-3 font-black text-white"
            style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}
          >
            Not sure where to start?
          </h2>
          <p className="mb-8 text-[14px] text-white/50">
            Have questions about any ministry or department? Our team is happy to guide you to the right fit.
          </p>
          <Link
            href="mailto:info@dominionfaith.com"
            className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold text-white transition-opacity hover:opacity-85"
            style={{ background: 'linear-gradient(135deg, #2A2FAA 0%, #F9A916 100%)' }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}
