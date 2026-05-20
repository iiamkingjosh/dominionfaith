'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const MotionDiv = motion.div

interface PillarCardProps {
  icon: ReactNode
  title: string
  description: string
  accentColor: string
  bgColor: string
  borderColor: string
  iconBgColor: string
  delay?: number
}

export default function PillarCard({
  icon,
  title,
  description,
  accentColor,
  bgColor,
  borderColor,
  iconBgColor,
  delay = 0,
}: PillarCardProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-5 rounded-2xl p-8"
      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ background: iconBgColor, color: accentColor }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/60">{description}</p>
    </MotionDiv>
  )
}
