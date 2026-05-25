'use client'

import { motion, useReducedMotion } from 'framer-motion'

const MotionDiv = motion.div
const MotionH1  = motion.h1
const MotionP   = motion.p
const EASE_OUT  = [0.16, 1, 0.3, 1] as const

export default function HeroSection() {
  const prefersReduced = useReducedMotion()

  const fadeUp = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial:    { opacity: 0, y: 24 },
          animate:    { opacity: 1, y: 0  },
          transition: { duration: 0.6, delay, ease: EASE_OUT },
        }

  return (
    <section
      className="relative w-full overflow-hidden py-32 md:py-44"
      style={{ background: 'linear-gradient(160deg, #1a1f8f 0%, #2A2FAA 45%, #1e2380 100%)' }}
      aria-label="School of Ministry hero"
    >
      {/* Animated background orbs */}
      <MotionDiv
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #4a50cc 0%, transparent 65%)' }}
        animate={prefersReduced ? {} : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <MotionDiv
        className="pointer-events-none absolute -bottom-20 right-0 h-[500px] w-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #F9A916 0%, transparent 65%)' }}
        animate={prefersReduced ? {} : { x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 5 }}
        aria-hidden="true"
      />
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-16">
        {/* Badges */}
        <MotionDiv {...fadeUp(0)} className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
            style={{ background: 'rgba(246,31,39,0.15)', borderColor: 'rgba(246,31,39,0.35)' }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F61F27]" />
            New Intake — June 2025
          </span>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/80"
            style={{ borderColor: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)' }}
          >
            Online &amp; In-Person
          </span>
        </MotionDiv>

        {/* Eyebrow */}
        <MotionP {...fadeUp(0.05)} className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
          Dominion Faith International Ministry
        </MotionP>

        {/* H1 */}
        <MotionH1
          {...fadeUp(0.1)}
          className="mb-5 font-black leading-tight tracking-[-0.03em] text-white"
          style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
        >
          School of <span style={{ color: '#F9A916' }}>Ministry</span>
        </MotionH1>

        {/* Subheading */}
        <MotionP
          {...fadeUp(0.2)}
          className="mx-auto mb-10 max-w-xl text-[16px] leading-relaxed text-white/65 md:text-lg"
        >
          Equipping believers with the Word, wisdom, and spiritual authority to transform their world
        </MotionP>

        {/* CTAs */}
        <MotionDiv {...fadeUp(0.3)} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#enroll"
            className="rounded-full px-8 py-3.5 text-sm font-black transition-opacity hover:opacity-85"
            style={{ background: '#F9A916', color: '#1a1206', boxShadow: '0 4px 20px rgba(249,169,22,0.45)' }}
          >
            Enroll Now
          </a>
          <a
            href="#courses"
            className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            Learn More
          </a>
        </MotionDiv>
      </div>
    </section>
  )
}
