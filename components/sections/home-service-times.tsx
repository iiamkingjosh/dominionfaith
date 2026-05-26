import ServiceCard from '@/components/ServiceCard'

export default function HomeServiceTimes() {
  return (
    <section
      className="w-full py-24"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(42,47,170,0.15) 0%, transparent 60%),' +
          'linear-gradient(180deg, #0a0a1e 0%, #07071f 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        {/* Section header */}
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
              Find Us
            </span>
          </div>

          <h2
            className="font-black tracking-tight text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            Plan Your Visit
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm text-white/45">
            We&apos;d love to see you. Here&apos;s everything you need to join us in person this week.
          </p>
        </div>

        {/* ServiceCard — centred, capped at a card-friendly width */}
        <div className="mx-auto max-w-md">
          <ServiceCard />
        </div>
      </div>
    </section>
  )
}
