'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const MotionDiv = motion.div

interface FaqItem {
  q: string
  a: string
  link?: { label: string; href: string }
}

const FAQ: FaqItem[] = [
  {
    q: 'What should I expect on my first visit?',
    a: 'You can expect a warm, welcoming atmosphere with Spirit-filled worship and a practical, Word-based message. Services are typically 2–2.5 hours long. Dress is smart-casual — come as you are, but come ready to encounter God. Our Ushering team will be on hand to help you find your seat and answer any questions.',
    link: { label: 'Plan Your Visit', href: '/locations' },
  },
  {
    q: 'What time are services?',
    a: 'Our Sunday services run at 9:00 AM and 11:00 AM at the Headquarters, 1 Dominion Avenue, Onireke, Lagos. Midweek Bible Study holds every Wednesday at 6:00 PM, and Prayer Meeting is every Friday at 6:00 AM. Check the Events page for special programmes.',
    link: { label: 'View Events', href: '/events' },
  },
  {
    q: 'Is childcare available?',
    a: 'Yes! Our Children\'s Department runs a full, age-appropriate programme for children aged 2–12 during all Sunday services. Teens Ministry (ages 13–17) also meets concurrently. Your children will be in a safe, Spirit-filled environment while you enjoy the main service.',
    link: { label: 'Children & Teens Ministry', href: '/ministries' },
  },
  {
    q: 'How do I join a ministry?',
    a: 'Start by attending a service and filling out a connection card. Our pastoral team will reach out personally to help you find the right fit. You can also visit the Ministries page to explore all departments and contact a ministry leader directly.',
    link: { label: 'Explore Ministries', href: '/ministries' },
  },
  {
    q: 'How do I give online?',
    a: 'We accept secure online giving via Paystack. Visit the Give page to make a one-time offering or set up a recurring monthly partnership. You can give your Tithe, Offering, Kingdom Seed, or Honor Seed all in one place.',
    link: { label: 'Give Now', href: '/give' },
  },
  {
    q: 'How can I request prayer?',
    a: 'You can submit a prayer request through the contact form on this page (select "Prayer Request" as the subject). Our Prayer Department intercedes faithfully for every request received. You may also join our Friday 6 AM Prayer Meeting in person.',
    link: { label: 'Submit a Prayer Request', href: '#contact-form' },
  },
]

function AccordionItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="overflow-hidden rounded-2xl transition-colors"
      style={{
        background: open ? 'rgba(42,47,170,0.06)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${open ? 'rgba(42,47,170,0.25)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
        aria-controls={`faq-${index}`}
      >
        <span className="text-[15px] font-semibold text-white leading-snug">{item.q}</span>
        <ChevronDown
          size={18}
          className={`mt-0.5 flex-shrink-0 text-white/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <MotionDiv
            id={`faq-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="text-[14px] leading-relaxed text-white/60">{item.a}</p>
              {item.link && (
                <Link
                  href={item.link.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity hover:opacity-75"
                  style={{ color: '#2A2FAA' }}
                >
                  {item.link.label} →
                </Link>
              )}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqAccordion() {
  return (
    <div className="space-y-3">
      {FAQ.map((item, i) => (
        <AccordionItem key={i} item={item} index={i} />
      ))}
    </div>
  )
}
