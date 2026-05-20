'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { Step } from '@/data/join-steps'

const MotionDiv = motion.div

interface ProcessStepProps {
  step: Step
  index: number
  isOpen: boolean
  onToggle: () => void
}

export default function ProcessStep({ step, index, isOpen, onToggle }: ProcessStepProps) {
  const Icon = step.icon

  return (
    <>
      {/* ── Desktop card (md+) ── */}
      <MotionDiv
        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block"
      >
        <MotionDiv
          whileHover={{ y: -5, boxShadow: `0 16px 40px ${step.color}30` }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="flex h-full flex-col items-center gap-3 rounded-2xl p-6 text-center"
          style={{ background: `${step.color}0a`, border: `1px solid ${step.color}25` }}
        >
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ background: `${step.color}18`, color: step.color }}
          >
            <Icon size={22} />
          </div>
          <h3 className="text-[15px] font-bold text-white">{step.title}</h3>
          <p className="text-[12px] font-medium text-white/55">{step.description}</p>
          <p className="text-[11px] leading-relaxed text-white/35">{step.detail}</p>
        </MotionDiv>
      </MotionDiv>

      {/* ── Mobile accordion item ── */}
      <div className="relative pl-14 md:hidden">
        {/* Circle on the left timeline */}
        <div
          className="absolute left-0 top-[14px] flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white"
          style={{
            background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}99 100%)`,
          }}
          aria-hidden="true"
        >
          {step.number}
        </div>

        {/* Accordion trigger */}
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between py-4 text-left"
          aria-expanded={isOpen}
        >
          <div>
            <p className="font-bold text-white">{step.title}</p>
            <p className="text-[12px] text-white/50">{step.description}</p>
          </div>
          <ChevronDown
            size={16}
            className={`ml-3 flex-shrink-0 text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        {/* Accordion body */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <MotionDiv
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                <div
                  className="flex items-start gap-3 rounded-xl p-4"
                  style={{ background: `${step.color}0a`, border: `1px solid ${step.color}22` }}
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${step.color}18`, color: step.color }}
                  >
                    <Icon size={16} />
                  </div>
                  <p className="text-[13px] leading-relaxed text-white/60">{step.detail}</p>
                </div>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
