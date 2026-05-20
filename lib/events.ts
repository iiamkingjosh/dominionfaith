import type { ChurchEvent } from '@/types/event'

// ── All 27 events from the 2026 Dominion Faith Annual Calendar ──

export const DOMINION_EVENTS: ChurchEvent[] = [
  {
    id: 'communion-jan',
    title: 'Anionting / Communion Service',
    description: 'Begin the year covered in God\'s anointing. A sacred communion service to consecrate ourselves and set the spiritual tone for all that lies ahead.',
    startDate: '2026-01-11',
    time: '9:00 AM',
    endTime: '12:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
  },
  {
    id: 'fasting-21-days',
    title: '21 Days Fasting and Prayers',
    description: 'The entire church comes together for 21 days of corporate fasting and prayer — seeking God\'s face, direction, and supernatural breakthrough for the year.',
    startDate: '2026-01-12',
    endDate: '2026-02-01',
    time: '6:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
    featured: true,
  },
  {
    id: 'army-retreat-jan',
    title: 'Dominion Army Retreat',
    description: 'The Dominion Army gathers for an intense retreat of fasting and prayer. Warriors in God\'s Kingdom equipping themselves for the battles ahead.',
    startDate: '2026-01-16',
    time: '8:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'men',
  },
  {
    id: 'vigil-jan',
    title: 'Dominion General Vigil',
    description: 'An all-night watch of prayer and worship. Come intercede for the nation, the church, and your personal breakthrough. The night belongs to God.',
    startDate: '2026-01-30',
    time: '9:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
  },
  {
    id: 'business-summit-feb',
    title: 'Dominion Business Summit',
    description: 'Connecting Kingdom-minded entrepreneurs and professionals. Discover business principles rooted in the Word of God and build lasting Kingdom connections.',
    startDate: '2026-02-14',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'deacons-summit',
    title: 'Dominion Deacons & Deaconesses Summit',
    description: 'A powerful gathering of servant leaders — deacons and deaconesses — for training, spiritual renewal, and alignment in Kingdom service.',
    startDate: '2026-03-21',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'elite-business-apr',
    title: 'Dominion Elite Business Summit',
    description: 'The Dominion Elite Business Summit brings together top-level business leaders for networking, mentorship, and high-level Kingdom business strategy.',
    startDate: '2026-04-04',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'easter-sunday',
    title: 'Easter Sunday with Communion',
    description: 'He is risen! Celebrate the resurrection of our Lord Jesus Christ with a powerful Easter Sunday service and the holy communion. The greatest Sunday of the year.',
    startDate: '2026-04-05',
    time: '9:00 AM',
    endTime: '12:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
    featured: true,
  },
  {
    id: 'fasting-one-week',
    title: 'Dominion One Week Fasting and Prayers',
    description: 'Seven days of corporate fasting and prayer. Expect supernatural breakthroughs, healings, and divine encounters as we cry out together before God.',
    startDate: '2026-04-13',
    endDate: '2026-04-19',
    time: '6:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'annual-convention',
    title: 'Dominion Annual Convention / Anniversary',
    description: 'The biggest event of the year! The Dominion Annual Convention celebrates God\'s faithfulness and features anointed ministers from across Nigeria and the globe. A week you will never forget.',
    startDate: '2026-04-21',
    endDate: '2026-04-26',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
    featured: true,
    registrationUrl: '#',
  },
  {
    id: 'womens-summit',
    title: "Dominion Women's Summit",
    description: 'Daughters of Dominion — a powerful gathering of women shaping families, communities, and nations for God\'s glory. Come be empowered, equipped, and ignited.',
    startDate: '2026-05-16',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'women',
    featured: true,
    registrationUrl: '#',
  },
  {
    id: 'childrens-day',
    title: "Children of Great Destiny's Day",
    description: 'Champions are made young! A special celebration dedicated entirely to the children of Dominion Faith. This is their day to shine, worship, and encounter God.',
    startDate: '2026-05-30',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'children',
    featured: true,
    registrationUrl: '#',
  },
  {
    id: 'mens-summit',
    title: "Dominion Men's Summit",
    description: 'Men of Valour, rise! A powerful summit equipping men for purposeful leadership in the home, workplace, and Kingdom. Iron sharpens iron.',
    startDate: '2026-06-13',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'men',
    featured: true,
    registrationUrl: '#',
  },
  {
    id: 'vigil-jun',
    title: 'Dominion General Vigil',
    description: 'The effectual, fervent prayer of a righteous person avails much. Join the church for another powerful all-night prayer meeting.',
    startDate: '2026-06-26',
    time: '9:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
  },
  {
    id: 'communion-jun',
    title: 'Special Anionting / Communion Service',
    description: 'A mid-year renewal of covenant. Come receive a fresh touch of God\'s anointing and rededicate the second half of the year to His purposes.',
    startDate: '2026-06-28',
    time: '9:00 AM',
    endTime: '12:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
  },
  {
    id: 'ministers-summit-jul',
    title: "Dominion Ministers' Summit",
    description: 'All ministers of Dominion Faith gather for training, fresh impartation, and spiritual alignment heading into the second half of the year.',
    startDate: '2026-07-25',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'love-feast',
    title: 'Dominion Love Feast',
    description: 'A beautiful celebration of Christian fellowship and unity. Come share in a feast as we remember what it means to love one another as Christ has loved us.',
    startDate: '2026-08-09',
    time: '10:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
    featured: true,
  },
  {
    id: 'female-ministers-summit',
    title: "Dominion Female Ministers' Summit",
    description: 'Women in ministry gather for a powerful time of equipping, peer mentorship, and fresh spiritual impartation. Every woman carries a unique Kingdom assignment.',
    startDate: '2026-08-15',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'women',
  },
  {
    id: 'vigil-aug',
    title: 'Dominion General Vigil',
    description: 'Close out August in the presence of God. An all-night prayer meeting to intercede, worship, and declare God\'s Word over the coming season.',
    startDate: '2026-08-28',
    time: '9:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
  },
  {
    id: 'army-retreat-sep',
    title: 'Dominion Army Retreat',
    description: 'The Dominion Army convenes again for intense prayer and spiritual warfare intercession. Soldiers of Christ reporting for duty.',
    startDate: '2026-09-11',
    time: '8:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'men',
  },
  {
    id: 'students-summit',
    title: "Dominion Students' Summit",
    description: 'Empowering students to excel in academics, character, and spiritual life. Champions on campus — because excellence and faith are not mutually exclusive.',
    startDate: '2026-09-26',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'youth',
  },
  {
    id: 'teens-summit',
    title: "Dominion Teens' Summit",
    description: 'A powerful gathering for teenagers building identity, purpose, and unshakeable faith. The next generation of champions is rising now.',
    startDate: '2026-10-03',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'youth',
  },
  {
    id: 'youths-singles-summit',
    title: "Dominion Youths / Singles' Summit",
    description: 'Young adults and singles gather for a life-changing summit on purpose, relationships, and Kingdom advancement. Your season of greatness starts here.',
    startDate: '2026-10-24',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'youth',
    featured: true,
    registrationUrl: '#',
  },
  {
    id: 'couples-dinner',
    title: "Dominion Couples' Dinner",
    description: 'A special, intimate evening for married couples to celebrate covenant love and strengthen their bond. An unforgettable night of fine dining and divine fellowship.',
    startDate: '2026-11-14',
    time: '6:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
    registrationUrl: '#',
  },
  {
    id: 'elite-business-nov',
    title: 'Dominion Elite Business',
    description: 'The Dominion Elite Business community closes out the year with high-level strategy sessions, testimonies of Kingdom success, and networking.',
    startDate: '2026-11-21',
    time: '9:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
  },
  {
    id: 'annual-thanksgiving',
    title: 'Dominion Annual Thanksgiving',
    description: 'Enter His gates with thanksgiving and His courts with praise. Close the year in gratitude as we celebrate everything God has done throughout 2026.',
    startDate: '2026-12-13',
    time: '9:00 AM',
    endTime: '2:00 PM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'services',
    featured: true,
  },
  {
    id: 'annual-retreat',
    title: 'Dominion Annual Retreat',
    description: 'A 3-day retreat to close the year in deep spiritual renewal, reflection, and prophetic preparation for the new year. End 2026 strong.',
    startDate: '2026-12-17',
    endDate: '2026-12-19',
    time: '8:00 AM',
    location: 'HQ — 1 Dominion Avenue, Onireke, Lagos',
    category: 'special',
    featured: true,
    registrationUrl: '#',
  },
]

// ── Google Calendar API integration ──────────────────────────
// Activate by setting these env vars in .env.local:
//   NEXT_PUBLIC_GOOGLE_CALENDAR_ID=xxxxx@group.calendar.google.com
//   NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=AIza...

function mapGoogleEventCategory(title: string): import('@/types/event').EventCategory {
  const t = title.toLowerCase()
  if (t.includes('youth') || t.includes('teen') || t.includes('student') || t.includes('singles'))
    return 'youth'
  if (t.includes('women') || t.includes('female')) return 'women'
  if (t.includes('men') || t.includes('army') || t.includes('deacon')) return 'men'
  if (t.includes('children') || t.includes('child')) return 'children'
  if (t.includes('service') || t.includes('communion') || t.includes('vigil') ||
      t.includes('fasting') || t.includes('prayer') || t.includes('feast') ||
      t.includes('thanksgiving') || t.includes('easter'))
    return 'services'
  return 'special'
}

async function fetchGoogleCalendarEvents(): Promise<ChurchEvent[]> {
  const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID
  const apiKey     = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
  if (!calendarId || !apiKey) return []

  try {
    const url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
    )
    url.searchParams.set('key', apiKey)
    url.searchParams.set('orderBy', 'startTime')
    url.searchParams.set('singleEvents', 'true')
    url.searchParams.set('timeMin', new Date().toISOString())
    url.searchParams.set('maxResults', '100')

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
    if (!res.ok) return []

    const data = await res.json()
    return (data.items ?? []).map((item: any, i: number): ChurchEvent => ({
      id:          item.id ?? String(i),
      title:       item.summary ?? 'Untitled',
      description: item.description ?? '',
      startDate:   (item.start?.date ?? item.start?.dateTime ?? '').slice(0, 10),
      endDate:     item.end?.date ? item.end.date.slice(0, 10) : undefined,
      time:        item.start?.dateTime
                     ? new Date(item.start.dateTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                     : undefined,
      location:    item.location ?? 'HQ — 1 Dominion Avenue, Onireke, Lagos',
      category:    mapGoogleEventCategory(item.summary ?? ''),
    }))
  } catch {
    return []
  }
}

export async function getEvents(): Promise<ChurchEvent[]> {
  const gcEvents = await fetchGoogleCalendarEvents()
  return gcEvents.length > 0 ? gcEvents : DOMINION_EVENTS
}
