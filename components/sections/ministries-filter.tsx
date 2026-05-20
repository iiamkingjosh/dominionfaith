'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MinistryCategory } from '@/types/ministry'
import { MINISTRY_CATEGORY_CONFIG } from '@/types/ministry'
import { MINISTRIES } from '@/data/ministries'
import MinistryCard from '@/components/ui/ministry-card'

const MotionDiv = motion.div

type FilterValue = 'all' | MinistryCategory

const TABS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'youth', label: 'Youth' },
  { value: 'women', label: 'Women' },
  { value: 'men', label: 'Men' },
  { value: 'children', label: 'Children' },
  { value: 'music', label: 'Music' },
  { value: 'serve', label: 'Serve' },
]

export default function MinistriesFilter() {
  const [active, setActive] = useState<FilterValue>('all')

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: MINISTRIES.length }
    MINISTRIES.forEach(m => {
      result[m.category] = (result[m.category] ?? 0) + 1
    })
    return result
  }, [])

  const filtered = useMemo(
    () => (active === 'all' ? MINISTRIES : MINISTRIES.filter(m => m.category === active)),
    [active],
  )

  return (
    <section className="w-full pb-24 md:pb-32">
      {/* ── Sticky filter bar ── */}
      <div
        className="sticky top-[64px] z-30 w-full"
        style={{
          background: 'rgba(7,7,31,0.85)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          {/* Horizontal scroll on mobile */}
          <div
            className="hide-scrollbar flex gap-1 overflow-x-auto py-3"
            role="tablist"
            aria-label="Filter ministries by category"
          >
            {TABS.map(tab => {
              const isActive = active === tab.value
              const tabColor =
                tab.value === 'all'
                  ? '#2A2FAA'
                  : MINISTRY_CATEGORY_CONFIG[tab.value as MinistryCategory].color

              return (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab.value)}
                  className="relative flex flex-shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-semibold transition-colors"
                  style={{
                    color: isActive ? tabColor : 'rgba(255,255,255,0.45)',
                    background: isActive ? `${tabColor}14` : 'transparent',
                  }}
                >
                  {tab.label}
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                    style={{
                      background: isActive ? `${tabColor}22` : 'rgba(255,255,255,0.07)',
                      color: isActive ? tabColor : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {counts[tab.value] ?? 0}
                  </span>
                  {/* Active underline */}
                  {isActive && (
                    <MotionDiv
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: tabColor }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="mx-auto max-w-7xl px-6 pt-10 md:px-16">
        {/* Result count */}
        <MotionDiv
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-[13px] text-white/40"
        >
          {filtered.length} {filtered.length === 1 ? 'ministry' : 'ministries'} found
        </MotionDiv>

        <AnimatePresence mode="wait">
          <MotionDiv
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((ministry, i) => (
              <MinistryCard key={ministry.id} ministry={ministry} index={i} />
            ))}
          </MotionDiv>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-24 text-center text-white/40">
            No ministries in this category yet.
          </div>
        )}
      </div>
    </section>
  )
}
