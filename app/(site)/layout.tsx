import Script from 'next/script'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AudioProviderWrapper from '@/components/audio/audio-provider-wrapper'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 pb-[76px] font-sans text-white antialiased">
      <AudioProviderWrapper>
        <Nav />
        {children}
        <Footer />
      </AudioProviderWrapper>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
    </div>
  )
}
