export interface Sermon {
  id: string
  videoId: string
  slug?: string
  title: string
  speaker: string
  speakerPhoto?: string
  date: string
  duration?: string
  durationSeconds?: number
  scripture?: string
  series?: string
  seriesSlug?: string
  topic?: string[]
  description?: string
  audioUrl?: string
  downloadUrl?: string
  viewCount?: number
  featured?: boolean
}
