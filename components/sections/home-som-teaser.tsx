import Link from 'next/link'
import { GraduationCap, BookOpen, Users, CalendarDays } from 'lucide-react'

const STATS = [
  { icon: BookOpen,      value: '8',           label: 'Courses'     },
  { icon: Users,         value: '2',           label: 'Study Modes' },
  { icon: CalendarDays,  value: 'June 2026',   label: 'Next Intake' },
  { icon: GraduationCap, value: 'Certificate', label: 'Award'       },
]

export default function HomeSchoolOfMinistry() {
  return (
    <section
      className="w-full py-24 md:py-32"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 85% 20%, rgba(42,47,170,0.28) 0%, transparent 55%),' +
          'radial-gradient(ellipse 60% 50% at 15% 80%, rgba(249,169,22,0.1) 0%, transparent 55%),' +
          'linear-gradient(160deg, #080820 0%, #0a0a1e 60%, #07071f 100%)',
        borderTop: '1px solid rgba(42,47,170,0.15)',
      }}
      aria-labelledby="som-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="flex flex-col items-center text-center">

          {/* Icon badge */}
          <div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: 'rgba(249,169,22,0.1)',
              border: '1px solid rgba(249,169,22,0.22)',
            }}
          >
            <GraduationCap size={28} style={{ color: '#F9A916' }} aria-hidden="true" />
          </div>

          {/* Eyebrow */}
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{
              background: 'rgba(255,255,255,0.05)',
              borderColor: 'rgba(255,255,255,0.10)',
            }}
          >
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: '#F9A916' }}
              aria-hidden="true"
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
              New Intake · June 2026
            </span>
          </div>

          {/* Headline */}
          <h2
            id="som-heading"
            className="mb-4 font-black leading-tight tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            School of{' '}
            <span style={{ color: '#F9A916' }}>Ministry</span>
          </h2>

          {/* Description */}
          <p className="mb-10 max-w-xl text-sm leading-relaxed text-white/50">
            Every believer carries a divine mandate. The School of Ministry equips you with the
            Word, wisdom, and spiritual authority to walk in that mandate and transform your world.
          </p>

          {/* Stats */}
          <div className="mb-10 flex flex-wrap justify-center gap-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2.5 rounded-2xl px-6 py-5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  minWidth: '120px',
                }}
              >
                <Icon size={15} style={{ color: '#F9A916' }} aria-hidden="true" />
                <p className="text-xl font-extrabold leading-none text-white">{value}</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/35">{label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/ministries/school-of-ministry"
              className="w-full rounded-full px-8 py-3.5 text-center text-sm font-bold text-white sm:w-auto"
              style={{
                background: 'var(--color-primary)',
                boxShadow: '0 4px 24px rgba(42,47,170,0.5)',
              }}
            >
              Enroll Now
            </Link>
            <Link
              href="/ministries/school-of-ministry#courses"
              className="flex w-full items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold sm:w-auto"
              style={{
                color: '#F9A916',
                borderColor: 'rgba(249,169,22,0.35)',
                background: 'rgba(249,169,22,0.08)',
              }}
            >
              View Courses
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
