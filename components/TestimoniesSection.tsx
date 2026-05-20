'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import type { TestimonySlide, TextTestimony, VideoTestimony } from '@/types/testimony'

// ── Types ─────────────────────────────────────────────────────
interface Props {
  slides: TestimonySlide[]
}

// ── Constants ─────────────────────────────────────────────────
const EASE_OUT = [0.16, 1, 0.3, 1] as const
const MotionDiv = motion.div

// ── Share helpers ─────────────────────────────────────────────
function buildShareUrls(testimony: VideoTestimony) {
  const text = encodeURIComponent(`"${testimony.quote}" — ${testimony.name} | Dominion Faith`)
  const url  = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.href : 'https://dominionfaith.org/testimonies'
  )
  return {
    twitter:   `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp:  `https://wa.me/?text=${text}%20${url}`,
  }
}

// ── Twitter SVG ───────────────────────────────────────────────
function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  )
}

// ── Facebook SVG ──────────────────────────────────────────────
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

// ── WhatsApp SVG ──────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// ── ShareButtons ──────────────────────────────────────────────
function ShareButtons({ testimony }: { testimony: VideoTestimony }) {
  const urls = buildShareUrls(testimony)
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40">
        Share
      </span>
      <a
        href={urls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      >
        <TwitterIcon />
      </a>
      <a
        href={urls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80"
        style={{ background: 'rgba(24,119,242,0.25)' }}
      >
        <FacebookIcon />
      </a>
      <a
        href={urls.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80"
        style={{ background: 'rgba(37,211,102,0.25)' }}
      >
        <WhatsAppIcon />
      </a>
    </div>
  )
}

// ── FeaturedVideo ─────────────────────────────────────────────
function FeaturedVideo({ testimony }: { testimony: VideoTestimony }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Pause (unmount iframe) when scrolled out of view
  useEffect(() => {
    if (!isPlaying || !containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) setIsPlaying(false) },
      { threshold: 0.2 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [isPlaying])

  // Reset play state when testimony changes (slide advance)
  useEffect(() => { setIsPlaying(false) }, [testimony.id])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl"
      style={{ minHeight: '400px' }}
    >
      {isPlaying && testimony.videoId ? (
        /* ── Playing state ── */
        <iframe
          src={`https://www.youtube.com/embed/${testimony.videoId}?autoplay=1&enablejsapi=1&rel=0`}
          title={`Testimony: ${testimony.name}`}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
        />
      ) : (
        /* ── Thumbnail / gradient state ── */
        <>
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(42,47,170,0.6) 0%, rgba(168,85,247,0.4) 50%, rgba(12,12,40,0.95) 100%)',
            }}
          />

          {/* Quote overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(7,7,31,0.96) 0%, rgba(7,7,31,0.4) 50%, transparent 100%)',
              }}
            />
            <div className="relative z-10">
              <p
                className="mb-4 text-lg font-semibold italic leading-relaxed text-white/90 md:text-xl"
                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
              >
                &ldquo;{testimony.quote}&rdquo;
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white">{testimony.name}</p>
                  {testimony.role && (
                    <p className="text-[12px] text-white/50">{testimony.role}</p>
                  )}
                  <span
                    className="mt-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold"
                    style={{
                      background: 'var(--color-success-bg)',
                      color: 'var(--color-success)',
                      border: '1px solid var(--color-success-border)',
                    }}
                  >
                    {testimony.transformationTag}
                  </span>
                </div>
                <ShareButtons testimony={testimony} />
              </div>
            </div>
          </div>

          {/* Custom play button — only shown when videoId is present */}
          {testimony.videoId && (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play testimony video for ${testimony.name}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 items-center justify-center rounded-full transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                border: '2px solid rgba(255,255,255,0.4)',
              }}
            >
              <Play className="h-8 w-8 fill-white text-white" style={{ marginLeft: '4px' }} aria-hidden="true" />
              <span className="sr-only">Play</span>
            </button>
          )}
        </>
      )}
    </div>
  )
}

// ── TextCard ──────────────────────────────────────────────────
function TextCard({ testimony }: { testimony: TextTestimony }) {
  return (
    <div
      className="flex flex-col gap-4 rounded-2xl p-5"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Quote */}
      <p className="flex-1 text-[13px] italic leading-relaxed text-white/70">
        &ldquo;{testimony.quote}&rdquo;
      </p>

      {/* Person row */}
      <div className="flex items-center gap-3">
        {/* Circular photo / placeholder */}
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, rgba(42,47,170,0.6) 0%, rgba(168,85,247,0.5) 100%)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}
          aria-hidden="true"
        >
          {testimony.photo ? (
            <img
              src={testimony.photo}
              alt={testimony.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            testimony.name.charAt(testimony.name.lastIndexOf(' ') + 1)
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">{testimony.name}</p>
          {testimony.role && (
            <p className="truncate text-[11px] text-white/40">{testimony.role}</p>
          )}
        </div>
      </div>

      {/* Transformation tag */}
      <span
        className="w-fit rounded-full px-3 py-1 text-[11px] font-bold"
        style={{
          background: 'var(--color-success-bg)',
          color: 'var(--color-success)',
          border: '1px solid var(--color-success-border)',
        }}
      >
        {testimony.transformationTag}
      </span>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────
export default function TestimoniesSection({ slides }: Props) {
  const [current, setCurrent]     = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const sectionRef                = useRef<HTMLElement>(null)

  const total = slides.length

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(c => (c + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(c => (c - 1 + total) % total)
  }, [total])

  // Arrow key navigation on the section
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
    },
    [next, prev],
  )

  const slide = slides[current]

  return (
    <section
      ref={sectionRef}
      aria-label="Champions Rising — Testimonies"
      onKeyDown={handleKeyDown}
    >
      {/* ── Section heading ── */}
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            background: 'var(--color-success-bg)',
            borderColor: 'var(--color-success-border)',
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-success)' }} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--color-success)' }}>
            Testimonies
          </span>
        </div>
        <h2
          className="font-black text-white leading-none tracking-[-0.03em]"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
        >
          Champions Rising
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/45">
          Real lives. Real transformation. God is still in the business of miracles —
          and every champion here started exactly where you are.
        </p>
      </div>

      {/* ── Slide ── */}
      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          <MotionDiv
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {/* Featured video */}
            <div className="mb-6">
              <FeaturedVideo testimony={slide.featured} />
            </div>

            {/* Text testimony cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {slide.cards.map(card => (
                <TextCard key={card.id} testimony={card} />
              ))}
            </div>
          </MotionDiv>
        </AnimatePresence>
      </div>

      {/* ── Carousel navigation ── */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimony"
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <ChevronLeft className="h-5 w-5 text-white" aria-hidden="true" />
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2" aria-label="Testimony slides">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-current={i === current ? 'true' : undefined}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => { setDirection(i > current ? 1 : -1); goTo(i) }}
              className="rounded-full transition-all duration-300"
              style={{
                width:      i === current ? '24px' : '8px',
                height:     '8px',
                background: i === current ? 'var(--color-success)' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next testimony"
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <ChevronRight className="h-5 w-5 text-white" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
