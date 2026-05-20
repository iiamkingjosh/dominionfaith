import type { Metadata } from 'next'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'Locations — Dominion Faith',
  description:
    'Find Dominion Faith International Ministry — service times, directions, and all district assemblies across Nigeria and Gabon.',
}

// ── Districts ─────────────────────────────────────────────────

const DISTRICTS = [
  {
    name: 'Coconut District',
    address: '8 Alh Yusuf Adebayo, Olodi Apapa, Lagos',
  },
  {
    name: 'Onitsha District',
    address:
      'No. 24/26 Limca Road, Opposite Koka Bus Stop, Old Road Nkpor, Onitsha, Anambra State',
  },
  {
    name: 'Asaba District',
    address:
      'Ikuku Adinu Street, Off DLA Road, Beside the New Proposed Asagba Palace by Falcon Club, Asaba, Delta State',
  },
  {
    name: 'Isuochi District',
    address:
      "Beside Dr I. Madubuike's House, Nkwo-Agu, Amuda Isuochi, Abia State",
  },
  {
    name: 'Nkwelle District',
    address:
      'Nkwelle Post Office, Opposite Community Town Hall, Nkwelle Ezunaka, Anambra State',
  },
  {
    name: 'Amuwo District',
    address:
      'Inner Wheel Vocational Training Center, 17 Raji Rasaki Street, Off Amuwo Festac Link Bridge Road',
  },
  {
    name: 'Mebamu District',
    address:
      'No. 3 Isah Ibrahim Street, Mebamu, Lagos State — Km 22 Badagry Expressway, Mechanic Bus Stop',
  },
  {
    name: 'Gabon District',
    address: 'Quarter Oyoumu A Ongali, Franceville, Gabon, Central Africa',
    international: true,
  },
]

// ── Page ─────────────────────────────────────────────────────

export default function LocationsPage() {
  return (
    <main
      className="min-h-screen px-6 py-32 md:px-16 lg:px-24"
      style={{ background: 'var(--hero-bg)' }}
    >
      {/* ── Page heading ── */}
      <div className="mx-auto mb-16 max-w-2xl text-center">
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
        <h1
          className="font-black text-white leading-none tracking-[-0.03em]"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
        >
          Our Locations
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/45">
          One family, many assemblies — rooted in Lagos, reaching across Nigeria and the nations.
        </p>
      </div>

      {/* ── Headquarters ── */}
      <div className="mb-20">
        <div className="mb-6 flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white"
            style={{ background: 'var(--color-primary)' }}
          >
            🏛 Headquarters
          </span>
          <span className="text-xs text-white/30">Lagos, Nigeria</span>
        </div>
        <div className="mx-auto max-w-xl">
          <ServiceCard />
        </div>
      </div>

      {/* ── District assemblies ── */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2
            className="font-black text-white leading-none tracking-[-0.02em]"
            style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
          >
            District Assemblies
          </h2>
          <p className="mt-2 text-sm text-white/40">
            {DISTRICTS.length} assemblies spreading the Kingdom across the nations
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DISTRICTS.map((district) => (
            <div
              key={district.name}
              className="relative rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {district.international && (
                <span
                  className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em]"
                  style={{
                    background: 'rgba(249,169,22,0.15)',
                    color: 'var(--color-live)',
                    border: '1px solid rgba(249,169,22,0.25)',
                  }}
                >
                  International
                </span>
              )}

              <div
                className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: 'rgba(42,47,170,0.2)',
                  border: '1px solid rgba(42,47,170,0.3)',
                }}
              >
                <svg
                  width="16" height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: 'var(--color-primary)' }}
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <h3 className="mb-2 text-sm font-bold text-white">{district.name}</h3>
              <p className="text-[12px] leading-relaxed text-white/45">{district.address}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
