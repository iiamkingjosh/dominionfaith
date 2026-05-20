'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  ChevronUp, ChevronDown, X, ListMusic, Gauge,
} from 'lucide-react'
import { useAudioPlayer } from '@/context/audio-player-context'
import { SPEED_OPTIONS } from '@/types/audio'

const MotionDiv = motion.div

function fmtTime(s: number): string {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function ProgressBar() {
  const { state, seek } = useAudioPlayer()
  const barRef = useRef<HTMLDivElement>(null)
  const pct = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = barRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = (e.clientX - rect.left) / rect.width
    seek(ratio * state.duration)
  }

  return (
    <div
      ref={barRef}
      role="slider"
      aria-label="Playback position"
      aria-valuenow={Math.round(state.currentTime)}
      aria-valuemin={0}
      aria-valuemax={Math.round(state.duration)}
      className="group relative h-1 w-full cursor-pointer rounded-full bg-white/20"
      onClick={handleClick}
    >
      <div
        className="h-full rounded-full transition-none"
        style={{ width: `${pct}%`, background: '#2A2FAA' }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ left: `calc(${pct}% - 6px)` }}
      />
    </div>
  )
}

function VolumeSlider() {
  const { state, setVolume, toggleMute } = useAudioPlayer()
  const [showSlider, setShowSlider] = useState(false)

  return (
    <div className="relative flex items-center gap-1" onMouseLeave={() => setShowSlider(false)}>
      <button
        type="button"
        onClick={toggleMute}
        onMouseEnter={() => setShowSlider(true)}
        className="rounded-full p-1.5 text-white/60 hover:text-white transition-colors"
        aria-label={state.muted ? 'Unmute' : 'Mute'}
      >
        {state.muted || state.volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      <AnimatePresence>
        {showSlider && (
          <MotionDiv
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <input
              type="range" min={0} max={1} step={0.02}
              value={state.muted ? 0 : state.volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-full accent-[#2A2FAA]"
              aria-label="Volume"
            />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

function SpeedPicker() {
  const { state, setSpeed } = useAudioPlayer()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-white/60 hover:text-white transition-colors"
        aria-label="Playback speed"
      >
        <Gauge size={13} />
        {state.speed}×
      </button>
      <AnimatePresence>
        {open && (
          <MotionDiv
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 right-0 rounded-xl p-1.5 z-10"
            style={{ background: 'rgba(10,10,35,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {SPEED_OPTIONS.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => { setSpeed(s); setOpen(false) }}
                className={`block w-full rounded-lg px-4 py-1.5 text-[12px] font-semibold text-left transition-colors
                  ${state.speed === s ? 'text-white bg-white/10' : 'text-white/60 hover:text-white'}`}
              >
                {s}×
              </button>
            ))}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

function QueuePanel({ onClose }: { onClose: () => void }) {
  const { state, play, removeFromQueue } = useAudioPlayer()

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-full mb-2 right-4 w-80 rounded-2xl overflow-hidden z-20"
      style={{ background: 'rgba(8,8,28,0.96)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)' }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <span className="text-sm font-bold text-white">Queue ({state.queue.length})</span>
        <button type="button" onClick={onClose} className="text-white/50 hover:text-white">
          <X size={15} />
        </button>
      </div>
      {state.queue.length === 0 ? (
        <p className="p-4 text-[13px] text-white/40 text-center">Queue is empty</p>
      ) : (
        <ul className="max-h-60 overflow-y-auto divide-y divide-white/[0.06]">
          {state.queue.map(ep => (
            <li key={ep.id} className="flex items-center gap-3 px-4 py-3">
              <button type="button" onClick={() => play(ep)} className="flex-1 text-left min-w-0">
                <p className="text-[13px] font-semibold text-white truncate">{ep.title}</p>
                <p className="text-[11px] text-white/40">{ep.speaker}</p>
              </button>
              <button
                type="button"
                onClick={() => removeFromQueue(ep.id)}
                className="flex-shrink-0 text-white/30 hover:text-white/70"
                aria-label={`Remove ${ep.title} from queue`}
              >
                <X size={13} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </MotionDiv>
  )
}

export default function PodcastPlayer() {
  const { state, togglePlay, skip, setExpanded } = useAudioPlayer()
  const [showQueue, setShowQueue] = useState(false)

  if (!state.current) return null

  const isPlaying = state.status === 'playing'
  const artwork = state.current.artwork

  return (
    <MotionDiv
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 inset-x-0 z-50"
      style={{
        background: 'rgba(8,8,28,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* ── Expanded panel ── */}
      <AnimatePresence>
        {state.expanded && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mx-auto max-w-2xl px-6 pt-6 pb-2">
              {/* Artwork + info */}
              <div className="flex items-start gap-5 mb-5">
                {artwork && (
                  <img
                    src={artwork}
                    alt={state.current.title}
                    className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                  />
                )}
                <div className="min-w-0 flex-1 pt-1">
                  <p className="font-black text-white leading-snug">{state.current.title}</p>
                  <p className="text-[13px] text-white/55 mt-1">{state.current.speaker}</p>
                  {state.current.scripture && (
                    <p className="text-[11px] text-white/35 mt-1 italic">{state.current.scripture}</p>
                  )}
                  {state.current.seriesName && (
                    <span
                      className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                      style={{ background: 'rgba(42,47,170,0.15)', color: '#6670d0' }}
                    >
                      {state.current.seriesName}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar (expanded) */}
              <div className="mb-2">
                <ProgressBar />
                <div className="flex justify-between mt-1 text-[10px] text-white/35">
                  <span>{fmtTime(state.currentTime)}</span>
                  <span>{fmtTime(state.duration)}</span>
                </div>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* ── Compact bar ── */}
      <div className="mx-auto max-w-4xl px-4 py-3">
        {/* Progress line (compact) */}
        {!state.expanded && (
          <div className="mb-2.5">
            <ProgressBar />
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Thumbnail (compact) */}
          {!state.expanded && artwork && (
            <img
              src={artwork}
              alt=""
              className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
              aria-hidden="true"
            />
          )}

          {/* Title + speaker */}
          <button
            type="button"
            onClick={() => setExpanded(!state.expanded)}
            className="flex min-w-0 flex-1 flex-col text-left"
          >
            <span className="truncate text-[13px] font-bold text-white">{state.current.title}</span>
            <span className="truncate text-[11px] text-white/45">{state.current.speaker}</span>
          </button>

          {/* Controls */}
          <div className="flex flex-shrink-0 items-center gap-1">
            <button type="button" onClick={() => skip(-15)} className="rounded-full p-2 text-white/60 hover:text-white transition-colors" aria-label="Back 15 seconds">
              <SkipBack size={18} />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white"
              style={{ background: '#2A2FAA' }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={16} className="fill-white" /> : <Play size={16} className="fill-white ml-0.5" />}
            </button>
            <button type="button" onClick={() => skip(15)} className="rounded-full p-2 text-white/60 hover:text-white transition-colors" aria-label="Forward 15 seconds">
              <SkipForward size={18} />
            </button>
          </div>

          {/* Secondary controls */}
          <div className="hidden items-center gap-1 sm:flex">
            <SpeedPicker />
            <VolumeSlider />
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowQueue(o => !o)}
                className="rounded-full p-1.5 text-white/60 hover:text-white transition-colors"
                aria-label="Show queue"
              >
                <ListMusic size={16} />
              </button>
              <AnimatePresence>
                {showQueue && <QueuePanel onClose={() => setShowQueue(false)} />}
              </AnimatePresence>
            </div>
          </div>

          {/* Expand/collapse */}
          <button
            type="button"
            onClick={() => setExpanded(!state.expanded)}
            className="rounded-full p-1.5 text-white/40 hover:text-white transition-colors"
            aria-label={state.expanded ? 'Collapse player' : 'Expand player'}
          >
            {state.expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>

        {/* Time (compact) */}
        {!state.expanded && (
          <div className="mt-1 flex justify-end text-[10px] text-white/30">
            {fmtTime(state.currentTime)} / {fmtTime(state.duration)}
          </div>
        )}
      </div>
    </MotionDiv>
  )
}
