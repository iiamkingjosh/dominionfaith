# Sermon Card Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive 3/2/1-column sermon card grid with YouTube thumbnail, hover animations, modal video player, series badge, speaker photo, and Add-to-Calendar-style calendar dropdown — all using the existing `.card-double-bezel` glass design system.

**Architecture:** `types/sermon.ts` defines the shared `Sermon` interface. `SermonCard` (client component) renders one card with CSS-group-hover animations and emits `onWatch`/`onDownload` callbacks. `SermonGrid` (client component) renders the grid, manages the modal, and handles scroll-reveal stagger via Framer Motion. `app/sermons/page.tsx` is a server component that passes static sample data down.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS v3, Framer Motion v11, Next.js Image (YouTube domain whitelisted), lucide-react icons, Jest 29 + @testing-library/react 16.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `next.config.js` | Modify | Add `img.youtube.com` remotePattern |
| `types/sermon.ts` | Create | `Sermon` interface |
| `styles/dominion-faith-design-system.css` | Modify | Add 2 sermon badge tokens |
| `app/globals.css` | Modify | Add `.sermon-overlay` gradient class |
| `components/SermonCard.tsx` | Create | Single card — thumbnail, hover, badge, buttons |
| `components/SermonGrid.tsx` | Create | Grid layout + YouTube modal |
| `app/sermons/page.tsx` | Create | Page shell with 6 sample sermons |
| `__tests__/SermonCard.test.tsx` | Create | Behavioural tests |

---

## Task 1: Update next.config.js for YouTube images

**Files:**
- Modify: `next.config.js`

- [ ] **Step 1: Add YouTube remote pattern**

Replace the empty config with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
}

module.exports = nextConfig
```

- [ ] **Step 2: Commit**

```bash
git add next.config.js
git commit -m "feat: whitelist YouTube thumbnail domain for Next.js Image"
```

---

## Task 2: Create types/sermon.ts

**Files:**
- Create: `types/sermon.ts`

- [ ] **Step 1: Write the type**

```ts
export interface Sermon {
  id: string
  videoId: string          // YouTube video ID (e.g. "dQw4w9WgXcQ")
  title: string
  speaker: string
  speakerPhoto?: string    // absolute URL or /public path
  date: string             // ISO "YYYY-MM-DD"
  series?: string          // series name for badge
  downloadUrl?: string     // optional direct audio/video download URL
}
```

- [ ] **Step 2: Commit**

```bash
git add types/sermon.ts
git commit -m "feat: add Sermon type"
```

---

## Task 3: Add sermon CSS tokens

**Files:**
- Modify: `styles/dominion-faith-design-system.css`
- Modify: `app/globals.css`

- [ ] **Step 1: Add 2 badge tokens to design system**

Append inside `:root` in `styles/dominion-faith-design-system.css`:

```css
  /* Sermon series badge */
  --badge-series-bg: rgba(249, 169, 22, 0.18);
  --badge-series-color: #F9A916;
```

- [ ] **Step 2: Add sermon overlay gradient to globals.css**

Append to `app/globals.css` after the `.card-double-bezel:hover` block:

```css
/* ── Sermon thumbnail overlay ──────────────────────── */
.sermon-overlay {
  background: linear-gradient(
    to top,
    rgba(7, 7, 31, 0.92) 0%,
    rgba(7, 7, 31, 0.5) 40%,
    transparent 100%
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add styles/dominion-faith-design-system.css app/globals.css
git commit -m "feat: add sermon badge tokens and thumbnail overlay gradient"
```

---

## Task 4: Create SermonCard component (TDD)

**Files:**
- Create: `__tests__/SermonCard.test.tsx`
- Create: `components/SermonCard.tsx`

### Step 1: Write the failing tests

Create `__tests__/SermonCard.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import SermonCard from '@/components/SermonCard'
import type { Sermon } from '@/types/sermon'

const sermon: Sermon = {
  id: '1',
  videoId: 'abc123',
  title: 'Walking in Dominion',
  speaker: 'Pastor Joshua',
  speakerPhoto: '/speakers/pastor-joshua.jpg',
  date: '2024-03-10',
  series: 'Kingdom Foundations',
  downloadUrl: 'https://example.com/sermon.mp3',
}

const noop = jest.fn()

describe('SermonCard', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renders the sermon title', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    expect(screen.getByText('Walking in Dominion')).toBeInTheDocument()
  })

  it('renders the speaker name', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    expect(screen.getByText('Pastor Joshua')).toBeInTheDocument()
  })

  it('renders the series badge when series is provided', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    expect(screen.getByText('Kingdom Foundations')).toBeInTheDocument()
  })

  it('does not render series badge when series is absent', () => {
    const noSeries = { ...sermon, series: undefined }
    render(<SermonCard sermon={noSeries} onWatch={noop} />)
    expect(screen.queryByText('Kingdom Foundations')).not.toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    // "Mar 10, 2024" — formatted via toLocaleDateString
    expect(screen.getByText(/Mar.*2024/)).toBeInTheDocument()
  })

  it('calls onWatch when Watch button is clicked', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    fireEvent.click(screen.getByRole('button', { name: /watch/i }))
    expect(noop).toHaveBeenCalledWith(sermon)
    expect(noop).toHaveBeenCalledTimes(1)
  })

  it('renders Download button when downloadUrl is provided', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    expect(screen.getByRole('link', { name: /download/i })).toBeInTheDocument()
  })

  it('does not render Download button when downloadUrl is absent', () => {
    const noDownload = { ...sermon, downloadUrl: undefined }
    render(<SermonCard sermon={noDownload} onWatch={noop} />)
    expect(screen.queryByRole('link', { name: /download/i })).not.toBeInTheDocument()
  })

  it('renders YouTube thumbnail image', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    const img = screen.getByRole('img', { name: /walking in dominion/i })
    expect(img).toHaveAttribute('src', expect.stringContaining('abc123'))
  })
})
```

- [ ] **Step 2: Run test to verify they fail**

```bash
npx jest __tests__/SermonCard.test.tsx --no-coverage
```

Expected: FAIL (module not found)

- [ ] **Step 3: Implement SermonCard.tsx**

Create `components/SermonCard.tsx`:

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, Download } from 'lucide-react'
import type { Sermon } from '@/types/sermon'

interface SermonCardProps {
  sermon: Sermon
  onWatch: (sermon: Sermon) => void
  index?: number
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT, delay: i * 0.08 },
  }),
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const MotionDiv = motion.div

export default function SermonCard({ sermon, onWatch, index = 0 }: SermonCardProps) {
  const thumb = `https://img.youtube.com/vi/${sermon.videoId}/maxresdefault.jpg`

  return (
    <MotionDiv
      className="card-double-bezel overflow-hidden group flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
    >
      {/* ── Thumbnail ── */}
      <div className="relative overflow-hidden aspect-video">
        <Image
          src={thumb}
          alt={sermon.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[250ms] ease-[var(--ease-out)] group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div
          className="sermon-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-[var(--ease-out)]"
          aria-hidden="true"
        />

        {/* Play icon — always visible, grows on hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full p-3 transition-transform duration-[250ms] ease-[var(--ease-out)] group-hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
          >
            <Play className="h-6 w-6 fill-white text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Series badge (bottom-left, slides up on hover) */}
        {sermon.series && (
          <div className="absolute bottom-3 left-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[250ms] ease-[var(--ease-out)]">
            <span
              className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{
                background: 'var(--badge-series-bg)',
                color: 'var(--badge-series-color)',
                border: '1px solid rgba(249,169,22,0.3)',
              }}
            >
              {sermon.series}
            </span>
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="text-sm font-bold leading-snug text-white line-clamp-2">
          {sermon.title}
        </h3>

        {/* Speaker + date row */}
        <div className="flex items-center gap-2 mt-auto">
          {sermon.speakerPhoto && (
            <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={sermon.speakerPhoto}
                alt={sermon.speaker}
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-semibold text-white/80 truncate">
              {sermon.speaker}
            </span>
            <span className="text-[10px] text-white/40">
              {formatDate(sermon.date)}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onWatch(sermon)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-primary)' }}
            aria-label={`Watch ${sermon.title}`}
          >
            <Play className="h-3.5 w-3.5 fill-white" aria-hidden="true" />
            Watch
          </button>

          {sermon.downloadUrl && (
            <a
              href={sermon.downloadUrl}
              download
              className="flex items-center justify-center rounded-full p-2 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              aria-label={`Download ${sermon.title}`}
            >
              <Download className="h-4 w-4 text-white/70" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </MotionDiv>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest __tests__/SermonCard.test.tsx --no-coverage
```

Expected: PASS (9 tests)

- [ ] **Step 5: Commit**

```bash
git add components/SermonCard.tsx __tests__/SermonCard.test.tsx
git commit -m "feat: add SermonCard component with TDD"
```

---

## Task 5: Create SermonGrid component with modal (TDD)

**Files:**
- Create: `__tests__/SermonGrid.test.tsx`
- Create: `components/SermonGrid.tsx`

### Step 1: Write the failing tests

Create `__tests__/SermonGrid.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import SermonGrid from '@/components/SermonGrid'
import type { Sermon } from '@/types/sermon'

const SERMONS: Sermon[] = [
  { id: '1', videoId: 'vid1', title: 'Sermon One', speaker: 'Pastor A', date: '2024-01-01', series: 'Series A' },
  { id: '2', videoId: 'vid2', title: 'Sermon Two', speaker: 'Pastor B', date: '2024-01-08' },
  { id: '3', videoId: 'vid3', title: 'Sermon Three', speaker: 'Pastor A', date: '2024-01-15' },
]

describe('SermonGrid', () => {
  it('renders all sermon cards', () => {
    render(<SermonGrid sermons={SERMONS} />)
    expect(screen.getByText('Sermon One')).toBeInTheDocument()
    expect(screen.getByText('Sermon Two')).toBeInTheDocument()
    expect(screen.getByText('Sermon Three')).toBeInTheDocument()
  })

  it('modal is closed by default', () => {
    render(<SermonGrid sermons={SERMONS} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens modal when Watch is clicked', () => {
    render(<SermonGrid sermons={SERMONS} />)
    fireEvent.click(screen.getAllByRole('button', { name: /watch/i })[0])
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('modal contains an iframe with correct YouTube src', () => {
    render(<SermonGrid sermons={SERMONS} />)
    fireEvent.click(screen.getAllByRole('button', { name: /watch/i })[0])
    const iframe = screen.getByTitle(/sermon one/i)
    expect(iframe).toHaveAttribute('src', expect.stringContaining('vid1'))
  })

  it('closes modal when close button is clicked', () => {
    render(<SermonGrid sermons={SERMONS} />)
    fireEvent.click(screen.getAllByRole('button', { name: /watch/i })[0])
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders empty state when no sermons provided', () => {
    render(<SermonGrid sermons={[]} />)
    expect(screen.getByText(/no sermons/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx jest __tests__/SermonGrid.test.tsx --no-coverage
```

Expected: FAIL (module not found)

- [ ] **Step 3: Implement SermonGrid.tsx**

Create `components/SermonGrid.tsx`:

```tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import SermonCard from './SermonCard'
import type { Sermon } from '@/types/sermon'

interface SermonGridProps {
  sermons: Sermon[]
}

export default function SermonGrid({ sermons }: SermonGridProps) {
  const [active, setActive] = useState<Sermon | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setActive(null), [])

  // ESC key close
  useEffect(() => {
    if (!active) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [active, close])

  // Focus trap — move focus to close button when modal opens
  useEffect(() => {
    if (active) closeRef.current?.focus()
  }, [active])

  if (sermons.length === 0) {
    return (
      <p className="text-center text-white/40 py-16">
        No sermons available yet. Check back soon.
      </p>
    )
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sermons.map((sermon, i) => (
          <SermonCard
            key={sermon.id}
            sermon={sermon}
            onWatch={setActive}
            index={i}
          />
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Playing: ${active.title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        >
          <div className="relative w-full max-w-3xl">
            {/* Close button */}
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/70 hover:text-white text-sm"
              aria-label="Close video"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Close
            </button>

            {/* YouTube iframe */}
            <div className="relative overflow-hidden rounded-2xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1&rel=0`}
                title={active.title}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
              />
            </div>

            {/* Modal footer */}
            <div className="mt-3 px-1">
              <p className="font-semibold text-white text-sm">{active.title}</p>
              <p className="text-white/50 text-xs mt-0.5">{active.speaker}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest __tests__/SermonGrid.test.tsx --no-coverage
```

Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add components/SermonGrid.tsx __tests__/SermonGrid.test.tsx
git commit -m "feat: add SermonGrid component with YouTube modal and TDD"
```

---

## Task 6: Create app/sermons/page.tsx

**Files:**
- Create: `app/sermons/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from 'next'
import SermonGrid from '@/components/SermonGrid'
import type { Sermon } from '@/types/sermon'

export const metadata: Metadata = {
  title: 'Sermons — Dominion Faith',
  description: 'Watch and download sermons from Dominion Faith International Ministry.',
}

const SERMONS: Sermon[] = [
  {
    id: '1',
    videoId: 'dQw4w9WgXcQ',
    title: 'Walking in Dominion',
    speaker: 'Pastor Joshua',
    date: '2024-03-10',
    series: 'Kingdom Foundations',
    downloadUrl: undefined,
  },
  {
    id: '2',
    videoId: 'dQw4w9WgXcQ',
    title: 'The Power of Faith',
    speaker: 'Pastor Joshua',
    date: '2024-03-03',
    series: 'Kingdom Foundations',
  },
  {
    id: '3',
    videoId: 'dQw4w9WgXcQ',
    title: 'Champions Are Made',
    speaker: 'Pastor Joshua',
    date: '2024-02-25',
    series: 'Raising Champions',
  },
  {
    id: '4',
    videoId: 'dQw4w9WgXcQ',
    title: 'Seated in High Places',
    speaker: 'Pastor Joshua',
    date: '2024-02-18',
    series: 'Raising Champions',
  },
  {
    id: '5',
    videoId: 'dQw4w9WgXcQ',
    title: 'Dominion Over Circumstances',
    speaker: 'Pastor Joshua',
    date: '2024-02-11',
  },
  {
    id: '6',
    videoId: 'dQw4w9WgXcQ',
    title: 'The Overcomer\'s Mindset',
    speaker: 'Pastor Joshua',
    date: '2024-02-04',
    series: 'Kingdom Foundations',
  },
]

export default function SermonsPage() {
  return (
    <main
      className="min-h-screen px-4 py-32"
      style={{ background: 'var(--hero-bg)' }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Page header */}
        <div className="mb-12 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(255,255,255,0.10)',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-live)' }}
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
              Messages
            </span>
          </div>
          <h1
            className="font-black text-white leading-none tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Sermons
          </h1>
          <p className="mt-3 text-white/45 text-sm max-w-md mx-auto">
            Spirit-filled messages to build your faith and ignite your purpose.
          </p>
        </div>

        <SermonGrid sermons={SERMONS} />
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sermons/page.tsx
git commit -m "feat: add /sermons page with sample sermon data"
```

---

## Task 7: Run full test suite + typecheck

- [ ] **Step 1: Run all tests**

```bash
npx jest --no-coverage
```

Expected: All tests pass (previous 28 + new 15 = 43 tests)

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Final commit if any fixes needed**

Fix any TypeScript or test errors, commit.
