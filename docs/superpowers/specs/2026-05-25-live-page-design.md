# Live Page Design

**Date:** 2026-05-25
**Route:** `/live`

## Overview

A dedicated `/live` page that embeds the church's YouTube live stream on-site with a giving panel below. Previously, `/live` redirected externally to YouTube. The new page keeps members on the site so they can watch and give without switching tabs.

## Layout

Stacked layout:

1. Live badge + context row (top)
2. Full-width YouTube embed (16:9 aspect ratio)
3. Below the video: service time card (left) + full giving form (right), side by side on desktop, stacked on mobile

## Two States

### State A — Live (stream is active)

- Pulsing red "Live Now" badge in top row
- YouTube iframe embed using `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` env var
  - Embed URL: `https://www.youtube.com/embed/live_stream?channel={CHANNEL_ID}&autoplay=1`
- Service time card: "9:00 AM · Every Sunday · WAT"
- Full `GiveSection` component reused as-is below the video

### State B — Offline (no stream)

Shown when `NEXT_PUBLIC_IS_LIVE` is not `"true"`. This is the default — the page is offline unless explicitly enabled.

- Satellite dish icon (📡)
- Heading: "We're not live right now"
- Subtext: "Visit our channel for all our messages and be blessed"
- Red "Watch on YouTube" button → `https://youtube.com/@dominionfaithhq` (opens new tab)
- Service time block: "Sunday Service · 9:00 AM · West Africa Time"
- Small giving nudge bar: "You can still give · Giving is open 24/7" with a "Give Now" link to `/give`

## Environment Variables

| Variable | Purpose | Example |
|---|---|---|
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` | YouTube channel ID for live embed | `UCxxxxxxxxxxxxxxx` |
| `NEXT_PUBLIC_IS_LIVE` | Toggle live vs offline state | `"true"` or `"false"` |

The admin sets `NEXT_PUBLIC_IS_LIVE=true` in `.env.local` before Sunday service and `false` after. No code changes needed.

## Nav / Link Updates

All `/live` links previously updated to `https://youtube.com/@dominionfaithhq/live` must be reverted to `/live` (internal route) since the page now exists on-site. Affected files:
- `components/Nav.tsx` (desktop + mobile)
- `components/Hero.tsx`
- `components/sections/church-info.tsx`
- `app/media/page.tsx`

Also fix `app/media/page.tsx` HUBS — "Watch Live" sub-label currently says "Sundays 9 AM & 11 AM"; correct to "Sundays 9 AM".

## Components

- **`app/live/page.tsx`** — page shell, reads env vars, renders LiveView or OfflineView
- **`components/live/LiveView.tsx`** — live state: badge row, YouTube iframe, service time card, GiveSection
- **`components/live/OfflineView.tsx`** — offline state: icon, message, YouTube button, service time, giving nudge
- **`components/GiveSection.tsx`** — reused as-is (no changes needed)

## Styling

Matches existing site dark theme (`#07071f` background). Uses existing CSS vars: `--color-give` (red), `--color-live` (gold), `--color-primary` (blue). `card-double-bezel` class for the giving card. No new global CSS needed.

## Out of Scope

- YouTube API live-detection (requires API key; manual env toggle is simpler and sufficient)
- YouTube live chat embed
- Prayer request form
- Countdown timer
