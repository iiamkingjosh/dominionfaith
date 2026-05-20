'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EventCard from './EventCard'
import type { ChurchEvent, EventCategory } from '@/types/event'

interface EventGridProps {
  events: ChurchEvent[]
}

type Filter = 'all' | EventCategory

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all',      label: 'All'            },
  { id: 'services', label: 'Services'       },
  { id: 'youth',    label: 'Youth'          },
  { id: 'women',    label: 'Women'          },
  { id: 'men',      label: 'Men'            },
  { id: 'children', label: 'Children'       },
  { id: 'special',  label: 'Special Events' },
]

const PAGE_SIZE = 6
const MotionButton = motion.button

function isPastEvent(event: ChurchEvent): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const checkDate = new Date((event.endDate ?? event.startDate) + 'T00:00:00')
  return checkDate < today
}

function sortEvents(list: ChurchEvent[]): ChurchEvent[] {
  return [...list].sort((a, b) => {
    const aPast = isPastEvent(a)
    const bPast = isPastEvent(b)
    if (aPast !== bPast) return aPast ? 1 : -1
    // Upcoming: ascending; past: most recent first
    const dir = aPast ? -1 : 1
    return dir * (new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  })
}

export default function EventGrid({ events }: EventGridProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const base = sortEvents(
    activeFilter === 'all' ? events : events.filter(e => e.category === activeFilter)
  )
  const filtered = base
  const displayed = filtered.slice(0, visible)
  const hasMore   = filtered.length > visible

  const handleFilter = useCallback((id: Filter) => {
    setActiveFilter(id)
    setVisible(PAGE_SIZE)
  }, [])

  return (
    <div>
      {/* ── Filter tabs ── */}
      <div className="hide-scrollbar mb-10 overflow-x-auto">
        <div className="flex min-w-max gap-2 pb-1">
          {FILTERS.map(f => {
            const isActive = activeFilter === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFilter(f.id)}
                className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                style={{
                  background: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}`,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                  boxShadow: isActive ? '0 4px 16px rgba(42,47,170,0.4)' : 'none',
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Empty state ── */}
      {displayed.length === 0 && (
        <p className="py-16 text-center text-white/40">
          No events found in this category. Check back soon.
        </p>
      )}

      {/* ── Bento grid ── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {displayed.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              index={i}
              isPast={isPastEvent(event)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* ── Load More ── */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <MotionButton
            type="button"
            onClick={() => setVisible(v => v + PAGE_SIZE)}
            className="rounded-full px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Load More Events
          </MotionButton>
        </div>
      )}
    </div>
  )
}
