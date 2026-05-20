'use client'

import Link from 'next/link'
import Image from 'next/image'
import { WifiOff } from 'lucide-react'

export default function OfflinePage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center"
      style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)' }}
    >
      {/* Logo */}
      <Link href="/" aria-label="Dominion Faith home">
        <Image
          src="/logo.png"
          alt="Dominion Faith International Ministry"
          width={64}
          height={64}
          className="rounded-full object-contain"
          priority
        />
      </Link>

      {/* Icon */}
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ background: 'rgba(42,47,170,0.12)', border: '1px solid rgba(42,47,170,0.3)' }}
      >
        <WifiOff size={32} style={{ color: '#6670d0' }} />
      </div>

      {/* Message */}
      <div className="max-w-sm">
        <h1 className="mb-3 text-2xl font-black text-white">You&apos;re Offline</h1>
        <p className="text-[14px] leading-relaxed text-white/50">
          It looks like you&apos;ve lost your connection. Check your internet and try again —
          or come back when you&apos;re connected to access our sermons, events, and more.
        </p>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="rounded-2xl px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85"
        style={{ background: '#2A2FAA' }}
      >
        Try Again
      </button>

      <p className="text-[12px] text-white/25">
        &ldquo;I can do all things through Christ who strengthens me.&rdquo; — Phil 4:13
      </p>
    </main>
  )
}
