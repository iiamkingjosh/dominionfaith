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
