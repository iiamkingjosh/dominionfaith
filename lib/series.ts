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
