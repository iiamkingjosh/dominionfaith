import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomeWatchLive() {
  return (
    <section
      className="w-full py-24 md:py-32"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(246,31,39,0.18) 0%, transparent 60%),' +
          'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(42,47,170,0.2) 0%, transparent 60%),' +
          'linear-gradient(180deg, #0d0507 0%, #07071f 60%)',
        borderTop: '1px solid rgba(246,31,39,0.1)',
      }}
      aria-labelledby="live-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="flex flex-col items-center text-center">

          {/* Live badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: 'rgba(246,31,39,0.1)',
              border: '1px solid rgba(246,31,39,0.3)',
            }}
          >
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ background: 'var(--color-give)', boxShadow: '0 0 6px var(--color-give)' }}
              aria-hidden="true"
            />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ color: 'var(--color-give)' }}
            >
              Watch Live
            </span>
          </div>

          {/* Headline */}
          <h2
            id="live-heading"
            className="mb-4 font-black leading-tight tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            Don&apos;t Miss a Service
          </h2>

          {/* Description */}
          <p className="mb-10 max-w-md text-sm leading-relaxed text-white/50">
            We stream every Sunday service live on YouTube. Tune in at 9:00&nbsp;AM WAT
            or watch the latest replay any time.
          </p>

          {/* Time pill */}
          <div
            className="mb-10 rounded-2xl px-10 py-5 text-center"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p
              className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ color: 'rgba(249,169,22,0.8)' }}
            >
              Every Sunday
            </p>
            <p className="text-3xl font-black text-white">9:00 AM</p>
            <p className="mt-1 text-xs text-white/35">West Africa Time · WAT</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/live"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white sm:w-auto"
              style={{
                background: 'var(--color-give)',
                boxShadow: '0 4px 24px rgba(246,31,39,0.4)',
              }}
            >
              <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-white" aria-hidden="true" />
              Watch Live
            </Link>

            <a
              href="https://youtube.com/@dominionfaithhq"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-bold text-white/70 transition-colors hover:border-white/20 hover:text-white sm:w-auto"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
              </svg>
              YouTube Channel
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
