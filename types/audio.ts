export interface AudioEpisode {
  id: string
  title: string
  speaker: string
  audioUrl: string
  durationSeconds: number
  artwork: string
  seriesName?: string
  scripture?: string
}

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

export const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const
export type PlaybackSpeed = (typeof SPEED_OPTIONS)[number]

export interface PlayerState {
  current: AudioEpisode | null
  queue: AudioEpisode[]
  status: PlayerStatus
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  speed: PlaybackSpeed
  expanded: boolean
}
