import type { Sermon } from '@/types/sermon'

const PJ = { speaker: 'Pastor Paul C. Igwe' }

export const ALL_SERMONS: Sermon[] = [
  // ── Dominion Authority (series, 4 msgs) ──────────────────────
  {
    id: 'da-1', videoId: 'dQw4w9WgXcQ', slug: 'what-it-means-to-have-dominion',
    title: 'What It Means to Have Dominion', ...PJ,
    date: '2026-03-22', duration: '52:18', durationSeconds: 3138,
    scripture: 'Genesis 1:26–28', series: 'Dominion Authority', seriesSlug: 'dominion-authority',
    topic: ['dominion', 'authority', 'faith'],
    description: 'In the beginning, God gave man a mandate — not to survive, but to reign. This opening message unpacks what dominion truly means in the life of a believer.',
    audioUrl: 'https://media.dominionfaith.com/sermons/da-1.mp3', viewCount: 9240, featured: true,
  },
  {
    id: 'da-2', videoId: 'dQw4w9WgXcQ', slug: 'speaking-to-your-mountain',
    title: 'Speaking to Your Mountain', ...PJ,
    date: '2026-03-15', duration: '48:44', durationSeconds: 2924,
    scripture: 'Mark 11:23–24', series: 'Dominion Authority', seriesSlug: 'dominion-authority',
    topic: ['dominion', 'prayer', 'confession'],
    description: 'Jesus never prayed about the mountain — He spoke to it. Discover the authority every believer carries in their words and learn to stop talking about problems and start commanding solutions.',
    audioUrl: 'https://media.dominionfaith.com/sermons/da-2.mp3', viewCount: 7810,
  },
  {
    id: 'da-3', videoId: 'dQw4w9WgXcQ', slug: 'authority-over-sickness',
    title: 'Authority Over Sickness and Disease', ...PJ,
    date: '2026-03-08', duration: '55:02', durationSeconds: 3302,
    scripture: 'Luke 10:19', series: 'Dominion Authority', seriesSlug: 'dominion-authority',
    topic: ['healing', 'dominion', 'authority'],
    description: 'Sickness was never part of God\'s plan for mankind. This message establishes your legal right to health and teaches you how to exercise dominion over every form of disease.',
    audioUrl: 'https://media.dominionfaith.com/sermons/da-3.mp3', viewCount: 6540,
  },
  {
    id: 'da-4', videoId: 'dQw4w9WgXcQ', slug: 'ruling-your-finances',
    title: 'Ruling Your Finances', ...PJ,
    date: '2026-03-01', duration: '49:55', durationSeconds: 2995,
    scripture: 'Deuteronomy 8:18', series: 'Dominion Authority', seriesSlug: 'dominion-authority',
    topic: ['finances', 'dominion', 'prosperity'],
    description: 'Poverty is a curse, not a virtue. The same dominion God gave you over fish and birds extends to your financial life. Learn God\'s blueprint for ruling your resources.',
    audioUrl: 'https://media.dominionfaith.com/sermons/da-4.mp3', viewCount: 8030,
  },

  // ── Faith That Works (series, 4 msgs) ───────────────────────
  {
    id: 'fw-1', videoId: 'dQw4w9WgXcQ', slug: 'faith-the-substance',
    title: 'Faith: The Substance of Things Hoped For', ...PJ,
    date: '2026-02-22', duration: '46:30', durationSeconds: 2790,
    scripture: 'Hebrews 11:1', series: 'Faith That Works', seriesSlug: 'faith-that-works',
    topic: ['faith', 'hope', 'salvation'],
    description: 'Faith is not optimism repackaged. It is a spiritual substance — real, legal, and powerful. This foundational message redefines biblical faith for every area of your life.',
    audioUrl: 'https://media.dominionfaith.com/sermons/fw-1.mp3', viewCount: 11200, featured: true,
  },
  {
    id: 'fw-2', videoId: 'dQw4w9WgXcQ', slug: 'faith-comes-by-hearing',
    title: 'Faith Comes by Hearing', ...PJ,
    date: '2026-02-15', duration: '44:12', durationSeconds: 2652,
    scripture: 'Romans 10:17', series: 'Faith That Works', seriesSlug: 'faith-that-works',
    topic: ['faith', 'the word', 'growth'],
    description: 'Your faith will never rise above the level of your exposure to the Word of God. Discover how consistent hearing of the Word builds mountain-moving faith.',
    audioUrl: 'https://media.dominionfaith.com/sermons/fw-2.mp3', viewCount: 7620,
  },
  {
    id: 'fw-3', videoId: 'dQw4w9WgXcQ', slug: 'faith-without-works-is-dead',
    title: 'Faith Without Works Is Dead', ...PJ,
    date: '2026-02-08', duration: '50:45', durationSeconds: 3045,
    scripture: 'James 2:14–26', series: 'Faith That Works', seriesSlug: 'faith-that-works',
    topic: ['faith', 'works', 'action'],
    description: 'Genuine faith always has a corresponding action. The woman with the issue of blood pressed through a crowd. Peter stepped out of the boat. What is your step of faith today?',
    audioUrl: 'https://media.dominionfaith.com/sermons/fw-3.mp3', viewCount: 6890,
  },
  {
    id: 'fw-4', videoId: 'dQw4w9WgXcQ', slug: 'the-shield-of-faith',
    title: 'The Shield of Faith', ...PJ,
    date: '2026-02-01', duration: '43:28', durationSeconds: 2608,
    scripture: 'Ephesians 6:16', series: 'Faith That Works', seriesSlug: 'faith-that-works',
    topic: ['faith', 'spiritual warfare', 'protection'],
    description: 'Faith is not just offensive — it is your primary defensive weapon. Learn how to raise the shield of faith against every fiery dart of the enemy.',
    audioUrl: 'https://media.dominionfaith.com/sermons/fw-4.mp3', viewCount: 5430,
  },

  // ── Kingdom Economics (series, 3 msgs) ──────────────────────
  {
    id: 'ke-1', videoId: 'dQw4w9WgXcQ', slug: 'sowing-and-reaping',
    title: 'The Law of Sowing and Reaping', ...PJ,
    date: '2026-01-25', duration: '51:14', durationSeconds: 3074,
    scripture: 'Galatians 6:7', series: 'Kingdom Economics', seriesSlug: 'kingdom-economics',
    topic: ['finances', 'giving', 'sowing'],
    description: 'There is a law written into the fabric of creation that no recession can repeal: you reap what you sow. This message reorients your relationship with money and Kingdom giving.',
    audioUrl: 'https://media.dominionfaith.com/sermons/ke-1.mp3', viewCount: 9870, featured: true,
  },
  {
    id: 'ke-2', videoId: 'dQw4w9WgXcQ', slug: 'the-tithe-covenant',
    title: 'The Tithe: Your Covenant with God', ...PJ,
    date: '2026-01-18', duration: '47:55', durationSeconds: 2875,
    scripture: 'Malachi 3:10', series: 'Kingdom Economics', seriesSlug: 'kingdom-economics',
    topic: ['finances', 'tithe', 'covenant'],
    description: 'The tithe is not a tax — it is a covenant key that opens the windows of heaven. Understanding the tithe covenant changes everything about how you handle your resources.',
    audioUrl: 'https://media.dominionfaith.com/sermons/ke-2.mp3', viewCount: 7320,
  },
  {
    id: 'ke-3', videoId: 'dQw4w9WgXcQ', slug: 'breaking-the-poverty-mindset',
    title: 'Breaking the Poverty Mindset', ...PJ,
    date: '2026-01-11', duration: '53:40', durationSeconds: 3220,
    scripture: 'Proverbs 23:7', series: 'Kingdom Economics', seriesSlug: 'kingdom-economics',
    topic: ['finances', 'mindset', 'prosperity'],
    description: 'Poverty is not just a lack of money — it is a mindset. Before your bank account can change, your mind must be renewed to Kingdom economic principles.',
    audioUrl: 'https://media.dominionfaith.com/sermons/ke-3.mp3', viewCount: 8450,
  },

  // ── Raising Champions (series, 3 msgs) ──────────────────────
  {
    id: 'rc-1', videoId: 'dQw4w9WgXcQ', slug: 'champions-are-made',
    title: 'Champions Are Not Born — They Are Made', ...PJ,
    date: '2025-12-29', duration: '49:10', durationSeconds: 2950,
    scripture: '1 Corinthians 9:24–27', series: 'Raising Champions', seriesSlug: 'raising-champions',
    topic: ['character', 'purpose', 'discipline'],
    description: 'Every great champion has a hidden season of preparation. God is not looking for the most talented — He is looking for the most faithful. Discover what it takes to be made.',
    audioUrl: 'https://media.dominionfaith.com/sermons/rc-1.mp3', viewCount: 10340, featured: true,
  },
  {
    id: 'rc-2', videoId: 'dQw4w9WgXcQ', slug: 'the-wilderness-season',
    title: 'The Wilderness Season: When God Goes Silent', ...PJ,
    date: '2025-12-22', duration: '46:08', durationSeconds: 2768,
    scripture: 'Psalm 46:10', series: 'Raising Champions', seriesSlug: 'raising-champions',
    topic: ['character', 'waiting', 'faith'],
    description: 'David had the wilderness. Joseph had the prison. Elijah had the desert. What looks like God\'s absence is often His preparation for your greatest assignment.',
    audioUrl: 'https://media.dominionfaith.com/sermons/rc-2.mp3', viewCount: 8780,
  },
  {
    id: 'rc-3', videoId: 'dQw4w9WgXcQ', slug: 'the-champions-mindset',
    title: "The Champion's Mindset", ...PJ,
    date: '2025-12-15', duration: '45:22', durationSeconds: 2722,
    scripture: 'Philippians 4:13', series: 'Raising Champions', seriesSlug: 'raising-champions',
    topic: ['mindset', 'character', 'overcoming'],
    description: 'Champions think differently before they live differently. This message rewires the way you think about challenges, failures, and the limitless possibilities before you.',
    audioUrl: 'https://media.dominionfaith.com/sermons/rc-3.mp3', viewCount: 7010,
  },

  // ── Standalone sermons ───────────────────────────────────────
  {
    id: 'sa-1', videoId: 'dQw4w9WgXcQ', slug: 'the-holy-spirit-your-helper',
    title: 'The Holy Spirit: Your Helper and Partner', ...PJ,
    date: '2025-12-08', duration: '58:04', durationSeconds: 3484,
    scripture: 'John 14:16–17', topic: ['holy spirit', 'prayer', 'growth'],
    description: 'The Holy Spirit is not a force or an experience — He is a Person. And He has moved in with you. Learn how to cultivate intimacy with the Third Person of the Trinity.',
    audioUrl: 'https://media.dominionfaith.com/sermons/sa-1.mp3', viewCount: 12400, featured: true,
  },
  {
    id: 'sa-2', videoId: 'dQw4w9WgXcQ', slug: 'covenant-marriage-gods-design',
    title: "Covenant Marriage: God's Original Design", ...PJ,
    date: '2025-12-01', duration: '54:33', durationSeconds: 3273,
    scripture: 'Genesis 2:24', topic: ['marriage', 'family', 'love'],
    description: 'The world offers contracts. God designed covenants. Marriage was never meant to survive on feelings — it was built to thrive on commitment, sacrifice, and the love of God.',
    audioUrl: 'https://media.dominionfaith.com/sermons/sa-2.mp3', viewCount: 9650,
  },
  {
    id: 'sa-3', videoId: 'dQw4w9WgXcQ', slug: 'prayer-that-moves-mountains',
    title: 'Prayer That Moves Mountains', ...PJ,
    date: '2025-11-24', duration: '47:18', durationSeconds: 2838,
    scripture: 'Matthew 21:22', topic: ['prayer', 'faith', 'breakthrough'],
    description: 'Why do some prayers get answered and others seem to bounce off the ceiling? This message exposes the principles behind prevailing, mountain-moving prayer.',
    audioUrl: 'https://media.dominionfaith.com/sermons/sa-3.mp3', viewCount: 13800,
  },
  {
    id: 'sa-4', videoId: 'dQw4w9WgXcQ', slug: 'the-blood-of-jesus',
    title: 'The Blood of Jesus: Still Speaking', ...PJ,
    date: '2025-11-17', duration: '56:41', durationSeconds: 3401,
    scripture: 'Hebrews 12:24', topic: ['salvation', 'the blood', 'redemption'],
    description: 'The blood of Jesus does not just speak of forgiveness — it speaks of justification, healing, protection, and access to the Father. Learn to plead the blood with understanding.',
    audioUrl: 'https://media.dominionfaith.com/sermons/sa-4.mp3', viewCount: 11050,
  },
  {
    id: 'sa-5', videoId: 'dQw4w9WgXcQ', slug: 'purpose-driven-living',
    title: 'Living on Purpose, Not by Accident', ...PJ,
    date: '2025-11-10', duration: '44:50', durationSeconds: 2690,
    scripture: 'Jeremiah 29:11', topic: ['purpose', 'calling', 'destiny'],
    description: 'God has a specific assignment for your life — and the enemy has a specific strategy to keep you from it. This message helps you discover and pursue your God-given purpose.',
    audioUrl: 'https://media.dominionfaith.com/sermons/sa-5.mp3', viewCount: 8320,
  },
  {
    id: 'sa-6', videoId: 'dQw4w9WgXcQ', slug: 'the-fear-of-the-lord',
    title: 'The Fear of the Lord: Foundation of Wisdom', ...PJ,
    date: '2025-11-03', duration: '50:28', durationSeconds: 3028,
    scripture: 'Proverbs 9:10', topic: ['wisdom', 'reverence', 'holiness'],
    description: 'The fear of the Lord is not terror — it is reverence that produces wisdom, breakthrough, and supernatural favour. This message restores a lost dimension of Christian living.',
    audioUrl: 'https://media.dominionfaith.com/sermons/sa-6.mp3', viewCount: 7240,
  },
]

export function getSermonsBySeriesSlug(slug: string): Sermon[] {
  return ALL_SERMONS.filter(s => s.seriesSlug === slug)
}

export function getFeaturedSermons(): Sermon[] {
  return ALL_SERMONS.filter(s => s.featured)
}

export const ALL_SPEAKERS = Array.from(new Set(ALL_SERMONS.map(s => s.speaker)))
export const ALL_SERIES   = Array.from(new Set(ALL_SERMONS.map(s => s.series).filter((s): s is string => Boolean(s))))
export const ALL_TOPICS   = Array.from(new Set(ALL_SERMONS.flatMap(s => s.topic ?? [])))
