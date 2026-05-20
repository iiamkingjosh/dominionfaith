'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { JOIN_STEPS } from '@/data/join-steps'
import ProcessStep from '@/components/ui/process-step'
import ProgressLine from '@/components/ui/progress-line'

const MotionDiv = motion.div

export default function JoinProcessSection() {
  const [openStep, setOpenStep] = useState<number | null>(0)

  return (
    <section
      className="w-full py-24 md:py-32"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 15% 0%, rgba(42,47,170,0.28) 0%, transparent 55%),' +
          'radial-gradient(ellipse 60% 70% at 85% 100%, rgba(246,31,39,0.15) 0%, transparent 55%),' +
          'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)',
        borderTop: '1px solid rgba(42,47,170,0.2)',
      }}
      aria-labelledby="join-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">

        {/* ── Header ── */}
        <div className="mb-16 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Get Plugged In
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              id="join-heading"
              className="font-black tracking-tight text-white"
              style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}
            >
              Join Our{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2A2FAA 0%, #F61F27 50%, #F9A916 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Church Family
              </span>
            </h2>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-4 max-w-xl text-[14px] text-white/50"
          >
            Five simple steps to becoming a fully rooted member of Dominion Faith International Ministry.
          </MotionDiv>
        </div>

        {/* ── Desktop: circles + progress line + cards ── */}
        <div className="hidden md:block">
          {/* Progress line row */}
          <div className="relative mb-4 flex items-center justify-between px-10">
            <div className="absolute inset-x-10 top-1/2 -translate-y-1/2">
              <ProgressLine />
            </div>
            {JOIN_STEPS.map((step, i) => (
              <MotionDiv
                key={step.number}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-xl font-black text-white"
                style={{
                  background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}99 100%)`,
                  boxShadow: `0 0 24px ${step.color}44`,
                }}
              >
                {step.number}
              </MotionDiv>
            ))}
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-5 gap-4">
            {JOIN_STEPS.map((step, i) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={i}
                isOpen={false}
                onToggle={() => {}}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical timeline accordion ── */}
        <div className="relative md:hidden">
          {/* Left vertical line */}
          <div
            className="absolute bottom-0 left-5 top-0 w-px"
            style={{ background: 'rgba(255,255,255,0.08)' }}
            aria-hidden="true"
          />
          <div className="divide-y divide-white/5">
            {JOIN_STEPS.map((step, i) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={i}
                isOpen={openStep === i}
                onToggle={() => setOpenStep(prev => (prev === i ? null : i))}
              />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <MotionDiv
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/locations"
            className="group inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #2A2FAA 0%, #F9A916 100%)' }}
          >
            Start Your Journey
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </MotionDiv>

      </div>
    </section>
  )
}
