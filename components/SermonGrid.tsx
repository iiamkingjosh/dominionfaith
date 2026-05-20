'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import SermonCard from './SermonCard'
import type { Sermon } from '@/types/sermon'

interface SermonGridProps {
  sermons: Sermon[]
}

export default function SermonGrid({ sermons }: SermonGridProps) {
  const [active, setActive] = useState<Sermon | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [active, close])

  useEffect(() => {
    if (active) closeRef.current?.focus()
  }, [active])

  if (sermons.length === 0) {
    return (
      <p className="text-center text-white/40 py-16">
        No sermons available yet. Check back soon.
      </p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sermons.map((sermon, i) => (
          <SermonCard
            key={sermon.id}
            sermon={sermon}
            onWatch={setActive}
            index={i}
          />
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Playing: ${active.title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        >
          <div className="relative w-full max-w-3xl">
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/70 hover:text-white text-sm"
              aria-label="Close video"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Close
            </button>

            <div className="relative overflow-hidden rounded-2xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1&rel=0`}
                title={active.title}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
              />
            </div>

            <div className="mt-3 px-1">
              <p className="font-semibold text-white text-sm">{active.title}</p>
              <p className="text-white/50 text-xs mt-0.5">{active.speaker}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
