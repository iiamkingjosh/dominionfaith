import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'
import ContactForm from '@/components/forms/contact-form'
import ChurchInfo from '@/components/sections/church-info'
import FaqAccordion from '@/components/ui/faq-accordion'

export const metadata: Metadata = {
  title: 'Contact Us — Dominion Faith International Ministry',
  description:
    'Reach out to Dominion Faith International Ministry. Send a message, request prayer, or find our location in Lagos, Nigeria.',
}

export default function ContactPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)' }}
    >
      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #2A2FAA 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F9A916 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
            We&apos;d Love to Hear from You
          </p>
          <h1
            className="mb-5 font-black leading-tight tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            Get In{' '}
            <span style={{ color: '#F9A916' }}>Touch</span>
          </h1>
          <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-white/50">
            Whether you have a question, a prayer request, or just want to connect —
            our team is here for you.
          </p>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">

          {/* Form card */}
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: 'rgba(12,12,40,0.7)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 0 0 5px rgba(8,8,28,0.7), 0 0 0 6px rgba(255,255,255,0.04)',
            }}
          >
            <h2 className="mb-1 text-xl font-black text-white">Send a Message</h2>
            <p className="mb-7 text-[13px] text-white/45">
              Fill in the form below and we&apos;ll get back to you as soon as possible.
            </p>
            <ContactForm />
          </div>

          {/* Sticky info panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ChurchInfo />
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">Find Us</p>
            <h2 className="text-xl font-black text-white">Our Location</h2>
          </div>
          <a
            href="https://maps.app.goo.gl/SjQqahPJix5dge9J8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-2xl px-5 py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-85"
            style={{ background: '#2A2FAA' }}
          >
            <MapPin size={14} />
            Get Directions
          </a>
        </div>

        <div
          className="overflow-hidden rounded-3xl"
          style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
        >
          <iframe
            title="Dominion Faith International Ministry — Lagos location"
            src="https://maps.google.com/maps?q=1+Dominion+Avenue+Onireke+Ojo+Lagos+Nigeria&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="420"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Google Map showing Dominion Faith International Ministry"
          />
        </div>

        {/* Landmark note */}
        <p className="mt-3 flex items-center gap-2 text-[12px] text-white/35">
          <MapPin size={12} aria-hidden="true" />
          1 Dominion Avenue, Onireke, Opposite Ojo Barrack, Lagos, Nigeria
        </p>
      </section>

      {/* ── FAQ ── */}
      <section
        className="w-full py-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="mx-auto max-w-3xl px-6 md:px-16">
          <div className="mb-10 text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">FAQ</p>
            <h2
              className="font-black text-white"
              style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
            >
              Common Questions
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </section>
    </main>
  )
}
