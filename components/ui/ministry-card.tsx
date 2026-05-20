'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, Mail, Phone, ArrowRight } from 'lucide-react'
import type { Ministry } from '@/types/ministry'
import { MINISTRY_CATEGORY_CONFIG } from '@/types/ministry'

const MotionDiv = motion.div

function LeaderAvatar({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(' ')
    .slice(-2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
  return (
    <span
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
      style={{ background: color }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

interface MinistryCardProps {
  ministry: Ministry
  index: number
}

export default function MinistryCard({ ministry, index }: MinistryCardProps) {
  const cfg = MINISTRY_CATEGORY_CONFIG[ministry.category]
  const joinHref = ministry.contact.email
    ? `mailto:${ministry.contact.email}`
    : ministry.contact.phone
      ? `tel:${ministry.contact.phone}`
      : '/contact'

  return (
    <MotionDiv
      layout
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="group flex flex-col overflow-hidden rounded-2xl"
      style={{
        background: 'rgba(12,12,40,0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* ── Card image / gradient header ── */}
      <div
        className="relative h-44 overflow-hidden"
        style={{ background: cfg.gradient }}
        aria-hidden="true"
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Large initials watermark */}
        <span
          className="absolute inset-0 flex items-center justify-center font-black text-white/10 select-none transition-transform duration-500 group-hover:scale-110"
          style={{ fontSize: 'clamp(64px, 10vw, 96px)' }}
        >
          {ministry.name
            .split(' ')
            .slice(0, 2)
            .map(w => w[0])
            .join('')}
        </span>
        {/* Category badge */}
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white"
          style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          {cfg.label}
        </span>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-[16px] font-bold leading-snug text-white">
          {ministry.name}
        </h3>

        {/* Meta */}
        <div className="space-y-1.5">
          <p className="flex items-center gap-2 text-[12px] text-white/50">
            <Clock size={13} className="flex-shrink-0" style={{ color: cfg.color }} aria-hidden="true" />
            {ministry.meetingTime}
          </p>
          <p className="flex items-center gap-2 text-[12px] text-white/50">
            <MapPin size={13} className="flex-shrink-0" style={{ color: cfg.color }} aria-hidden="true" />
            {ministry.location}
          </p>
        </div>

        {/* Description */}
        <p className="line-clamp-3 text-[13px] leading-relaxed text-white/55">
          {ministry.description}
        </p>

        {/* ── Footer: leader + join ── */}
        <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <LeaderAvatar name={ministry.leader.name} color={cfg.color} />
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-white/80">
                {ministry.leader.name}
              </p>
              {ministry.leader.role && (
                <p className="truncate text-[10px] text-white/40">{ministry.leader.role}</p>
              )}
            </div>
          </div>

          <a
            href={joinHref}
            className="group/btn ml-3 flex flex-shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-[12px] font-bold text-white transition-opacity hover:opacity-80"
            style={{ background: cfg.color }}
            aria-label={`Join ${ministry.name}`}
          >
            Join
            <ArrowRight size={12} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </a>
        </div>

        {/* Contact links */}
        {(ministry.contact.email || ministry.contact.phone) && (
          <div className="flex flex-wrap gap-3 text-[11px] text-white/35">
            {ministry.contact.email && (
              <a
                href={`mailto:${ministry.contact.email}`}
                className="flex items-center gap-1 transition-colors hover:text-white/70"
              >
                <Mail size={11} aria-hidden="true" />
                {ministry.contact.email}
              </a>
            )}
            {ministry.contact.phone && (
              <a
                href={`tel:${ministry.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-1 transition-colors hover:text-white/70"
              >
                <Phone size={11} aria-hidden="true" />
                {ministry.contact.phone}
              </a>
            )}
          </div>
        )}
      </div>
    </MotionDiv>
  )
}
