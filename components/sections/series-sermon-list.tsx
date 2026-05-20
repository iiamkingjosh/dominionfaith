'use client'

import { Play, Headphones, Clock, BookOpen } from 'lucide-react'
import type { Sermon } from '@/types/sermon'
import { useAudioPlayer } from '@/context/audio-player-context'

function fmtDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function SeriesSermonList({ sermons }: { sermons: Sermon[] }) {
  const { play } = useAudioPlayer()
  const thumb = (videoId: string) => `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`

  return (
    <ol className="space-y-3">
      {sermons.map((sermon, i) => (
        <li
          key={sermon.id}
          className="flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/[0.03]"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Episode number */}
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-black text-white/30"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            {i + 1}
          </span>

          {/* Thumbnail */}
          <img src={thumb(sermon.videoId)} alt="" className="hidden h-14 w-24 flex-shrink-0 rounded-xl object-cover sm:block" aria-hidden="true" />

          {/* Info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-bold text-white">{sermon.title}</p>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-white/40">
              <span>{fmtDate(sermon.date)}</span>
              {sermon.duration && <span className="flex items-center gap-1"><Clock size={10} />{sermon.duration}</span>}
              {sermon.scripture && <span className="flex items-center gap-1"><BookOpen size={10} />{sermon.scripture}</span>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-shrink-0 items-center gap-2">
            <a href={`https://youtube.com/watch?v=${sermon.videoId}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold text-white"
              style={{ background: '#2A2FAA' }}>
              <Play size={12} className="fill-white" /> Watch
            </a>
            {sermon.audioUrl && (
              <button type="button" onClick={() => play({
                id: sermon.id,
                title: sermon.title,
                speaker: sermon.speaker,
                audioUrl: sermon.audioUrl!,
                durationSeconds: sermon.durationSeconds ?? 0,
                artwork: thumb(sermon.videoId),
                seriesName: sermon.series,
                scripture: sermon.scripture,
              })}
                className="flex items-center justify-center rounded-xl px-3 py-2 text-white/60 transition-colors hover:text-white"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                aria-label={`Listen to ${sermon.title}`}>
                <Headphones size={14} />
              </button>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
