'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import BlogCard from './BlogCard'
import type { BlogPost } from '@/types/blog'

interface BlogGridProps {
  posts: BlogPost[]
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const MotionDiv = motion.div

export default function BlogGrid({ posts }: BlogGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-white/40">
        No posts available yet. Check back soon.
      </p>
    )
  }

  const featured = posts.find(p => p.featured) ?? posts[0]
  const grid     = posts.filter(p => p.id !== featured.id)

  return (
    <div ref={ref}>
      {/* ── Featured post (full width) ── */}
      <div className="mb-10">
        <BlogCard post={featured} featured index={0} />
      </div>

      {/* ── Grid ── */}
      {grid.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i + 1} />
          ))}
        </div>
      )}

      {/* ── View All Posts ── */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/blog"
          className="rounded-full px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          View All Posts →
        </Link>
      </div>
    </div>
  )
}
