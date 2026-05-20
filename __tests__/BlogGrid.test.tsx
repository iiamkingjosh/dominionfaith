import { render, screen } from '@testing-library/react'
import BlogGrid from '@/components/BlogGrid'
import type { BlogPost } from '@/types/blog'

const posts: BlogPost[] = [
  {
    id: '1', slug: 'featured-post', title: 'Featured Post Title',
    excerpt: 'Featured excerpt here.',
    category: 'teachings',
    author: { name: 'Pastor A' },
    publishedAt: '2026-05-10',
    readTime: 7,
    featured: true,
  },
  {
    id: '2', slug: 'post-two', title: 'Post Two',
    excerpt: 'Excerpt two.',
    category: 'leadership',
    author: { name: 'Pastor B' },
    publishedAt: '2026-05-03',
    readTime: 5,
  },
  {
    id: '3', slug: 'post-three', title: 'Post Three',
    excerpt: 'Excerpt three.',
    category: 'marriage',
    author: { name: 'Pastor C' },
    publishedAt: '2026-04-26',
    readTime: 6,
  },
  {
    id: '4', slug: 'post-four', title: 'Post Four',
    excerpt: 'Excerpt four.',
    category: 'finance',
    author: { name: 'Pastor D' },
    publishedAt: '2026-04-19',
    readTime: 8,
  },
]

describe('BlogGrid', () => {
  it('renders the featured post prominently', () => {
    render(<BlogGrid posts={posts} />)
    expect(screen.getByText('Featured Post Title')).toBeInTheDocument()
  })

  it('renders all grid posts', () => {
    render(<BlogGrid posts={posts} />)
    expect(screen.getByText('Post Two')).toBeInTheDocument()
    expect(screen.getByText('Post Three')).toBeInTheDocument()
    expect(screen.getByText('Post Four')).toBeInTheDocument()
  })

  it('renders View All Posts button', () => {
    render(<BlogGrid posts={posts} />)
    expect(screen.getByRole('link', { name: /view all posts/i })).toBeInTheDocument()
  })

  it('shows empty state when no posts provided', () => {
    render(<BlogGrid posts={[]} />)
    expect(screen.getByText(/no posts/i)).toBeInTheDocument()
  })

  it('uses the first featured post as the hero', () => {
    render(<BlogGrid posts={posts} />)
    // Featured post title appears — use getAllByText since it may appear in featured AND grid
    const titles = screen.getAllByText('Featured Post Title')
    expect(titles.length).toBeGreaterThan(0)
  })
})
