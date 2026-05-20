export interface Series {
  id: string
  slug: string
  title: string
  description: string
  startDate: string
  endDate?: string
  sermonCount: number
  speakers: string[]
  topics: string[]
  gradient: string
  featured?: boolean
}
