'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Clock } from 'lucide-react'
import type { BlogPost } from '@/types/blog'
import { BLOG_CATEGORY_CONFIG } from '@/types/blog'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  index?: number
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const MotionDiv = motion.div

function fmtDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

function AuthorAvatar({ author }: { author: BlogPost['author'] }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{
          background: 'linear-gradient(135deg, rgba(42,47,170,0.6) 0%, rgba(168,85,247,0.5) 100%)',
        }}
        aria-hidden="true"
      >
        {author.photo ? (
          <img src={author.photo} alt={author.name} className="h-full w-full rounded-full object-cover" />
        ) : (
          author.name.charAt(0)
        )}
      </div>
      <span className="text-[12px] font-semibold text-white/70">{author.name}</span>
    </div>
  )
}

export default function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
  const cfg = BLOG_CATEGORY_CONFIG[post.category]

  return (
    <MotionDiv
      className="card-double-bezel group flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
    >
      {/* ── Image / gradient header ── */}
      <div
        className="relative overflow-hidden"
        style={{ minHeight: featured ? '260px' : '180px' }}
      >
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[250ms] ease-[var(--ease-in-out)] group-hover:scale-110"
          />
        ) : (
          /* Gradient placeholder — unique per category */
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${cfg.bg.replace('0.14', '0.4')} 0%, rgba(12,12,40,0.95) 100%)` }}
          />
        )}

        {/* Gradient overlay — always present so text is readable */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(7,7,31,0.92) 0%, rgba(7,7,31,0.3) 60%, transparent 100%)' }}
        />

        {/* Slide-up metadata overlay on hover — only shown when featured prop is true */}
        {featured && (
          <div className="absolute inset-x-0 bottom-0 translate-y-1 p-4 opacity-0 transition-all duration-[250ms] ease-[var(--ease-in-out)] group-hover:translate-y-0 group-hover:opacity-100">
            <p className="line-clamp-2 text-[13px] leading-relaxed text-white/85">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* Category badge — always visible */}
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
          style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
        >
          {cfg.label}
        </span>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3
          className="font-bold leading-snug text-white"
          style={{ fontSize: featured ? 'clamp(16px, 1.8vw, 22px)' : '15px' }}
        >
          {post.title}
        </h3>

        {/* Always render excerpt (hidden visually on featured via hover overlay above) */}
        <p className="line-clamp-2 text-[13px] leading-relaxed text-white/50">
          {post.excerpt}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
          <AuthorAvatar author={post.author} />

          <div className="flex items-center gap-3 text-[11px] text-white/40">
            <span>{fmtDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {post.readTime} min read
            </span>
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
          style={{ color: cfg.color }}
        >
          Read More
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </MotionDiv>
  )
}
