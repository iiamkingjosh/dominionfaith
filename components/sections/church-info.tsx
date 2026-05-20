import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Link from 'next/link'

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

const SERVICE_TIMES = [
  { day: 'Sunday',    times: '9:00 AM & 11:00 AM'  },
  { day: 'Wednesday', times: '6:00 PM — Bible Study' },
  { day: 'Friday',    times: '6:00 AM — Prayer'     },
]

const SOCIAL = [
  { label: 'Facebook',  href: 'https://www.facebook.com/share/1QQ7LvDf26/?mibextid=wwXIfr',                      icon: FacebookIcon  },
  { label: 'Instagram', href: 'https://www.instagram.com/dominionfaithministry?igsh=MWJ6OTAxOHBwdjc4dQ==',        icon: InstagramIcon },
  { label: 'YouTube',   href: 'https://youtube.com/@dominionfaithhq?si=uHIIcB2ptYFCzT5R',                         icon: YouTubeIcon   },
]

export default function ChurchInfo() {
  return (
    <aside className="space-y-6">

      {/* Contact details */}
      <div
        className="rounded-2xl p-6 space-y-5"
        style={{ background: 'rgba(12,12,40,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <h2 className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/40">Church Info</h2>

        <a
          href="https://maps.app.goo.gl/SjQqahPJix5dge9J8"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 text-[14px] text-white/65 transition-colors hover:text-white group"
        >
          <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#2A2FAA]" aria-hidden="true" />
          <span>1 Dominion Avenue, Onireke,<br />Opposite Ojo Barrack,<br />Lagos, Nigeria</span>
        </a>

        <a
          href="tel:+2347034543971"
          className="flex items-center gap-3 text-[14px] text-white/65 transition-colors hover:text-white"
        >
          <Phone size={16} className="flex-shrink-0 text-[#2A2FAA]" aria-hidden="true" />
          +234 703 454 3971
        </a>

        <a
          href="mailto:info@dominionfaith.com"
          className="flex items-center gap-3 text-[14px] text-white/65 transition-colors hover:text-white"
        >
          <Mail size={16} className="flex-shrink-0 text-[#2A2FAA]" aria-hidden="true" />
          info@dominionfaith.com
        </a>
      </div>

      {/* Service times */}
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(12,12,40,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="mb-4 flex items-center gap-2">
          <Clock size={15} className="text-[#2A2FAA]" aria-hidden="true" />
          <h2 className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/40">Service Times</h2>
        </div>
        <ul className="space-y-3">
          {SERVICE_TIMES.map(s => (
            <li key={s.day} className="flex items-start justify-between gap-3 text-[13px]">
              <span className="font-semibold text-white/80">{s.day}</span>
              <span className="text-right text-white/45">{s.times}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Social */}
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(12,12,40,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.14em] text-white/40">Follow Us</h2>
        <div className="flex gap-3">
          {SOCIAL.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${label}`}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(42,47,170,0.06)', border: '1px solid rgba(42,47,170,0.2)' }}
      >
        <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.14em] text-white/40">Quick Links</h2>
        <ul className="space-y-2">
          {[
            { label: 'Plan Your Visit', href: '/locations' },
            { label: 'Explore Ministries', href: '/ministries' },
            { label: 'Give Online', href: '/give' },
            { label: 'Watch Live', href: '/live' },
          ].map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[13px] font-semibold transition-colors hover:text-white"
                style={{ color: '#6670d0' }}
              >
                {l.label} →
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  )
}
