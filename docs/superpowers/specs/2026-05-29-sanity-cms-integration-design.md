# Sanity CMS Integration — Design Spec
**Date:** 2026-05-29
**Project:** Dominion Faith International Ministry website (Next.js 14, TypeScript, Tailwind)
**Sanity project ID:** `6lfjc9b1` | **Dataset:** `production`

---

## Goal

Replace all static content data files (`lib/sermons.ts`, `lib/events.ts`, `lib/blog.ts`, `lib/series.ts`) with live GROQ queries against Sanity.io, so church staff can manage sermons, series, events, and blog posts from a CMS dashboard at `/studio`. All existing page layouts and component styling remain unchanged.

---

## Scope

### In scope
- Install: `@sanity/client`, `@sanity/image-url`, `next-sanity`, `sanity`, `@portabletext/react`
- Sanity schemas: **Sermon**, **Series**, **Event**, **BlogPost**
- Sanity Studio embedded at `/studio`
- Replace static arrays in `lib/` with async GROQ query functions
- Update all pages that consume those lib functions to be async server components with `revalidate = 60`
- Image handling via `@sanity/image-url` for event and blog cover images
- `cdn.sanity.io` added to `next.config.js` image remote patterns
- Env vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`

### Out of scope
- `data/join-steps.ts`, `data/ministries.ts`, `data/courses.ts` — UI config, stays static
- `lib/testimonies.ts` — stays static
- Announcements schema — deferred
- Sanity webhook / on-demand revalidation
- Migrating existing static content into Sanity (data entry is done by staff via the Studio)

---

## Rendering Strategy

**Option B — Dynamic Server Components with timed revalidation.**

All data-fetching pages export `export const revalidate = 60`. GROQ queries run server-side; Next.js caches and revalidates on a 60-second schedule. No build-time Sanity dependency. `generateStaticParams` is removed from `blog/[slug]` and `series/[slug]`.

---

## File Structure

### New files
```
sanity.config.ts
sanity/schemas/sermon.ts
sanity/schemas/series.ts
sanity/schemas/event.ts
sanity/schemas/blogPost.ts
sanity/schemas/index.ts
sanity/lib/client.ts
sanity/lib/image.ts
sanity/lib/queries.ts
app/studio/[[...tool]]/page.tsx
```

### Modified files
```
lib/sermons.ts          — static arrays → async GROQ functions
lib/events.ts           — DOMINION_EVENTS replaced; getEvents() queries Sanity, static fallback
lib/blog.ts             — BLOG_POSTS replaced; getBlogPosts(), getPostBySlug()
lib/series.ts           — ALL_SERIES_DATA replaced; getAllSeries(), getSeriesBySlug()
next.config.js          — add cdn.sanity.io to images.remotePatterns
.env.local              — add three Sanity env vars
app/sermons/page.tsx
app/blog/page.tsx
app/blog/[slug]/page.tsx
app/media/series/page.tsx
app/media/series/[slug]/page.tsx
app/media/sermons/page.tsx
```

---

## Sanity Schemas

### Series
```
_type: 'series'
title: string (required)
slug: slug (auto from title, required)
description: text
startDate: date
endDate: date
speakers: array of string
topics: array of string
gradient: string (CSS gradient value)
featured: boolean
```

### Sermon
```
_type: 'sermon'
title: string (required)
slug: slug (auto from title, required)
videoId: string (YouTube video ID, required)
speaker: string (required)
date: date (required)
duration: string (e.g. "52:18")
durationSeconds: number
scripture: string
series: reference → series (optional)
topic: array of string
description: text
audioUrl: url
featured: boolean
```
Note: `seriesSlug` is derived at query time via GROQ dereferencing (`series->slug.current`), not stored separately.

### Event
```
_type: 'event'
title: string (required)
slug: slug (auto from title, required)
description: text (required)
startDate: date (required)
endDate: date (optional, for multi-day events)
time: string (e.g. "9:00 AM")
endTime: string
location: string
category: string list — services | youth | women | men | children | special
image: image (Sanity asset, optional)
isFeatured: boolean
registrationUrl: url
```

### BlogPost
```
_type: 'blogPost'
title: string (required)
slug: slug (auto from title, required)
author: object
  name: string
  role: string
  photo: image (Sanity asset)
publishedAt: date (required)
category: string list — teachings | leadership | marriage | finance
coverImage: image (Sanity asset, optional)
excerpt: text (required)
readTime: number (minutes)
body: array of blocks (Portable Text, required)
featured: boolean
```

---

## Data Layer

All GROQ queries live in `sanity/lib/queries.ts`. The `lib/` files import the client and queries, call them with `{ next: { revalidate: 60 } }`, and return the same TypeScript types as before.

| Old export | New export | Notes |
|---|---|---|
| `ALL_SERMONS` (array) | `getSermons()` async fn | Pages updated to await |
| `getFeaturedSermons()` | async, same name | |
| `getSermonsBySeriesSlug(slug)` | async, same name | |
| `ALL_SERIES_DATA` (array) | `getAllSeries()` async fn | |
| `getFeaturedSeries()` | async, same name | |
| `getSeriesBySlug(slug)` | async, same name | returns `Series \| null` |
| `BLOG_POSTS` (array) | `getBlogPosts()` async fn | |
| `getPostBySlug(slug)` | new async fn | used by `blog/[slug]` |
| `DOMINION_EVENTS` + `getEvents()` | `getEvents()` queries Sanity; falls back to static `DOMINION_EVENTS` if empty | Preserves existing Google Calendar fallback logic shape |

Sermon GROQ queries dereference `series->` to inline the series title and slug so component props are unchanged.

---

## Page Updates

Each affected page:
1. Adds `export const revalidate = 60`
2. Makes the default export `async`
3. Awaits the relevant lib function
4. `generateStaticParams` removed where present

| Page | Changes |
|---|---|
| `app/sermons/page.tsx` | async, await `getSermons()` |
| `app/blog/page.tsx` | async, await `getBlogPosts()` |
| `app/blog/[slug]/page.tsx` | remove `generateStaticParams`, async, await `getPostBySlug()`, async `generateMetadata` |
| `app/media/series/page.tsx` | async, await `getAllSeries()` |
| `app/media/series/[slug]/page.tsx` | remove `generateStaticParams`, async, await both `getSeriesBySlug` + `getSermonsBySeriesSlug` |
| `app/media/sermons/page.tsx` | async, await `getSermons()` |

---

## Blog Body Rendering

Blog posts in Sanity use Portable Text (`body: blockContent`). The `blog/[slug]/page.tsx` page uses `@portabletext/react` with a custom `block.normal` component that renders:
```tsx
<p className="mb-6 text-base leading-[1.85] text-white/75" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}>
  {children}
</p>
```
This exactly matches the current paragraph rendering. No visual change.

---

## Studio Route

`app/studio/[[...tool]]/page.tsx` — `'use client'` directive, renders `<NextStudio config={config} />` from `next-sanity/studio`. The Studio is accessible at `/studio` for church staff. The PWA service worker already skips API routes; the `/studio` path is added to the PWA `exclude` list in `next.config.js` to prevent it being cached offline.

---

## Image Handling

`sanity/lib/image.ts` exports:
```ts
export function imageUrlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source)
}
```

- **EventCard**: if `event.image` exists, renders via `imageUrlFor(event.image).width(800).url()`. Falls back to existing gradient background if no image.
- **BlogCard / BlogPost detail**: if `post.coverImage` exists, renders via `imageUrlFor`. Falls back to existing behaviour.

`next.config.js` adds:
```js
{ protocol: 'https', hostname: 'cdn.sanity.io' }
```

---

## Environment Variables

Added to `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=6lfjc9b1
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<create at manage.sanity.io → API → Tokens → Add API token → Editor role>
```

`SANITY_API_TOKEN` is used only in the server-side Sanity client (no `NEXT_PUBLIC_` prefix). The public client used for read queries does not need a token (dataset is public).

---

## Sanity Client Setup

Two clients in `sanity/lib/client.ts`:
- **Public client** — no token, used for all read/GROQ queries in `lib/` functions
- **Server client** — uses `SANITY_API_TOKEN`, used for any write operations (future use)

`sanity.config.ts` — configures Studio with project ID, dataset, and the four schemas. Sets `basePath: '/studio'`.

---

## Out-of-scope notes

- No data migration script — staff will enter content manually via the Studio
- The static fallback arrays in `lib/events.ts` (`DOMINION_EVENTS`) are preserved as the fallback when Sanity returns empty results, so the events page never shows blank
- TypeScript types in `types/` are not changed — GROQ projections are written to match the existing interfaces exactly
