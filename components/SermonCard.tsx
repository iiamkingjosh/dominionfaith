'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, Download } from 'lucide-react'
import type { Sermon } from '@/types/sermon'

interface SermonCardProps {
  sermon: Sermon
  onWatch: (sermon: Sermon) => void
  index?: number
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT, delay: i * 0.08 },
  }),
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const MotionDiv = motion.div

export default function SermonCard({ sermon, onWatch, index = 0 }: SermonCardProps) {
  const thumb = `https://img.youtube.com/vi/${sermon.videoId}/maxresdefault.jpg`

  return (
    <MotionDiv
      className="card-double-bezel overflow-hidden group flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
    >
      {/* ── Thumbnail ── */}
      <div className="relative overflow-hidden aspect-video">
        <Image
          src={thumb}
          alt={sermon.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[250ms] ease-[var(--ease-out)] group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div
          className="sermon-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-[var(--ease-out)]"
          aria-hidden="true"
        />

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full p-3 transition-transform duration-[250ms] ease-[var(--ease-out)] group-hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
          >
            <Play className="h-6 w-6 fill-white text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Series badge — slides up on hover */}
        {sermon.series && (
          <div className="absolute bottom-3 left-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[250ms] ease-[var(--ease-out)]">
            <span
              className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{
                background: 'var(--badge-series-bg)',
                color: 'var(--badge-series-color)',
                border: '1px solid rgba(249,169,22,0.3)',
              }}
            >
              {sermon.series}
            </span>
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="text-sm font-bold leading-snug text-white line-clamp-2">
          {sermon.title}
        </h3>

        <div className="flex items-center gap-2 mt-auto">
          {sermon.speakerPhoto && (
            <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={sermon.speakerPhoto}
                alt={sermon.speaker}
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-semibold text-white/80 truncate">
              {sermon.speaker}
            </span>
            <span className="text-[10px] text-white/40">
              {formatDate(sermon.date)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onWatch(sermon)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-primary)' }}
            aria-label={`Watch ${sermon.title}`}
          >
            <Play className="h-3.5 w-3.5 fill-white" aria-hidden="true" />
            Watch
          </button>

          {sermon.downloadUrl && (
            <a
              href={sermon.downloadUrl}
              download
              className="flex items-center justify-center rounded-full p-2 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              aria-label={`Download ${sermon.title}`}
            >
              <Download className="h-4 w-4 text-white/70" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </MotionDiv>
  )
}
