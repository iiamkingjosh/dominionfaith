import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, ArrowLeft, Calendar } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog'
import { BLOG_CATEGORY_CONFIG } from '@/types/blog'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = BLOG_POSTS.find(p => p.slug === params.slug)
  if (!post) return { title: 'Post Not Found — Dominion Faith' }
  return {
    title: `${post.title} — Dominion Faith Blog`,
    description: post.excerpt,
  }
}

function fmtDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function BlogPostPage({ params }: PageProps) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug)
  if (!post) notFound()

  const cfg = BLOG_CATEGORY_CONFIG[post.category]
  const related = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3)

  return (
    <main
      className="min-h-screen px-6 py-32 md:px-16 lg:px-24"
      style={{ background: 'var(--hero-bg)' }}
    >
      <div className="mx-auto max-w-3xl">

        {/* ── Back link ── */}
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Blog
        </Link>

        {/* ── Category badge ── */}
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
          style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
        >
          {cfg.label}
        </span>

        {/* ── Title ── */}
        <h1
          className="mb-6 font-black text-white leading-tight tracking-[-0.02em]"
          style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
        >
          {post.title}
        </h1>

        {/* ── Meta row ── */}
        <div className="mb-10 flex flex-wrap items-center gap-4 border-b border-white/10 pb-8">
          {/* Author */}
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, rgba(42,47,170,0.7) 0%, rgba(168,85,247,0.6) 100%)' }}
              aria-hidden="true"
            >
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{post.author.name}</p>
              {post.author.role && (
                <p className="text-[11px] text-white/40">{post.author.role}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-[12px] text-white/40">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {fmtDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readTime} min read
            </span>
          </div>
        </div>

        {/* ── Article content ── */}
        <article className="prose-church">
          {post.content && post.content.length > 0 ? (
            post.content.map((paragraph, i) => (
              <p
                key={i}
                className="mb-6 text-base leading-[1.85] text-white/75"
                style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-white/60 italic">Full article coming soon.</p>
          )}
        </article>

        {/* ── Share section ── */}
        <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-8">
          <span className="text-sm text-white/40">Share this article:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://dominionfaith.org/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:text-white"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            Twitter / X
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.title + ' — https://dominionfaith.org/blog/' + post.slug)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:text-white"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            WhatsApp
          </a>
        </div>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-white">More in {cfg.label}</h2>
            <div className="space-y-4">
              {related.map(rp => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-white/5"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white/85 text-sm leading-snug line-clamp-2">{rp.title}</p>
                    <p className="mt-1 text-[11px] text-white/40">{fmtDate(rp.publishedAt)} · {rp.readTime} min read</p>
                  </div>
                  <span className="flex-shrink-0 text-sm text-white/30">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
