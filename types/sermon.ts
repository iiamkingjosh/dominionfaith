export interface Sermon {
  id: string
  videoId: string          // YouTube video ID (e.g. "dQw4w9WgXcQ")
  title: string
  speaker: string
  speakerPhoto?: string    // absolute URL or /public path
  date: string             // ISO "YYYY-MM-DD"
  series?: string          // series name for badge
  downloadUrl?: string     // optional direct audio/video download URL
}
