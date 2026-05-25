# School of Ministry Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/ministries/school-of-ministry` — hero, courses grid, schedule/fees, and a two-step enrollment form that emails admin + applicant via Nodemailer/Gmail SMTP.

**Architecture:** Static marketing sections use Framer Motion viewport animations with reduced-motion support. The enrollment form is a two-step React Hook Form + Zod wizard; files are base64-encoded client-side and passed to a server action that attaches them to Nodemailer emails.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod, Nodemailer

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `data/courses.ts` | Create | 6 course objects with Lucide icons |
| `schemas/enrollment.schema.ts` | Create | Zod schema + TS types |
| `components/sections/som/hero-section.tsx` | Create | Animated hero with CTAs |
| `components/ui/course-card.tsx` | Create | Single course card |
| `components/sections/som/courses-grid.tsx` | Create | 6-course staggered grid |
| `components/ui/mode-card.tsx` | Create | Online / In-Person card |
| `components/sections/som/schedule-section.tsx` | Create | Schedule, fees, bank details, banner |
| `lib/actions/enroll.ts` | Create | Server action — Nodemailer, two emails |
| `components/forms/enrollment-form.tsx` | Create | Two-step wizard form |
| `app/ministries/school-of-ministry/page.tsx` | Create | Page assembly + metadata |
| `app/globals.css` | Modify | Add `scroll-behavior: smooth` to html if absent |

---

### Task 1: Install nodemailer and configure environment

**Files:**
- Modify: `package.json` (via npm)
- Modify: `.env.local`

- [ ] **Step 1: Install nodemailer**

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

Expected output: `added N packages`

- [ ] **Step 2: Add environment variables to .env.local**

Open `.env.local` (create it if absent) and append:

```
GMAIL_USER=
GMAIL_APP_PASSWORD=
```

Leave values blank for now — the church fills these in. The app handles missing env vars gracefully (emails log to console in dev).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add nodemailer dependency for SOM enrollment emails"
```

---

### Task 2: Course data and enrollment schema

**Files:**
- Create: `data/courses.ts`
- Create: `schemas/enrollment.schema.ts`
- Create: `__tests__/enrollment.schema.test.ts`

- [ ] **Step 1: Write schema validation tests**

Create `__tests__/enrollment.schema.test.ts`:

```ts
import { enrollmentSchema } from '@/schemas/enrollment.schema'

describe('enrollmentSchema', () => {
  const base = {
    email: 'test@example.com',
    passportPhoto: 'data:image/png;base64,abc123',
    title: 'Mr.' as const,
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    gender: 'Male' as const,
    maritalStatus: 'Single' as const,
    nationality: 'Nigerian',
    phone: '08012345678',
    homeAddress: '1 Test Street, Lagos',
    churchName: 'Dominion Faith',
    district: 'HQ' as const,
    programmeMode: 'Online' as const,
    employed: 'No' as const,
    previousSOM: 'No' as const,
    educationBackground: 'University of Lagos, B.Sc, 2019',
    newBirthExperience: 'I gave my life to Christ in 2010 at DFIM Lagos.',
    placeOfWorship: 'Dominion Faith, 1 Dominion Avenue, Lagos',
    previousBibleCollege: 'No' as const,
    departmentInChurch: 'Choir',
    indemnity: true as const,
    paymentProof: 'data:image/png;base64,xyz789',
  }

  it('accepts a valid complete application', () => {
    expect(enrollmentSchema.safeParse(base).success).toBe(true)
  })

  it('rejects invalid Nigerian phone number', () => {
    const r = enrollmentSchema.safeParse({ ...base, phone: '1234567890' })
    expect(r.success).toBe(false)
  })

  it('rejects email without @ symbol', () => {
    const r = enrollmentSchema.safeParse({ ...base, email: 'notanemail' })
    expect(r.success).toBe(false)
  })

  it('rejects missing indemnity agreement', () => {
    const r = enrollmentSchema.safeParse({ ...base, indemnity: false })
    expect(r.success).toBe(false)
  })

  it('rejects empty passport photo', () => {
    const r = enrollmentSchema.safeParse({ ...base, passportPhoto: '' })
    expect(r.success).toBe(false)
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL (schema not yet written)**

```bash
npx jest __tests__/enrollment.schema.test.ts --no-coverage
```

Expected: FAIL — `Cannot find module '@/schemas/enrollment.schema'`

- [ ] **Step 3: Create `data/courses.ts`**

```ts
import { BookOpen, Target, Sparkles, BookMarked, Crown, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Course {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export const COURSES: Course[] = [
  {
    id: 'ministry',
    title: 'Ministry',
    icon: BookOpen,
    description: "Understanding the call to ministry, its functions, responsibilities, and how to operate effectively in God's house.",
  },
  {
    id: 'purpose-driven-church',
    title: 'Purpose Driven Church',
    icon: Target,
    description: "Discovering God's five purposes for the church and how every believer plays a role in fulfilling them.",
  },
  {
    id: 'new-creation-reality',
    title: 'The New Creation Reality',
    icon: Sparkles,
    description: 'A deep dive into who you are in Christ — your rights, identity, and authority as a new creation.',
  },
  {
    id: 'word-foundation',
    title: 'Word Foundation',
    icon: BookMarked,
    description: 'Building an unshakeable foundation on the Word of God through study, meditation, and application.',
  },
  {
    id: 'spiritual-leadership',
    title: 'Spiritual Leadership',
    icon: Crown,
    description: 'Principles of servant leadership drawn from Scripture, equipping you to lead with integrity and impact.',
  },
  {
    id: 'spiritual-warfare',
    title: 'Spiritual Warfare',
    icon: Shield,
    description: "Understanding the believer's authority, the weapons of our warfare, and how to stand firm in victory.",
  },
]
```

- [ ] **Step 4: Create `schemas/enrollment.schema.ts`**

```ts
import { z } from 'zod'

export const DISTRICTS = [
  { value: 'HQ',      label: 'Head Quarters (Ojo)'           },
  { value: 'Mebamu',  label: 'Mebamu District'               },
  { value: 'Festac',  label: 'Festac (Amuwo-Odofin) District'},
  { value: 'Coconut', label: 'Coconut District'              },
  { value: 'Gabon',   label: 'Gabon District'                },
  { value: 'Onitsha', label: 'Onitsha District'              },
  { value: 'Isuochi', label: 'Isuochi District'              },
  { value: 'Delta',   label: 'Delta District'                },
  { value: 'Other',   label: 'Other'                         },
] as const

export type DistrictValue = (typeof DISTRICTS)[number]['value']

export const enrollmentSchema = z.object({
  email:                    z.string().email('Please enter a valid email address'),
  passportPhoto:            z.string().min(1, 'Passport photo is required'),
  title:                    z.enum(['Mr.', 'Mrs.', 'Dr.', 'Miss', 'Mister', 'Other'], {
                              errorMap: () => ({ message: 'Please select a title' }),
                            }),
  titleOther:               z.string().optional(),
  firstName:                z.string().min(2, 'First name must be at least 2 characters'),
  lastName:                 z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth:              z.string().min(1, 'Date of birth is required'),
  gender:                   z.enum(['Male', 'Female'], {
                              errorMap: () => ({ message: 'Please select your gender' }),
                            }),
  maritalStatus:            z.enum(['Married', 'Single', 'Divorced', 'Widow / Widower', 'Separated'], {
                              errorMap: () => ({ message: 'Please select your marital status' }),
                            }),
  nationality:              z.string().min(1, 'Nationality is required'),
  phone:                    z.string().regex(/^0[0-9]{10}$/, 'Enter a valid 11-digit Nigerian number starting with 0'),
  homeAddress:              z.string().min(5, 'Please enter your full address'),
  churchName:               z.string().min(2, 'Church name is required'),
  district:                 z.enum(['HQ','Mebamu','Festac','Coconut','Gabon','Onitsha','Isuochi','Delta','Other'], {
                              errorMap: () => ({ message: 'Please select your district' }),
                            }),
  districtOther:            z.string().optional(),
  programmeMode:            z.enum(['Physical', 'Online'], {
                              errorMap: () => ({ message: 'Please select a programme mode' }),
                            }),
  employed:                 z.enum(['Yes', 'No', 'Maybe'], {
                              errorMap: () => ({ message: 'Please select your employment status' }),
                            }),
  occupation:               z.string().optional(),
  previousSOM:              z.enum(['Yes', 'No'], {
                              errorMap: () => ({ message: 'Please answer this question' }),
                            }),
  previousSOMDetails:       z.string().optional(),
  educationBackground:      z.string().min(10, 'Please provide your education background'),
  newBirthExperience:       z.string().min(20, 'Please describe your new birth experience'),
  placeOfWorship:           z.string().min(5, 'Please specify your place of worship'),
  previousBibleCollege:     z.enum(['Yes', 'No'], {
                              errorMap: () => ({ message: 'Please answer this question' }),
                            }),
  previousBibleCollegeDetails: z.string().optional(),
  departmentInChurch:       z.string().min(2, 'Department is required'),
  indemnity:                z.literal(true, {
                              errorMap: () => ({ message: 'You must agree to the declaration to proceed' }),
                            }),
  paymentProof:             z.string().min(1, 'Proof of payment is required'),
})

export type EnrollmentData = z.infer<typeof enrollmentSchema>
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npx jest __tests__/enrollment.schema.test.ts --no-coverage
```

Expected: PASS (5 tests)

- [ ] **Step 6: Commit**

```bash
git add data/courses.ts schemas/enrollment.schema.ts __tests__/enrollment.schema.test.ts
git commit -m "feat: add SOM course data and enrollment Zod schema"
```

---

### Task 3: Hero section

**Files:**
- Create: `components/sections/som/hero-section.tsx`
- Create: `__tests__/som/HeroSection.test.tsx`

- [ ] **Step 1: Write failing test**

Create `__tests__/som/HeroSection.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import HeroSection from '@/components/sections/som/hero-section'

describe('HeroSection', () => {
  it('renders the main heading', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders Enroll Now CTA linking to #enroll', () => {
    render(<HeroSection />)
    const link = screen.getByRole('link', { name: /enroll now/i })
    expect(link).toHaveAttribute('href', '#enroll')
  })

  it('renders Learn More CTA linking to #courses', () => {
    render(<HeroSection />)
    const link = screen.getByRole('link', { name: /learn more/i })
    expect(link).toHaveAttribute('href', '#courses')
  })

  it('renders the intake badge', () => {
    render(<HeroSection />)
    expect(screen.getByText(/New Intake/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx jest __tests__/som/HeroSection.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module`

- [ ] **Step 3: Create `components/sections/som/hero-section.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'

const MotionDiv = motion.div
const MotionH1  = motion.h1
const MotionP   = motion.p
const EASE_OUT  = [0.16, 1, 0.3, 1] as const

export default function HeroSection() {
  const prefersReduced = useReducedMotion()

  const fadeUp = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial:    { opacity: 0, y: 24 },
          animate:    { opacity: 1, y: 0  },
          transition: { duration: 0.6, delay, ease: EASE_OUT },
        }

  return (
    <section
      className="relative w-full overflow-hidden py-32 md:py-44"
      style={{ background: 'linear-gradient(160deg, #1a1f8f 0%, #2A2FAA 45%, #1e2380 100%)' }}
      aria-label="School of Ministry hero"
    >
      {/* Animated background orbs */}
      <MotionDiv
        className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #4a50cc 0%, transparent 65%)' }}
        animate={prefersReduced ? {} : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <MotionDiv
        className="pointer-events-none absolute -bottom-20 right-0 h-[500px] w-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #F9A916 0%, transparent 65%)' }}
        animate={prefersReduced ? {} : { x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 5 }}
        aria-hidden="true"
      />
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-16">
        {/* Badges */}
        <MotionDiv {...fadeUp(0)} className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
            style={{ background: 'rgba(246,31,39,0.15)', borderColor: 'rgba(246,31,39,0.35)' }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F61F27]" />
            New Intake — June 2025
          </span>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/80"
            style={{ borderColor: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)' }}
          >
            Online &amp; In-Person
          </span>
        </MotionDiv>

        {/* Eyebrow */}
        <MotionP {...fadeUp(0.05)} className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
          Dominion Faith International Ministry
        </MotionP>

        {/* H1 */}
        <MotionH1
          {...fadeUp(0.1)}
          className="mb-5 font-black leading-tight tracking-[-0.03em] text-white"
          style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
        >
          School of <span style={{ color: '#F9A916' }}>Ministry</span>
        </MotionH1>

        {/* Subheading */}
        <MotionP
          {...fadeUp(0.2)}
          className="mx-auto mb-10 max-w-xl text-[16px] leading-relaxed text-white/65 md:text-lg"
        >
          Equipping believers with the Word, wisdom, and spiritual authority to transform their world
        </MotionP>

        {/* CTAs */}
        <MotionDiv {...fadeUp(0.3)} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#enroll"
            className="rounded-full px-8 py-3.5 text-sm font-black transition-opacity hover:opacity-85"
            style={{ background: '#F9A916', color: '#1a1206', boxShadow: '0 4px 20px rgba(249,169,22,0.45)' }}
          >
            Enroll Now
          </a>
          <a
            href="#courses"
            className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            Learn More
          </a>
        </MotionDiv>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npx jest __tests__/som/HeroSection.test.tsx --no-coverage
```

Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add components/sections/som/hero-section.tsx __tests__/som/HeroSection.test.tsx
git commit -m "feat: add SOM hero section"
```

---

### Task 4: CourseCard and CoursesGrid

**Files:**
- Create: `components/ui/course-card.tsx`
- Create: `components/sections/som/courses-grid.tsx`
- Create: `__tests__/som/CoursesGrid.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `__tests__/som/CoursesGrid.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import CoursesGrid from '@/components/sections/som/courses-grid'

describe('CoursesGrid', () => {
  it('renders all 6 course titles', () => {
    render(<CoursesGrid />)
    expect(screen.getByText('Ministry')).toBeInTheDocument()
    expect(screen.getByText('Purpose Driven Church')).toBeInTheDocument()
    expect(screen.getByText('The New Creation Reality')).toBeInTheDocument()
    expect(screen.getByText('Word Foundation')).toBeInTheDocument()
    expect(screen.getByText('Spiritual Leadership')).toBeInTheDocument()
    expect(screen.getByText('Spiritual Warfare')).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<CoursesGrid />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx jest __tests__/som/CoursesGrid.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module`

- [ ] **Step 3: Create `components/ui/course-card.tsx`**

```tsx
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
        background:    'rgba(12,12,40,0.7)',
        border:        '1px solid rgba(255,255,255,0.08)',
        borderLeft:    '3px solid #2A2FAA',
        boxShadow:     '0 4px 24px rgba(0,0,0,0.3)',
        transition:    'border-left-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderLeft    = '3px solid #F9A916'
        el.style.boxShadow     = '0 8px 40px rgba(249,169,22,0.15)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderLeft    = '3px solid #2A2FAA'
        el.style.boxShadow     = '0 4px 24px rgba(0,0,0,0.3)'
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
```

- [ ] **Step 4: Create `components/sections/som/courses-grid.tsx`**

```tsx
'use client'

import CourseCard from '@/components/ui/course-card'
import { COURSES } from '@/data/courses'

export default function CoursesGrid() {
  return (
    <section
      id="courses"
      className="w-full py-24"
      style={{ background: 'linear-gradient(160deg, #07071f 0%, #0f0f12 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
            What You'll Study
          </p>
          <h2
            className="mb-4 font-black leading-tight tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            Our <span style={{ color: '#F9A916' }}>Courses</span>
          </h2>
          <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-white/45">
            Each course is designed to ground you in truth, sharpen your gifts, and prepare you for effective ministry
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npx jest __tests__/som/CoursesGrid.test.tsx --no-coverage
```

Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add components/ui/course-card.tsx components/sections/som/courses-grid.tsx __tests__/som/CoursesGrid.test.tsx
git commit -m "feat: add SOM course card and courses grid section"
```

---

### Task 5: ModeCard and ScheduleSection

**Files:**
- Create: `components/ui/mode-card.tsx`
- Create: `components/sections/som/schedule-section.tsx`
- Create: `__tests__/som/ModeCard.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `__tests__/som/ModeCard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import ModeCard from '@/components/ui/mode-card'
import { Laptop } from 'lucide-react'

describe('ModeCard', () => {
  it('renders the title and note', () => {
    render(
      <ModeCard
        icon={Laptop}
        title="Online"
        note="Available on Zoom"
        schedule={{ saturday: '7:00 PM', sunday: '7:00 PM' }}
      />
    )
    expect(screen.getByText('Online')).toBeInTheDocument()
    expect(screen.getByText('Available on Zoom')).toBeInTheDocument()
  })

  it('renders schedule times', () => {
    render(
      <ModeCard
        icon={Laptop}
        title="Online"
        note="Zoom"
        schedule={{ saturday: '7:00 PM', sunday: '9:00 AM' }}
      />
    )
    expect(screen.getByText('7:00 PM')).toBeInTheDocument()
    expect(screen.getByText('9:00 AM')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx jest __tests__/som/ModeCard.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module`

- [ ] **Step 3: Create `components/ui/mode-card.tsx`**

```tsx
import type { LucideIcon } from 'lucide-react'

interface ModeCardProps {
  icon: LucideIcon
  title: string
  note: string
  schedule: { saturday: string; sunday: string }
  highlighted?: boolean
}

export default function ModeCard({ icon: Icon, title, note, schedule, highlighted }: ModeCardProps) {
  return (
    <div
      className="flex flex-1 flex-col gap-5 rounded-2xl p-7"
      style={{
        background: highlighted ? 'rgba(42,47,170,0.12)' : 'rgba(12,12,40,0.7)',
        border:     `1px solid ${highlighted ? 'rgba(42,47,170,0.5)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow:  '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: 'rgba(42,47,170,0.2)', border: '1px solid rgba(42,47,170,0.3)' }}
        >
          <Icon size={20} style={{ color: '#2A2FAA' }} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-[16px] font-black text-white">{title}</h3>
          <p className="text-[11px] text-white/40">{note}</p>
        </div>
      </div>
      <div className="border-t border-white/[0.07]" />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-white/50">Saturday</span>
          <span className="text-[14px] font-bold text-white">{schedule.saturday}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-white/50">Sunday</span>
          <span className="text-[14px] font-bold text-white">{schedule.sunday}</span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create `components/sections/som/schedule-section.tsx`**

```tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Laptop, MapPin } from 'lucide-react'
import ModeCard from '@/components/ui/mode-card'

const MotionDiv = motion.div
const EASE_OUT  = [0.16, 1, 0.3, 1] as const

function useCountUp(target: number, duration = 2000) {
  const prefersReduced = useReducedMotion()
  const [count, setCount]   = useState(prefersReduced ? target : 0)
  const ref                  = useRef<HTMLDivElement>(null)
  const hasRun               = useRef(false)

  useEffect(() => {
    if (prefersReduced) { setCount(target); return }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasRun.current) return
      hasRun.current = true
      observer.disconnect()
      const startTime = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased    = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, prefersReduced])

  return { count, ref }
}

export default function ScheduleSection() {
  const { count, ref } = useCountUp(30000)

  return (
    <section
      className="w-full py-24"
      style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-16">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">Join Us</p>
          <h2
            className="font-black leading-tight tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            Schedule &amp; <span style={{ color: '#F9A916' }}>Fees</span>
          </h2>
        </div>

        {/* Mode cards */}
        <div className="mb-14 flex flex-col gap-5 sm:flex-row">
          <ModeCard
            icon={Laptop}
            title="Online"
            note="Available on Zoom & YouTube Live"
            schedule={{ saturday: '7:00 PM', sunday: '7:00 PM' }}
            highlighted
          />
          <ModeCard
            icon={MapPin}
            title="In-Person"
            note="At all district churches"
            schedule={{ saturday: '4:00 PM', sunday: '2:00 PM' }}
          />
        </div>

        {/* Fees card */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-8 rounded-3xl p-8 text-center"
          style={{ background: 'rgba(12,12,40,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">Programme Fee</p>
          <div ref={ref} className="mb-2 font-black" style={{ fontSize: 'clamp(40px,6vw,72px)', color: '#2A2FAA' }}>
            ₦{count.toLocaleString()}
          </div>
          <p className="mb-1 text-[14px] text-white/50">Total fee — covers all 6 courses</p>
          <p className="text-[13px] text-white/35">Registration fee: ₦10,000 (commitment, paid upfront)</p>
          <div
            className="mx-auto mt-6 max-w-sm rounded-2xl p-4 text-left text-[12px]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="mb-1 font-bold text-white/60">Bank Transfer Details</p>
            <p className="leading-relaxed text-white/40">
              Account Name: Dominion Faith In&apos;l School of Ministry<br />
              Bank: Globus Bank PLC<br />
              Account No: <strong className="text-white/60">1000389027</strong>
            </p>
          </div>
          <p className="mt-3 text-[12px] text-white/30">Proof of payment required in the application form below.</p>
        </MotionDiv>

        {/* Intake banner */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          className="flex flex-col items-center justify-between gap-4 rounded-2xl px-8 py-6 sm:flex-row"
          style={{ background: '#F9A916' }}
        >
          <p className="text-[15px] font-black" style={{ color: '#1a1206' }}>
            🎓 Next Intake: June 2025 — Applications Now Open
          </p>
          <a
            href="#enroll"
            className="flex-shrink-0 rounded-full px-7 py-2.5 text-sm font-black text-white transition-opacity hover:opacity-85"
            style={{ background: '#2A2FAA' }}
          >
            Apply Now
          </a>
        </MotionDiv>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npx jest __tests__/som/ModeCard.test.tsx --no-coverage
```

Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add components/ui/mode-card.tsx components/sections/som/schedule-section.tsx __tests__/som/ModeCard.test.tsx
git commit -m "feat: add SOM mode card and schedule/fees section"
```

---

### Task 6: Enrollment server action

**Files:**
- Create: `lib/actions/enroll.ts`
- Create: `__tests__/enroll.action.test.ts`

- [ ] **Step 1: Write failing tests**

Create `__tests__/enroll.action.test.ts`:

```ts
const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'ok' })
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({ sendMail: mockSendMail })),
}))

import { submitEnrollment } from '@/lib/actions/enroll'
import type { EnrollmentData } from '@/schemas/enrollment.schema'

const valid: EnrollmentData = {
  email: 'applicant@test.com',
  passportPhoto: 'data:image/png;base64,abc',
  title: 'Mr.',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  gender: 'Male',
  maritalStatus: 'Single',
  nationality: 'Nigerian',
  phone: '08012345678',
  homeAddress: '1 Test Street, Lagos',
  churchName: 'Dominion Faith',
  district: 'HQ',
  programmeMode: 'Online',
  employed: 'No',
  previousSOM: 'No',
  educationBackground: 'University of Lagos, B.Sc, 2019',
  newBirthExperience: 'I gave my life to Christ in 2010 at DFIM Lagos.',
  placeOfWorship: 'Dominion Faith, 1 Dominion Avenue, Lagos',
  previousBibleCollege: 'No',
  departmentInChurch: 'Choir',
  indemnity: true,
  paymentProof: 'data:image/png;base64,xyz',
}

describe('submitEnrollment', () => {
  beforeEach(() => {
    mockSendMail.mockClear()
    process.env.GMAIL_USER         = 'test@gmail.com'
    process.env.GMAIL_APP_PASSWORD = 'testpassword'
  })

  it('returns success and sends two emails for valid data', async () => {
    const result = await submitEnrollment(valid)
    expect(result.success).toBe(true)
    expect(mockSendMail).toHaveBeenCalledTimes(2)
  })

  it('sends admin email to info@dominionfaith.com', async () => {
    await submitEnrollment(valid)
    const adminCall = mockSendMail.mock.calls[0][0]
    expect(adminCall.to).toBe('info@dominionfaith.com')
    expect(adminCall.subject).toContain('John Doe')
  })

  it('sends confirmation email to applicant', async () => {
    await submitEnrollment(valid)
    const applicantCall = mockSendMail.mock.calls[1][0]
    expect(applicantCall.to).toBe('applicant@test.com')
  })

  it('returns failure for invalid data', async () => {
    const result = await submitEnrollment({ ...valid, email: 'bad-email' } as EnrollmentData)
    expect(result.success).toBe(false)
    expect(mockSendMail).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx jest __tests__/enroll.action.test.ts --no-coverage
```

Expected: FAIL — `Cannot find module '@/lib/actions/enroll'`

- [ ] **Step 3: Create `lib/actions/enroll.ts`**

```ts
'use server'

import nodemailer from 'nodemailer'
import { enrollmentSchema, type EnrollmentData } from '@/schemas/enrollment.schema'

export interface EnrollmentResult {
  success: boolean
  message: string
}

function extractBase64(dataUrl: string) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) return null
  return { mimeType: match[1], data: match[2], ext: match[1].split('/')[1] ?? 'bin' }
}

function buildAdminHtml(d: EnrollmentData): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;font-weight:600;color:#555;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#222">${value || '—'}</td></tr>`

  return `<div style="font-family:sans-serif;max-width:640px;margin:0 auto">
    <h2 style="background:#2A2FAA;color:#fff;padding:16px 20px;margin:0;border-radius:8px 8px 0 0">New School of Ministry Application</h2>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-top:none">
      ${row('Full Name',       `${d.title} ${d.firstName} ${d.lastName}`)}
      ${row('Email',            d.email)}
      ${row('Phone',            d.phone)}
      ${row('Date of Birth',    d.dateOfBirth)}
      ${row('Gender',           d.gender)}
      ${row('Marital Status',   d.maritalStatus)}
      ${row('Nationality',      d.nationality)}
      ${row('Home Address',     d.homeAddress)}
      ${row('Church Name',      d.churchName)}
      ${row('District',         d.district === 'Other' ? (d.districtOther ?? 'Other') : d.district)}
      ${row('Programme Mode',   d.programmeMode)}
      ${row('Employed',         d.employed)}
      ${d.employed === 'Yes'           ? row('Occupation',             d.occupation ?? '')             : ''}
      ${row('Previous SOM',     d.previousSOM)}
      ${d.previousSOM === 'Yes'        ? row('Previous Session',        d.previousSOMDetails ?? '')     : ''}
      ${row('Education',        d.educationBackground)}
      ${row('New Birth',        d.newBirthExperience)}
      ${row('Place of Worship', d.placeOfWorship)}
      ${row('Bible College',    d.previousBibleCollege)}
      ${d.previousBibleCollege === 'Yes' ? row('College Details',      d.previousBibleCollegeDetails ?? '') : ''}
      ${row('Department',       d.departmentInChurch)}
      ${row('Indemnity',        'Agreed')}
    </table>
    <p style="padding:12px 20px;color:#888;font-size:12px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
      Passport photo and proof of payment attached.
    </p>
  </div>`
}

function buildApplicantHtml(d: EnrollmentData): string {
  const district = d.district === 'Other' ? (d.districtOther ?? 'Other') : d.district
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
    <div style="background:#2A2FAA;padding:24px 28px;border-radius:8px 8px 0 0">
      <h1 style="color:#fff;margin:0;font-size:22px">Application Received!</h1>
      <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px">Dominion Faith School of Ministry</p>
    </div>
    <div style="padding:28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
      <p style="color:#333">Dear ${d.title} ${d.firstName} ${d.lastName},</p>
      <p style="color:#555;line-height:1.7">Thank you for applying to the <strong>Dominion Faith School of Ministry</strong>. We have received your application and will review it within <strong>48 hours</strong>.</p>
      <p style="color:#555;line-height:1.7">You applied for the <strong>${d.programmeMode} Class</strong> at the <strong>${district}</strong> district.</p>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;margin:20px 0">
        <p style="margin:0 0 8px;font-weight:700;color:#2A2FAA">Payment Reference</p>
        <p style="margin:0;color:#555;font-size:13px;line-height:1.8">
          Registration Fee: <strong>₦10,000</strong><br/>
          Account Name: Dominion Faith In'l School of Ministry<br/>
          Bank: Globus Bank PLC — Account No: <strong>1000389027</strong>
        </p>
      </div>
      <p style="color:#555;line-height:1.7">Contact us at <a href="mailto:info@dominionfaith.com" style="color:#2A2FAA">info@dominionfaith.com</a> or call <a href="tel:+2347034543971" style="color:#2A2FAA">+234 703 454 3971</a>.</p>
      <p style="color:#555;margin-top:24px">God bless you,<br/><strong>The DFIM Team</strong></p>
    </div>
  </div>`
}

export async function submitEnrollment(data: EnrollmentData): Promise<EnrollmentResult> {
  const parsed = enrollmentSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, message: 'Invalid form data. Please check your entries.' }
  }

  const d = parsed.data

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })

    const attachments: nodemailer.SendMailOptions['attachments'] = []
    const photo = extractBase64(d.passportPhoto)
    if (photo) attachments.push({ filename: `passport-${d.firstName}-${d.lastName}.${photo.ext}`, content: photo.data, encoding: 'base64', contentType: photo.mimeType })
    const proof = extractBase64(d.paymentProof)
    if (proof) attachments.push({ filename: `payment-proof-${d.firstName}-${d.lastName}.${proof.ext}`, content: proof.data, encoding: 'base64', contentType: proof.mimeType })

    await transporter.sendMail({
      from:    `"DFIM Website" <${process.env.GMAIL_USER}>`,
      to:      'info@dominionfaith.com',
      subject: `New SOM Application — ${d.firstName} ${d.lastName}`,
      html:    buildAdminHtml(d),
      attachments,
    })

    await transporter.sendMail({
      from:    `"Dominion Faith School of Ministry" <${process.env.GMAIL_USER}>`,
      to:      d.email,
      subject: 'Application Received — Dominion Faith School of Ministry',
      html:    buildApplicantHtml(d),
    })

    return {
      success: true,
      message: `Thank you, ${d.firstName}! We've received your application and will be in touch within 48 hours. God bless you!`,
    }
  } catch (err) {
    console.error('[EnrollmentAction]', err)
    return { success: false, message: 'Something went wrong. Please try again or email info@dominionfaith.com.' }
  }
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npx jest __tests__/enroll.action.test.ts --no-coverage
```

Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/actions/enroll.ts __tests__/enroll.action.test.ts
git commit -m "feat: add SOM enrollment server action with Nodemailer"
```

---

### Task 7: Enrollment form (two-step wizard)

**Files:**
- Create: `components/forms/enrollment-form.tsx`
- Create: `__tests__/som/EnrollmentForm.test.tsx`

- [ ] **Step 1: Write failing render test**

Create `__tests__/som/EnrollmentForm.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import EnrollmentForm from '@/components/forms/enrollment-form'

jest.mock('@/lib/actions/enroll', () => ({
  submitEnrollment: jest.fn(),
}))

describe('EnrollmentForm', () => {
  it('renders step 1 with email field', () => {
    render(<EnrollmentForm />)
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
  })

  it('renders the step indicator', () => {
    render(<EnrollmentForm />)
    expect(screen.getByText('Personal Details')).toBeInTheDocument()
  })

  it('renders the Next button on step 1', () => {
    render(<EnrollmentForm />)
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx jest __tests__/som/EnrollmentForm.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module`

- [ ] **Step 3: Create `components/forms/enrollment-form.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2, Upload, ChevronRight, ChevronLeft } from 'lucide-react'
import { enrollmentSchema, DISTRICTS, type EnrollmentData } from '@/schemas/enrollment.schema'
import { submitEnrollment } from '@/lib/actions/enroll'

const MotionDiv = motion.div

const INPUT_BASE  = 'w-full rounded-xl border bg-transparent px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none transition-all duration-200'
const INPUT_IDLE  = 'border-white/10 focus:border-[#2A2FAA] focus:ring-2 focus:ring-[#2A2FAA]/20'
const INPUT_ERROR = 'border-[#F61F27]/50 focus:border-[#F61F27] focus:ring-2 focus:ring-[#F61F27]/15'

function Field({ label, error, required, hint, children, id }: {
  label: string; error?: string; required?: boolean; hint?: string
  children: React.ReactNode; id?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[13px] font-semibold text-white/70">
        {label}{required && <span className="ml-1 text-[#F61F27]" aria-hidden="true">*</span>}
      </label>
      {hint && <p className="text-[11px] text-white/35">{hint}</p>}
      {children}
      <AnimatePresence>
        {error && (
          <MotionDiv
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-[12px] font-medium"
            style={{ color: '#F61F27' }} role="alert"
          >
            <AlertCircle size={12} aria-hidden="true" />{error}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

function RadioGroup({ name, options, value, onChange, error }: {
  name: string; options: { value: string; label: string }[]
  value: string; onChange: (v: string) => void; error?: string
}) {
  return (
    <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={name}>
      {options.map(opt => (
        <label
          key={opt.value}
          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-medium transition-all ${
            value === opt.value
              ? 'border-[#2A2FAA] bg-[#2A2FAA]/15 text-white'
              : 'border-white/10 text-white/60 hover:border-white/25 hover:text-white'
          }`}
        >
          <input type="radio" name={name} value={opt.value} checked={value === opt.value}
            onChange={() => onChange(opt.value)} className="sr-only" />
          {opt.label}
        </label>
      ))}
      {error && (
        <p className="flex w-full items-center gap-1.5 text-[12px] font-medium" style={{ color: '#F61F27' }}>
          <AlertCircle size={12} />{error}
        </p>
      )}
    </div>
  )
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload  = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}

const STEP1_FIELDS: (keyof EnrollmentData)[] = [
  'email','passportPhoto','title','firstName','lastName','dateOfBirth',
  'gender','maritalStatus','nationality','phone','homeAddress','churchName',
  'district','programmeMode','employed','previousSOM',
]

export default function EnrollmentForm() {
  const [step,          setStep]          = useState(1)
  const [status,        setStatus]        = useState<'idle'|'submitting'|'success'|'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [photoName,     setPhotoName]     = useState('')
  const [proofName,     setProofName]     = useState('')

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } =
    useForm<EnrollmentData>({ resolver: zodResolver(enrollmentSchema) })

  const titleVal    = watch('title')
  const employed    = watch('employed')
  const prevSOM     = watch('previousSOM')
  const district    = watch('district')
  const prevBible   = watch('previousBibleCollege')

  const goToStep2 = async () => {
    const valid = await trigger(STEP1_FIELDS)
    if (valid) setStep(2)
  }

  const handleFileChange = (field: 'passportPhoto'|'paymentProof', setName: (n: string) => void) =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file || file.size > 10 * 1024 * 1024) return
      setName(file.name)
      setValue(field, await fileToBase64(file), { shouldValidate: true })
    }

  const onSubmit = async (data: EnrollmentData) => {
    setStatus('submitting')
    const result = await submitEnrollment(data)
    if (result.success) { setStatus('success'); setServerMessage(result.message) }
    else                { setStatus('error');   setServerMessage(result.message) }
  }

  if (status === 'success') {
    return (
      <MotionDiv
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center"
        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(16,185,129,0.15)' }}>
          <CheckCircle size={32} style={{ color: '#10b981' }} />
        </div>
        <div>
          <h3 className="mb-3 text-2xl font-black text-white">Application Received!</h3>
          <p className="text-[15px] leading-relaxed text-white/60">{serverMessage}</p>
        </div>
      </MotionDiv>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {([1, 2] as const).map((n, i) => (
          <div key={n} className="flex items-center gap-2">
            {i > 0 && <div className="h-px w-8 bg-white/15" />}
            <div className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-black"
              style={{ background: step >= n ? '#2A2FAA' : 'rgba(255,255,255,0.08)', color: step >= n ? '#fff' : 'rgba(255,255,255,0.35)' }}>
              {n}
            </div>
            <span className={`text-[12px] font-semibold ${step === n ? 'text-white' : 'text-white/35'}`}>
              {n === 1 ? 'Personal Details' : 'Background & Declaration'}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-3xl p-8 md:p-10"
        style={{ background: 'rgba(12,12,40,0.7)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 0 5px rgba(8,8,28,0.7),0 0 0 6px rgba(255,255,255,0.04)' }}>

        <AnimatePresence>
          {status === 'error' && serverMessage && (
            <MotionDiv initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-6 flex items-start gap-3 rounded-xl px-4 py-3 text-[13px]"
              style={{ background: 'rgba(246,31,39,0.08)', border: '1px solid rgba(246,31,39,0.25)', color: '#f87171' }}
              role="alert">
              <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />{serverMessage}
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* ─── STEP 1 ─── */}
        {step === 1 && (
          <div className="space-y-6">
            <Field label="Email Address" error={errors.email?.message} required id="email">
              <input id="email" type="email" placeholder="you@example.com" autoComplete="email"
                {...register('email')} className={`${INPUT_BASE} ${errors.email ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="Passport Photo" error={errors.passportPhoto?.message} required hint="PDF or image — max 10 MB">
              <label className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all ${errors.passportPhoto ? INPUT_ERROR : INPUT_IDLE}`}>
                <Upload size={16} className="flex-shrink-0 text-white/40" />
                <span className="truncate text-[14px] text-white/40">{photoName || 'Choose file…'}</span>
                <input type="file" accept="image/*,.pdf" className="sr-only" onChange={handleFileChange('passportPhoto', setPhotoName)} />
              </label>
            </Field>

            <Field label="Title" error={errors.title?.message} required>
              <RadioGroup name="title"
                options={['Mr.','Mrs.','Dr.','Miss','Mister','Other'].map(v => ({ value: v, label: v }))}
                value={titleVal ?? ''} onChange={v => setValue('title', v as EnrollmentData['title'], { shouldValidate: true })}
                error={errors.title?.message} />
              {titleVal === 'Other' && (
                <input type="text" placeholder="Please specify…" {...register('titleOther')}
                  className={`mt-2 ${INPUT_BASE} ${INPUT_IDLE}`} />
              )}
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="First Name (Surname)" error={errors.firstName?.message} required id="firstName">
                <input id="firstName" type="text" placeholder="Surname" autoComplete="given-name"
                  {...register('firstName')} className={`${INPUT_BASE} ${errors.firstName ? INPUT_ERROR : INPUT_IDLE}`} />
              </Field>
              <Field label="Last Name" error={errors.lastName?.message} required id="lastName">
                <input id="lastName" type="text" placeholder="Last Name" autoComplete="family-name"
                  {...register('lastName')} className={`${INPUT_BASE} ${errors.lastName ? INPUT_ERROR : INPUT_IDLE}`} />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Date of Birth" error={errors.dateOfBirth?.message} required id="dob">
                <input id="dob" type="date" {...register('dateOfBirth')}
                  className={`${INPUT_BASE} ${errors.dateOfBirth ? INPUT_ERROR : INPUT_IDLE}`}
                  style={{ colorScheme: 'dark' }} />
              </Field>
              <Field label="Nationality" error={errors.nationality?.message} required id="nationality">
                <input id="nationality" type="text" placeholder="e.g. Nigerian" {...register('nationality')}
                  className={`${INPUT_BASE} ${errors.nationality ? INPUT_ERROR : INPUT_IDLE}`} />
              </Field>
            </div>

            <Field label="Gender" error={errors.gender?.message} required>
              <RadioGroup name="gender" options={[{value:'Male',label:'Male'},{value:'Female',label:'Female'}]}
                value={watch('gender') ?? ''} onChange={v => setValue('gender', v as 'Male'|'Female', { shouldValidate: true })}
                error={errors.gender?.message} />
            </Field>

            <Field label="Marital Status" error={errors.maritalStatus?.message} required>
              <RadioGroup name="maritalStatus"
                options={['Married','Single','Divorced','Widow / Widower','Separated'].map(v => ({ value: v, label: v }))}
                value={watch('maritalStatus') ?? ''}
                onChange={v => setValue('maritalStatus', v as EnrollmentData['maritalStatus'], { shouldValidate: true })}
                error={errors.maritalStatus?.message} />
            </Field>

            <Field label="Phone Number" error={errors.phone?.message} required hint="11 digits starting with 0, e.g. 08012345678" id="phone">
              <input id="phone" type="tel" placeholder="08012345678" autoComplete="tel"
                {...register('phone')} className={`${INPUT_BASE} ${errors.phone ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="Home Address" error={errors.homeAddress?.message} required id="homeAddress">
              <textarea id="homeAddress" rows={3} placeholder="Your full home address" {...register('homeAddress')}
                className={`${INPUT_BASE} resize-none ${errors.homeAddress ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="Name of Your Church" error={errors.churchName?.message} required id="churchName">
              <input id="churchName" type="text" placeholder="e.g. Dominion Faith International Ministry"
                {...register('churchName')} className={`${INPUT_BASE} ${errors.churchName ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="District" error={errors.district?.message} required>
              <RadioGroup name="district" options={DISTRICTS.map(d => ({ value: d.value, label: d.label }))}
                value={district ?? ''} onChange={v => setValue('district', v as EnrollmentData['district'], { shouldValidate: true })}
                error={errors.district?.message} />
              {district === 'Other' && (
                <input type="text" placeholder="Please specify your district…" {...register('districtOther')}
                  className={`mt-2 ${INPUT_BASE} ${INPUT_IDLE}`} />
              )}
            </Field>

            <Field label="Nature of Programme" error={errors.programmeMode?.message} required>
              <RadioGroup name="programmeMode"
                options={[{value:'Physical',label:'Physical Class'},{value:'Online',label:'Online Class'}]}
                value={watch('programmeMode') ?? ''}
                onChange={v => setValue('programmeMode', v as 'Physical'|'Online', { shouldValidate: true })}
                error={errors.programmeMode?.message} />
            </Field>

            <Field label="Are You Currently Employed?" error={errors.employed?.message} required>
              <RadioGroup name="employed" options={[{value:'Yes',label:'Yes'},{value:'No',label:'No'},{value:'Maybe',label:'Maybe'}]}
                value={employed ?? ''} onChange={v => setValue('employed', v as 'Yes'|'No'|'Maybe', { shouldValidate: true })}
                error={errors.employed?.message} />
              {employed === 'Yes' && (
                <input type="text" placeholder="State your occupation" {...register('occupation')}
                  className={`mt-2 ${INPUT_BASE} ${INPUT_IDLE}`} />
              )}
            </Field>

            <Field label="Have You Participated in the SOM Programme Before?" error={errors.previousSOM?.message} required>
              <RadioGroup name="previousSOM" options={[{value:'Yes',label:'Yes'},{value:'No',label:'No'}]}
                value={prevSOM ?? ''} onChange={v => setValue('previousSOM', v as 'Yes'|'No', { shouldValidate: true })}
                error={errors.previousSOM?.message} />
              {prevSOM === 'Yes' && (
                <textarea rows={2} placeholder="E.g. HQ, Online Class — 2024 Session" {...register('previousSOMDetails')}
                  className={`mt-2 ${INPUT_BASE} resize-none ${INPUT_IDLE}`} />
              )}
            </Field>
          </div>
        )}

        {/* ─── STEP 2 ─── */}
        {step === 2 && (
          <div className="space-y-6">
            <Field label="Education Qualifications / Background" error={errors.educationBackground?.message} required
              hint="Name of institute, qualification, and year of completion" id="edu">
              <textarea id="edu" rows={4} placeholder="e.g. University of Lagos, B.Sc Computer Science, 2019"
                {...register('educationBackground')}
                className={`${INPUT_BASE} resize-none ${errors.educationBackground ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="New Birth Experience" error={errors.newBirthExperience?.message} required
              hint="Please give details and state where and when it occurred" id="newBirth">
              <textarea id="newBirth" rows={4} placeholder="Describe your born again experience, when and where it happened…"
                {...register('newBirthExperience')}
                className={`${INPUT_BASE} resize-none ${errors.newBirthExperience ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="Place of Worship" error={errors.placeOfWorship?.message} required
              hint="Name and address of your place of worship" id="placeOfWorship">
              <textarea id="placeOfWorship" rows={3} placeholder="Church name and address"
                {...register('placeOfWorship')}
                className={`${INPUT_BASE} resize-none ${errors.placeOfWorship ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="Have You Attended Any Other Bible College?" error={errors.previousBibleCollege?.message} required>
              <RadioGroup name="previousBibleCollege" options={[{value:'Yes',label:'Yes'},{value:'No',label:'No'}]}
                value={prevBible ?? ''} onChange={v => setValue('previousBibleCollege', v as 'Yes'|'No', { shouldValidate: true })}
                error={errors.previousBibleCollege?.message} />
              {prevBible === 'Yes' && (
                <textarea rows={3} placeholder="Name of Bible school, location, date period attended"
                  {...register('previousBibleCollegeDetails')}
                  className={`mt-2 ${INPUT_BASE} resize-none ${INPUT_IDLE}`} />
              )}
            </Field>

            <Field label="Department / Worker Service Unit in Church" error={errors.departmentInChurch?.message} required id="dept">
              <input id="dept" type="text" placeholder="e.g. Choir, Ushering, Children's Ministry"
                {...register('departmentInChurch')}
                className={`${INPUT_BASE} ${errors.departmentInChurch ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            {/* Indemnity */}
            <div className="rounded-2xl p-5 space-y-3"
              style={{ background: 'rgba(42,47,170,0.08)', border: '1px solid rgba(42,47,170,0.2)' }}>
              <h4 className="text-[14px] font-bold text-white">Statement of Indemnity</h4>
              <p className="text-[13px] leading-relaxed text-white/55">
                I, the above designated, declare this information is true to the best of my knowledge. I am aware that if it is found to be untrue, I may be disqualified. I also agree to abide by the rules and regulations governing the Course.
              </p>
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" {...register('indemnity')} className="mt-0.5 h-4 w-4 cursor-pointer rounded accent-[#2A2FAA]" />
                <span className="text-[13px] font-semibold text-white/80">I agree with the above declaration</span>
              </label>
              {errors.indemnity && (
                <p className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: '#F61F27' }}>
                  <AlertCircle size={12} />{errors.indemnity.message}
                </p>
              )}
            </div>

            {/* Payment note */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(249,169,22,0.06)', border: '1px solid rgba(249,169,22,0.2)' }}>
              <h4 className="mb-2 text-[13px] font-bold text-white/80">Payment Details</h4>
              <p className="text-[12px] leading-relaxed text-white/50">
                Registration Fee: <strong className="text-white/70">₦10,000</strong><br />
                Account Name: Dominion Faith In&apos;l School of Ministry<br />
                Bank: Globus Bank PLC — Account No: <strong className="text-white/70">1000389027</strong>
              </p>
            </div>

            <Field label="Attach Proof of Payment" error={errors.paymentProof?.message} required hint="PDF or image of bank receipt — max 10 MB">
              <label className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all ${errors.paymentProof ? INPUT_ERROR : INPUT_IDLE}`}>
                <Upload size={16} className="flex-shrink-0 text-white/40" />
                <span className="truncate text-[14px] text-white/40">{proofName || 'Choose file…'}</span>
                <input type="file" accept="image/*,.pdf" className="sr-only" onChange={handleFileChange('paymentProof', setProofName)} />
              </label>
            </Field>
          </div>
        )}

        {/* Navigation */}
        <div className={`mt-8 flex ${step === 2 ? 'justify-between' : 'justify-end'} gap-3`}>
          {step === 2 && (
            <button type="button" onClick={() => setStep(1)}
              className="flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10">
              <ChevronLeft size={16} />Back
            </button>
          )}
          {step === 1 && (
            <button type="button" onClick={goToStep2}
              className="flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-black text-white transition-opacity hover:opacity-85"
              style={{ background: '#2A2FAA' }}>
              Next<ChevronRight size={16} />
            </button>
          )}
          {step === 2 && (
            <button type="submit" disabled={status === 'submitting'}
              className="flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-sm font-black text-white transition-opacity hover:opacity-85 disabled:opacity-60"
              style={{ background: '#2A2FAA' }}>
              {status === 'submitting' ? <><Loader2 size={16} className="animate-spin" />Submitting…</> : 'Submit Application'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npx jest __tests__/som/EnrollmentForm.test.tsx --no-coverage
```

Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/forms/enrollment-form.tsx __tests__/som/EnrollmentForm.test.tsx
git commit -m "feat: add two-step SOM enrollment form"
```

---

### Task 8: Page assembly

**Files:**
- Create: `app/ministries/school-of-ministry/page.tsx`
- Modify: `app/globals.css` (add scroll-behavior if absent)

- [ ] **Step 1: Add smooth scroll to globals.css**

Open `app/globals.css`. If `html { scroll-behavior: smooth }` is not present, append:

```css
html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 2: Create `app/ministries/school-of-ministry/page.tsx`**

```tsx
import type { Metadata } from 'next'
import HeroSection    from '@/components/sections/som/hero-section'
import CoursesGrid    from '@/components/sections/som/courses-grid'
import ScheduleSection from '@/components/sections/som/schedule-section'
import EnrollmentForm from '@/components/forms/enrollment-form'

export const metadata: Metadata = {
  title:       'School of Ministry | Dominion Faith International Ministry',
  description: 'Enroll in our School of Ministry. Courses in Ministry, Spiritual Leadership, Spiritual Warfare, Word Foundation, and more. Online & In-Person. New intake every June.',
  keywords:    ['church school', 'ministry training', 'spiritual leadership', 'Lagos church'],
}

export default function SchoolOfMinistryPage() {
  return (
    <main>
      <HeroSection />
      <CoursesGrid />
      <ScheduleSection />

      <section
        id="enroll"
        className="w-full py-24"
        style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
              Get Started
            </p>
            <h2
              className="mb-4 font-black leading-tight tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              Apply for <span style={{ color: '#F9A916' }}>Enrollment</span>
            </h2>
            <p className="mx-auto max-w-lg text-[14px] leading-relaxed text-white/45">
              Fill in your details below. Our team will review your application and reach out within 48 hours.
            </p>
          </div>
          <EnrollmentForm />
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/ministries/school-of-ministry/page.tsx app/globals.css
git commit -m "feat: assemble School of Ministry page"
```

---

### Task 9: TypeScript + build verification

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors. If errors appear, fix them before proceeding.

- [ ] **Step 2: Run all tests**

```bash
npx jest --no-coverage
```

Expected: all tests pass (including existing suite).

- [ ] **Step 3: Run full build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. Fix any build errors before marking done.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete School of Ministry page with enrollment form"
```
