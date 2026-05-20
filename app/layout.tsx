import { type Metadata, type Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AudioProviderWrapper from '@/components/audio/audio-provider-wrapper'

// ── Font ────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

// ── Viewport (themeColor must live here in Next.js 14.2+) ───────
export const viewport: Viewport = {
  themeColor: '#2A2FAA',
}

// ── Metadata ────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Dominion Faith International Ministry',
  description: 'A Place Where Champions Are Made — Word-based, Spirit-led, Faith-driven. Dominion Faith International Ministry, Lagos, Nigeria.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Dominion Faith',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://dominionfaith.com',
    siteName: 'Dominion Faith International Ministry',
    title: 'Dominion Faith International Ministry',
    description: 'A Place Where Champions Are Made',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dominion Faith International Ministry',
    description: 'A Place Where Champions Are Made',
  },
}

// ── Layout ──────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-950 pb-[76px] font-sans text-white antialiased">
        <AudioProviderWrapper>
          <Nav />
          {children}
          <Footer />
        </AudioProviderWrapper>
        <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
