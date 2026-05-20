'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

// ── Stable motion references ────────────────────────────────────
const MotionDiv = motion.div

const EASE = [0.23, 1, 0.32, 1] as const

// ── ScrollReveal ────────────────────────────────────────────────

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  variant?: 'fade-up' | 'scale' | 'slide'
  delay?: number
  duration?: number
  className?: string
  margin?: string
}

export function ScrollReveal({
  children,
  direction = 'up',
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  className,
  margin = '-80px',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: margin as `${number}px` })
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  const hidden =
    variant === 'scale'
      ? { opacity: 0, scale: 0.95 }
      : {
          opacity: 0,
          filter: 'blur(8px)',
          y: direction === 'up' ? 64 : direction === 'down' ? -64 : 0,
          x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
        }

  const visible =
    variant === 'scale'
      ? { opacity: 1, scale: 1, transition: { duration, delay, ease: EASE } }
      : { opacity: 1, filter: 'blur(0px)', y: 0, x: 0, transition: { duration, delay, ease: EASE } }

  return (
    <MotionDiv
      ref={ref}
      initial={hidden}
      animate={inView ? visible : hidden}
      className={className}
    >
      {children}
    </MotionDiv>
  )
}

// ── StaggerContainer ────────────────────────────────────────────

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
  margin?: string
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
  margin = '-60px',
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: margin as `${number}px` })
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <MotionDiv
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden:  { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </MotionDiv>
  )
}

// ── StaggerItem ─────────────────────────────────────────────────

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <MotionDiv
      variants={{
        hidden:  { y: 32, opacity: 0, filter: 'blur(4px)' },
        visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </MotionDiv>
  )
}

// ── SectionReveal: wraps an entire section hero block ───────────

interface SectionRevealProps {
  children: ReactNode
  className?: string
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className={className}
    >
      {children}
    </MotionDiv>
  )
}
