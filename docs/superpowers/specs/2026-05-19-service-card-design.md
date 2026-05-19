# Dominion Faith — Service Times Card Design

**Date:** 2026-05-19
**Scope:** `/visit` page + `ServiceCard` component + card design tokens + `.card-double-bezel` CSS class
**Status:** Approved

---

## Overview

Create a standalone `/visit` page containing a glass-morphism service times card with the double-bezel border treatment, interactive Google Maps iframe, contact details, a "Get Directions" button, and an "Add to Calendar" dropdown for all three recurring services.

---

## Files

| File | Action | Responsibility |
|---|---|---|
| `styles/dominion-faith-design-system.css` | Modify | Add 7 card design tokens |
| `app/globals.css` | Modify | Add `.card-double-bezel` CSS class + hover state |
| `app/visit/page.tsx` | Create | Page shell — dark background, centred card |
| `components/ServiceCard.tsx` | Create | Full card component (`'use client'`) |
| `__tests__/ServiceCard.test.tsx` | Create | Behavioural tests |

---

## New Design Tokens

```css
--card-radius: 20px;
--card-bezel-gap: 5px;
--card-bezel-outer: rgba(255,255,255,0.14);
--card-bezel-inner: rgba(255,255,255,0.07);
--card-bg: rgba(12,12,40,0.85);
--card-shadow: 0 8px 32px rgba(0,0,0,0.4);
--card-shadow-hover: 0 24px 56px rgba(0,0,0,0.6);
```

---

## `.card-double-bezel` CSS Class

Defined in `app/globals.css`. Uses stacked `box-shadow` to produce the outer bezel without a `.card-inner` wrapper element.

```css
/* Apply to any card root element */
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
```

Hover is handled by Framer Motion `whileHover={{ y: -4 }}` on the card element; the shadow deepens via a CSS class toggled on hover or via Framer Motion `style`:

```css
/* Optional CSS-only hover for non-JS environments */
.card-double-bezel:hover {
  box-shadow:
    0 0 0 var(--card-bezel-gap) rgba(8, 8, 28, 0.7),
    0 0 0 calc(var(--card-bezel-gap) + 1px) var(--card-bezel-outer),
    var(--card-shadow-hover);
}
```

---

## `/visit` Page (`app/visit/page.tsx`)

Server component (no `'use client'` needed — it renders a client child).

```
<main>  dark background (var(--hero-bg)), min-h-screen
  <section>  max-w-lg mx-auto px-4 py-32
    <ServiceCard />
```

Metadata export: `title: "Visit Us — Dominion Faith"`, `description: "Join us for Sunday Temple Celebration, Wednesday Housecare Fellowship, or Friday Dominion Service."`

---

## `ServiceCard` Component

`'use client'` — uses `useState` for calendar dropdown and `useEffect` for outside-click close.

### Data

```ts
const SERVICES = [
  { day: 'Sunday',    name: 'Temple Celebration',  time: '9am'  },
  { day: 'Wednesday', name: 'Housecare Fellowship', time: '7pm'  },
  { day: 'Friday',    name: 'Dominion Service',     time: '5pm'  },
]

const LOCATION = {
  display: '1 Dominion Avenue, Onireke, Opposite Ojo Barrack, Lagos, Nigeria',
  mapsQuery: '1+Dominion+Avenue+Onireke+Lagos+Nigeria',
}

const PHONE = '+234 703 454 3971'
const PHONE_TEL = '+2347034543971'
```

### Card anatomy (top → bottom)

```
┌─ outer bezel (box-shadow) ──────────────────────────────────┐
│ ┌─ inner bezel (border) + glass bg ────────────────────────┐ │
│ │  [Join Us]                          section label        │ │
│ │  Service Times                      h2 heading           │ │
│ │  ─────────────────────────────────  divider              │ │
│ │  Sunday · Temple Celebration · 9am  service row × 3      │ │
│ │  ─────────────────────────────────  divider              │ │
│ │  📍 1 Dominion Avenue…              location row         │ │
│ │  📞 +234 703 454 3971               phone row (tel link)  │ │
│ │  ┌─────────────────────────────┐                         │ │
│ │  │   Google Maps <iframe>      │   200px tall            │ │
│ │  └─────────────────────────────┘                         │ │
│ │  [ Get Directions ]  [ Add to Calendar ▾ ]  button row   │ │
│ │                      ┌───────────────────┐               │ │
│ │                      │ 🍎 Apple Calendar │ dropdown      │ │
│ │                      │ 🗓 Google Calendar│               │ │
│ │                      │ 📧 Outlook        │               │ │
│ │                      └───────────────────┘               │ │
│ └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Google Maps iframe

```tsx
<iframe
  src="https://maps.google.com/maps?q=1+Dominion+Avenue+Onireke+Lagos+Nigeria&output=embed"
  width="100%"
  height="200"
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  title="Dominion Faith location map"
  className="rounded-xl"
  style={{ border: 0 }}
/>
```

### Get Directions button

Opens the native maps app on mobile, Google Maps on desktop:

```tsx
<a
  href={`https://www.google.com/maps/dir/?api=1&destination=${LOCATION.mapsQuery}`}
  target="_blank"
  rel="noopener noreferrer"
>
  Get Directions
</a>
```

### Add to Calendar dropdown

State: `isCalendarOpen: boolean` (useState).  
Outside-click close: `useEffect` adds a `document` click listener when open.

**Apple Calendar** — generates and downloads an `.ics` file client-side containing three `VEVENT` entries (one per recurring service):

```
VEVENT for Sunday at 9am, weekly (RRULE:FREQ=WEEKLY;BYDAY=SU)
VEVENT for Wednesday at 7pm, weekly (RRULE:FREQ=WEEKLY;BYDAY=WE)
VEVENT for Friday at 5pm, weekly (RRULE:FREQ=WEEKLY;BYDAY=FR)
```

**Google Calendar** — deep-link to `https://calendar.google.com/calendar/r/eventedit` with the first upcoming Sunday pre-populated, including location and recurrence. One link per service:
- Sunday: `&text=Temple+Celebration&details=Sunday+Service+at+Dominion+Faith&location=...&recur=RRULE:FREQ%3DWEEKLY`
- Wednesday and Friday similarly.

Since three separate Google Calendar links would overflow the dropdown, the Google option opens a sub-menu with three service items, or we link to just the first/primary (Sunday) and note the others. Best choice: one Google link per service — show all three in the dropdown under a "Google Calendar" header.

**Dropdown items (5 total):**
```
Add to Calendar ▾
├── Apple Calendar             → downloads dominion-faith-services.ics (all 3 services)
├── Google · Sunday            → google.com/calendar/r/eventedit?... (Sunday recurrence)
├── Google · Wednesday         → google.com/calendar/r/eventedit?... (Wednesday recurrence)
├── Google · Friday            → google.com/calendar/r/eventedit?... (Friday recurrence)
└── Outlook / iCal             → downloads same .ics (Outlook natively reads .ics)
```

Apple and Outlook share one `.ics` Blob download containing all 3 VEVENT entries.
Each Google item is a separate `<a target="_blank">` link — no sub-menu needed.

### Hover animation

Framer Motion on the card root:
```tsx
<motion.div
  className="card-double-bezel"
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
>
```

The CSS `transition` on `.card-double-bezel` handles the shadow deepening in sync.

---

## Constraints

- `'use client'` required for `useState` (calendar dropdown) and `useEffect` (outside-click)
- The `.ics` download is generated client-side via a `Blob` + `URL.createObjectURL` — no server endpoint needed
- Google Maps basic embed (`?output=embed`) requires no API key
- `app/visit/page.tsx` is a **server component** that imports `ServiceCard` (client boundary is at the component level)
- The `/visit` route matches the `href="/visit"` already used in `Hero.tsx`'s "Plan Your Visit" CTA
