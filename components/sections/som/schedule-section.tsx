'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Laptop, MapPin } from 'lucide-react'
import ModeCard from '@/components/ui/mode-card'

const MotionDiv = motion.div
const EASE_OUT  = [0.16, 1, 0.3, 1] as const

function useCountUp(target: number, duration = 2000) {
  const prefersReduced = useReducedMotion()
  const [count, setCount] = useState(prefersReduced ? target : 0)
  const ref               = useRef<HTMLDivElement>(null)
  const hasRun            = useRef(false)

  useEffect(() => {
    if (prefersReduced) { setCount(target); return }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasRun.current) return
      hasRun.current = true
      observer.disconnect()
      const startTime = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased    = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, prefersReduced])

  return { count, ref }
}

export default function ScheduleSection() {
  const { count, ref } = useCountUp(30000)

  return (
    <section
      className="w-full py-24"
      style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-16">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">Join Us</p>
          <h2
            className="font-black leading-tight tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            Schedule &amp; <span style={{ color: '#F9A916' }}>Fees</span>
          </h2>
        </div>

        {/* Mode cards */}
        <div className="mb-14 flex flex-col gap-5 sm:flex-row">
          <ModeCard
            icon={Laptop}
            title="Online"
            note="Available on Google Meet & Teams"
            schedule={{ saturday: '7:00 PM', sunday: '7:00 PM' }}
            highlighted
          />
          <ModeCard
            icon={MapPin}
            title="In-Person"
            note="At all district churches"
            schedule={{ saturday: '4:00 PM', sunday: '2:00 PM' }}
          />
        </div>

        {/* Fees card */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-8 rounded-3xl p-8 text-center"
          style={{ background: 'rgba(12,12,40,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">Programme Fee</p>
          <div ref={ref} className="mb-2 font-black" style={{ fontSize: 'clamp(40px,6vw,72px)', color: '#2A2FAA' }}>
            ₦{count.toLocaleString()}
          </div>
          <p className="mb-1 text-[14px] text-white/50">Total fee — covers all 8 courses</p>
          <p className="text-[13px] text-white/35">Registration fee: ₦10,000 (commitment, paid upfront)</p>
          <div
            className="mx-auto mt-6 max-w-sm rounded-2xl p-4 text-left text-[12px]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="mb-1 font-bold text-white/60">Bank Transfer Details</p>
            <p className="leading-relaxed text-white/40">
              Account Name: Dominion Faith In&apos;l School of Ministry<br />
              Bank: Globus Bank PLC<br />
              Account No: <strong className="text-white/60">1000389027</strong>
            </p>
          </div>
          <p className="mt-3 text-[12px] text-white/30">Proof of payment required in the application form below.</p>
        </MotionDiv>

        {/* Intake banner */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          className="flex flex-col items-center justify-between gap-4 rounded-2xl px-8 py-6 sm:flex-row"
          style={{ background: '#F9A916' }}
        >
          <p className="text-[15px] font-black" style={{ color: '#1a1206' }}>
            🎓 Next Intake: June 2025 — Applications Now Open
          </p>
          <a
            href="#enroll"
            className="flex-shrink-0 rounded-full px-7 py-2.5 text-sm font-black text-white transition-opacity hover:opacity-85"
            style={{ background: '#2A2FAA' }}
          >
            Apply Now
          </a>
        </MotionDiv>
      </div>
    </section>
  )
}
