'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'

// ── Types + Data ──────────────────────────────────────────────────────────────

type Service = { day: string; name?: string; time: string }

const SERVICES: Service[] = [
  { day: 'Sunday',    name: 'Temple Celebration',  time: '9am' },
  { day: 'Wednesday', name: 'Housecare Fellowship', time: '7pm' },
  { day: 'Friday',    name: 'Dominion Service',     time: '5pm' },
]

// ── Framer Motion variants ────────────────────────────────────────────────────
// Raw cubic-bezier array — Framer Motion cannot parse var(--ease-out).

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 64, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

const itemVariantsReduced = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Hero() {
  const ref              = useRef<HTMLElement>(null)
  const isInView         = useInView(ref, { once: true, amount: 0.2 })
  const shouldReduceMotion = useReducedMotion()

  const item = shouldReduceMotion ? itemVariantsReduced : itemVariants

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
      aria-label="Hero"
    >
      {/* Animated gradient mesh — defined in globals.css */}
      <div aria-hidden="true" className="hero-bg absolute inset-0" />

      {/* Subtle grid overlay */}
      <div aria-hidden="true" className="hero-grid absolute inset-0" />

      {/* Content column */}
      <motion.div
        className="relative z-10 flex max-w-[780px] flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Eyebrow pill */}
        <motion.div
          variants={item}
          className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            background:  'rgba(255,255,255,0.06)',
            borderColor: 'rgba(255,255,255,0.10)',
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: 'var(--color-live)' }}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
            Dominion Faith International Ministry
          </span>
        </motion.div>

        {/* Display headline */}
        <motion.h1
          variants={item}
          className="mb-6 font-black leading-none tracking-[-0.04em] text-white"
          style={{ fontSize: 'var(--text-hero)' }}
        >
          A Place Where Champions are Made
        </motion.h1>

        {/* Mission statement */}
        <motion.p
          variants={item}
          className="mb-10 max-w-[600px] italic leading-[1.75] text-white/55"
          style={{ fontSize: 'var(--hero-mission-size)' }}
        >
          For over a decade, we have been committed to raising believers who do
          not just survive life but{' '}
          <strong className="font-semibold not-italic text-white/85">
            dominate it.
          </strong>{' '}
          Champions are not born, they are made. And God has called each one of
          you for{' '}
          <strong className="font-semibold not-italic text-white/85">
            greatness.
          </strong>
        </motion.p>

        {/* Service time cards */}
        <motion.div
          variants={item}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {SERVICES.map((s) => (
            <div
              key={s.day}
              className="rounded-2xl px-6 py-[18px] text-center"
              style={{
                background:           'var(--hero-card-bg)',
                border:               '1px solid var(--hero-card-border)',
                backdropFilter:       'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                minWidth:             '128px',
              }}
            >
              <p
                className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                style={{ color: 'var(--color-live)' }}
              >
                {s.day}
              </p>
              {s.name && (
                <p className="mb-2 text-[9px] uppercase tracking-[0.05em] text-white/45">
                  {s.name}
                </p>
              )}
              <p className="text-[26px] font-extrabold leading-none text-white">
                {s.time}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="mb-6 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/visit"
            className="w-full rounded-full px-8 py-3.5 text-center text-sm font-bold text-white sm:w-auto"
            style={{
              background: 'var(--color-primary)',
              boxShadow:  '0 4px 24px rgba(42,47,170,0.5)',
            }}
          >
            Plan Your Visit
          </Link>
          <Link
            href="/live"
            className="flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white sm:w-auto"
            style={{
              background: '#F61F27',
              boxShadow:  '0 4px 24px rgba(246,31,39,0.4)',
            }}
          >
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-white" />
            Watch Live
          </Link>
        </motion.div>

        {/* Location */}
        <motion.p
          variants={item}
          className="flex items-center gap-1.5 text-[11px] tracking-[0.04em] text-white/30"
        >
          <svg
            width="11" height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          1 Dominion Avenue, Onireke, Lagos
        </motion.p>
      </motion.div>
    </section>
  )
}
