'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { GraduationCap, BookOpen, Users, CalendarDays } from 'lucide-react'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 64, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE_OUT } },
}

const itemVariantsReduced = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

const STATS = [
  { icon: BookOpen,      value: '8',            label: 'Courses'         },
  { icon: Users,         value: '2',            label: 'Study Modes'     },
  { icon: CalendarDays,  value: 'June 2025',    label: 'Next Intake'     },
  { icon: GraduationCap, value: 'Certificate',  label: 'Award'           },
]

export default function HeroSection() {
  const ref            = useRef<HTMLElement>(null)
  const isInView       = useInView(ref, { once: true, amount: 0.2 })
  const prefersReduced = useReducedMotion()

  const item = prefersReduced ? itemVariantsReduced : itemVariants

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 md:px-16 lg:px-24"
      aria-label="School of Ministry hero"
    >
      {/* Animated gradient mesh — same as homepage */}
      <div aria-hidden="true" className="hero-bg absolute inset-0" />
      <div aria-hidden="true" className="hero-grid absolute inset-0" />

      <motion.div
        className="relative z-10 flex w-full flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Eyebrow pill */}
        <motion.div
          variants={item}
          className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.10)' }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: 'var(--color-live)' }} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
            Dominion Faith International Ministry
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mb-4 font-black leading-none tracking-[-0.04em] text-white"
          style={{ fontSize: 'var(--text-hero)' }}
        >
          School of <span style={{ color: '#F9A916' }}>Ministry</span>
        </motion.h1>

        {/* Scholarly sub-copy — italic, same style as homepage mission */}
        <motion.p
          variants={item}
          className="mb-10 max-w-2xl italic leading-[1.75] text-white/55"
          style={{ fontSize: 'var(--hero-mission-size)' }}
        >
          Every believer carries a{' '}
          <strong className="font-semibold not-italic text-white/85">divine mandate.</strong>{' '}
          The School of Ministry exists to equip you with the Word, wisdom, and spiritual authority
          to walk in that mandate and{' '}
          <strong className="font-semibold not-italic text-white/85">transform your world.</strong>
        </motion.p>

        {/* Academic stat cards — same shell as homepage service cards */}
        <motion.div variants={item} className="mb-10 flex flex-wrap justify-center gap-3">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2.5 rounded-2xl px-6 py-[18px] text-center"
              style={{
                background:           'var(--hero-card-bg)',
                border:               '1px solid var(--hero-card-border)',
                backdropFilter:       'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                minWidth:             '128px',
              }}
            >
              <Icon size={15} style={{ color: '#F9A916' }} aria-hidden="true" />
              <p className="text-[22px] font-extrabold leading-none text-white">{value}</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/40">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTAs — same layout as homepage */}
        <motion.div
          variants={item}
          className="mb-6 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href="#enroll"
            className="w-full rounded-full px-8 py-3.5 text-center text-sm font-bold text-white sm:w-auto"
            style={{ background: 'var(--color-primary)', boxShadow: '0 4px 24px rgba(42,47,170,0.5)' }}
          >
            Enroll Now
          </a>
          <a
            href="#courses"
            className="flex w-full items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold sm:w-auto"
            style={{
              color:       '#F9A916',
              borderColor: 'rgba(249,169,22,0.35)',
              background:  'rgba(249,169,22,0.08)',
            }}
          >
            View Courses
          </a>
        </motion.div>

        {/* Intake notice — like the location line on homepage */}
        <motion.p
          variants={item}
          className="flex items-center gap-1.5 text-[11px] tracking-[0.04em] text-white/30"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F61F27]" />
          New Intake: June 2025 — Applications Now Open · Online &amp; In-Person
        </motion.p>
      </motion.div>
    </section>
  )
}
