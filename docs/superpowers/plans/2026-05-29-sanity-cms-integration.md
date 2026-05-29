# Sanity CMS Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all static content arrays in `lib/` with live GROQ queries against Sanity.io (project `6lfjc9b1`, dataset `production`), embed the Studio at `/studio`, and add image support for events and blog posts — with zero visual change to any existing page.

**Architecture:** Dynamic server components with `export const revalidate = 60` at each data-fetching route. GROQ queries live in `sanity/lib/queries.ts`; `lib/` files wrap them in typed async functions. The one client component that imported static arrays (`sermon-archive-client.tsx`) is refactored to receive data as props from its parent server page.

**Tech Stack:** `sanity` v3, `next-sanity`, `@sanity/client`, `@sanity/image-url`, `@portabletext/react`, TypeScript, Next.js 14 App Router

---

## File Map

| Action | File |
|---|---|
| Create | `sanity/lib/client.ts` |
| Create | `sanity/lib/image.ts` |
| Create | `sanity/lib/queries.ts` |
| Create | `sanity/schemas/series.ts` |
| Create | `sanity/schemas/sermon.ts` |
| Create | `sanity/schemas/event.ts` |
| Create | `sanity/schemas/blogPost.ts` |
| Create | `sanity/schemas/index.ts` |
| Create | `sanity.config.ts` |
| Create | `app/studio/[[...tool]]/page.tsx` |
| Modify | `lib/series.ts` |
| Modify | `lib/sermons.ts` |
| Modify | `lib/blog.ts` |
| Modify | `lib/events.ts` |
| Modify | `types/blog.ts` |
| Modify | `types/event.ts` |
| Modify | `next.config.js` |
| Modify | `.env.local` |
| Modify | `app/page.tsx` |
| Modify | `app/sermons/page.tsx` |
| Modify | `app/blog/page.tsx` |
| Modify | `app/blog/[slug]/page.tsx` |
| Modify | `app/media/series/page.tsx` |
| Modify | `app/media/series/[slug]/page.tsx` |
| Modify | `app/media/sermons/page.tsx` |
| Modify | `components/sections/home-latest-sermons.tsx` |
| Modify | `components/sections/sermon-archive-client.tsx` |

---

## Task 1: Install dependencies

**Files:** `package.json` (modified by npm)

- [ ] **Step 1: Install all Sanity packages**

```bash
npm install @sanity/client @sanity/image-url next-sanity sanity @portabletext/react
```

Expected output: packages added with no peer dep errors.

- [ ] **Step 2: Verify installation**

```bash
npx tsc --noEmit
```

Expected: no errors (no new TS files yet, just confirming the baseline still compiles).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install sanity cms dependencies"
```

---

## Task 2: Environment variables

**Files:** `.env.local`

- [ ] **Step 1: Add Sanity env vars to `.env.local`**

Open `.env.local` — it currently contains `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID`. Append these three lines:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=6lfjc9b1
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

`SANITY_API_TOKEN` will be filled in after creating a token at `manage.sanity.io → API → Tokens → Add API token → Editor role`. Leave it blank for now — read queries work without a token on a public dataset.

- [ ] **Step 2: Commit**

```bash
git add .env.local
git commit -m "feat: add sanity environment variables"
```

---

## Task 3: Sanity client

**Files:**
- Create: `sanity/lib/client.ts`

- [ ] **Step 1: Create the directory and client file**

```typescript
// sanity/lib/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add sanity/lib/client.ts
git commit -m "feat: add sanity client"
```

---

## Task 4: Image URL builder

**Files:**
- Create: `sanity/lib/image.ts`

- [ ] **Step 1: Create image helper**

```typescript
// sanity/lib/image.ts
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function imageUrlFor(source: SanityImageSource) {
  return builder.image(source)
}
```

- [ ] **Step 2: Commit**

```bash
git add sanity/lib/image.ts
git commit -m "feat: add sanity image url builder"
```

---

## Task 5: Series schema

**Files:**
- Create: `sanity/schemas/series.ts`

- [ ] **Step 1: Create series document schema**

```typescript
// sanity/schemas/series.ts
import { defineType, defineField } from 'sanity'

export const seriesSchema = defineType({
  name: 'series',
  title: 'Series',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'date' }),
    defineField({ name: 'endDate',   title: 'End Date',   type: 'date' }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gradient',
      title: 'CSS Gradient',
      type: 'string',
      description: 'e.g. linear-gradient(135deg, #0d1240 0%, #2A2FAA 60%, #3d44cc 100%)',
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'startDate' },
  },
})
```

- [ ] **Step 2: Commit**

```bash
git add sanity/schemas/series.ts
git commit -m "feat: add series sanity schema"
```

---

## Task 6: Sermon schema

**Files:**
- Create: `sanity/schemas/sermon.ts`

- [ ] **Step 1: Create sermon document schema**

```typescript
// sanity/schemas/sermon.ts
import { defineType, defineField } from 'sanity'

export const sermonSchema = defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'The ID from the YouTube URL, e.g. dQw4w9WgXcQ',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'duration',        title: 'Duration (display)',   type: 'string', description: 'e.g. 52:18' }),
    defineField({ name: 'durationSeconds', title: 'Duration (seconds)',   type: 'number' }),
    defineField({ name: 'scripture',       title: 'Scripture Reference',  type: 'string' }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{ type: 'series' }],
    }),
    defineField({
      name: 'topic',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'audioUrl',    title: 'Audio URL',   type: 'url' }),
    defineField({ name: 'featured',    title: 'Featured',    type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'speaker', media: 'date' },
  },
})
```

- [ ] **Step 2: Commit**

```bash
git add sanity/schemas/sermon.ts
git commit -m "feat: add sermon sanity schema"
```

---

## Task 7: Event schema

**Files:**
- Create: `sanity/schemas/event.ts`

- [ ] **Step 1: Create event document schema**

```typescript
// sanity/schemas/event.ts
import { defineType, defineField } from 'sanity'

export const eventSchema = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'endDate',  title: 'End Date (multi-day events)', type: 'date' }),
    defineField({ name: 'time',     title: 'Start Time',                  type: 'string', description: 'e.g. 9:00 AM' }),
    defineField({ name: 'endTime',  title: 'End Time',                    type: 'string', description: 'e.g. 12:00 PM' }),
    defineField({ name: 'location', title: 'Location',                    type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Service',  value: 'services' },
          { title: 'Youth',    value: 'youth' },
          { title: 'Women',    value: 'women' },
          { title: 'Men',      value: 'men' },
          { title: 'Children', value: 'children' },
          { title: 'Special',  value: 'special' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'isFeatured',       title: 'Featured (spans 2 columns)', type: 'boolean', initialValue: false }),
    defineField({ name: 'registrationUrl',  title: 'Registration URL',           type: 'url' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'startDate' },
  },
})
```

- [ ] **Step 2: Commit**

```bash
git add sanity/schemas/event.ts
git commit -m "feat: add event sanity schema"
```

---

## Task 8: BlogPost schema

**Files:**
- Create: `sanity/schemas/blogPost.ts`

- [ ] **Step 1: Create blogPost document schema**

```typescript
// sanity/schemas/blogPost.ts
import { defineType, defineField } from 'sanity'

export const blogPostSchema = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        { name: 'name',  title: 'Name',  type: 'string' },
        { name: 'role',  title: 'Role',  type: 'string' },
        { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Teachings',       value: 'teachings' },
          { title: 'Leadership',      value: 'leadership' },
          { title: 'Marriage',        value: 'marriage' },
          { title: 'Finance',         value: 'finance' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal',     value: 'normal' },
            { title: 'Heading 2',  value: 'h2' },
            { title: 'Heading 3',  value: 'h3' },
            { title: 'Quote',      value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold',   value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [{ title: 'URL', name: 'href', type: 'url' }],
              },
            ],
          },
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'author.name', media: 'coverImage' },
  },
})
```

- [ ] **Step 2: Commit**

```bash
git add sanity/schemas/blogPost.ts
git commit -m "feat: add blogPost sanity schema"
```

---

## Task 9: Schema barrel + Sanity Studio config

**Files:**
- Create: `sanity/schemas/index.ts`
- Create: `sanity.config.ts`

- [ ] **Step 1: Create schema barrel export**

```typescript
// sanity/schemas/index.ts
import { seriesSchema }   from './series'
import { sermonSchema }   from './sermon'
import { eventSchema }    from './event'
import { blogPostSchema } from './blogPost'

export const schemas = [seriesSchema, sermonSchema, eventSchema, blogPostSchema]
```

- [ ] **Step 2: Create `sanity.config.ts` at project root**

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemas } from './sanity/schemas'

export default defineConfig({
  name: 'dominion-faith',
  title: 'Dominion Faith',
  projectId: '6lfjc9b1',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: { types: schemas },
})
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add sanity/schemas/index.ts sanity.config.ts
git commit -m "feat: add sanity schema barrel and studio config"
```

---

## Task 10: GROQ queries

**Files:**
- Create: `sanity/lib/queries.ts`

- [ ] **Step 1: Create all GROQ queries**

```typescript
// sanity/lib/queries.ts
import { groq } from 'next-sanity'

const sermonFields = groq`
  "id": _id,
  title,
  "slug": slug.current,
  videoId,
  speaker,
  date,
  duration,
  durationSeconds,
  scripture,
  "series": series->title,
  "seriesSlug": series->slug.current,
  topic,
  description,
  audioUrl,
  featured
`

export const allSermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) { ${sermonFields} }
`

export const featuredSermonsQuery = groq`
  *[_type == "sermon" && featured == true] | order(date desc) { ${sermonFields} }
`

export const sermonsBySeriesSlugQuery = groq`
  *[_type == "sermon" && series->slug.current == $slug] | order(date desc) { ${sermonFields} }
`

export const allSeriesQuery = groq`
  *[_type == "series"] | order(startDate desc) {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    startDate,
    endDate,
    speakers,
    topics,
    gradient,
    featured,
    "sermonCount": count(*[_type == "sermon" && references(^._id)])
  }
`

export const featuredSeriesQuery = groq`
  *[_type == "series" && featured == true] | order(startDate desc) {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    startDate,
    endDate,
    speakers,
    topics,
    gradient,
    featured,
    "sermonCount": count(*[_type == "sermon" && references(^._id)])
  }
`

export const seriesBySlugQuery = groq`
  *[_type == "series" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    startDate,
    endDate,
    speakers,
    topics,
    gradient,
    featured,
    "sermonCount": count(*[_type == "sermon" && references(^._id)])
  }
`

const blogListFields = groq`
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  author {
    name,
    role,
    "photo": photo.asset->url
  },
  publishedAt,
  readTime,
  "image": coverImage.asset->url,
  featured
`

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) { ${blogListFields} }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${blogListFields},
    body
  }
`

export const allEventsQuery = groq`
  *[_type == "event"] | order(startDate asc) {
    "id": _id,
    title,
    description,
    startDate,
    endDate,
    time,
    endTime,
    location,
    category,
    "featured": isFeatured,
    registrationUrl,
    "image": image.asset->url
  }
`
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add sanity/lib/queries.ts
git commit -m "feat: add sanity groq queries"
```

---

## Task 11: Update next.config.js

**Files:**
- Modify: `next.config.js`

- [ ] **Step 1: Replace the full content of `next.config.js`**

```javascript
// next.config.js
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  fallbacks: { document: '/offline' },
  workboxOptions: {
    disableDevLogs: true,
    navigateFallbackDenylist: [/^\/studio/],
  },
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = withBundleAnalyzer(withPWA(nextConfig))
```

- [ ] **Step 2: Commit**

```bash
git add next.config.js
git commit -m "feat: add cdn.sanity.io to image domains and exclude /studio from PWA"
```

---

## Task 12: Studio route

**Files:**
- Create: `app/studio/[[...tool]]/page.tsx`

- [ ] **Step 1: Create the studio page directory and file**

```tsx
// app/studio/[[...tool]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/studio
git commit -m "feat: add sanity studio at /studio route"
```

---

## Task 13: Update lib/series.ts

**Files:**
- Modify: `lib/series.ts`

- [ ] **Step 1: Replace the full content of `lib/series.ts`**

```typescript
// lib/series.ts
import { client } from '@/sanity/lib/client'
import {
  allSeriesQuery,
  featuredSeriesQuery,
  seriesBySlugQuery,
} from '@/sanity/lib/queries'
import type { Series } from '@/types/series'

export async function getAllSeries(): Promise<Series[]> {
  return client.fetch(allSeriesQuery, {}, { next: { revalidate: 60 } })
}

export async function getFeaturedSeries(): Promise<Series[]> {
  return client.fetch(featuredSeriesQuery, {}, { next: { revalidate: 60 } })
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  return client.fetch(seriesBySlugQuery, { slug }, { next: { revalidate: 60 } })
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: errors will appear on pages that still use old synchronous imports — that's expected and will be fixed in later tasks.

- [ ] **Step 3: Commit**

```bash
git add lib/series.ts
git commit -m "feat: replace static series data with sanity groq queries"
```

---

## Task 14: Update lib/sermons.ts

**Files:**
- Modify: `lib/sermons.ts`

- [ ] **Step 1: Replace the full content of `lib/sermons.ts`**

```typescript
// lib/sermons.ts
import { client } from '@/sanity/lib/client'
import {
  allSermonsQuery,
  featuredSermonsQuery,
  sermonsBySeriesSlugQuery,
} from '@/sanity/lib/queries'
import type { Sermon } from '@/types/sermon'

export async function getSermons(): Promise<Sermon[]> {
  return client.fetch(allSermonsQuery, {}, { next: { revalidate: 60 } })
}

export async function getFeaturedSermons(): Promise<Sermon[]> {
  return client.fetch(featuredSermonsQuery, {}, { next: { revalidate: 60 } })
}

export async function getSermonsBySeriesSlug(slug: string): Promise<Sermon[]> {
  return client.fetch(sermonsBySeriesSlugQuery, { slug }, { next: { revalidate: 60 } })
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/sermons.ts
git commit -m "feat: replace static sermon data with sanity groq queries"
```

---

## Task 15: Update lib/blog.ts

**Files:**
- Modify: `lib/blog.ts`

- [ ] **Step 1: Replace the full content of `lib/blog.ts`**

```typescript
// lib/blog.ts
import { client } from '@/sanity/lib/client'
import { allBlogPostsQuery, blogPostBySlugQuery } from '@/sanity/lib/queries'
import type { BlogPost } from '@/types/blog'

export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(allBlogPostsQuery, {}, { next: { revalidate: 60 } })
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch(blogPostBySlugQuery, { slug }, { next: { revalidate: 60 } })
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/blog.ts
git commit -m "feat: replace static blog data with sanity groq queries"
```

---

## Task 16: Update lib/events.ts

**Files:**
- Modify: `lib/events.ts`

- [ ] **Step 1: Replace the full content of `lib/events.ts`**

Keep `DOMINION_EVENTS` as the static fallback. Replace everything else with a Sanity query, falling back to the static array when Sanity returns zero results (e.g. during initial setup before any events are entered).

```typescript
// lib/events.ts
import { client } from '@/sanity/lib/client'
import { allEventsQuery } from '@/sanity/lib/queries'
import type { ChurchEvent } from '@/types/event'

export const DOMINION_EVENTS: ChurchEvent[] = [
  {
    id: 'communion-jan',
    title: 'Anionting / Communion Service',
    description: "Begin the year covered in God's anointing. A sacred communion service to consecrate ourselves and set the spiritual tone for all that lies ahead.",
    startDate: '2026-01-11',
    time: '9:00 AM',
    endTime: '12:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
  },
  {
    id: 'fasting-21-days',
    title: '21 Days Fasting and Prayers',
    description: "The entire church comes together for 21 days of corporate fasting and prayer — seeking God's face, direction, and supernatural breakthrough for the year.",
    startDate: '2026-01-12',
    endDate: '2026-02-01',
    time: '6:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
    featured: true,
  },
  {
    id: 'army-retreat-jan',
    title: 'Dominion Army Retreat',
    description: "The Dominion Army gathers for an intense retreat of fasting and prayer. Warriors in God's Kingdom equipping themselves for the battles ahead.",
    startDate: '2026-01-16',
    time: '8:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'men',
  },
  {
    id: 'vigil-jan',
    title: 'Dominion General Vigil',
    description: 'An all-night watch of prayer and worship. Come intercede for the nation, the church, and your personal breakthrough. The night belongs to God.',
    startDate: '2026-01-30',
    time: '9:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
  },
  {
    id: 'business-summit-feb',
    title: 'Dominion Business Summit',
    description: 'Connecting Kingdom-minded entrepreneurs and professionals. Discover business principles rooted in the Word of God and build lasting Kingdom connections.',
    startDate: '2026-02-14',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'deacons-summit',
    title: 'Dominion Deacons & Deaconesses Summit',
    description: 'A powerful gathering of servant leaders — deacons and deaconesses — for training, spiritual renewal, and alignment in Kingdom service.',
    startDate: '2026-03-21',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'elite-business-apr',
    title: 'Dominion Elite Business Summit',
    description: 'The Dominion Elite Business Summit brings together top-level business leaders for networking, mentorship, and high-level Kingdom business strategy.',
    startDate: '2026-04-04',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'easter-sunday',
    title: 'Easter Sunday with Communion',
    description: 'He is risen! Celebrate the resurrection of our Lord Jesus Christ with a powerful Easter Sunday service and the holy communion. The greatest Sunday of the year.',
    startDate: '2026-04-05',
    time: '9:00 AM',
    endTime: '12:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
    featured: true,
  },
  {
    id: 'fasting-one-week',
    title: 'Dominion One Week Fasting and Prayers',
    description: 'Seven days of corporate fasting and prayer. Expect supernatural breakthroughs, healings, and divine encounters as we cry out together before God.',
    startDate: '2026-04-13',
    endDate: '2026-04-19',
    time: '6:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'annual-convention',
    title: 'Dominion Annual Convention / Anniversary',
    description: "The biggest event of the year! The Dominion Annual Convention celebrates God's faithfulness and features anointed ministers from across Nigeria and the globe. A week you will never forget.",
    startDate: '2026-04-21',
    endDate: '2026-04-26',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
    featured: true,
  },
  {
    id: 'womens-summit',
    title: "Dominion Women's Summit",
    description: "Daughters of Dominion — a powerful gathering of women shaping families, communities, and nations for God's glory. Come be empowered, equipped, and ignited.",
    startDate: '2026-05-16',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'women',
    featured: true,
  },
  {
    id: 'childrens-day',
    title: "Children of Great Destiny's Day",
    description: 'Champions are made young! A special celebration dedicated entirely to the children of Dominion Faith. This is their day to shine, worship, and encounter God.',
    startDate: '2026-05-30',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'children',
    featured: true,
  },
  {
    id: 'mens-summit',
    title: "Dominion Men's Summit",
    description: 'Men of Valour, rise! A powerful summit equipping men for purposeful leadership in the home, workplace, and Kingdom. Iron sharpens iron.',
    startDate: '2026-06-13',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'men',
    featured: true,
  },
  {
    id: 'vigil-jun',
    title: 'Dominion General Vigil',
    description: 'The effectual, fervent prayer of a righteous person avails much. Join the church for another powerful all-night prayer meeting.',
    startDate: '2026-06-26',
    time: '9:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
  },
  {
    id: 'communion-jun',
    title: 'Special Anionting / Communion Service',
    description: "A mid-year renewal of covenant. Come receive a fresh touch of God's anointing and rededicate the second half of the year to His purposes.",
    startDate: '2026-06-28',
    time: '9:00 AM',
    endTime: '12:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
  },
  {
    id: 'ministers-summit-jul',
    title: "Dominion Ministers' Summit",
    description: 'All ministers of Dominion Faith gather for training, fresh impartation, and spiritual alignment heading into the second half of the year.',
    startDate: '2026-07-25',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'love-feast',
    title: 'Dominion Love Feast',
    description: 'A beautiful celebration of Christian fellowship and unity. Come share in a feast as we remember what it means to love one another as Christ has loved us.',
    startDate: '2026-08-09',
    time: '10:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
    featured: true,
  },
  {
    id: 'female-ministers-summit',
    title: "Dominion Female Ministers' Summit",
    description: 'Women in ministry gather for a powerful time of equipping, peer mentorship, and fresh spiritual impartation. Every woman carries a unique Kingdom assignment.',
    startDate: '2026-08-15',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'women',
  },
  {
    id: 'vigil-aug',
    title: 'Dominion General Vigil',
    description: 'Close out August in the presence of God. An all-night prayer meeting to intercede, worship, and declare God\'s Word over the coming season.',
    startDate: '2026-08-28',
    time: '9:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
  },
  {
    id: 'army-retreat-sep',
    title: 'Dominion Army Retreat',
    description: 'The Dominion Army convenes again for intense prayer and spiritual warfare intercession. Soldiers of Christ reporting for duty.',
    startDate: '2026-09-11',
    time: '8:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'men',
  },
  {
    id: 'students-summit',
    title: "Dominion Students' Summit",
    description: 'Empowering students to excel in academics, character, and spiritual life. Champions on campus — because excellence and faith are not mutually exclusive.',
    startDate: '2026-09-26',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'youth',
  },
  {
    id: 'teens-summit',
    title: "Dominion Teens' Summit",
    description: 'A powerful gathering for teenagers building identity, purpose, and unshakeable faith. The next generation of champions is rising now.',
    startDate: '2026-10-03',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'youth',
  },
  {
    id: 'youths-singles-summit',
    title: "Dominion Youths / Singles' Summit",
    description: 'Young adults and singles gather for a life-changing summit on purpose, relationships, and Kingdom advancement. Your season of greatness starts here.',
    startDate: '2026-10-24',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'youth',
    featured: true,
  },
  {
    id: 'couples-dinner',
    title: "Dominion Couples' Dinner",
    description: 'A special, intimate evening for married couples to celebrate covenant love and strengthen their bond. An unforgettable night of fine dining and divine fellowship.',
    startDate: '2026-11-14',
    time: '6:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'elite-business-nov',
    title: 'Dominion Elite Business',
    description: 'The Dominion Elite Business community closes out the year with high-level strategy sessions, testimonies of Kingdom success, and networking.',
    startDate: '2026-11-21',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'annual-thanksgiving',
    title: 'Dominion Annual Thanksgiving',
    description: 'Enter His gates with thanksgiving and His courts with praise. Close the year in gratitude as we celebrate everything God has done throughout 2026.',
    startDate: '2026-12-13',
    time: '9:00 AM',
    endTime: '2:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
    featured: true,
  },
  {
    id: 'annual-retreat',
    title: 'Dominion Annual Retreat',
    description: 'A 3-day retreat to close the year in deep spiritual renewal, reflection, and prophetic preparation for the new year. End 2026 strong.',
    startDate: '2026-12-17',
    endDate: '2026-12-19',
    time: '8:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
    featured: true,
  },
]

export async function getEvents(): Promise<ChurchEvent[]> {
  const sanityEvents = await client.fetch(allEventsQuery, {}, { next: { revalidate: 60 } })
  return sanityEvents.length > 0 ? sanityEvents : DOMINION_EVENTS
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/events.ts
git commit -m "feat: replace static event data with sanity groq queries, keep static fallback"
```

---

## Task 17: Update TypeScript types

**Files:**
- Modify: `types/blog.ts`
- Modify: `types/event.ts`

- [ ] **Step 1: Add `body` field to `types/blog.ts`**

Open `types/blog.ts`. Find the `BlogPost` interface and add the `body` field. The full updated interface:

```typescript
export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string[]    // kept for backwards compat; not populated by Sanity
  body?: any[]          // Portable Text blocks from Sanity
  category: BlogCategory
  author: BlogAuthor
  publishedAt: string   // ISO "YYYY-MM-DD"
  readTime: number      // minutes
  image?: string        // URL or /public path
  featured?: boolean
}
```

- [ ] **Step 2: Add `image` field to `types/event.ts`**

Open `types/event.ts`. Find the `ChurchEvent` interface and add the `image` field:

```typescript
export interface ChurchEvent {
  id: string
  title: string
  description: string
  startDate: string
  endDate?: string
  time?: string
  endTime?: string
  location: string
  category: EventCategory
  registrationUrl?: string
  featured?: boolean
  image?: string          // Sanity CDN URL, optional
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: errors on pages that still use old synchronous imports — still expected, will be fixed in the next tasks.

- [ ] **Step 4: Commit**

```bash
git add types/blog.ts types/event.ts
git commit -m "feat: add body field to BlogPost and image field to ChurchEvent types"
```

---

## Task 18: Update sermon archive (client component + its server page)

**Files:**
- Modify: `components/sections/sermon-archive-client.tsx`
- Modify: `app/media/sermons/page.tsx`

`sermon-archive-client.tsx` is a `'use client'` component — it cannot call async functions directly. The server page fetches the data and passes it as props.

- [ ] **Step 1: Update `components/sections/sermon-archive-client.tsx`**

Replace the import at line 7 and add a Props interface. The component now receives data as props instead of importing from lib. Replace the entire file:

```tsx
// components/sections/sermon-archive-client.tsx
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import SermonArchiveCard from '@/components/ui/sermon-archive-card'
import type { Sermon } from '@/types/sermon'

const MotionDiv = motion.div

const PAGE_SIZE = 12
type SortKey = 'newest' | 'oldest' | 'most-viewed'

interface Filters { speaker: string; series: string; topic: string }

interface Props {
  sermons: Sermon[]
  speakers: string[]
  series: string[]
  topics: string[]
}

function FilterSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border bg-transparent py-2.5 pl-4 pr-9 text-[13px] text-white/80 focus:outline-none"
        style={{
          borderColor: value ? 'rgba(42,47,170,0.5)' : 'rgba(255,255,255,0.12)',
          background: value ? 'rgba(42,47,170,0.08)' : 'rgba(255,255,255,0.04)',
        }}
        aria-label={label}
      >
        <option value="">{label}</option>
        {options.map(o => <option key={o} value={o} style={{ background: '#07071f' }}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
    </div>
  )
}

export default function SermonArchiveClient({ sermons, speakers, series, topics }: Props) {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({ speaker: '', series: '', topic: '' })
  const [sort, setSort] = useState<SortKey>('newest')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const debouncedQuery = useDebounce(query, 300)
  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const results = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim()
    let list = sermons.filter(s => {
      if (q && !([s.title, s.speaker, s.scripture ?? '', s.series ?? '', ...(s.topic ?? [])].join(' ').toLowerCase().includes(q))) return false
      if (filters.speaker && s.speaker !== filters.speaker) return false
      if (filters.series && s.series !== filters.series) return false
      if (filters.topic && !s.topic?.includes(filters.topic)) return false
      return true
    })
    if (sort === 'newest')      list = [...list].sort((a, b) => b.date.localeCompare(a.date))
    else if (sort === 'oldest') list = [...list].sort((a, b) => a.date.localeCompare(b.date))
    else                        list = [...list].sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
    return list
  }, [debouncedQuery, filters, sort, sermons])

  const totalPages = Math.ceil(results.length / PAGE_SIZE)
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const setFilter = (key: keyof Filters, val: string) => { setFilters(f => ({ ...f, [key]: val })); setPage(1) }
  const clearFilters = () => { setFilters({ speaker: '', series: '', topic: '' }); setPage(1) }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 md:px-16">

      {/* ── Search + Sort ── */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by title, speaker, scripture, series…"
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(1) }}
            className="w-full rounded-2xl border py-3 pl-11 pr-10 text-[13px] text-white placeholder-white/30 focus:outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white" aria-label="Clear search">
              <X size={15} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFilters(o => !o)}
          className="flex items-center gap-2 rounded-2xl px-5 py-3 text-[13px] font-semibold transition-colors"
          style={{
            background: activeFilterCount > 0 ? 'rgba(42,47,170,0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${activeFilterCount > 0 ? 'rgba(42,47,170,0.4)' : 'rgba(255,255,255,0.1)'}`,
            color: activeFilterCount > 0 ? '#6670d0' : 'rgba(255,255,255,0.7)',
          }}
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-[#2A2FAA] px-1.5 py-0.5 text-[10px] font-black text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="relative w-44 flex-shrink-0">
          <select
            value={sort}
            onChange={e => { setSort(e.target.value as SortKey); setPage(1) }}
            className="w-full appearance-none rounded-2xl border bg-transparent py-3 pl-4 pr-9 text-[13px] text-white/70 focus:outline-none"
            style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
          >
            <option value="newest"      style={{ background: '#07071f' }}>Newest First</option>
            <option value="oldest"      style={{ background: '#07071f' }}>Oldest First</option>
            <option value="most-viewed" style={{ background: '#07071f' }}>Most Viewed</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
        </div>
      </div>

      {/* ── Filter panel ── */}
      <AnimatePresence>
        {showFilters && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 overflow-hidden"
          >
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FilterSelect label="All Speakers" value={filters.speaker} options={speakers} onChange={v => setFilter('speaker', v)} />
                <FilterSelect label="All Series"   value={filters.series}  options={series}   onChange={v => setFilter('series', v)} />
                <FilterSelect label="All Topics"   value={filters.topic}   options={topics}   onChange={v => setFilter('topic', v)} />
              </div>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="mt-3 text-[12px] text-white/40 underline hover:text-white/70">
                  Clear all filters
                </button>
              )}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(filters).filter(([, v]) => v).map(([key, val]) => (
            <span key={key} className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold"
              style={{ background: 'rgba(42,47,170,0.15)', color: '#6670d0', border: '1px solid rgba(42,47,170,0.3)' }}>
              {val}
              <button onClick={() => setFilter(key as keyof Filters, '')} aria-label={`Remove ${val} filter`}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Result count */}
      <p className="mb-6 text-[13px] text-white/40">
        {results.length} {results.length === 1 ? 'sermon' : 'sermons'} found
        {debouncedQuery && <> for &ldquo;<span className="text-white/60">{debouncedQuery}</span>&rdquo;</>}
      </p>

      {/* ── Grid ── */}
      {pageResults.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-xl font-bold text-white/30">No sermons found</p>
          <p className="mt-2 text-[13px] text-white/25">Try different search terms or clear your filters</p>
          <button onClick={() => { setQuery(''); clearFilters() }}
            className="mt-6 rounded-2xl px-6 py-3 text-sm font-bold text-white"
            style={{ background: '#2A2FAA' }}>
            Reset search
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <MotionDiv
            key={`${debouncedQuery}-${JSON.stringify(filters)}-${sort}-${page}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {pageResults.map((sermon, i) => (
              <SermonArchiveCard key={sermon.id} sermon={sermon} index={i} searchQuery={debouncedQuery} />
            ))}
          </MotionDiv>
        </AnimatePresence>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="rounded-xl px-4 py-2 text-[13px] font-semibold text-white/50 disabled:opacity-30 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)}
              className="h-9 w-9 rounded-xl text-[13px] font-bold transition-colors"
              style={{ background: n === page ? '#2A2FAA' : 'rgba(255,255,255,0.06)', color: n === page ? 'white' : 'rgba(255,255,255,0.5)' }}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="rounded-xl px-4 py-2 text-[13px] font-semibold text-white/50 disabled:opacity-30 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Update `app/media/sermons/page.tsx`**

Replace the entire file:

```tsx
// app/media/sermons/page.tsx
import type { Metadata } from 'next'
import SermonArchiveClient from '@/components/sections/sermon-archive-client'
import { getSermons } from '@/lib/sermons'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Sermon Archive — Dominion Faith International Ministry',
  description: 'Search and filter every message from Dominion Faith — by title, speaker, scripture, series, or topic.',
}

export default async function SermonArchivePage() {
  const sermons = await getSermons()
  const speakers = Array.from(new Set(sermons.map(s => s.speaker)))
  const series   = Array.from(new Set(sermons.map(s => s.series).filter((s): s is string => Boolean(s))))
  const topics   = Array.from(new Set(sermons.flatMap(s => s.topic ?? [])))

  return (
    <main
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)' }}
    >
      {/* ── Hero ── */}
      <div className="relative overflow-hidden py-28 md:py-36">
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #2A2FAA 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F9A916 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
            Sermon Archive
          </p>
          <h1
            className="mb-4 font-black text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            The <span style={{ color: '#F9A916' }}>Word</span> on Demand
          </h1>
          <p className="text-[14px] text-white/50">
            Search, filter, and listen to every message from Dominion Faith International Ministry.
          </p>
        </div>
      </div>

      {/* ── Search / Filter / Grid ── */}
      <SermonArchiveClient
        sermons={sermons}
        speakers={speakers}
        series={series}
        topics={topics}
      />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/sermon-archive-client.tsx app/media/sermons/page.tsx
git commit -m "feat: wire sermon archive to sanity — pass data as server props to client component"
```

---

## Task 19: Update home-latest-sermons.tsx

**Files:**
- Modify: `components/sections/home-latest-sermons.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// components/sections/home-latest-sermons.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SermonGrid from '@/components/SermonGrid'
import { getSermons } from '@/lib/sermons'

export default async function HomeLatestSermons() {
  const sermons = await getSermons()
  const latest = sermons.slice(0, 3)

  return (
    <section
      className="w-full py-24 md:py-32"
      style={{
        background: 'linear-gradient(180deg, #07071f 0%, #0a0a20 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
      aria-labelledby="sermons-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">

        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
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

            <h2
              id="sermons-heading"
              className="font-black leading-tight tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              Latest{' '}
              <span style={{ color: 'var(--color-live)' }}>Sermons</span>
            </h2>

            <p className="mt-2 max-w-md text-sm text-white/45">
              Spirit-filled messages to build your faith and ignite your purpose.
            </p>
          </div>

          <Link
            href="/sermons"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold text-white/70 transition-colors hover:border-white/20 hover:text-white"
          >
            View All
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <SermonGrid sermons={latest} />

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home-latest-sermons.tsx
git commit -m "feat: make home latest sermons fetch live from sanity"
```

---

## Task 20: Update app/page.tsx (homepage revalidate)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add revalidate export to homepage**

Replace the entire file:

```tsx
// app/page.tsx
import Hero from '@/components/Hero'
import JoinProcessSection from '@/components/sections/join-process-section'
import HomeSchoolOfMinistry from '@/components/sections/home-som-teaser'
import HomeLatestSermons from '@/components/sections/home-latest-sermons'

export const revalidate = 60

export default function Home() {
  return (
    <>
      <Hero />
      <JoinProcessSection />
      <HomeSchoolOfMinistry />
      <HomeLatestSermons />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add revalidate to homepage for sanity data freshness"
```

---

## Task 21: Update app/sermons/page.tsx

**Files:**
- Modify: `app/sermons/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// app/sermons/page.tsx
import type { Metadata } from 'next'
import SermonGrid from '@/components/SermonGrid'
import { getSermons } from '@/lib/sermons'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Sermons — Dominion Faith',
  description: 'Watch and download sermons from Dominion Faith International Ministry.',
}

export default async function SermonsPage() {
  const sermons = await getSermons()

  return (
    <main
      className="min-h-screen px-6 py-32 md:px-16 lg:px-24"
      style={{ background: 'var(--hero-bg)' }}
    >
      <div className="mx-auto max-w-7xl">
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

        <SermonGrid sermons={sermons} />
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sermons/page.tsx
git commit -m "feat: wire sermons page to sanity"
```

---

## Task 22: Update app/media/series/page.tsx

**Files:**
- Modify: `app/media/series/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// app/media/series/page.tsx
import type { Metadata } from 'next'
import { getAllSeries, getFeaturedSeries } from '@/lib/series'
import FeaturedSeries from '@/components/sections/featured-series'
import SeriesCard from '@/components/ui/series-card'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Sermon Series — Dominion Faith International Ministry',
  description: 'Explore all sermon series from Dominion Faith. Watch every message in sequence and go deep into the Word.',
}

export default async function SeriesPage() {
  const [allSeries, featured] = await Promise.all([getAllSeries(), getFeaturedSeries()])

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)' }}>
      {/* Hero */}
      <div className="pt-28 pb-10 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">Sermon Series</p>
          <h1 className="mb-8 font-black text-white" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            Go <span style={{ color: '#F9A916' }}>Deeper</span>
          </h1>
          <FeaturedSeries series={featured} />
        </div>
      </div>

      {/* All series grid */}
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-16">
        <h2 className="mb-8 text-xl font-bold text-white">All Series</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allSeries.map((s, i) => <SeriesCard key={s.id} series={s} index={i} />)}
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/media/series/page.tsx
git commit -m "feat: wire series page to sanity"
```

---

## Task 23: Update app/media/series/[slug]/page.tsx

**Files:**
- Modify: `app/media/series/[slug]/page.tsx`

- [ ] **Step 1: Replace the entire file**

`generateStaticParams` is removed. The page is now fully dynamic with `revalidate = 60`.

```tsx
// app/media/series/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MessageSquare, Calendar } from 'lucide-react'
import { getSeriesBySlug } from '@/lib/series'
import { getSermonsBySeriesSlug } from '@/lib/sermons'
import SeriesSermonList from '@/components/sections/series-sermon-list'

export const revalidate = 60

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const series = await getSeriesBySlug(params.slug)
  if (!series) return { title: 'Series Not Found' }
  return {
    title: `${series.title} — Dominion Faith`,
    description: series.description,
  }
}

function fmtDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const [series, sermons] = await Promise.all([
    getSeriesBySlug(params.slug),
    getSermonsBySeriesSlug(params.slug),
  ])

  if (!series) notFound()

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)' }}>
      {/* Hero */}
      <div className="relative overflow-hidden py-28 md:py-36" style={{ background: series.gradient }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-black text-white/8 select-none"
          style={{ fontSize: 'clamp(100px, 18vw, 220px)' }}>
          {series.title.split(' ').map(w => w[0]).slice(0, 2).join('')}
        </span>
        <div className="relative mx-auto max-w-5xl px-6 md:px-16">
          <Link href="/media/series" className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={15} /> All Series
          </Link>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">Sermon Series</p>
          <h1 className="mb-4 font-black text-white" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>{series.title}</h1>
          <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-white/70">{series.description}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/50">
            <span>{series.speakers.join(', ')}</span>
            <span className="flex items-center gap-1"><MessageSquare size={13} /> {series.sermonCount} messages</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {fmtDate(series.startDate)}{series.endDate && ` – ${fmtDate(series.endDate)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Sermon list */}
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-16">
        <h2 className="mb-8 text-lg font-bold text-white">Messages in This Series</h2>
        <SeriesSermonList sermons={sermons} />
      </div>

      {/* Back link */}
      <div className="border-t border-white/[0.06] px-6 py-12 text-center md:px-16">
        <Link href="/media/series" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85"
          style={{ background: '#2A2FAA' }}>
          Browse All Series
        </Link>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/media/series/[slug]/page.tsx"
git commit -m "feat: wire series detail page to sanity, remove generateStaticParams"
```

---

## Task 24: Update app/blog/page.tsx

**Files:**
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// app/blog/page.tsx
import type { Metadata } from 'next'
import BlogGrid from '@/components/BlogGrid'
import { getBlogPosts } from '@/lib/blog'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog — Dominion Faith',
  description:
    'Spirit-filled articles on faith, leadership, marriage, and Kingdom finance from Dominion Faith International Ministry.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main
      className="min-h-screen px-6 py-32 md:px-16 lg:px-24"
      style={{ background: 'var(--hero-bg)' }}
    >
      {/* ── Page heading ── */}
      <div className="mx-auto mb-14 max-w-2xl text-center">
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
            Articles
          </span>
        </div>

        <h1
          className="font-black text-white leading-none tracking-[-0.03em]"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
        >
          Blog
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/45">
          Teachings, insights, and Kingdom wisdom to sharpen your faith and
          ignite your purpose — new articles every week.
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <BlogGrid posts={posts} />
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat: wire blog listing page to sanity"
```

---

## Task 25: Update app/blog/[slug]/page.tsx with PortableText

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Replace the entire file**

`generateStaticParams` is removed. `post.content` (string array) is replaced by `post.body` rendered with `@portabletext/react`, styled to exactly match the original paragraphs.

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, ArrowLeft, Calendar } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { getBlogPosts, getPostBySlug } from '@/lib/blog'
import { BLOG_CATEGORY_CONFIG } from '@/types/blog'

export const revalidate = 60

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found — Dominion Faith' }
  return {
    title: `${post.title} — Dominion Faith Blog`,
    description: post.excerpt,
  }
}

function fmtDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p
        className="mb-6 text-base leading-[1.85] text-white/75"
        style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}
      >
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-10 text-2xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-3 mt-8 text-xl font-bold text-white">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="mb-6 border-l-4 border-white/20 pl-4 italic text-white/60">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        className="text-[#F9A916] underline hover:text-[#fbc44a]"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
}

export default async function BlogPostPage({ params }: PageProps) {
  const [post, allPosts] = await Promise.all([
    getPostBySlug(params.slug),
    getBlogPosts(),
  ])

  if (!post) notFound()

  const cfg = BLOG_CATEGORY_CONFIG[post.category]
  const related = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  return (
    <main
      className="min-h-screen px-6 py-32 md:px-16 lg:px-24"
      style={{ background: 'var(--hero-bg)' }}
    >
      <div className="mx-auto max-w-3xl">

        {/* ── Back link ── */}
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Blog
        </Link>

        {/* ── Category badge ── */}
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
          style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
        >
          {cfg.label}
        </span>

        {/* ── Title ── */}
        <h1
          className="mb-6 font-black text-white leading-tight tracking-[-0.02em]"
          style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
        >
          {post.title}
        </h1>

        {/* ── Meta row ── */}
        <div className="mb-10 flex flex-wrap items-center gap-4 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, rgba(42,47,170,0.7) 0%, rgba(168,85,247,0.6) 100%)' }}
              aria-hidden="true"
            >
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{post.author.name}</p>
              {post.author.role && (
                <p className="text-[11px] text-white/40">{post.author.role}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-[12px] text-white/40">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {fmtDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readTime} min read
            </span>
          </div>
        </div>

        {/* ── Article content ── */}
        <article className="prose-church">
          {post.body && post.body.length > 0 ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-white/60 italic">Full article coming soon.</p>
          )}
        </article>

        {/* ── Share section ── */}
        <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-8">
          <span className="text-sm text-white/40">Share this article:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://dominionfaith.org/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:text-white"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            Twitter / X
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.title + ' — https://dominionfaith.org/blog/' + post.slug)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:text-white"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            WhatsApp
          </a>
        </div>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-white">More in {cfg.label}</h2>
            <div className="space-y-4">
              {related.map(rp => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-white/5"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white/85 text-sm leading-snug line-clamp-2">{rp.title}</p>
                    <p className="mt-1 text-[11px] text-white/40">{fmtDate(rp.publishedAt)} · {rp.readTime} min read</p>
                  </div>
                  <span className="flex-shrink-0 text-sm text-white/30">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/blog/[slug]/page.tsx"
git commit -m "feat: wire blog post detail to sanity with portable text renderer"
```

---

## Task 26: Final type-check and events page

**Files:**
- Modify: `app/events/page.tsx` (add revalidate)

- [ ] **Step 1: Add revalidate to events page**

Open `app/events/page.tsx`. Add `export const revalidate = 60` after the imports (the page already calls `getEvents()` which now queries Sanity):

```tsx
// app/events/page.tsx
import type { Metadata } from 'next'
import { getEvents } from '@/lib/events'
import EventGrid from '@/components/EventGrid'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Events — Dominion Faith',
  description:
    '2026 events calendar for Dominion Faith International Ministry — summits, services, retreats, and more.',
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <main
      className="min-h-screen px-6 py-32 md:px-16 lg:px-24"
      style={{ background: 'var(--hero-bg)' }}
    >
      {/* ── Page heading ── */}
      <div className="mx-auto mb-14 max-w-2xl text-center">
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
            2026 Calendar
          </span>
        </div>

        <h1
          className="font-black text-white leading-none tracking-[-0.03em]"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
        >
          Events
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/45">
          From worship nights to revival meetings and community gatherings, there&apos;s
          always something impactful happening here. Come expecting transformation.
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="mx-auto max-w-7xl">
        <EventGrid events={events} />
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Run full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: **zero errors**. If there are errors, fix them before continuing.

- [ ] **Step 3: Run the dev server to verify**

```bash
npm run dev
```

Visit these routes and confirm they load without errors (pages will show empty content if Sanity has no data yet — that is correct):
- `http://localhost:3000` — homepage
- `http://localhost:3000/sermons`
- `http://localhost:3000/events`
- `http://localhost:3000/blog`
- `http://localhost:3000/media/series`
- `http://localhost:3000/media/sermons`
- `http://localhost:3000/studio` — should show the Sanity Studio UI

- [ ] **Step 4: Commit**

```bash
git add app/events/page.tsx
git commit -m "feat: add revalidate to events page"
```

---

## Task 27: Save Sanity API token

Once the dev server is running and the Studio loads at `/studio`:

- [ ] **Step 1: Create an API token**

Go to `manage.sanity.io` → select the **Dominion Faith** project → **API** → **Tokens** → **Add API token**.
- Name: `Next.js Server`
- Permissions: **Editor**
- Copy the token value.

- [ ] **Step 2: Add token to `.env.local`**

Open `.env.local` and fill in the blank value:
```
SANITY_API_TOKEN=<paste token here>
```

- [ ] **Step 3: Restart dev server**

Stop and restart `npm run dev` to pick up the new env var.

- [ ] **Step 4: Final commit**

```bash
git add .env.local
git commit -m "chore: add sanity api token to env (token value not committed)"
```

Note: `.env.local` is gitignored by default in Next.js. Confirm it is in `.gitignore` before committing. If not present in `.gitignore`, add it first:
```bash
echo ".env.local" >> .gitignore
git add .gitignore
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Install dependencies (Task 1)
- [x] `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN` env vars (Task 2, 27)
- [x] `sanity.config.ts` with Studio at `/studio` (Task 9)
- [x] Sermon schema (Task 6)
- [x] Series schema (Task 5)
- [x] Event schema (Task 7)
- [x] BlogPost schema with Portable Text body (Task 8)
- [x] `sanity/lib/client.ts` (Task 3)
- [x] `sanity/lib/image.ts` with `imageUrlFor` (Task 4)
- [x] `sanity/lib/queries.ts` GROQ queries (Task 10)
- [x] Replace `lib/series.ts` (Task 13)
- [x] Replace `lib/sermons.ts` (Task 14)
- [x] Replace `lib/blog.ts` (Task 15)
- [x] Replace `lib/events.ts` with Sanity + static fallback (Task 16)
- [x] `app/studio/[[...tool]]/page.tsx` (Task 12)
- [x] `/studio` excluded from PWA (Task 11)
- [x] `cdn.sanity.io` in `next.config.js` image patterns (Task 11)
- [x] `revalidate = 60` on all data-fetching pages (Tasks 20–26)
- [x] `generateStaticParams` removed from `blog/[slug]` and `series/[slug]` (Tasks 23, 25)
- [x] `@portabletext/react` for blog body (Task 25)
- [x] `sermon-archive-client.tsx` refactored to accept props (Task 18)
- [x] `image` field on `ChurchEvent` type (Task 17)
- [x] `body` field on `BlogPost` type (Task 17)

**No gaps found.**
