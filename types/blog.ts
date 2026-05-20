export type BlogCategory =
  | 'teachings'
  | 'leadership'
  | 'marriage'
  | 'finance'

export interface BlogAuthor {
  name: string
  photo?: string    // URL or /public path
  role?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  author: BlogAuthor
  publishedAt: string   // ISO "YYYY-MM-DD"
  readTime: number      // minutes
  image?: string        // URL or /public path
  featured?: boolean    // shown in the large featured slot
}

export interface CategoryConfig {
  label: string
  color: string
  bg: string
  border: string
}

export const BLOG_CATEGORY_CONFIG: Record<BlogCategory, CategoryConfig> = {
  teachings: {
    label: 'Teachings',
    color: 'var(--blog-teachings)',
    bg: 'rgba(42,47,170,0.14)',
    border: 'rgba(42,47,170,0.35)',
  },
  leadership: {
    label: 'Leadership & Purpose',
    color: 'var(--blog-leadership)',
    bg: 'rgba(249,169,22,0.14)',
    border: 'rgba(249,169,22,0.35)',
  },
  marriage: {
    label: 'Marriage & Family',
    color: 'var(--blog-marriage)',
    bg: 'rgba(16,185,129,0.14)',
    border: 'rgba(16,185,129,0.35)',
  },
  finance: {
    label: 'Finance',
    color: 'var(--blog-finance)',
    bg: 'rgba(255,255,255,0.07)',
    border: 'rgba(255,255,255,0.15)',
  },
}
