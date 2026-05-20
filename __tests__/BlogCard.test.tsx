import { render, screen } from '@testing-library/react'
import BlogCard from '@/components/BlogCard'
import type { BlogPost } from '@/types/blog'

const post: BlogPost = {
  id: '1',
  slug: 'test-post',
  title: 'Walking in Dominion Authority',
  excerpt: 'God did not save you to survive, He saved you to reign.',
  category: 'teachings',
  author: { name: 'Pastor Joshua', role: 'Senior Pastor' },
  publishedAt: '2026-05-10',
  readTime: 7,
  featured: true,
}

const regularPost: BlogPost = {
  id: '2',
  slug: 'purpose-before-platform',
  title: 'Purpose Before Platform',
  excerpt: 'Every great leader has a hidden season.',
  category: 'leadership',
  author: { name: 'Pastor Joshua' },
  publishedAt: '2026-05-03',
  readTime: 5,
}

describe('BlogCard', () => {
  it('renders the post title', () => {
    render(<BlogCard post={post} />)
    expect(screen.getByText('Walking in Dominion Authority')).toBeInTheDocument()
  })

  it('renders the excerpt', () => {
    render(<BlogCard post={post} />)
    expect(screen.getByText(/God did not save you to survive/i)).toBeInTheDocument()
  })

  it('renders the category badge with correct label', () => {
    render(<BlogCard post={post} />)
    expect(screen.getByText('Teachings')).toBeInTheDocument()
  })

  it('renders Leadership & Purpose badge for leadership category', () => {
    render(<BlogCard post={regularPost} />)
    expect(screen.getByText('Leadership & Purpose')).toBeInTheDocument()
  })

  it('renders the author name', () => {
    render(<BlogCard post={post} />)
    expect(screen.getByText('Pastor Joshua')).toBeInTheDocument()
  })

  it('renders the formatted publish date', () => {
    render(<BlogCard post={post} />)
    expect(screen.getByText(/May.*2026/i)).toBeInTheDocument()
  })

  it('renders the read time', () => {
    render(<BlogCard post={post} />)
    expect(screen.getByText(/7 min read/i)).toBeInTheDocument()
  })

  it('renders Read More link pointing to the correct slug', () => {
    render(<BlogCard post={post} />)
    const link = screen.getByRole('link', { name: /read more/i })
    expect(link).toHaveAttribute('href', '/blog/test-post')
  })
})
