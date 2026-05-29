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
