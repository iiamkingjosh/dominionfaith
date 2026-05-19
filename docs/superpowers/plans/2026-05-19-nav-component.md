# Dominion Faith Nav Component — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js 14 App Router project from scratch and implement a single-file, animated glass-morphism floating pill navigation component for Dominion Faith International Ministry.

**Architecture:** All project files are created manually (no `create-next-app`) for full control. The Nav lives in `components/Nav.tsx` as a single `'use client'` component containing an internal `useScrollDirection` hook, all Framer Motion variants, desktop dropdown, and mobile overlay. Jest + Testing Library cover behaviour; Framer Motion is mocked so tests run without animation overhead.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Framer Motion, Lucide React, Jest 29, @testing-library/react 16

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Create | Dependencies + scripts |
| `next.config.ts` | Create | Next.js config |
| `tsconfig.json` | Create | TypeScript config |
| `tailwind.config.ts` | Create | Tailwind content paths |
| `postcss.config.js` | Create | Autoprefixer + Tailwind |
| `jest.config.ts` | Create | Jest + Next.js transform |
| `jest.setup.ts` | Create | @testing-library/jest-dom |
| `__mocks__/framer-motion.tsx` | Create | Strip animation props in tests |
| `styles/dominion-faith-design-system.css` | Create | All CSS custom properties |
| `app/globals.css` | Create | Import design system + Tailwind |
| `app/layout.tsx` | Create | Root layout, mounts `<Nav />` |
| `app/page.tsx` | Create | Home placeholder |
| `components/Nav.tsx` | Create | The full navigation component |
| `public/logo.png` | Restore | Church logo (from git history) |
| `__tests__/Nav.test.tsx` | Create | Behaviour tests |

---

## Task 1: Project scaffold

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "dominion-faith",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "test:watch": "jest --watch",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4",
    "autoprefixer": "^10",
    "postcss": "^8",
    "@testing-library/react": "^16",
    "@testing-library/jest-dom": "^6",
    "@testing-library/user-event": "^14",
    "@types/jest": "^29",
    "jest": "^29",
    "jest-environment-jsdom": "^29"
  }
}
```

- [ ] **Step 2: Create `next.config.ts`**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Create `postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 6: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 7: Commit**

```bash
git add package.json next.config.ts tsconfig.json tailwind.config.ts postcss.config.js
git commit -m "chore: scaffold Next.js 14 project"
```

---

## Task 2: Design system CSS + app shell

**Files:**
- Create: `styles/dominion-faith-design-system.css`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`

- [ ] **Step 1: Create `styles/dominion-faith-design-system.css`**

```css
:root {
  /* Easing */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);

  /* Brand colours */
  --color-primary: #2A2FAA;
  --color-give: #F61F27;
  --color-live: #F9A916;

  /* Nav tokens */
  --nav-height: 64px;
  --nav-blur: 20px;
  --nav-bg: rgba(255, 255, 255, 0.08);
  --nav-bg-scrolled: rgba(255, 255, 255, 0.12);
  --nav-border: rgba(255, 255, 255, 0.12);
}
```

- [ ] **Step 2: Create `app/globals.css`**

```css
@import '../styles/dominion-faith-design-system.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 3: Create `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Dominion Faith International Ministry',
  description: 'Welcome to Dominion Faith International Ministry',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <Nav />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Create `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center pt-24">
      <h1 className="text-3xl font-bold text-white">Welcome to Dominion Faith</h1>
    </main>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add styles/ app/
git commit -m "feat: add design system tokens and app shell"
```

---

## Task 3: Test infrastructure + framer-motion mock

**Files:**
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Create: `__mocks__/framer-motion.tsx`
- Create: `__tests__/Nav.test.tsx`

- [ ] **Step 1: Create `jest.config.ts`**

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^framer-motion$': '<rootDir>/__mocks__/framer-motion.tsx',
  },
}

export default createJestConfig(config)
```

- [ ] **Step 2: Create `jest.setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 3: Create `__mocks__/framer-motion.tsx`**

This mock strips all animation props so Framer Motion components render as plain HTML elements in tests — no animation engine, no timers.

```tsx
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

module.exports = { motion, AnimatePresence, useReducedMotion }
```

- [ ] **Step 4: Create `__tests__/Nav.test.tsx` with the first failing test**

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Nav from '../components/Nav'

jest.mock('next/navigation', () => ({ usePathname: () => '/' }))
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt ?? ''} />,
}))
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('Nav', () => {
  it('renders the navigation landmark', () => {
    render(<Nav />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders the logo image', () => {
    render(<Nav />)
    expect(screen.getByAltText('Dominion Faith International Ministry')).toBeInTheDocument()
  })

  it('renders a hamburger button', () => {
    render(<Nav />)
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('opens the mobile overlay when hamburger is clicked', () => {
    render(<Nav />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
  })

  it('closes the mobile overlay when X is clicked', () => {
    render(<Nav />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    fireEvent.click(screen.getByLabelText('Close menu'))
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('renders all top-level nav items', () => {
    render(<Nav />)
    for (const label of ['Home', 'About', 'Media', 'Sermons', 'Events', 'Blog', 'Contact']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    }
  })

  it('renders the Ministries dropdown trigger', () => {
    render(<Nav />)
    expect(screen.getAllByText('Ministries').length).toBeGreaterThan(0)
  })

  it('renders Ministries sub-items in the mobile overlay', () => {
    render(<Nav />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    // Expand the Ministries accordion in mobile
    const ministryButtons = screen.getAllByText('Ministries')
    // The last one is in the overlay
    fireEvent.click(ministryButtons[ministryButtons.length - 1])
    expect(screen.getByText('Leadership')).toBeInTheDocument()
    expect(screen.getByText('School of Ministry')).toBeInTheDocument()
    expect(screen.getByText('Departments')).toBeInTheDocument()
    expect(screen.getByText('House Fellowship')).toBeInTheDocument()
  })

  it('renders Give and Watch Live CTA links', () => {
    render(<Nav />)
    expect(screen.getAllByText('Give').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Watch Live/).length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 5: Run tests — expect ALL to fail (Nav doesn't exist yet)**

```bash
npm test -- --no-coverage
```

Expected output: `Cannot find module '../components/Nav'`

- [ ] **Step 6: Commit the failing tests**

```bash
git add jest.config.ts jest.setup.ts __mocks__/ __tests__/
git commit -m "test: add Nav test suite (all failing — TDD start)"
```

---

## Task 4: Implement `components/Nav.tsx`

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create `components/Nav.tsx`**

Write the complete file in one pass:

```tsx
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
                                : 'text-white/75 hover:bg-white/8 hover:text-white'
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

        {/* Mobile hamburger */}
        <button
          className="ml-auto flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setIsMobileOpen((o) => !o)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          <motion.span
            className="block h-0.5 w-5 origin-center rounded-sm bg-white"
            animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          />
          <motion.span
            className="block h-0.5 w-3.5 rounded-sm bg-white"
            animate={isMobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15, ease: EASE_OUT }}
          />
          <motion.span
            className="block h-0.5 w-5 origin-center rounded-sm bg-white"
            animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          />
        </button>
      </nav>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={overlayVariants}
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
```

- [ ] **Step 2: Run the full test suite**

```bash
npm test -- --no-coverage
```

Expected: All 9 tests pass. If a test fails, re-read the failing assertion and fix the corresponding JSX before moving on.

- [ ] **Step 3: Run TypeScript check**

```bash
npm run typecheck
```

Expected: No errors. Fix any type errors before committing.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: implement Nav component with all tests passing"
```

---

## Task 5: Restore logo + verify dev server

**Files:**
- Restore: `public/logo.png`

- [ ] **Step 1: Create the `public/` directory and restore the logo from git**

The logo is tracked in git (status shows ` D public/logo.png` — deleted from working tree, still in HEAD).

```bash
mkdir -p public
git restore public/logo.png
```

Expected: `public/logo.png` appears.

- [ ] **Step 2: Verify the dev server renders the nav**

```bash
npm run dev
```

Open **http://localhost:3000** in a browser. Verify:
- The glass pill navbar floats at the top with `mt-6` spacing.
- The logo image renders inside the pill (left side).
- Desktop links appear centred (on a wide viewport).
- Give (red) and Watch Live (orange, pulsing dot) appear on the right.
- Resizing to mobile width shows the hamburger.
- Clicking the hamburger opens the dark glass full-screen overlay.
- Clicking Ministries in the overlay expands the accordion.
- Scrolling down the page causes the nav to hide; scrolling up brings it back.

Stop the dev server with `Ctrl+C` once verified.

- [ ] **Step 3: Commit**

```bash
git add public/logo.png
git commit -m "feat: restore church logo and verify nav in browser"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Next.js 14 App Router project scaffold | Task 1 |
| `dominion-faith-design-system.css` with all tokens | Task 2 |
| `--ease-out`, `--ease-drawer` CSS vars | Task 2 |
| Floating glass pill (mt-6, rounded-full, backdrop-blur) | Task 4 |
| Logo left, nav center, CTAs right | Task 4 |
| All 8 menu items including Ministries dropdown | Task 4 |
| Dropdown items: Leadership, SoM, Departments, House Fellowship | Task 4 |
| Give red (#F61F27), Watch Live orange (#F9A916) | Task 4 |
| Mobile hamburger → X morph (Framer Motion spans) | Task 4 |
| Dark glass mobile overlay (Option B) | Task 4 |
| Staggered link reveals (linkListVariants + staggerChildren) | Task 4 |
| Ministries accordion on mobile | Task 4 |
| Scroll hide on down, show on up | Task 4 |
| 200ms nav transitions | Task 4 |
| 300ms mobile menu | Task 4 |
| Reduced motion support | Task 4 |
| Logo restored from git | Task 5 |
| Browser verification | Task 5 |
