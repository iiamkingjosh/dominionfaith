'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  { day: 'Sunday',    name: 'Temple Celebration',  time: '9am', dow: 0, hour: 9,  byday: 'SU' },
  { day: 'Wednesday', name: 'Housecare Fellowship', time: '7pm', dow: 3, hour: 19, byday: 'WE' },
  { day: 'Friday',    name: 'Dominion Service',     time: '5pm', dow: 5, hour: 17, byday: 'FR' },
] as const

const SERVICE_DURATION_MS = 2 * 60 * 60 * 1000 // 2 hours

const LOCATION_DISPLAY =
  '1 Dominion Avenue, Onireke, Opposite Ojo Barrack, Lagos, Nigeria'
const PHONE_DISPLAY = '+234 703 454 3971'
const PHONE_TEL     = '+2347034543971'
const MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=1+Dominion+Avenue+Onireke+Opposite+Ojo+Barrack+Lagos+Nigeria&t=&z=16&ie=UTF8&iwloc=&output=embed'
const DIRECTIONS_URL = 'https://maps.app.goo.gl/SjQqahPJix5dge9J8'

// ── Calendar helpers ──────────────────────────────────────────────────────────

function fmtLocal(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return (
    `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}` +
    `T${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`
  )
}

function nextWeekday(dow: number): Date {
  const d = new Date()
  const diff = (dow - d.getDay() + 7) % 7
  d.setDate(d.getDate() + (diff === 0 ? 7 : diff))
  return d
}

function makeIcs(): string {
  const vevents = SERVICES.map(({ dow, hour, byday, name }) => {
    const start = nextWeekday(dow)
    start.setHours(hour, 0, 0, 0)
    const end = new Date(start.getTime() + SERVICE_DURATION_MS)
    return [
      'BEGIN:VEVENT',
      `DTSTART;TZID=Africa/Lagos:${fmtLocal(start)}`,
      `DTEND;TZID=Africa/Lagos:${fmtLocal(end)}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${byday}`,
      `SUMMARY:${name}`,
      `LOCATION:${LOCATION_DISPLAY}`,
      'END:VEVENT',
    ].join('\r\n')
  })
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dominion Faith//Services//EN',
    ...vevents,
    'END:VCALENDAR',
  ].join('\r\n')
}

function downloadIcs(): void {
  const blob = new Blob([makeIcs()], { type: 'text/calendar' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = 'dominion-faith-services.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function googleCalUrl(s: typeof SERVICES[number]): string {
  const start = nextWeekday(s.dow)
  start.setHours(s.hour, 0, 0, 0)
  const end = new Date(start.getTime() + SERVICE_DURATION_MS)
  const params = new URLSearchParams({
    action:   'TEMPLATE',
    text:     `${s.name} — Dominion Faith`,
    dates:    `${fmtLocal(start)}/${fmtLocal(end)}`,
    details:  `${s.day} service at Dominion Faith International Ministry`,
    location: LOCATION_DISPLAY,
    recur:    `RRULE:FREQ=WEEKLY;BYDAY=${s.byday}`,
    ctz:      'Africa/Lagos',
  })
  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`
}

// ── Framer Motion ─────────────────────────────────────────────────────────────

// Cache the motion.div reference at module level so the proxy's `get` trap only
// runs once. This prevents the framer-motion mock (which creates a new component
// on every Proxy access) from unmounting/remounting the tree on each render.
const MotionDiv = motion.div

const EASE_OUT = [0.16, 1, 0.3, 1] as const

// ── Component ─────────────────────────────────────────────────────────────────

export default function ServiceCard() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isCalendarOpen) return
    const handler = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setIsCalendarOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isCalendarOpen])

  return (
    <MotionDiv
      className="card-double-bezel"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
    >
      <div className="space-y-6 p-6">

        {/* Header */}
        <div>
          <p
            className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ color: 'var(--color-live)' }}
          >
            Join Us
          </p>
          <h2 className="text-2xl font-bold text-white">Service Times</h2>
        </div>

        {/* Services list */}
        <div>
          {SERVICES.map((s, i) => (
            <div key={s.day}>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p
                    className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ color: 'var(--color-live)' }}
                  >
                    {s.day}
                  </p>
                  <p className="text-sm text-white/60">{s.name}</p>
                </div>
                <p className="text-2xl font-extrabold text-white">{s.time}</p>
              </div>
              {i < SERVICES.length - 1 && (
                <div className="border-b border-white/[0.06]" />
              )}
            </div>
          ))}
        </div>

        {/* Section divider */}
        <div className="border-t border-white/[0.08]" />

        {/* Contact details */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 shrink-0 text-white/40"
              width="14" height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-sm leading-snug text-white/60">{LOCATION_DISPLAY}</p>
          </div>

          <div className="flex items-center gap-3">
            <svg
              className="shrink-0 text-white/40"
              width="14" height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <a
              href={`tel:${PHONE_TEL}`}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {/* Google Maps iframe */}
        <div className="overflow-hidden rounded-xl">
          <iframe
            src={MAPS_EMBED_URL}
            width="100%"
            height="200"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Dominion Faith location map"
            style={{ border: 0, display: 'block' }}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {/* Get Directions */}
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full py-2.5 text-center text-sm font-bold text-white"
            style={{
              background: 'var(--color-primary)',
              boxShadow:  '0 2px 12px rgba(42,47,170,0.4)', /* --color-primary */
            }}
          >
            Get Directions
          </a>

          {/* Add to Calendar */}
          <div className="relative" ref={calendarRef}>
            <button
              onClick={() => setIsCalendarOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              aria-expanded={isCalendarOpen}
              aria-haspopup="true"
            >
              Add to Calendar
              <svg
                width="12" height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  isCalendarOpen ? 'rotate-180' : ''
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isCalendarOpen && (
              <div
                className="absolute bottom-full right-0 z-10 mb-2 w-56 rounded-2xl p-2"
                style={{
                  background:           'rgba(10,10,35,0.95)',
                  border:               '1px solid rgba(255,255,255,0.1)',
                  backdropFilter:       'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  boxShadow:            '0 16px 48px rgba(0,0,0,0.5)',
                }}
              >
                {/* Apple Calendar — downloads combined .ics */}
                <button
                  onClick={() => { downloadIcs(); setIsCalendarOpen(false) }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Apple Calendar
                </button>

                {/* Google Calendar — one link per service */}
                {SERVICES.map((s) => (
                  <a
                    key={s.day}
                    href={googleCalUrl(s)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsCalendarOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Google · {s.day}
                  </a>
                ))}

                {/* Outlook / iCal — downloads same .ics */}
                <button
                  onClick={() => { downloadIcs(); setIsCalendarOpen(false) }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Outlook / iCal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MotionDiv>
  )
}
