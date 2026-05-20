'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { ALL_SERMONS, ALL_SPEAKERS, ALL_SERIES, ALL_TOPICS } from '@/lib/sermons'
import SermonArchiveCard from '@/components/ui/sermon-archive-card'

const MotionDiv = motion.div

const PAGE_SIZE = 12
type SortKey = 'newest' | 'oldest' | 'most-viewed'

interface Filters { speaker: string; series: string; topic: string }

function FilterSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border bg-transparent py-2.5 pl-4 pr-9 text-[13px] text-white/80 focus:outline-none"
        style={{
          borderColor: value ? 'rgba(42,47,170,0.5)' : 'rgba(255,255,255,0.12)',
          background: value ? 'rgba(42,47,170,0.08)' : 'rgba(255,255,255,0.04)',
        }}
        aria-label={label}
      >
        <option value="">{label}</option>
        {options.map(o => <option key={o} value={o} style={{ background: '#07071f' }}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
    </div>
  )
}

export default function SermonArchiveClient() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({ speaker: '', series: '', topic: '' })
  const [sort, setSort] = useState<SortKey>('newest')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const debouncedQuery = useDebounce(query, 300)
  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const results = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim()
    let list = ALL_SERMONS.filter(s => {
      if (q && !([s.title, s.speaker, s.scripture ?? '', s.series ?? '', ...(s.topic ?? [])].join(' ').toLowerCase().includes(q))) return false
      if (filters.speaker && s.speaker !== filters.speaker) return false
      if (filters.series && s.series !== filters.series) return false
      if (filters.topic && !s.topic?.includes(filters.topic)) return false
      return true
    })
    if (sort === 'newest')      list = [...list].sort((a, b) => b.date.localeCompare(a.date))
    else if (sort === 'oldest') list = [...list].sort((a, b) => a.date.localeCompare(b.date))
    else                        list = [...list].sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
    return list
  }, [debouncedQuery, filters, sort])

  const totalPages = Math.ceil(results.length / PAGE_SIZE)
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const setFilter = (key: keyof Filters, val: string) => { setFilters(f => ({ ...f, [key]: val })); setPage(1) }
  const clearFilters = () => { setFilters({ speaker: '', series: '', topic: '' }); setPage(1) }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 md:px-16">

      {/* ── Search + Sort ── */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by title, speaker, scripture, series…"
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(1) }}
            className="w-full rounded-2xl border py-3 pl-11 pr-10 text-[13px] text-white placeholder-white/30 focus:outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white" aria-label="Clear search">
              <X size={15} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFilters(o => !o)}
          className="flex items-center gap-2 rounded-2xl px-5 py-3 text-[13px] font-semibold transition-colors"
          style={{
            background: activeFilterCount > 0 ? 'rgba(42,47,170,0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${activeFilterCount > 0 ? 'rgba(42,47,170,0.4)' : 'rgba(255,255,255,0.1)'}`,
            color: activeFilterCount > 0 ? '#6670d0' : 'rgba(255,255,255,0.7)',
          }}
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-[#2A2FAA] px-1.5 py-0.5 text-[10px] font-black text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="relative w-44 flex-shrink-0">
          <select
            value={sort}
            onChange={e => { setSort(e.target.value as SortKey); setPage(1) }}
            className="w-full appearance-none rounded-2xl border bg-transparent py-3 pl-4 pr-9 text-[13px] text-white/70 focus:outline-none"
            style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
          >
            <option value="newest"     style={{ background: '#07071f' }}>Newest First</option>
            <option value="oldest"     style={{ background: '#07071f' }}>Oldest First</option>
            <option value="most-viewed" style={{ background: '#07071f' }}>Most Viewed</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
        </div>
      </div>

      {/* ── Filter panel ── */}
      <AnimatePresence>
        {showFilters && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 overflow-hidden"
          >
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FilterSelect label="All Speakers" value={filters.speaker} options={ALL_SPEAKERS} onChange={v => setFilter('speaker', v)} />
                <FilterSelect label="All Series"   value={filters.series}  options={ALL_SERIES}   onChange={v => setFilter('series', v)} />
                <FilterSelect label="All Topics"   value={filters.topic}   options={ALL_TOPICS}   onChange={v => setFilter('topic', v)} />
              </div>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="mt-3 text-[12px] text-white/40 underline hover:text-white/70">
                  Clear all filters
                </button>
              )}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(filters).filter(([, v]) => v).map(([key, val]) => (
            <span key={key} className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold"
              style={{ background: 'rgba(42,47,170,0.15)', color: '#6670d0', border: '1px solid rgba(42,47,170,0.3)' }}>
              {val}
              <button onClick={() => setFilter(key as keyof Filters, '')} aria-label={`Remove ${val} filter`}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Result count */}
      <p className="mb-6 text-[13px] text-white/40">
        {results.length} {results.length === 1 ? 'sermon' : 'sermons'} found
        {debouncedQuery && <> for &ldquo;<span className="text-white/60">{debouncedQuery}</span>&rdquo;</>}
      </p>

      {/* ── Grid ── */}
      {pageResults.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-xl font-bold text-white/30">No sermons found</p>
          <p className="mt-2 text-[13px] text-white/25">Try different search terms or clear your filters</p>
          <button onClick={() => { setQuery(''); clearFilters() }}
            className="mt-6 rounded-2xl px-6 py-3 text-sm font-bold text-white"
            style={{ background: '#2A2FAA' }}>
            Reset search
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <MotionDiv
            key={`${debouncedQuery}-${JSON.stringify(filters)}-${sort}-${page}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {pageResults.map((sermon, i) => (
              <SermonArchiveCard key={sermon.id} sermon={sermon} index={i} searchQuery={debouncedQuery} />
            ))}
          </MotionDiv>
        </AnimatePresence>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="rounded-xl px-4 py-2 text-[13px] font-semibold text-white/50 disabled:opacity-30 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)}
              className="h-9 w-9 rounded-xl text-[13px] font-bold transition-colors"
              style={{ background: n === page ? '#2A2FAA' : 'rgba(255,255,255,0.06)', color: n === page ? 'white' : 'rgba(255,255,255,0.5)' }}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="rounded-xl px-4 py-2 text-[13px] font-semibold text-white/50 disabled:opacity-30 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
