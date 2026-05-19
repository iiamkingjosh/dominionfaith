# Service Times Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/visit` page with a double-bezel glass service times card containing service schedules, contact details, an interactive Google Maps embed, a "Get Directions" link, and an "Add to Calendar" dropdown.

**Architecture:** Four files — design tokens in the CSS layer, a single `'use client'` `ServiceCard.tsx` component owning all interactivity (calendar dropdown state, outside-click handler, `.ics` generation), a server-component page at `app/visit/page.tsx`, and new card CSS class in `globals.css`. No sub-components needed.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS v3, Framer Motion v11, existing `__mocks__/framer-motion.tsx`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `styles/dominion-faith-design-system.css` | Modify | Add 7 card design tokens |
| `app/globals.css` | Modify | Add `.card-double-bezel` CSS class |
| `__tests__/ServiceCard.test.tsx` | Create | Behavioural tests (TDD) |
| `components/ServiceCard.tsx` | Create | Full interactive card |
| `app/visit/page.tsx` | Create | Page shell at `/visit` |

---

## Task 1: Card design tokens + `.card-double-bezel` CSS

**Files:**
- Modify: `styles/dominion-faith-design-system.css`
- Modify: `app/globals.css`

- [ ] **Step 1: Add card tokens to `styles/dominion-faith-design-system.css`**

After the existing `/* Hero tokens */` block, append:

```css
/* Card tokens */
--card-radius: 20px;
--card-bezel-gap: 5px;
--card-bezel-outer: rgba(255, 255, 255, 0.14);
--card-bezel-inner: rgba(255, 255, 255, 0.07);
--card-bg: rgba(12, 12, 40, 0.85);
--card-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
--card-shadow-hover: 0 24px 56px rgba(0, 0, 0, 0.6);
```

- [ ] **Step 2: Add `.card-double-bezel` class to `app/globals.css`**

After the existing `/* ── Hero background */` block, append:

```css
/* ── Double-bezel card ─────────────────────────────── */
/* The outer ring is created via stacked box-shadow — no wrapper div needed. */
/* Gap colour (rgba(8,8,28,0.7)) approximates the dark page background. */
.card-double-bezel {
  border: 1px solid var(--card-bezel-inner);
  border-radius: var(--card-radius);
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow:
    0 0 0 var(--card-bezel-gap) rgba(8, 8, 28, 0.7),
    0 0 0 calc(var(--card-bezel-gap) + 1px) var(--card-bezel-outer),
    var(--card-shadow);
  transition:
    box-shadow 200ms var(--ease-out),
    transform 200ms var(--ease-out);
}

.card-double-bezel:hover {
  box-shadow:
    0 0 0 var(--card-bezel-gap) rgba(8, 8, 28, 0.7),
    0 0 0 calc(var(--card-bezel-gap) + 1px) var(--card-bezel-outer),
    var(--card-shadow-hover);
}
```

- [ ] **Step 3: Verify existing tests still pass**

```bash
npm test -- --no-coverage
```

Expected: 16 tests pass (Nav + Hero suites). No new tests yet.

- [ ] **Step 4: Commit**

```bash
git add styles/dominion-faith-design-system.css app/globals.css
git commit -m "feat: add card design tokens and .card-double-bezel CSS class"
```

---

## Task 2: ServiceCard failing tests (TDD)

**Files:**
- Create: `__tests__/ServiceCard.test.tsx`

- [ ] **Step 1: Create `__tests__/ServiceCard.test.tsx`**

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import ServiceCard from '../components/ServiceCard'

// Mock browser APIs unavailable in jsdom
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'blob:mock')
  global.URL.revokeObjectURL = jest.fn()
  // Prevent jsdom errors from anchor.click() in downloadIcs
  HTMLAnchorElement.prototype.click = jest.fn()
})

// framer-motion mocked via jest.config.ts moduleNameMapper

describe('ServiceCard', () => {
  it('renders the Service Times heading', () => {
    render(<ServiceCard />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Service Times')
  })

  it('renders the Join Us eyebrow label', () => {
    render(<ServiceCard />)
    expect(screen.getByText('Join Us')).toBeInTheDocument()
  })

  it('renders all three service days', () => {
    render(<ServiceCard />)
    expect(screen.getByText('Sunday')).toBeInTheDocument()
    expect(screen.getByText('Wednesday')).toBeInTheDocument()
    expect(screen.getByText('Friday')).toBeInTheDocument()
  })

  it('renders all three service names', () => {
    render(<ServiceCard />)
    expect(screen.getByText('Temple Celebration')).toBeInTheDocument()
    expect(screen.getByText('Housecare Fellowship')).toBeInTheDocument()
    expect(screen.getByText('Dominion Service')).toBeInTheDocument()
  })

  it('renders all three service times', () => {
    render(<ServiceCard />)
    expect(screen.getByText('9am')).toBeInTheDocument()
    expect(screen.getByText('7pm')).toBeInTheDocument()
    expect(screen.getByText('5pm')).toBeInTheDocument()
  })

  it('renders the full location text', () => {
    render(<ServiceCard />)
    expect(
      screen.getByText(/1 Dominion Avenue, Onireke, Opposite Ojo Barrack/)
    ).toBeInTheDocument()
  })

  it('renders the phone number as a tel: link', () => {
    render(<ServiceCard />)
    const link = screen.getByRole('link', { name: /\+234 703 454 3971/ })
    expect(link).toHaveAttribute('href', 'tel:+2347034543971')
  })

  it('renders the Google Maps iframe with correct title', () => {
    render(<ServiceCard />)
    expect(screen.getByTitle('Dominion Faith location map')).toBeInTheDocument()
  })

  it('renders the Get Directions link pointing to Google Maps', () => {
    render(<ServiceCard />)
    const link = screen.getByRole('link', { name: /Get Directions/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('google.com/maps'))
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the Add to Calendar toggle button', () => {
    render(<ServiceCard />)
    expect(
      screen.getByRole('button', { name: /Add to Calendar/i })
    ).toBeInTheDocument()
  })

  it('opens the calendar dropdown when the button is clicked', () => {
    render(<ServiceCard />)
    fireEvent.click(screen.getByRole('button', { name: /Add to Calendar/i }))
    expect(screen.getByText('Apple Calendar')).toBeInTheDocument()
    expect(screen.getByText('Google · Sunday')).toBeInTheDocument()
    expect(screen.getByText('Google · Wednesday')).toBeInTheDocument()
    expect(screen.getByText('Google · Friday')).toBeInTheDocument()
    expect(screen.getByText('Outlook / iCal')).toBeInTheDocument()
  })

  it('closes the calendar dropdown on a second button click', () => {
    render(<ServiceCard />)
    const btn = screen.getByRole('button', { name: /Add to Calendar/i })
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(screen.queryByText('Apple Calendar')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — expect ALL ServiceCard tests to fail**

```bash
npm test -- --no-coverage
```

Expected: `Cannot find module '../components/ServiceCard'`. Nav and Hero suites (16 tests) still pass.

- [ ] **Step 3: Commit the failing tests**

```bash
git add __tests__/ServiceCard.test.tsx
git commit -m "test: add ServiceCard test suite (all failing — TDD start)"
```

---

## Task 3: Implement `components/ServiceCard.tsx`

**Files:**
- Create: `components/ServiceCard.tsx`

- [ ] **Step 1: Create `components/ServiceCard.tsx`**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  { day: 'Sunday',    name: 'Temple Celebration',  time: '9am' },
  { day: 'Wednesday', name: 'Housecare Fellowship', time: '7pm' },
  { day: 'Friday',    name: 'Dominion Service',     time: '5pm' },
] as const

const LOCATION_DISPLAY =
  '1 Dominion Avenue, Onireke, Opposite Ojo Barrack, Lagos, Nigeria'
const LOCATION_MAPS_QUERY = '1+Dominion+Avenue+Onireke+Lagos+Nigeria'
const PHONE_DISPLAY = '+234 703 454 3971'
const PHONE_TEL     = '+2347034543971'
const MAPS_EMBED_URL =
  `https://maps.google.com/maps?q=${LOCATION_MAPS_QUERY}&output=embed`
const DIRECTIONS_URL =
  `https://www.google.com/maps/dir/?api=1&destination=${LOCATION_MAPS_QUERY}`

// ── Calendar helpers ──────────────────────────────────────────────────────────

function fmtIcs(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

function nextWeekday(dow: number): Date {
  const d = new Date()
  const diff = (dow - d.getDay() + 7) % 7
  d.setDate(d.getDate() + (diff === 0 ? 7 : diff))
  return d
}

function makeIcs(): string {
  const defs = [
    { dow: 0, hour: 9,  byday: 'SU', name: 'Temple Celebration — Dominion Faith' },
    { dow: 3, hour: 19, byday: 'WE', name: 'Housecare Fellowship — Dominion Faith' },
    { dow: 5, hour: 17, byday: 'FR', name: 'Dominion Service — Dominion Faith' },
  ]
  const vevents = defs.map(({ dow, hour, byday, name }) => {
    const start = nextWeekday(dow)
    start.setHours(hour, 0, 0, 0)
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)
    return [
      'BEGIN:VEVENT',
      `DTSTART:${fmtIcs(start)}`,
      `DTEND:${fmtIcs(end)}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${byday}`,
      `SUMMARY:${name}`,
      `LOCATION:${LOCATION_DISPLAY}`,
      'END:VEVENT',
    ].join('\r\n')
  })
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dominion Faith//Services//EN',
    ...vevents,
    'END:VCALENDAR',
  ].join('\r\n')
}

function downloadIcs(): void {
  const blob = new Blob([makeIcs()], { type: 'text/calendar' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = 'dominion-faith-services.ics'
  a.click()
  URL.revokeObjectURL(url)
}

const DOW_MAP:   Record<string, number> = { Sunday: 0, Wednesday: 3, Friday: 5 }
const HOUR_MAP:  Record<string, number> = { '9am': 9, '7pm': 19, '5pm': 17 }
const BYDAY_MAP: Record<string, string> = { Sunday: 'SU', Wednesday: 'WE', Friday: 'FR' }

function googleCalUrl(s: { day: string; name: string; time: string }): string {
  const start = nextWeekday(DOW_MAP[s.day])
  start.setHours(HOUR_MAP[s.time], 0, 0, 0)
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)
  const params = new URLSearchParams({
    action:   'TEMPLATE',
    text:     `${s.name} — Dominion Faith`,
    dates:    `${fmtIcs(start).replace('Z', '')}/${fmtIcs(end).replace('Z', '')}`,
    details:  `${s.day} service at Dominion Faith International Ministry`,
    location: LOCATION_DISPLAY,
    recur:    `RRULE:FREQ=WEEKLY;BYDAY=${BYDAY_MAP[s.day]}`,
  })
  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`
}

// ── Framer Motion ─────────────────────────────────────────────────────────────

const EASE_OUT = [0.16, 1, 0.3, 1] as const

// ── Component ─────────────────────────────────────────────────────────────────

export default function ServiceCard() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isCalendarOpen) return
    const handler = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setIsCalendarOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isCalendarOpen])

  return (
    <motion.div
      className="card-double-bezel"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
    >
      <div className="space-y-6 p-6">

        {/* Header */}
        <div>
          <p
            className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ color: 'var(--color-live)' }}
          >
            Join Us
          </p>
          <h2 className="text-2xl font-bold text-white">Service Times</h2>
        </div>

        {/* Services list */}
        <div>
          {SERVICES.map((s, i) => (
            <div key={s.day}>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p
                    className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ color: 'var(--color-live)' }}
                  >
                    {s.day}
                  </p>
                  <p className="text-sm text-white/60">{s.name}</p>
                </div>
                <p className="text-2xl font-extrabold text-white">{s.time}</p>
              </div>
              {i < SERVICES.length - 1 && (
                <div className="border-b border-white/[0.06]" />
              )}
            </div>
          ))}
        </div>

        {/* Section divider */}
        <div className="border-t border-white/[0.08]" />

        {/* Contact details */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 shrink-0 text-white/40"
              width="14" height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-sm leading-snug text-white/60">{LOCATION_DISPLAY}</p>
          </div>

          <div className="flex items-center gap-3">
            <svg
              className="shrink-0 text-white/40"
              width="14" height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <a
              href={`tel:${PHONE_TEL}`}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {/* Google Maps iframe */}
        <div className="overflow-hidden rounded-xl">
          <iframe
            src={MAPS_EMBED_URL}
            width="100%"
            height="200"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Dominion Faith location map"
            style={{ border: 0, display: 'block' }}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {/* Get Directions */}
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full py-2.5 text-center text-sm font-bold text-white"
            style={{
              background: 'var(--color-primary)',
              boxShadow:  '0 2px 12px rgba(42,47,170,0.4)', /* --color-primary */
            }}
          >
            Get Directions
          </a>

          {/* Add to Calendar */}
          <div className="relative" ref={calendarRef}>
            <button
              onClick={() => setIsCalendarOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              aria-expanded={isCalendarOpen}
              aria-haspopup="true"
            >
              Add to Calendar
              <svg
                width="12" height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  isCalendarOpen ? 'rotate-180' : ''
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isCalendarOpen && (
              <div
                className="absolute bottom-full right-0 z-10 mb-2 w-56 rounded-2xl p-2"
                style={{
                  background:           'rgba(10,10,35,0.95)',
                  border:               '1px solid rgba(255,255,255,0.1)',
                  backdropFilter:       'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  boxShadow:            '0 16px 48px rgba(0,0,0,0.5)',
                }}
              >
                {/* Apple Calendar / Outlook — both download the same .ics */}
                <button
                  onClick={() => { downloadIcs(); setIsCalendarOpen(false) }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Apple Calendar
                </button>

                {/* Google Calendar — one link per service */}
                {SERVICES.map((s) => (
                  <a
                    key={s.day}
                    href={googleCalUrl(s)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsCalendarOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Google · {s.day}
                  </a>
                ))}

                <button
                  onClick={() => { downloadIcs(); setIsCalendarOpen(false) }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Outlook / iCal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Run the full test suite**

```bash
npm test -- --no-coverage
```

Expected: all 29 tests pass (16 existing + 13 ServiceCard). If any fail, fix `components/ServiceCard.tsx` only — do not modify the test file.

- [ ] **Step 3: Run TypeScript check**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ServiceCard.tsx
git commit -m "feat: implement ServiceCard component with all tests passing"
```

---

## Task 4: Create `/visit` page

**Files:**
- Create: `app/visit/page.tsx`

- [ ] **Step 1: Create `app/visit/page.tsx`**

```tsx
import type { Metadata } from 'next'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'Visit Us — Dominion Faith',
  description:
    'Join us for Sunday Temple Celebration, Wednesday Housecare Fellowship, or Friday Dominion Service at Dominion Faith International Ministry.',
}

export default function VisitPage() {
  return (
    <main
      className="min-h-screen px-4 py-32"
      style={{ background: 'var(--hero-bg)' }}
    >
      <div className="mx-auto max-w-lg">
        <ServiceCard />
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Run all tests**

```bash
npm test -- --no-coverage
```

Expected: 29 tests pass.

- [ ] **Step 3: Start the dev server and verify the `/visit` page**

```bash
npm run dev
```

Open **http://localhost:3000/visit**. Verify:
- Dark background matches the hero page
- Card renders with visible double-bezel (outer ring + inner glass surface)
- "Join Us" eyebrow, "Service Times" heading, three service rows
- Location and phone contact details
- Google Maps iframe loads and is interactive
- "Get Directions" opens Google Maps in a new tab
- "Add to Calendar" button opens a dropdown with 5 items
- Hovering the card lifts it 4px with a deeper shadow
- "Plan Your Visit" in the hero links to this page correctly

Stop the server with `Ctrl+C`.

- [ ] **Step 4: Commit**

```bash
git add app/visit/page.tsx
git commit -m "feat: add /visit page with ServiceCard"
```

---

## Self-Review — Spec Coverage

| Spec requirement | Task |
|---|---|
| 7 card CSS custom properties | Task 1 |
| `.card-double-bezel` box-shadow stacking (no wrapper div) | Task 1 |
| CSS hover deepens shadow | Task 1 |
| Sunday/Temple Celebration/9am service row | Task 3 |
| Wednesday/Housecare Fellowship/7pm service row | Task 3 |
| Friday/Dominion Service/5pm service row | Task 3 |
| Full location: Onireke, Opposite Ojo Barrack, Lagos, Nigeria | Task 3 |
| Phone: +234 703 454 3971 as tel: link | Task 3 |
| Google Maps `<iframe>` (no API key, `?output=embed`) | Task 3 |
| "Get Directions" → `google.com/maps/dir/` | Task 3 |
| "Add to Calendar" dropdown toggle | Task 3 |
| Apple Calendar → `.ics` Blob download (3 weekly VEVENTs) | Task 3 |
| Google · Sunday → Google Calendar deep-link | Task 3 |
| Google · Wednesday → Google Calendar deep-link | Task 3 |
| Google · Friday → Google Calendar deep-link | Task 3 |
| Outlook / iCal → same `.ics` Blob download | Task 3 |
| Outside-click closes dropdown | Task 3 |
| Framer Motion `whileHover={{ y: -4 }}`, 200ms, ease-out | Task 3 |
| `app/visit/page.tsx` server component with Metadata | Task 4 |
| `/visit` route matches hero "Plan Your Visit" CTA | Task 4 |
| 29 total tests pass | Tasks 2 & 3 |
