# Dominion Faith — Navigation Component Design

**Date:** 2026-05-19  
**Scope:** Full Next.js 14 project scaffold + single-file Nav component  
**Status:** Approved

---

## Overview

Bootstrap a brand-new Next.js 14 App Router project for the Dominion Faith International Ministry website. The centrepiece of this first sprint is a production-ready navigation component: a floating glass-morphism pill navbar with scroll-aware hide/show, a Ministries dropdown, animated mobile overlay, and Framer Motion throughout.

---

## Project Scaffold

### Tech stack
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS v3 + CSS custom properties from design system
- **Animation:** `framer-motion` (npm package)
- **Icons:** `lucide-react`
- **Routing:** `next/link` and `next/navigation` (`usePathname`)

### File structure

```
dominion-faith/
├── app/
│   ├── layout.tsx                          ← root layout, mounts <Nav />
│   ├── page.tsx                            ← home page placeholder
│   └── globals.css                         ← @import design system, Tailwind base
├── components/
│   └── Nav.tsx                             ← single-file navigation component
├── public/
│   └── logo.png                            ← church logo (restored from git)
├── styles/
│   └── dominion-faith-design-system.css    ← all CSS custom properties
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Design System (`dominion-faith-design-system.css`)

All tokens the Nav depends on, defined as CSS custom properties on `:root`:

| Token | Value | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Nav hide/show, dropdown |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Mobile overlay open/close |
| `--color-primary` | `#2A2FAA` | Brand blue |
| `--color-give` | `#F61F27` | Give button background |
| `--color-live` | `#F9A916` | Watch Live button background |
| `--nav-height` | `64px` | Pill height reference |
| `--nav-blur` | `20px` | `backdrop-filter` base value |
| `--nav-bg` | `rgba(255,255,255,0.08)` | Glass background |
| `--nav-border` | `rgba(255,255,255,0.12)` | Glass border |

---

## Nav Component (`components/Nav.tsx`)

Top of file must declare `'use client'` — the component uses `useState`, `useEffect`, `useRef`, and `usePathname()`, all of which require a client boundary in App Router. All nav links use `<Link>` from `next/link` (not `<a>` tags) for client-side navigation.

### Menu items

```
Home          → /
About         → /about
Ministries    → /ministries  (dropdown)
  ├ Leadership          → /leadership
  ├ School of Ministry  → /school-of-ministry
  ├ Departments         → /departments
  └ House Fellowship    → /house-fellowship
Media         → /media
Sermons       → /sermons
Events        → /events
Blog          → /blog
Contact       → /contact
```

CTA buttons (not in the center link list):
- **Give** (`/give`) — red `#F61F27`, right side of pill
- **Watch Live** (`/live`) — orange `#F9A916`, with animated red pulse dot, right side of pill

### Layout (desktop)

```
[ Logo + wordmark ]   [ Home · About · Ministries▾ · Media · Sermons · Events · Blog · Contact ]   [ Give ] [ ● Watch Live ]
```

- `position: fixed`, `top: 0`, `left: 0`, `right: 0` — required for scroll-hide to work
- `mt-6` inset from top of viewport, `rounded-full`, `backdrop-blur`
- Max-width `1100px`, horizontally centred
- Logo floats left (`margin-right: auto`), links are absolutely centred, CTAs float right

### Scroll behaviour

- Implemented via `useScrollDirection()` — an inline hook (defined in the same file, not exported).
- Tracks `lastScrollY` in a `useRef`. On `window.scroll`:
  - If `scrollY < 80` → always show (prevents flicker at page top)
  - If `scrollY > lastScrollY` → direction `'down'` → nav hides (`translateY(-110%)`)
  - If `scrollY < lastScrollY` → direction `'up'` → nav shows (`translateY(0)`)
- `isScrolled` boolean: true when `scrollY > 20`. Used to slightly increase glass opacity (nav goes from `--nav-bg` to `rgba(255,255,255,0.12)`).

### Ministries dropdown (desktop only)

- Triggered by hover (`onMouseEnter` / `onMouseLeave`) with a 150ms close delay (prevents accidental close).
- Also toggled on click for touch-screen laptops.
- Closed on outside click via a `useEffect` + `document` click listener.
- Rendered as a dark glass panel (`rgba(10,10,35,0.92)`, `blur(24px)`, `border-radius: 16px`) positioned absolutely below the Ministries link.
- On mobile: the dropdown does **not** appear; Ministries expands inline in the overlay as an accordion.

### Mobile layout

- Hamburger icon visible, centre-links and CTA buttons hidden (`hidden md:flex`).
- Pill still shows: logo left, hamburger right.

### Mobile overlay

- Full-screen dark glass panel: `rgba(8,8,28,0.95)`, `backdrop-filter: blur(24px)`.
- Renders inside `<motion.header>` (no portal). Stacks above content via `z-50`.
- Body scroll locked: `document.body.style.overflow = 'hidden'` on open, restored on close.
- Contains: logo (top-left), X button (top-right), stacked nav links, Give + Watch Live CTAs at bottom.
- Ministries expands inline as a simple accordion (chevron rotates, sub-links slide down).

---

## Framer Motion Variants

Framer Motion variant `transition` objects use raw cubic-bezier strings (e.g. `[0.16, 1, 0.3, 1]`) because Framer Motion cannot parse `var(--ease-out)` at runtime. The CSS custom properties are used for Tailwind/CSS-only transitions elsewhere in the component.

| Variant | Effect | Duration | Easing |
|---|---|---|---|
| `navVariants` | `y: -110% → 0`, `opacity: 0 → 1` | 200ms | `--ease-out` |
| `overlayVariants` | `opacity: 0→1`, `scale: 0.98→1` | 300ms | `--ease-drawer` |
| `linkVariants` | `y: 16→0`, `opacity: 0→1`, stagger 40ms | 300ms | `--ease-out` |
| `hamburgerTop` | rotate `0 → 45deg`, `y: 0 → 6px` | 200ms | `--ease-out` |
| `hamburgerMid` | `opacity: 1 → 0`, `scaleX: 1 → 0` | 150ms | `--ease-out` |
| `hamburgerBot` | rotate `0 → -45deg`, `y: 0 → -6px` | 200ms | `--ease-out` |
| `dropdownVariants` | `opacity: 0→1`, `y: -8→0` | 200ms | `--ease-out` |

`AnimatePresence` wraps both the overlay and the dropdown to enable exit animations.

---

## Constraints & Edge Cases

- **SSR-safe scroll listener:** `useScrollDirection` guards `typeof window !== 'undefined'` and attaches the listener inside `useEffect`.
- **No flash of unstyled nav:** `initial={{ y: 0 }}` so nav is visible on first render regardless of scroll position.
- **Dropdown close on route change:** `usePathname()` in a `useEffect` dependency closes `activeDropdown` and `isMobileOpen` on navigation.
- **Accessible hamburger:** `aria-label="Open menu"` / `"Close menu"`, `aria-expanded` bound to `isMobileOpen`.
- **Reduced motion:** Framer Motion's `useReducedMotion()` disables all translate/scale animations; opacity-only fades remain.
