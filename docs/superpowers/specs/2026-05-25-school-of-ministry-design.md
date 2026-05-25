# School of Ministry Page — Design Spec
**Date:** 2026-05-25  
**Route:** `/ministries/school-of-ministry`  
**Project:** Dominion Faith International Ministry

---

## 1. Overview

A dedicated landing + enrollment page for the DFIM School of Ministry. Combines a marketing surface (hero, courses, schedule/fees) with a functional two-step enrollment form that emails both the church admin and the applicant via Nodemailer/Gmail SMTP.

---

## 2. Architecture

### File tree
```
app/
  ministries/
    school-of-ministry/
      page.tsx                        ← page assembly + metadata
  actions/
    enroll.ts                         ← server action (Nodemailer, two emails)

components/
  sections/
    som/
      hero-section.tsx
      courses-grid.tsx
      schedule-section.tsx
  forms/
    enrollment-form.tsx               ← two-step wizard, React Hook Form + Zod
  ui/
    course-card.tsx
    mode-card.tsx

data/
  courses.ts                          ← 6 course objects

schemas/
  enrollment.schema.ts                ← Zod schema + TypeScript types
```

### New dependency
- `nodemailer` + `@types/nodemailer` (install at implementation time)

### Environment variables (`.env.local`)
```
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
```

---

## 3. Page Assembly (`page.tsx`)

Renders sections in order with `scroll-behavior: smooth` on the html element (add once via globals.css if not present):

1. `<HeroSection />` — "Enroll Now" CTA scrolls to `#enroll`
2. `<CoursesGrid />` — id="courses", scroll target for "Learn More"
3. `<ScheduleSection />`
4. `<section id="enroll">` wrapping `<EnrollmentForm />`

**Metadata:**
```ts
title: "School of Ministry | Dominion Faith International Ministry"
description: "Enroll in our School of Ministry…"
keywords: ["church school", "ministry training", "spiritual leadership", "Lagos church"]
```

---

## 4. Hero Section

**File:** `components/sections/som/hero-section.tsx`

- Full-viewport section with deep blue (#2A2FAA) base + slow 30s animated gradient mesh overlay (CSS keyframe `@keyframes mesh-shift`)
- Eyebrow: "Dominion Faith International Ministry" (white/50, uppercase, tracking-wide)
- H1: "School of Ministry" — large, font-black, white
- Subheading: "Equipping believers with the Word, wisdom, and spiritual authority to transform their world" — white/60
- Two badges stacked above the heading:
  - "New Intake — June 2025" with pulsing red dot (#F61F27)
  - "Online & In-Person" — white outline pill
- Two CTAs:
  - Primary: "Enroll Now" → `href="#enroll"` — orange (#F9A916), dark text
  - Secondary: "Learn More" → `href="#courses"` — white outline

**Animation:** Framer Motion stagger fade-up (heading → subheading → buttons, 100ms apart). `useReducedMotion` disables all motion.

---

## 5. Courses Grid

**Files:** `components/sections/som/courses-grid.tsx`, `components/ui/course-card.tsx`, `data/courses.ts`

**Six courses:**

| # | Title | Icon |
|---|-------|------|
| 1 | Ministry | Church/cross |
| 2 | Purpose Driven Church | Target/compass |
| 3 | The New Creation Reality | Star/sparkle |
| 4 | Word Foundation | Book |
| 5 | Spiritual Leadership | Crown/users |
| 6 | Spiritual Warfare | Shield |

**CourseCard design:**
- White-ish card (`rgba(12,12,40,0.7)` matching site dark theme, `border rgba(255,255,255,0.08)`)
- Blue left-border accent (#2A2FAA, 3px)
- Hover: translateY(-4px), border-left becomes orange (#F9A916), box-shadow increase, 200ms ease-out
- Circular icon badge: light blue bg, icon in #2A2FAA; scale up on hover

**Grid:** 3 cols desktop / 2 tablet / 1 mobile. Stagger scroll-reveal (80ms delay per card).

**`courses.ts` interface:**
```ts
interface Course {
  id: string
  title: string
  description: string
  icon: LucideIcon
}
```

---

## 6. Schedule & Fees Section

**Files:** `components/sections/som/schedule-section.tsx`, `components/ui/mode-card.tsx`

### Mode cards (side-by-side desktop / stacked mobile)

| | Online | In-Person |
|--|--------|-----------|
| Platform | Zoom & YouTube Live | All district churches |
| Saturday | 7:00 PM | 4:00 PM |
| Sunday | 7:00 PM | 2:00 PM |

Card style: dark card matching site. Blue border highlight (#2A2FAA) on Online card (primary option).

### Fees
- **Registration Fee:** ₦10,000 (commitment, paid upfront)
  - Bank: Globus Bank PLC
  - Account Name: Dominion Faith In'l School of Ministry
  - Account No: 1000389027
- **Total Programme Fee:** ₦30,000 (covers all 6 courses)
- Note: "Balance due confirmed upon enrollment"
- Payment note: "Proof of payment required in the application form"

Fee card: centered, large ₦30,000 in #2A2FAA, count-up animation on scroll-into-view.

### Intake banner
- Full-width, background #F9A916, dark text
- "🎓 Next Intake: June 2025 — Applications Now Open"
- "Apply Now" button scrolls to `#enroll`

---

## 7. Enrollment Form

**Files:** `components/forms/enrollment-form.tsx`, `schemas/enrollment.schema.ts`, `app/actions/enroll.ts`

### Two-step wizard

**Step 1 — Personal & Church Details**
1. Email (email, required)
2. Passport Photo (file, required — PDF/image, max 10MB)
3. Title (radio: Mr. / Mrs. / Dr. / Miss / Mister / Other)
4. First Name / Surname (text, required, min 2 chars)
5. Last Name (text, required, min 2 chars)
6. Date of Birth (date, required)
7. Gender (radio: Male / Female)
8. Marital Status (radio: Married / Single / Divorced / Widow·Widower / Separated)
9. Nationality (text, required)
10. Phone Number (text, required — Nigerian format, 11 digits starting with 0)
11. Home Address (textarea, required)
12. Name of Your Church (text, required)
13. District (radio + "Other" free text: HQ Ojo / Mebamu / Festac-Amuwo / Coconut / Gabon / Onitsha / Isuochi / Delta / Other)
14. Nature of Programme (radio: Physical Class / Online Class)
15. Currently Employed (radio: Yes / No / Maybe) → conditional: "State Occupation" textarea if Yes
16. Previously attended SOM (radio: Yes / No) → conditional: "Session and District" textarea if Yes

**Step 2 — Background & Declaration**
17. Education Qualifications (textarea — name of institute, qualification, year)
18. New Birth experience (textarea — details, where, when)
19. Place of Worship name & address (textarea)
20. Attended other Bible College (radio: Yes / No) → conditional: "Name, location, date period" textarea if Yes
21. Department / Worker Service Unit in church (text, required)
22. Statement of Indemnity checkbox — must be checked to submit
23. Proof of Payment (file, required — PDF/image, max 10MB)

### File handling
Files read as base64 via `FileReader` client-side, sent as strings in the `EnrollmentData` payload to the server action, attached to the admin email via Nodemailer `attachments[]`.

### Server action (`app/actions/enroll.ts`)
- Validates with `enrollmentSchema.safeParse()`
- Sends two emails:
  1. **Admin** → `info@dominionfaith.com` — subject: `"New SOM Application — [Full Name]"` — HTML table of all fields + file attachments (passport photo, payment proof)
  2. **Applicant** → their email — subject: `"Application Received — DFIM School of Ministry"` — warm confirmation with application summary and bank/payment details

### Form UI
- Dark card matching site (`rgba(12,12,40,0.7)`, `border rgba(255,255,255,0.08)`) — max-width 680px, centered
- Step progress indicator at top (Step 1 of 2 / Step 2 of 2) with blue active dot
- Field labels: small, white/70, above each input
- Inputs: same class tokens as `contact-form.tsx` (`INPUT_BASE`, `INPUT_IDLE`, `INPUT_ERROR`)
- Submit button: "Submit Application" — full-width on mobile, #2A2FAA

### States
- **Loading:** spinner + "Submitting…" on button
- **Success:** green card replaces form — "Application Received! Thank you, [FirstName]! We've received your application and will be in touch within 48 hours."
- **Error:** inline Zod field errors + red server error banner

### Zod schema highlights
```ts
phone: z.string().regex(/^0[0-9]{10}$/, 'Enter a valid 11-digit Nigerian number')
passportPhoto: z.string().min(1, 'Passport photo is required')   // base64 string
paymentProof:  z.string().min(1, 'Proof of payment is required') // base64 string
indemnity:     z.literal(true, { message: 'You must agree to the declaration' })
```

---

## 8. Animations Summary

| Component | Animation | Reduced-motion fallback |
|-----------|-----------|------------------------|
| Hero heading/sub/CTAs | Stagger fade-up, 100ms | Instant render |
| Hero background mesh | 30s CSS keyframe loop | Static gradient |
| Badge pulsing dot | CSS `animate-pulse` | Static dot |
| Course cards | Scroll stagger fade-up, 80ms | Instant render |
| Mode cards | Scroll stagger fade-up | Instant render |
| Fee amount | Count-up on scroll-into-view | Static number |
| Intake banner | Slide-up on scroll | Instant render |
| Form step transition | Slide left/right | Instant |

---

## 9. Responsive Breakpoints

| Section | Mobile | Tablet (md) | Desktop (lg) |
|---------|--------|-------------|--------------|
| Hero CTAs | stacked | side-by-side | side-by-side |
| Courses grid | 1 col | 2 cols | 3 cols |
| Mode cards | stacked | side-by-side | side-by-side |
| Form fields | 1 col | 2 cols for short fields | 2 cols for short fields |

---

## 10. Open Questions / Decisions Made

- **Fee:** ₦10,000 registration (upfront, Globus Bank details shown), ₦30,000 total — both shown in fees section and referenced in form payment note.
- **Email backend:** Nodemailer + Gmail SMTP (new dependency). Follows same server-action pattern as `lib/actions/send-contact-message.ts`.
- **File uploads:** base64 client-side encoding, attached to admin email via Nodemailer `attachments[]`.
- **Form theme:** Dark card (matching site), not the white card described in spec — white-on-dark inputs match existing `contact-form.tsx` tokens exactly.
