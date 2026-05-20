'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const MotionDiv = motion.div

export default function ProgressLine({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className={`relative h-px bg-white/10 ${className}`}>
      <MotionDiv
        className="absolute inset-0 origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        style={{
          background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #f97316 100%)',
        }}
      />
    </div>
  )
}
