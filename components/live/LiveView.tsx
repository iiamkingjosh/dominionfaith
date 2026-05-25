// components/live/LiveView.tsx
import GiveSection from '@/components/GiveSection'

interface LiveViewProps {
  channelId: string
}

export default function LiveView({ channelId }: LiveViewProps) {
  const embedSrc = `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1`

  return (
    <main className="min-h-screen pb-24" style={{ background: '#07071f' }}>

      {/* Live badge row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-16">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 rounded-full px-4 py-1.5"
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
              Live Now
            </span>
          </div>
          <span className="hidden text-xs text-white/35 sm:block">Sunday Service · 9 AM</span>
        </div>
        <span className="text-xs text-white/20">Dominion Faith International</span>
      </div>

      {/* YouTube embed */}
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            aspectRatio: '16/9',
            border: '1px solid rgba(246,31,39,0.2)',
          }}
        >
          <iframe
            src={embedSrc}
            title="Dominion Faith International Ministry — Live Service"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>

      {/* Service time + Give */}
      <div className="mx-auto mt-10 max-w-7xl px-6 md:px-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* Service time card */}
          <div
            className="shrink-0 rounded-2xl p-6 lg:w-52"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: 'rgba(249,169,22,0.8)' }}
            >
              Service Time
            </p>
            <p className="text-3xl font-black text-white">9:00 AM</p>
            <p className="mt-1 text-xs text-white/35">Every Sunday · WAT</p>
          </div>

          {/* Give section */}
          <div className="min-w-0 flex-1">
            <GiveSection />
          </div>

        </div>
      </div>

    </main>
  )
}
