import type { TestimonySlide } from '@/types/testimony'

export const TESTIMONY_SLIDES: TestimonySlide[] = [
  {
    id: 'slide-1',
    featured: {
      id: 'v1',
      name: 'Bro. Kingsley Adeyemi',
      role: 'Member, Lagos HQ',
      videoId: 'dQw4w9WgXcQ', // replace with actual testimony video ID
      quote:
        'I was on dialysis for 3 years. The day Pastor prayed for me at the Annual Convention, God restored my kidneys completely. My doctors called it medically impossible.',
      transformationTag: 'From kidney failure to divine health',
    },
    cards: [
      {
        id: 't1',
        name: 'Sis. Ngozi Okafor',
        role: 'Member, Onitsha District',
        quote:
          'I had three miscarriages and was told I could never carry a baby to term. This church prayed with me through every step. My son Emmanuel is 2 years old today.',
        transformationTag: 'From barrenness to fruitfulness',
      },
      {
        id: 't2',
        name: 'Bro. Emeka Nwosu',
        role: 'Member, Amuwo District',
        quote:
          'I was unemployed for 5 years despite holding two degrees. One week after attending the Business Summit and sowing a Kingdom Seed, I received my dream job offer.',
        transformationTag: 'From stagnation to supernatural promotion',
      },
      {
        id: 't3',
        name: 'Sis. Adaeze Chukwu',
        role: 'Member, Asaba District',
        quote:
          'Seven years in drug addiction — I had tried every rehabilitation programme. A single Friday Dominion Service broke every chain. I have been free for 4 years.',
        transformationTag: 'From bondage to total freedom',
      },
    ],
  },
  {
    id: 'slide-2',
    featured: {
      id: 'v2',
      name: 'Sis. Funmilayo Bello',
      role: 'Member, Lagos HQ',
      videoId: 'dQw4w9WgXcQ', // replace with actual testimony video ID
      quote:
        'I came to this church a broken woman — divorced, broke, and full of shame. God used this family to restore my marriage, my dignity, and my destiny. I am whole again.',
      transformationTag: 'From brokenness to complete wholeness',
    },
    cards: [
      {
        id: 't4',
        name: 'Bro. Chidi Obi',
        role: 'Member, Coconut District',
        quote:
          'My business was on the verge of collapse — ₦8 million in debt. After the Men\'s Summit, God gave me a strategy I implemented in 60 days. Every debt is cleared.',
        transformationTag: 'From debt to financial breakthrough',
      },
      {
        id: 't5',
        name: 'Sis. Chiamaka Eze',
        role: 'Member, Nkwelle District',
        quote:
          'I was diagnosed with stage 3 breast cancer. This church prayed, fasted, and stood with me through chemotherapy. My last scan showed zero cancer cells.',
        transformationTag: 'From a death sentence to divine health',
      },
      {
        id: 't6',
        name: 'Bro. Samuel Akor',
        role: 'Member, Isuochi District',
        quote:
          'I failed my WAEC four times and my family had given up hope. After the Students\' Summit, something shifted in my mind. I passed with eight distinctions.',
        transformationTag: 'From failure to academic excellence',
      },
    ],
  },
]
