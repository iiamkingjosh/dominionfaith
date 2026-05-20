'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, MessageSquare, Calendar } from 'lucide-react'
import type { Series } from '@/types/series'

const MotionDiv = motion.div

function fmtDateRange(start: string, end?: string): string {
  const fmt = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return end ? `${fmt(start)} – ${fmt(end)}` : `From ${fmt(start)}`
}

export default function SeriesCard({ series, index = 0 }: { series: Series; index?: number }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/media/series/${series.slug}`} className="group block overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Artwork */}
        <div className="relative h-44 overflow-hidden" style={{ background: series.gradient }}>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />
          <span className="absolute inset-0 flex items-center justify-center font-black text-white/10 select-none transition-transform duration-500 group-hover:scale-110"
            style={{ fontSize: 'clamp(52px, 8vw, 80px)' }}>
            {series.title.split(' ').map(w => w[0]).slice(0, 2).join('')}
          </span>
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
              <Play size={20} className="fill-white text-white ml-0.5" />
            </div>
          </div>
          {/* Sermon count badge */}
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
            <MessageSquare size={10} />
            {series.sermonCount} messages
          </span>
        </div>

        {/* Body */}
        <div className="p-4" style={{ background: 'rgba(12,12,40,0.7)' }}>
          <h3 className="mb-1 text-[15px] font-bold text-white leading-snug group-hover:text-[#F9A916] transition-colors">
            {series.title}
          </h3>
          <p className="mb-3 line-clamp-2 text-[12px] leading-relaxed text-white/45">{series.description}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/35">
            <span>{series.speakers.join(', ')}</span>
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {fmtDateRange(series.startDate, series.endDate)}
            </span>
          </div>
        </div>
      </Link>
    </MotionDiv>
  )
}
