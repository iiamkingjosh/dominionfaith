'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Series } from '@/types/series'

const MotionDiv = motion.div

export default function FeaturedSeries({ series }: { series: Series[] }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const current = series[index]

  const go = useCallback((dir: number) => {
    setDirection(dir)
    setIndex(i => (i + dir + series.length) % series.length)
  }, [series.length])

  useEffect(() => {
    const timer = setInterval(() => go(1), 8000)
    return () => clearInterval(timer)
  }, [go])

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40, filter: 'blur(8px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.3 } }),
  }

  return (
    <div className="relative w-full overflow-hidden rounded-3xl" style={{ minHeight: 360 }}>
      <AnimatePresence custom={direction}>
        <MotionDiv
          key={current.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex flex-col justify-end p-8 md:p-12"
          style={{ background: current.gradient }}
        >
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} aria-hidden="true" />

          {/* Large watermark */}
          <span className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 font-black text-white/8 select-none"
            style={{ fontSize: 'clamp(80px, 14vw, 160px)' }}>
            {current.title.split(' ').map(w => w[0]).slice(0, 2).join('')}
          </span>

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">Featured Series</p>
            <h2 className="mb-3 font-black text-white" style={{ fontSize: 'clamp(26px, 4vw, 48px)' }}>
              {current.title}
            </h2>
            <p className="mb-6 line-clamp-2 text-[14px] leading-relaxed text-white/65">{current.description}</p>
            <div className="flex items-center gap-3">
              <Link
                href={`/media/series/${current.slug}`}
                className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <Play size={15} className="fill-white" />
                Start Series
              </Link>
              <span className="text-[12px] text-white/50">{current.sermonCount} messages</span>
            </div>
          </div>
        </MotionDiv>
      </AnimatePresence>

      {/* Nav arrows */}
      <button onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
        style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }} aria-label="Previous series">
        <ChevronLeft size={18} className="text-white" />
      </button>
      <button onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
        style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }} aria-label="Next series">
        <ChevronRight size={18} className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
        {series.map((_, i) => (
          <button key={i} onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === index ? 20 : 6, background: i === index ? 'white' : 'rgba(255,255,255,0.35)' }}
            aria-label={`Go to series ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}
