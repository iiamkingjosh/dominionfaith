'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type NavChild = { label: string; href: string }
type NavItem = { label: string; href: string; children?: NavChild[] }

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Ministries',
    href: '/ministries',
    children: [
      { label: 'Leadership', href: '/leadership' },
      { label: 'School of Ministry', href: '/school-of-ministry' },
      { label: 'Departments', href: '/departments' },
      { label: 'House Fellowship', href: '/house-fellowship' },
    ],
  },
  { label: 'Media', href: '/media' },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Events', href: '/events' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

// ── Framer Motion variants ────────────────────────────────────────────────────
// Note: cubic-bezier arrays because Framer Motion cannot parse var(--ease-out).
// The same curves are defined as CSS custom properties for use outside FM.

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const EASE_DRAWER = [0.32, 0.72, 0, 1] as const

const navVariants = {
  visible: { y: 0,      opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } },
  hidden:  { y: '-110%', opacity: 0, transition: { duration: 0.2, ease: EASE_OUT } },
}

const overlayVariants = {
  open:   { opacity: 1, scale: 1,    transition: { duration: 0.3,  ease: EASE_DRAWER } },
  closed: { opacity: 0, scale: 0.98, transition: { duration: 0.25, ease: EASE_DRAWER } },
}

const linkListVariants = {
  open:   { transition: { staggerChildren: 0.04 } },
  closed: {},
}

const linkItemVariants = {
  open:   { y: 0,  opacity: 1, transition: { duration: 0.3, ease: EASE_OUT } },
  closed: { y: 16, opacity: 0 },
}

const dropdownVariants = {
  open:   { opacity: 1, y: 0,  transition: { duration: 0.2,  ease: EASE_OUT } },
  closed: { opacity: 0, y: -8, transition: { duration: 0.15, ease: EASE_OUT } },
}

// ── useScrollDirection ────────────────────────────────────────────────────────

function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [scrolled, setScrolled]   = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (y < 80) {
        setDirection('up')
      } else if (y > lastY.current) {
        setDirection('down')
      } else {
        setDirection('up')
      }
      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { direction, scrolled }
}

// ── MobileAccordion ───────────────────────────────────────────────────────────

function MobileAccordion({
  item,
  pathname,
  onClose,
}: {
  item: NavItem
  pathname: string
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/[0.07]">
      <button
        className="flex w-full items-center justify-between py-3 text-[22px] font-bold text-white"
        onClick={() => setOpen((o) => !o)}
      >
        {item.label}
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.25, ease: EASE_DRAWER } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: EASE_OUT } }}
            className="overflow-hidden pl-4 pb-2 list-none"
          >
            {item.children!.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={onClose}
                  className={`block py-2.5 text-base ${
                    pathname === child.href
                      ? 'font-semibold text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────

export default function Nav() {
  const pathname           = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const { direction, scrolled } = useScrollDirection()

  const [isMobileOpen,   setIsMobileOpen]   = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close on route change
  useEffect(() => {
    setIsMobileOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Lock body scroll when mobile overlay open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  // Close dropdown on outside click
  useEffect(() => {
    if (!activeDropdown) return
    const handler = () => setActiveDropdown(null)
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [activeDropdown])

  // Clear close timer on unmount to prevent state updates on an unmounted component
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const handleDropdownEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(label)
  }

  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  const navAnimate = shouldReduceMotion
    ? undefined
    : direction === 'down' ? 'hidden' : 'visible'

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-6 pointer-events-none"
      variants={navVariants}
      initial="visible"
      animate={navAnimate}
    >
      {/* ── Pill ── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="pointer-events-auto relative flex w-full max-w-[1100px] items-center rounded-full border px-5 py-2.5"
        style={{
          background:           scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
          backdropFilter:       `blur(var(--nav-blur))`,
          WebkitBackdropFilter: `blur(var(--nav-blur))`,
          borderColor:          'var(--nav-border)',
          boxShadow:            '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 mr-auto">
          <Image
            src="/logo.png"
            alt="Dominion Faith International Ministry"
            width={44}
            height={44}
            className="rounded-full object-contain"
            priority
          />
        </Link>

        {/* Desktop centre links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex list-none">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveDropdown((a) => (a === item.label ? null : item.label))
                }}
              >
                <span
                  className={`flex cursor-pointer items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors select-none ${
                    pathname.startsWith(item.href)
                      ? 'bg-white/15 text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`}
                  />
                </span>

                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.ul
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="absolute left-0 top-full mt-2 w-52 rounded-2xl p-2 list-none"
                      style={{
                        background:           'rgba(10,10,35,0.92)',
                        backdropFilter:       'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border:               '1px solid rgba(255,255,255,0.1)',
                        boxShadow:            '0 16px 48px rgba(0,0,0,0.5)',
                      }}
                    >
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                              pathname === child.href
                                ? 'bg-white/10 text-white'
                                : 'text-white/75 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`block rounded-full px-3 py-1.5 text-sm transition-colors ${
                    pathname === item.href
                      ? 'bg-white/15 text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Desktop CTAs */}
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Link
            href="/give"
            className="rounded-full px-5 py-2 text-sm font-bold text-white"
            style={{
              background:  'var(--color-give)',
              boxShadow:   '0 2px 12px rgba(246,31,39,0.4)',
            }}
          >
            Give
          </Link>
          <Link
            href="/live"
            className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold"
            style={{
              background:  'var(--color-live)',
              color:       '#1a1206',
              boxShadow:   '0 2px 12px rgba(249,169,22,0.35)',
            }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
            Watch Live
          </Link>
        </div>

        {/* Mobile hamburger — always labelled "Open menu"; overlay X button handles "Close menu" */}
        <button
          className="ml-auto flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setIsMobileOpen((o) => !o)}
          aria-label="Open menu"
          aria-expanded={isMobileOpen}
        >
          <motion.span
            className="block h-0.5 w-5 origin-center rounded-sm bg-white"
            animate={shouldReduceMotion ? undefined : (isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 })}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          />
          <motion.span
            className="block h-0.5 w-3.5 rounded-sm bg-white"
            animate={shouldReduceMotion ? undefined : (isMobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 })}
            transition={{ duration: 0.15, ease: EASE_OUT }}
          />
          <motion.span
            className="block h-0.5 w-5 origin-center rounded-sm bg-white"
            animate={shouldReduceMotion ? undefined : (isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 })}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          />
        </button>
      </nav>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={shouldReduceMotion
              ? { open: { opacity: 1, transition: { duration: 0.2 } }, closed: { opacity: 0, transition: { duration: 0.15 } } }
              : overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 flex flex-col p-6"
            style={{
              background:           'rgba(8,8,28,0.95)',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Overlay top row */}
            <div className="mb-10 flex items-center justify-between">
              <Link href="/" onClick={() => setIsMobileOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="Dominion Faith International Ministry"
                  width={36}
                  height={36}
                  className="rounded-full object-contain"
                />
              </Link>
              <button
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Overlay links */}
            <motion.ul
              variants={linkListVariants}
              initial="closed"
              animate="open"
              className="flex flex-1 flex-col list-none"
            >
              {NAV_ITEMS.map((item) => (
                <motion.li key={item.label} variants={linkItemVariants}>
                  {item.children ? (
                    <MobileAccordion
                      item={item}
                      pathname={pathname}
                      onClose={() => setIsMobileOpen(false)}
                    />
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block border-b border-white/[0.07] py-3 text-[22px] font-bold text-white hover:text-white/80"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>

            {/* Overlay CTAs */}
            <div className="mt-8 flex gap-3">
              <Link
                href="/give"
                onClick={() => setIsMobileOpen(false)}
                className="flex-1 rounded-full py-3 text-center text-sm font-bold text-white"
                style={{ background: 'var(--color-give)' }}
              >
                Give
              </Link>
              <Link
                href="/live"
                onClick={() => setIsMobileOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-bold"
                style={{ background: 'var(--color-live)', color: '#1a1206' }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
                Watch Live
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
