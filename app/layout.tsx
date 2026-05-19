import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Dominion Faith International Ministry',
  description: 'Welcome to Dominion Faith International Ministry',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <Nav />
        {children}
      </body>
    </html>
  )
}
