export type EventCategory = 'services' | 'youth' | 'women' | 'men' | 'children' | 'special'

export interface ChurchEvent {
  id: string
  title: string
  description: string
  startDate: string   // "YYYY-MM-DD"
  endDate?: string    // for multi-day events
  time?: string       // "9:00 AM"
  endTime?: string
  location: string
  category: EventCategory
  registrationUrl?: string
  featured?: boolean  // spans 2 columns in bento grid
}

export interface CategoryConfig {
  label: string
  color: string
  bg: string
  border: string
  gradient: string
}

export const CATEGORY_CONFIG: Record<EventCategory, CategoryConfig> = {
  services: {
    label: 'Service',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.3)',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.35) 0%, rgba(12,12,40,0.9) 100%)',
  },
  youth: {
    label: 'Youth',
    color: '#2A2FAA',
    bg: 'rgba(42,47,170,0.12)',
    border: 'rgba(42,47,170,0.3)',
    gradient: 'linear-gradient(135deg, rgba(42,47,170,0.5) 0%, rgba(12,12,40,0.9) 100%)',
  },
  women: {
    label: 'Women',
    color: '#F9A916',
    bg: 'rgba(249,169,22,0.12)',
    border: 'rgba(249,169,22,0.3)',
    gradient: 'linear-gradient(135deg, rgba(249,169,22,0.35) 0%, rgba(12,12,40,0.9) 100%)',
  },
  men: {
    label: 'Men',
    color: '#F61F27',
    bg: 'rgba(246,31,39,0.12)',
    border: 'rgba(246,31,39,0.3)',
    gradient: 'linear-gradient(135deg, rgba(246,31,39,0.35) 0%, rgba(12,12,40,0.9) 100%)',
  },
  children: {
    label: 'Children',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.3)',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.35) 0%, rgba(12,12,40,0.9) 100%)',
  },
  special: {
    label: 'Special',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.3)',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.35) 0%, rgba(12,12,40,0.9) 100%)',
  },
}
