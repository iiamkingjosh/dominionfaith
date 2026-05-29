import { type Metadata, type Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#2A2FAA',
}

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
