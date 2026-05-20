'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, CalendarPlus, ChevronDown } from 'lucide-react'
import type { ChurchEvent } from '@/types/event'
import { CATEGORY_CONFIG } from '@/types/event'

interface EventCardProps {
  event: ChurchEvent
  index: number
  isPast?: boolean
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const MotionDiv = motion.div

// ── Date helpers ──────────────────────────────────────────────

function fmtDay(iso: string): string {
  return new Date(iso + 'T00:00:00').getDate().toString()
}

function fmtMonth(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}

function fmtDateRange(startDate: string, endDate?: string): string {
  const fmt = (iso: string) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return endDate ? `${fmt(startDate)} – ${fmt(endDate)}` : fmt(startDate)
}

// ── Calendar helpers ──────────────────────────────────────────

function parseTime(timeStr: string): { hour: number; minute: number } {
  const m = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!m) return { hour: 9, minute: 0 }
  let h = parseInt(m[1])
  const min = parseInt(m[2])
  const ap = m[3].toUpperCase()
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  return { hour: h, minute: min }
}

function fmtIcsLocal(iso: string, timeStr?: string): string {
  const { hour, minute } = timeStr ? parseTime(timeStr) : { hour: 9, minute: 0 }
  const d = new Date(iso + 'T00:00:00')
  d.setHours(hour, minute, 0, 0)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`
}

function fmtIcsDate(iso: string): string {
  // all-day date format YYYYMMDD
  return iso.replace(/-/g, '')
}

function makeEventIcs(event: ChurchEvent): string {
  const isAllDay = !event.time
  let dtStart: string
  let dtEnd: string

  if (isAllDay) {
    dtStart = `DTSTART;VALUE=DATE:${fmtIcsDate(event.startDate)}`
    // for all-day, DTEND is exclusive (next day)
    const end = event.endDate ?? event.startDate
    const d = new Date(end + 'T00:00:00')
    d.setDate(d.getDate() + 1)
    const p = (n: number) => String(n).padStart(2, '0')
    dtEnd = `DTEND;VALUE=DATE:${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`
  } else {
    dtStart = `DTSTART;TZID=Africa/Lagos:${fmtIcsLocal(event.startDate, event.time)}`
    const endIso  = event.endDate ?? event.startDate
    const endTime = event.endTime ?? event.time
    // default 2-hour duration if no endTime
    const endDt = new Date(endIso + 'T00:00:00')
    const { hour, minute } = parseTime(endTime ?? '11:00 AM')
    endDt.setHours(hour, minute, 0, 0)
    if (!event.endTime && !event.endDate) endDt.setHours(endDt.getHours() + 2)
    const p = (n: number) => String(n).padStart(2, '0')
    dtEnd = `DTEND;TZID=Africa/Lagos:${endDt.getFullYear()}${p(endDt.getMonth() + 1)}${p(endDt.getDate())}T${p(endDt.getHours())}${p(endDt.getMinutes())}00`
  }

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dominion Faith//Events//EN',
    'BEGIN:VEVENT',
    dtStart,
    dtEnd,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

function downloadEventIcs(event: ChurchEvent): void {
  const blob = new Blob([makeEventIcs(event)], { type: 'text/calendar' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `${event.id}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function googleCalUrl(event: ChurchEvent): string {
  const isAllDay = !event.time
  let dates: string
  if (isAllDay) {
    const end = event.endDate ?? event.startDate
    // Google all-day: end is exclusive
    const d = new Date(end + 'T00:00:00')
    d.setDate(d.getDate() + 1)
    const p = (n: number) => String(n).padStart(2, '0')
    const endStr = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`
    dates = `${fmtIcsDate(event.startDate)}/${endStr}`
  } else {
    dates = `${fmtIcsLocal(event.startDate, event.time)}/${fmtIcsLocal(event.endDate ?? event.startDate, event.endTime ?? event.time)}`
  }
  const params = new URLSearchParams({
    action:   'TEMPLATE',
    text:     event.title,
    dates,
    location: event.location,
    details:  event.description,
    ...(event.time ? { ctz: 'Africa/Lagos' } : {}),
  })
  return `https://calendar.google.com/calendar/r/eventedit?${params}`
}

// ── Component ─────────────────────────────────────────────────

export default function EventCard({ event, index, isPast = false }: EventCardProps) {
  const cfg = CATEGORY_CONFIG[event.category]
  const [isCalOpen, setIsCalOpen] = useState(false)
  const calRef = useRef<HTMLDivElement>(null)

  // Close calendar dropdown on outside click
  useEffect(() => {
    if (!isCalOpen) return
    const handler = (e: MouseEvent) => {
      if (calRef.current && !calRef.current.contains(e.target as Node)) {
        setIsCalOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isCalOpen])

  return (
    <MotionDiv
      className={`card-double-bezel group flex flex-col overflow-hidden${
        event.featured ? ' lg:col-span-2' : ''
      }${isPast ? ' opacity-50' : ''}`}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: isPast ? 0.5 : 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT, delay: index * 0.06 }}
      whileHover={isPast ? undefined : { y: -6 }}
    >
      {/* ── Gradient header ── */}
      <div
        className="relative flex items-end p-4"
        style={{
          minHeight: event.featured ? '200px' : '160px',
          background: isPast ? 'rgba(255,255,255,0.04)' : cfg.gradient,
        }}
      >
        {isPast && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Past Event
            </span>
          </div>
        )}

        {!isPast && (
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
          >
            {cfg.label}
          </span>
        )}

        <div
          className="absolute right-4 top-4 flex flex-col items-center justify-center rounded-xl px-3 py-2 text-center"
          style={{
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(8px)',
            minWidth: '52px',
            opacity: isPast ? 0.5 : 1,
          }}
          aria-hidden="true"
        >
          <span
            className="block text-[9px] font-bold uppercase tracking-[0.15em]"
            style={{ color: isPast ? 'rgba(255,255,255,0.4)' : cfg.color }}
          >
            {fmtMonth(event.startDate)}
          </span>
          <span
            className="cal-date-num block text-2xl font-black leading-none text-white"
            style={{ perspective: '200px' }}
          >
            {fmtDay(event.startDate)}
          </span>
        </div>

        {event.endDate && !isPast && (
          <span
            className="rounded-full px-2.5 py-1 text-[9px] font-semibold text-white/70"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            Multi-day
          </span>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3
          className="font-bold leading-snug"
          style={{
            fontSize: 'clamp(14px, 1.5vw, 17px)',
            color: isPast ? 'rgba(255,255,255,0.45)' : 'white',
          }}
        >
          {event.title}
        </h3>

        <p className="line-clamp-2 text-[13px] leading-relaxed text-white/40">
          {event.description}
        </p>

        <div className="mt-auto space-y-1.5">
          <div className="flex items-center gap-2 text-[12px] text-white/40">
            <Clock className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            <span>
              {fmtDateRange(event.startDate, event.endDate)}
              {event.time ? ` · ${event.time}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-white/40">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </div>

      {/* ── Add to Calendar — upcoming events only ── */}
      {!isPast && (
        <div className="px-5 pb-5 pt-0" ref={calRef}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCalOpen(o => !o)}
              aria-expanded={isCalOpen}
              aria-haspopup="true"
              className="flex w-full items-center justify-center gap-2 rounded-full py-2 text-xs font-semibold text-white/70 transition-all hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
              Add to Calendar
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${isCalOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {isCalOpen && (
              <div
                className="absolute bottom-full left-0 right-0 z-20 mb-2 rounded-2xl p-1.5"
                style={{
                  background: 'rgba(10,10,35,0.97)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                }}
              >
                {/* Apple / iCal */}
                <button
                  type="button"
                  onClick={() => { downloadEventIcs(event); setIsCalOpen(false) }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  🍎 Apple Calendar
                </button>

                {/* Google Calendar */}
                <a
                  href={googleCalUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsCalOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  🗓 Google Calendar
                </a>

                {/* Outlook / iCal */}
                <button
                  type="button"
                  onClick={() => { downloadEventIcs(event); setIsCalOpen(false) }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  📧 Outlook / iCal
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </MotionDiv>
  )
}
