'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import type { ChurchEvent } from '@/types/event'
import { CATEGORY_CONFIG } from '@/types/event'

interface EventCardProps {
  event: ChurchEvent
  index: number
  isPast?: boolean
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const MotionDiv = motion.div

function fmtDay(iso: string): string {
  return new Date(iso + 'T00:00:00').getDate().toString()
}

function fmtMonth(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}

function fmtDateRange(startDate: string, endDate?: string): string {
  const fmt = (iso: string) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric',
    })
  return endDate ? `${fmt(startDate)} – ${fmt(endDate)}` : fmt(startDate)
}

export default function EventCard({ event, index, isPast = false }: EventCardProps) {
  const cfg = CATEGORY_CONFIG[event.category]

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
        {/* Past event overlay */}
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

        {/* Category badge — upcoming only */}
        {!isPast && (
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
          >
            {cfg.label}
          </span>
        )}

        {/* Calendar date widget */}
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

        {/* Multi-day pill */}
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
            <span>{fmtDateRange(event.startDate, event.endDate)}{event.time ? ` · ${event.time}` : ''}</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-white/40">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </div>

    </MotionDiv>
  )
}
