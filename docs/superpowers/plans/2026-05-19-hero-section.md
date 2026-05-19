# Hero Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `app/page.tsx` placeholder with a full-viewport hero section featuring an animated gradient mesh background, display headline, italic mission statement, three glass service cards, and scroll-reveal animations.

**Architecture:** Single `components/Hero.tsx` client component using Framer Motion `useInView` for scroll detection and `containerVariants`/`itemVariants` for staggered entrance. Background animation is pure CSS (`@keyframes meshShift` in `globals.css`) to stay off the JS thread. Five new design tokens added to the existing design system CSS file.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Framer Motion v11, existing `__mocks__/framer-motion.tsx` mock for tests

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `styles/dominion-faith-design-system.css` | Modify | Add 5 new hero design tokens |
| `app/globals.css` | Modify | Add `.hero-bg`, `.hero-grid` CSS classes + `@keyframes meshShift` |
| `__tests__/Hero.test.tsx` | Create | Behavioural tests (TDD) |
| `components/Hero.tsx` | Create | Full-viewport hero section |
| `app/page.tsx` | Modify | Replace placeholder with `<Hero />` |

---

## Task 1: Design tokens + CSS background classes

**Files:**
- Modify: `styles/dominion-faith-design-system.css`
- Modify: `app/globals.css`

- [ ] **Step 1: Add hero tokens to the design system**

Open `styles/dominion-faith-design-system.css`. After the existing `/* Nav tokens */` block, append:

```css
/* Hero tokens */
--text-hero: clamp(52px, 7vw, 96px);
--hero-bg: #07071f;
--hero-card-bg: rgba(255, 255, 255, 0.07);
--hero-card-border: rgba(255, 255, 255, 0.13);
--hero-mission-size: 13px;
```

- [ ] **Step 2: Add hero CSS classes + keyframes to globals.css**

Open `app/globals.css`. After the three `@tailwind` directives, append:

```css
/* ── Hero background ───────────────────────────────── */
.hero-bg {
  background:
    radial-gradient(ellipse 80% 60% at 20% 30%, rgba(42, 47, 170, 0.6) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 70%, rgba(42, 47, 170, 0.4) 0%, transparent 55%),
    radial-gradient(ellipse 40% 40% at 50% 10%, rgba(80, 60, 200, 0.3) 0%, transparent 50%),
    linear-gradient(180deg, #07071f 0%, #0d0d3a 40%, #080820 100%);
  animation: meshShift 12s ease-in-out infinite alternate;
}

@media (prefers-reduced-motion: reduce) {
  .hero-bg { animation: none; }
}

.hero-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}

@keyframes meshShift {
  0%   { filter: hue-rotate(0deg) brightness(1); }
  50%  { filter: hue-rotate(8deg) brightness(1.05); }
  100% { filter: hue-rotate(-4deg) brightness(0.97); }
}
```

- [ ] **Step 3: Verify existing tests still pass**

```bash
npm test -- --no-coverage
```

Expected: 9 tests pass (Nav suite). No new tests yet.

- [ ] **Step 4: Commit**

```bash
git add styles/dominion-faith-design-system.css app/globals.css
git commit -m "feat: add hero design tokens and background CSS"
```

---

## Task 2: Hero tests (TDD — write failing tests first)

**Files:**
- Create: `__tests__/Hero.test.tsx`

- [ ] **Step 1: Create `__tests__/Hero.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('Hero', () => {
  it('renders the display headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'A Place Where Champions are Made'
    )
  })

  it('renders the mission statement', () => {
    render(<Hero />)
    expect(screen.getByText(/For over a decade/)).toBeInTheDocument()
  })

  it('renders the eyebrow pill', () => {
    render(<Hero />)
    expect(
      screen.getByText(/Dominion Faith International Ministry/)
    ).toBeInTheDocument()
  })

  it('renders all three service cards with correct day, name and time', () => {
    render(<Hero />)
    expect(screen.getByText('Sunday')).toBeInTheDocument()
    expect(screen.getByText('Temple Celebration')).toBeInTheDocument()
    expect(screen.getByText('9am')).toBeInTheDocument()

    expect(screen.getByText('Wednesday')).toBeInTheDocument()
    expect(screen.getByText('Housecare Fellowship')).toBeInTheDocument()
    expect(screen.getByText('7pm')).toBeInTheDocument()

    expect(screen.getByText('Friday')).toBeInTheDocument()
    expect(screen.getByText('Dominion Service')).toBeInTheDocument()
    expect(screen.getByText('5pm')).toBeInTheDocument()
  })

  it('renders Plan Your Visit CTA linking to /visit', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /Plan Your Visit/i })
    expect(link).toHaveAttribute('href', '/visit')
  })

  it('renders Watch Live CTA linking to /live', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /Watch Live/i })
    expect(link).toHaveAttribute('href', '/live')
  })

  it('renders the location line', () => {
    render(<Hero />)
    expect(
      screen.getByText(/1 Dominion Avenue, Onireke, Lagos/)
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — expect ALL to fail**

```bash
npm test -- --no-coverage
```

Expected: `Cannot find module '../components/Hero'`

- [ ] **Step 3: Commit the failing tests**

```bash
git add __tests__/Hero.test.tsx
git commit -m "test: add Hero test suite (all failing — TDD start)"
```

---

## Task 3: Implement `components/Hero.tsx`

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'

// ── Types + Data ──────────────────────────────────────────────────────────────

type Service = { day: string; name?: string; time: string }

const SERVICES: Service[] = [
  { day: 'Sunday',    name: 'Temple Celebration',  time: '9am' },
  { day: 'Wednesday', name: 'Housecare Fellowship', time: '7pm' },
  { day: 'Friday',    name: 'Dominion Service',     time: '5pm' },
]

// ── Framer Motion variants ────────────────────────────────────────────────────
// Raw cubic-bezier array — Framer Motion cannot parse var(--ease-out).

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 64, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

const itemVariantsReduced = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Hero() {
  const ref              = useRef<HTMLElement>(null)
  const isInView         = useInView(ref, { once: true, amount: 0.2 })
  const shouldReduceMotion = useReducedMotion()

  const item = shouldReduceMotion ? itemVariantsReduced : itemVariants

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
      aria-label="Hero"
    >
      {/* Animated gradient mesh — defined in globals.css */}
      <div aria-hidden="true" className="hero-bg absolute inset-0" />

      {/* Subtle grid overlay */}
      <div aria-hidden="true" className="hero-grid absolute inset-0" />

      {/* Content column */}
      <motion.div
        className="relative z-10 flex max-w-[780px] flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Eyebrow pill */}
        <motion.div
          variants={item}
          className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            background:  'rgba(255,255,255,0.06)',
            borderColor: 'rgba(255,255,255,0.10)',
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: 'var(--color-live)' }}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
            Dominion Faith International Ministry
          </span>
        </motion.div>

        {/* Display headline */}
        <motion.h1
          variants={item}
          className="mb-6 font-black leading-none tracking-[-0.04em] text-white"
          style={{ fontSize: 'var(--text-hero)' }}
        >
          A Place Where Champions are Made
        </motion.h1>

        {/* Mission statement */}
        <motion.p
          variants={item}
          className="mb-10 max-w-[600px] italic leading-[1.75] text-white/55"
          style={{ fontSize: 'var(--hero-mission-size)' }}
        >
          For over a decade, we have been committed to raising believers who do
          not just survive life but{' '}
          <strong className="font-semibold not-italic text-white/85">
            dominate it.
          </strong>{' '}
          Champions are not born, they are made. And God has called each one of
          you for{' '}
          <strong className="font-semibold not-italic text-white/85">
            greatness.
          </strong>
        </motion.p>

        {/* Service time cards */}
        <motion.div
          variants={item}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {SERVICES.map((s) => (
            <div
              key={s.day}
              className="rounded-2xl px-6 py-[18px] text-center"
              style={{
                background:            'var(--hero-card-bg)',
                border:                '1px solid var(--hero-card-border)',
                backdropFilter:        'blur(16px)',
                WebkitBackdropFilter:  'blur(16px)',
                minWidth:              '128px',
              }}
            >
              <p
                className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                style={{ color: 'var(--color-live)' }}
              >
                {s.day}
              </p>
              {s.name && (
                <p className="mb-2 text-[9px] uppercase tracking-[0.05em] text-white/45">
                  {s.name}
                </p>
              )}
              <p className="text-[26px] font-extrabold leading-none text-white">
                {s.time}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="mb-6 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/visit"
            className="w-full rounded-full px-8 py-3.5 text-center text-sm font-bold text-white sm:w-auto"
            style={{
              background: 'var(--color-primary)',
              boxShadow:  '0 4px 24px rgba(42,47,170,0.5)',
            }}
          >
            Plan Your Visit
          </Link>
          <Link
            href="/live"
            className="flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white sm:w-auto"
            style={{
              background: '#F61F27',
              boxShadow:  '0 4px 24px rgba(246,31,39,0.4)',
            }}
          >
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-white" />
            Watch Live
          </Link>
        </motion.div>

        {/* Location */}
        <motion.p
          variants={item}
          className="flex items-center gap-1.5 text-[11px] tracking-[0.04em] text-white/30"
        >
          <svg
            width="11" height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          1 Dominion Avenue, Onireke, Lagos
        </motion.p>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Run the full test suite**

```bash
npm test -- --no-coverage
```

Expected: all 16 tests pass (9 Nav + 7 Hero). If any Hero test fails, fix the corresponding JSX in `components/Hero.tsx` before continuing. Do not modify the test file.

- [ ] **Step 3: Run TypeScript check**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: implement Hero section with all tests passing"
```

---

## Task 4: Wire Hero into page + verify dev server

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the placeholder in `app/page.tsx`**

```tsx
import Hero from '@/components/Hero'

export default function Home() {
  return <Hero />
}
```

- [ ] **Step 2: Run tests one final time**

```bash
npm test -- --no-coverage
```

Expected: 16 tests pass.

- [ ] **Step 3: Start the dev server and verify visually**

```bash
npm run dev
```

Open **http://localhost:3000**. Verify:
- Deep blue animated gradient mesh fills the full viewport
- Eyebrow pill appears with an orange dot
- Massive headline renders using `clamp(52px, 7vw, 96px)`
- Mission text is italic, 13px
- Three glass cards show: Sunday/Temple Celebration/9am, Wednesday/Housecare Fellowship/7pm, Friday/Dominion Service/5pm
- "Plan Your Visit" (blue) and "Watch Live" (red, pulsing dot) CTAs appear
- Location line appears below CTAs
- Scroll reveal fires when the section enters the viewport (since it's the only section, ensure the animation plays on load — `useInView` fires immediately for above-fold content)
- On a narrow viewport (< 640px), CTA buttons stack full-width

Stop the server with `Ctrl+C`.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire Hero section into home page"
```

---

## Self-Review — Spec Coverage

| Spec requirement | Task |
|---|---|
| Full viewport height (`min-h-screen`) | Task 3 |
| `--text-hero: clamp(52px, 7vw, 96px)` token | Task 1 |
| `--hero-card-bg`, `--hero-card-border`, `--hero-mission-size`, `--hero-bg` tokens | Task 1 |
| `@keyframes meshShift` in `globals.css` (not in component) | Task 1 |
| `.hero-bg` + `.hero-grid` CSS classes | Task 1 |
| `prefers-reduced-motion` disables mesh animation | Task 1 |
| Headline: "A Place Where Champions are Made", weight 900, tracking -0.04em | Task 3 |
| Mission: italic, 13px, emphasis on "dominate it" and "greatness" | Task 3 |
| Eyebrow pill: "Dominion Faith International Ministry" + orange dot | Task 3 |
| Sunday — Temple Celebration — 9am | Task 3 |
| Wednesday — Housecare Fellowship — 7pm | Task 3 |
| Friday — Dominion Service — 5pm | Task 3 |
| Glass cards: `var(--hero-card-bg)`, `var(--hero-card-border)`, `blur(16px)` | Task 3 |
| Plan Your Visit → `/visit`, `var(--color-primary)` blue | Task 3 |
| Watch Live → `/live`, `#F61F27` red, animated pulse dot | Task 3 |
| Location: 1 Dominion Avenue, Onireke, Lagos | Task 3 |
| Scroll reveal: `y: 64`, `blur(8px)`, `opacity: 0` → normal | Task 3 |
| Duration 800ms, ease `[0.16, 1, 0.3, 1]` | Task 3 |
| Stagger: 0.12s between children | Task 3 |
| `useReducedMotion` skips y/blur, keeps opacity fade | Task 3 |
| Mobile: full-width stacked CTAs (`sm:flex-row`) | Task 3 |
| Mobile: cards wrap via `flex-wrap` | Task 3 |
| `app/page.tsx` wired to `<Hero />` | Task 4 |
| All background divs `aria-hidden="true"` | Task 3 |
| 16 total tests pass (9 Nav + 7 Hero) | Tasks 2 & 3 |
