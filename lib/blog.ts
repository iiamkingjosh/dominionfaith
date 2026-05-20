import type { BlogPost } from '@/types/blog'

const PASTOR: BlogPost['author'] = {
  name: 'Pastor Joshua',
  role: 'Senior Pastor, Dominion Faith',
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'walking-in-dominion-authority',
    title: 'Walking in Dominion Authority: What It Really Means to Rule Your World',
    excerpt:
      'God did not save you to survive — He saved you to reign. Dominion is not arrogance; it is the rightful inheritance of every blood-washed believer. Here is how to walk in it.',
    category: 'teachings',
    author: PASTOR,
    publishedAt: '2026-05-10',
    readTime: 7,
    featured: true,
  },
  {
    id: '2',
    slug: 'purpose-before-platform',
    title: 'Purpose Before Platform: Why God Prepares You in Private Before Promoting You in Public',
    excerpt:
      'Every great leader has a hidden season. David had the wilderness. Joseph had the prison. Your waiting room is not a waste — it is your training ground.',
    category: 'leadership',
    author: PASTOR,
    publishedAt: '2026-05-03',
    readTime: 5,
  },
  {
    id: '3',
    slug: 'covenant-marriage',
    title: "Covenant, Not Contract: Rebuilding Your Marriage on God's Terms",
    excerpt:
      'The world treats marriage like a business contract — convenient until it is not. But God designed it as a covenant. One that holds even when feelings run cold.',
    category: 'marriage',
    author: PASTOR,
    publishedAt: '2026-04-26',
    readTime: 6,
  },
  {
    id: '4',
    slug: 'kingdom-economics',
    title: 'Kingdom Economics: Why the Principles of Sowing and Reaping Still Work',
    excerpt:
      'Financial freedom begins with a single decision — to align your money with Kingdom principles. The harvest you desire is waiting on the seed you refuse to sow.',
    category: 'finance',
    author: PASTOR,
    publishedAt: '2026-04-19',
    readTime: 8,
  },
  {
    id: '5',
    slug: 'raising-champions-at-home',
    title: 'Raising Champions at Home: A Parent\'s Guide to Spiritual Parenting',
    excerpt:
      'Your home is the first church your children will ever attend. The sermons you preach with your life will outlast any Sunday message.',
    category: 'marriage',
    author: PASTOR,
    publishedAt: '2026-04-12',
    readTime: 5,
  },
  {
    id: '6',
    slug: 'faith-that-works',
    title: 'Faith That Works: Moving Beyond Positive Thinking Into Supernatural Results',
    excerpt:
      'Biblical faith is not optimism repackaged. It is a spiritual force that accesses heaven\'s resources and rewrites earthly circumstances.',
    category: 'teachings',
    author: PASTOR,
    publishedAt: '2026-04-05',
    readTime: 6,
  },
  {
    id: '7',
    slug: 'debt-free-by-design',
    title: 'Debt-Free by Design: Practical Steps to Financial Dominion in 2026',
    excerpt:
      'Debt is not your destiny. With the right strategy and the right spirit, you can systematically dismantle every financial chain this year.',
    category: 'finance',
    author: PASTOR,
    publishedAt: '2026-03-29',
    readTime: 9,
  },
]
