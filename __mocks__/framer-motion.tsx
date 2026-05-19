import React from 'react'

type AnyProps = { children?: React.ReactNode; [key: string]: any }

const MOTION_PROPS = new Set([
  'animate', 'initial', 'exit', 'variants', 'transition',
  'whileHover', 'whileTap', 'whileFocus', 'drag', 'dragConstraints',
  'onAnimationComplete', 'layout', 'layoutId',
])

function stripMotion(props: AnyProps) {
  const clean: AnyProps = {}
  for (const [k, v] of Object.entries(props)) {
    if (!MOTION_PROPS.has(k)) clean[k] = v
  }
  return clean
}

const motion = new Proxy({} as Record<string, React.FC<AnyProps>>, {
  get: (_, tag: string) => {
    const El = React.forwardRef<HTMLElement, AnyProps>(
      ({ children, ...props }, ref) =>
        React.createElement(tag, { ref, ...stripMotion(props) }, children)
    )
    El.displayName = `motion.${tag}`
    return El
  },
})

const AnimatePresence = ({ children }: AnyProps) => (
  <React.Fragment>{children}</React.Fragment>
)

const useReducedMotion = () => false

const useInView = () => true

export { motion, AnimatePresence, useReducedMotion, useInView }
