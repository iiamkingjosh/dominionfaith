'use client'

import { motion } from 'framer-motion'
import { Play, Headphones, Download, Share2, Calendar, Clock, BookOpen, Eye } from 'lucide-react'
import type { Sermon } from '@/types/sermon'
import { useAudioPlayer } from '@/context/audio-player-context'

const MotionDiv = motion.div

function fmtDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmtViews(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

interface SermonArchiveCardProps {
  sermon: Sermon
  index: number
  searchQuery?: string
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="rounded px-0.5" style={{ background: 'rgba(249,169,22,0.35)', color: '#F9A916' }}>
            {part}
          </mark>
        ) : part,
      )}
    </>
  )
}

export default function SermonArchiveCard({ sermon, index, searchQuery = '' }: SermonArchiveCardProps) {
  const { play, addToQueue } = useAudioPlayer()
  const thumb = `https://img.youtube.com/vi/${sermon.videoId}/mqdefault.jpg`

  const handleListen = () => {
    if (!sermon.audioUrl) return
    play({
      id: sermon.id,
      title: sermon.title,
      speaker: sermon.speaker,
      audioUrl: sermon.audioUrl,
      durationSeconds: sermon.durationSeconds ?? 0,
      artwork: thumb,
      seriesName: sermon.series,
      scripture: sermon.scripture,
    })
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/sermons/${sermon.slug ?? sermon.id}`
    if (navigator.share) {
      await navigator.share({ title: sermon.title, text: sermon.speaker, url })
    } else {
      await navigator.clipboard.writeText(url)
    }
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl"
      style={{ background: 'rgba(12,12,40,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumb}
          alt={sermon.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: 'rgba(42,47,170,0.85)' }}>
            <Play size={20} className="fill-white text-white ml-0.5" />
          </div>
        </div>

        {/* Series badge */}
        {sermon.series && (
          <span
            className="absolute bottom-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{ background: 'rgba(249,169,22,0.2)', color: '#F9A916', border: '1px solid rgba(249,169,22,0.3)' }}
          >
            {sermon.series}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-[14px] font-bold leading-snug text-white line-clamp-2">
          <Highlight text={sermon.title} query={searchQuery} />
        </h3>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/45">
          <span className="flex items-center gap-1">
            <Calendar size={11} aria-hidden="true" />
            {fmtDate(sermon.date)}
          </span>
          {sermon.duration && (
            <span className="flex items-center gap-1">
              <Clock size={11} aria-hidden="true" />
              {sermon.duration}
            </span>
          )}
          {sermon.scripture && (
            <span className="flex items-center gap-1">
              <BookOpen size={11} aria-hidden="true" />
              <Highlight text={sermon.scripture} query={searchQuery} />
            </span>
          )}
          {sermon.viewCount != null && (
            <span className="flex items-center gap-1">
              <Eye size={11} aria-hidden="true" />
              {fmtViews(sermon.viewCount)}
            </span>
          )}
        </div>

        <p className="text-[12px] leading-relaxed text-white/40 line-clamp-2">{sermon.description}</p>

        {/* Speaker */}
        <div className="mt-auto flex items-center gap-2 border-t border-white/[0.07] pt-3">
          <div
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
            style={{ background: '#2A2FAA' }}
            aria-hidden="true"
          >
            {sermon.speaker.split(' ').pop()?.charAt(0)}
          </div>
          <span className="text-[12px] font-semibold text-white/70 flex-1 truncate">
            <Highlight text={sermon.speaker} query={searchQuery} />
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={`https://youtube.com/watch?v=${sermon.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-[12px] font-bold text-white transition-opacity hover:opacity-85"
            style={{ background: '#2A2FAA' }}
          >
            <Play size={13} className="fill-white" /> Watch
          </a>
          {sermon.audioUrl && (
            <button
              type="button"
              onClick={handleListen}
              className="flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold text-white/80 transition-colors hover:text-white"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              aria-label={`Listen to ${sermon.title}`}
            >
              <Headphones size={13} />
            </button>
          )}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center rounded-xl px-3 py-2 text-[12px] text-white/50 transition-colors hover:text-white"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label={`Share ${sermon.title}`}
          >
            <Share2 size={13} />
          </button>
        </div>
      </div>
    </MotionDiv>
  )
}
