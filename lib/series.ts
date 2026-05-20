import type { Series } from '@/types/series'

export const ALL_SERIES_DATA: Series[] = [
  {
    id: 'dominion-authority',
    slug: 'dominion-authority',
    title: 'Dominion Authority',
    description:
      'God did not save you to survive — He saved you to reign. This four-part series unpacks your legal right to exercise dominion over sickness, poverty, and every circumstance of life.',
    startDate: '2026-03-01',
    endDate: '2026-03-22',
    sermonCount: 4,
    speakers: ['Pastor Paul C. Igwe'],
    topics: ['dominion', 'authority', 'faith', 'healing', 'finances'],
    gradient: 'linear-gradient(135deg, #0d1240 0%, #2A2FAA 60%, #3d44cc 100%)',
    featured: true,
  },
  {
    id: 'faith-that-works',
    slug: 'faith-that-works',
    title: 'Faith That Works',
    description:
      'Biblical faith is not a feeling or a wish — it is a force that accesses heaven\'s resources and rewrites earthly circumstances. Four messages to build your faith to mountain-moving levels.',
    startDate: '2026-02-01',
    endDate: '2026-02-22',
    sermonCount: 4,
    speakers: ['Pastor Paul C. Igwe'],
    topics: ['faith', 'the word', 'spiritual warfare'],
    gradient: 'linear-gradient(135deg, #1a0630 0%, #7c3aed 60%, #a855f7 100%)',
    featured: true,
  },
  {
    id: 'kingdom-economics',
    slug: 'kingdom-economics',
    title: 'Kingdom Economics',
    description:
      'The world\'s financial system operates on scarcity. God\'s Kingdom operates on sowing and reaping. Three messages that will transform your relationship with money and Kingdom giving.',
    startDate: '2026-01-11',
    endDate: '2026-01-25',
    sermonCount: 3,
    speakers: ['Pastor Paul C. Igwe'],
    topics: ['finances', 'giving', 'tithe', 'prosperity'],
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #F9A916 60%, #fbc44a 100%)',
    featured: true,
  },
  {
    id: 'raising-champions',
    slug: 'raising-champions',
    title: 'Raising Champions',
    description:
      'Champions are not born — they are made. Every great leader has a hidden season of preparation. Three messages to help you embrace the process and become who God has called you to be.',
    startDate: '2025-12-15',
    endDate: '2025-12-29',
    sermonCount: 3,
    speakers: ['Pastor Paul C. Igwe'],
    topics: ['purpose', 'character', 'discipline', 'destiny'],
    gradient: 'linear-gradient(135deg, #1a0000 0%, #F61F27 60%, #f94d54 100%)',
  },
]

export function getSeriesBySlug(slug: string): Series | undefined {
  return ALL_SERIES_DATA.find(s => s.slug === slug)
}

export function getFeaturedSeries(): Series[] {
  return ALL_SERIES_DATA.filter(s => s.featured)
}
