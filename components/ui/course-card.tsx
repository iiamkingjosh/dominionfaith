'use client'

import { motion } from 'framer-motion'
import type { Course } from '@/data/courses'

const MotionDiv = motion.div
const EASE_OUT  = [0.16, 1, 0.3, 1] as const

interface CourseCardProps {
  course: Course
  index: number
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const Icon = course.icon

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="group flex flex-col gap-4 rounded-2xl p-6"
      style={{
        background:   'rgba(12,12,40,0.7)',
        border:       '1px solid rgba(255,255,255,0.08)',
        borderLeft:   '3px solid #2A2FAA',
        boxShadow:    '0 4px 24px rgba(0,0,0,0.3)',
        transition:   'border-left-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderLeft = '3px solid #F9A916'
        el.style.boxShadow  = '0 8px 40px rgba(249,169,22,0.15)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderLeft = '3px solid #2A2FAA'
        el.style.boxShadow  = '0 4px 24px rgba(0,0,0,0.3)'
      }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
        style={{ background: 'rgba(42,47,170,0.15)', border: '1px solid rgba(42,47,170,0.25)' }}
      >
        <Icon size={20} style={{ color: '#2A2FAA' }} aria-hidden="true" />
      </div>
      <h3 className="text-[15px] font-bold text-white">{course.title}</h3>
      <p className="text-[13px] leading-relaxed text-white/50">{course.description}</p>
    </MotionDiv>
  )
}
