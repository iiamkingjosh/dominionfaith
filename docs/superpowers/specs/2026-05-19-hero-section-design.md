# Dominion Faith — Hero Section Design

**Date:** 2026-05-19  
**Scope:** Single-file Hero component + design token additions + home page wiring  
**Status:** Approved

---

## Overview

Replace the `app/page.tsx` placeholder with a full-viewport hero section for Dominion Faith International Ministry. The hero features a deep-blue animated gradient mesh background, a massive display headline, an italic mission statement, three glass-morphism service time cards, two CTA buttons, and a location line. All content elements reveal on scroll via Framer Motion with a staggered entrance animation.

---

## Files Changed

| File | Action | Responsibility |
|---|---|---|
| `styles/dominion-faith-design-system.css` | Modify | Add five new design tokens |
| `app/globals.css` | Modify | Add `@keyframes meshShift` for background animation |
| `components/Hero.tsx` | Create | Full-viewport hero section (`'use client'`) |
| `app/page.tsx` | Modify | Replace placeholder with `<Hero />` |

---

## New Design Tokens

Added to `:root` in `styles/dominion-faith-design-system.css`:

| Token | Value | Usage |
|---|---|---|
| `--text-hero` | `clamp(52px, 7vw, 96px)` | Display headline font-size |
| `--hero-bg` | `#07071f` | Darkest point of hero background |
| `--hero-card-bg` | `rgba(255,255,255,0.07)` | Glass service card fill |
| `--hero-card-border` | `rgba(255,255,255,0.13)` | Glass service card border |
| `--hero-mission-size` | `13px` | Italic mission paragraph font-size |

---

## Hero Content

### Headline
> "A Place Where Champions are Made"

Font: `var(--text-hero)`, weight 900, letter-spacing `-0.04em`, line-height 1.0. White-to-white gradient text (`-webkit-background-clip: text`) for subtle depth.

### Mission paragraph
> "For over a decade, we have been committed to raising believers who do not just survive life but dominate it. Champions are not born, they are made. And God has called each one of you for greatness."

Font: `var(--hero-mission-size)` (13px), `font-style: italic`, `color: rgba(255,255,255,0.55)`. Key phrases — *dominate it* and *greatness* — rendered in `font-weight: 600` and `color: rgba(255,255,255,0.85)` for emphasis.

### Service cards

Three glass-morphism cards (`var(--hero-card-bg)`, `var(--hero-card-border)`, `backdrop-filter: blur(16px)`, `border-radius: 16px`):

| Day | Service Name | Time |
|---|---|---|
| Sunday | Temple Celebration | 9am |
| Wednesday | Housecare Fellowship | 7pm |
| Friday | Dominion Service | 5pm |

Day label: `#F9A916` (orange), 10px, uppercase, `letter-spacing: 0.12em`.  
Service name: `rgba(255,255,255,0.45)`, 9px, uppercase.  
Time: white, 26px, weight 800.

### CTA buttons

| Button | Label | Style | Link |
|---|---|---|---|
| Primary | Plan Your Visit | `var(--color-primary)` (#2A2FAA), rounded-full, glow shadow | `/visit` (placeholder route — page does not exist yet) |
| Secondary | Watch Live | `#F61F27` (red, same hue as Give but used independently here), rounded-full, red glow shadow, animated white pulse dot | `/live` |

### Location line
`1 Dominion Avenue, Onireke, Lagos` — pin icon + text, `rgba(255,255,255,0.3)`, 11px, below the CTA buttons.

### Eyebrow pill
`Dominion Faith International Ministry` — glass pill above the headline (`rgba(255,255,255,0.06)` bg, `rgba(255,255,255,0.1)` border), with a `#F9A916` dot prefix.

---

## Background

Two layered `<div>` elements inside `<section>`, both `aria-hidden`:

**Gradient mesh (`hero-bg`):**
```css
background:
  radial-gradient(ellipse 80% 60% at 20% 30%, rgba(42,47,170,0.6) 0%, transparent 60%),
  radial-gradient(ellipse 60% 80% at 80% 70%, rgba(42,47,170,0.4) 0%, transparent 55%),
  radial-gradient(ellipse 40% 40% at 50% 10%, rgba(80,60,200,0.3) 0%, transparent 50%),
  linear-gradient(180deg, #07071f 0%, #0d0d3a 40%, #080820 100%);
animation: meshShift 12s ease-in-out infinite alternate;
```
`meshShift` keyframe: `hue-rotate(0deg) → hue-rotate(8deg) → hue-rotate(-4deg)` + subtle `brightness` oscillation. Defined in `app/globals.css` (not inside the component — avoids hydration mismatches from `<style>` tags in client components).

**Grid overlay (`hero-grid`):**
```css
background-image:
  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size: 60px 60px;
mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
```

---

## Animation

### Scroll reveal (Framer Motion)

Trigger: `useInView(ref, { once: true, amount: 0.2 })` — fires once when 20% of the section is visible.

**Variants:**

```ts
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 64, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}
```

Stagger order: eyebrow → headline → mission → cards row → CTA row → location.  
Each is a `<motion.div>` (or `<motion.h1>`, `<motion.p>`) with `variants={itemVariants}`.

### Pulse dot
White `<span>` on the Watch Live button, `animate-pulse` Tailwind class (1.4s opacity/scale loop).

### Background mesh
Pure CSS `@keyframes meshShift`, 12s, `alternate`, `ease-in-out`. No Framer Motion — keeps animation off the JS thread.

---

## Layout

### Desktop
- `<section>` — `min-h-screen`, `position: relative`, `display: flex`, `align-items: center`, `justify-content: center`
- Content column: `max-width: 780px`, centred, `text-align: center`
- Service cards: `display: flex`, `gap: 12px`, all three side-by-side
- CTA row: `display: flex`, `gap: 12px`, inline

### Mobile (`< md`)
- Headline font scales down via `clamp()` — no breakpoint override needed
- Service cards: `flex-wrap: wrap` → cards stack to a 1- or 2-column wrap
- CTA buttons: `flex-direction: column`, `width: 100%` — full-width stacked buttons

---

## Constraints

- `'use client'` required — uses `useRef`, `useInView` from Framer Motion
- SSR-safe: `useInView` is called inside the component, no `window` access at module level
- `<style>` tag for `@keyframes meshShift` is acceptable inside a client component in Next.js App Router (rendered once, not duplicated)
- All background divs carry `aria-hidden="true"`
- No `useReducedMotion` check needed for the background CSS animation (CSS respects `prefers-reduced-motion: reduce` via `@media` if added later); Framer Motion variants should respect `useReducedMotion` — when true, skip `y` and `filter` transitions, keep `opacity` only
