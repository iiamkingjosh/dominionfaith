export type MinistryCategory = 'youth' | 'women' | 'men' | 'children' | 'music' | 'serve'

export interface MinistryLeader {
  name: string
  role?: string
}

export interface Ministry {
  id: string
  name: string
  category: MinistryCategory
  description: string
  meetingTime: string
  location: string
  leader: MinistryLeader
  contact: {
    email?: string
    phone?: string
  }
  featured?: boolean
}

export interface MinistryCategoryConfig {
  label: string
  color: string
  bg: string
  border: string
  gradient: string
}

export const MINISTRY_CATEGORY_CONFIG: Record<MinistryCategory, MinistryCategoryConfig> = {
  youth: {
    label: 'Youth',
    color: '#2A2FAA',
    bg: 'rgba(42,47,170,0.12)',
    border: 'rgba(42,47,170,0.3)',
    gradient: 'linear-gradient(135deg, #1a1e7a 0%, #2A2FAA 60%, #3d44cc 100%)',
  },
  women: {
    label: 'Women',
    color: '#F9A916',
    bg: 'rgba(249,169,22,0.12)',
    border: 'rgba(249,169,22,0.3)',
    gradient: 'linear-gradient(135deg, #a06c06 0%, #F9A916 60%, #fbc44a 100%)',
  },
  men: {
    label: 'Men',
    color: '#F61F27',
    bg: 'rgba(246,31,39,0.12)',
    border: 'rgba(246,31,39,0.3)',
    gradient: 'linear-gradient(135deg, #8c0e13 0%, #F61F27 60%, #f94d54 100%)',
  },
  children: {
    label: 'Children',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.3)',
    gradient: 'linear-gradient(135deg, #066b4c 0%, #10b981 60%, #34d399 100%)',
  },
  music: {
    label: 'Music',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.3)',
    gradient: 'linear-gradient(135deg, #6b21a8 0%, #a855f7 60%, #c084fc 100%)',
  },
  serve: {
    label: 'Serve',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.3)',
    gradient: 'linear-gradient(135deg, #0e5f70 0%, #06b6d4 60%, #38bdf8 100%)',
  },
}
