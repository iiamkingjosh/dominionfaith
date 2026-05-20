import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AudioProviderWrapper from '@/components/audio/audio-provider-wrapper'

export const metadata: Metadata = {
  title: 'Dominion Faith International Ministry',
  description: 'Welcome to Dominion Faith International Ministry',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 pb-[76px] text-white">
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
