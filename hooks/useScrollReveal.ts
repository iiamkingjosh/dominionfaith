import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface UseScrollRevealOptions {
  once?: boolean
  margin?: string
  amount?: number
}

/**
 * Returns { ref, isVisible, reduced } for manual animation control.
 * Use this when you need fine-grained control instead of <ScrollReveal />.
 *
 * @example
 * const { ref, isVisible } = useScrollReveal()
 * <motion.div ref={ref} animate={isVisible ? 'visible' : 'hidden'} variants={...} />
 */
export function useScrollReveal({
  once = true,
  margin = '-80px',
  amount = 0,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useInView(ref, {
    once,
    margin: margin as `${number}px`,
    amount,
  })
  const reduced = useReducedMotion()

  return { ref, isVisible, reduced }
}
