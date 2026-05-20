import type { Metadata } from 'next'
import BlogGrid from '@/components/BlogGrid'
import { BLOG_POSTS } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — Dominion Faith',
  description:
    'Spirit-filled articles on faith, leadership, marriage, and Kingdom finance from Dominion Faith International Ministry.',
}

export default function BlogPage() {
  return (
    <main
      className="min-h-screen px-6 py-32 md:px-16 lg:px-24"
      style={{ background: 'var(--hero-bg)' }}
    >
      {/* ── Page heading ── */}
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderColor: 'rgba(255,255,255,0.10)',
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: 'var(--color-live)' }}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
            Articles
          </span>
        </div>

        <h1
          className="font-black text-white leading-none tracking-[-0.03em]"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
        >
          Blog
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/45">
          Teachings, insights, and Kingdom wisdom to sharpen your faith and
          ignite your purpose — new articles every week.
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <BlogGrid posts={BLOG_POSTS} />
      </div>
    </main>
  )
}
