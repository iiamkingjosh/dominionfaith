'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ChevronDown } from 'lucide-react'

// ── Social SVG icons ───────────────────────────────────────────

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function TwitterXIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  )
}

// ── Data ───────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: 'Home',      href: '/'          },
  { label: 'About',     href: '/about'     },
  { label: 'Sermons',   href: '/sermons'   },
  { label: 'Events',    href: '/events'    },
  { label: 'Blog',      href: '/blog'      },
  { label: 'Locations', href: '/locations' },
]

const MINISTRY_LINKS = [
  { label: 'Hospital & Prison Ministry', href: '/ministries'        },
  { label: 'Faith Clinic',               href: '/ministries'        },
  { label: 'School of Ministry',         href: '/school-of-ministry'},
  { label: 'Departments',                href: '/departments'       },
  { label: 'House Fellowship',           href: '/house-fellowship'  },
]

const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/dominionfaith',
    icon: FacebookIcon,
    hoverColor: '#1877F2',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/dominionfaith',
    icon: InstagramIcon,
    hoverColor: '#E1306C',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@dominionfaith',
    icon: YouTubeIcon,
    hoverColor: '#FF0000',
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/dominionfaith',
    icon: TwitterXIcon,
    hoverColor: '#ffffff',
  },
]

// ── Motion ────────────────────────────────────────────────────
const MotionA = motion.a

// ── Accordion section (mobile only) ──────────────────────────
function FooterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3 text-sm font-bold text-white md:cursor-default md:pb-4 md:pt-0"
        aria-expanded={open}
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">
          {title}
        </span>
        <ChevronDown
          size={14}
          className={`text-white/40 transition-transform duration-200 md:hidden ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Always visible on desktop, toggleable on mobile */}
      <div className={`${open ? 'block' : 'hidden'} md:block`}>
        {children}
      </div>
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────
export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>('about')
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const toggle = useCallback((section: string) => {
    setOpenSection(prev => (prev === section ? null : section))
  }, [])

  const handleSubscribe = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email.includes('@') || subStatus === 'loading') return
      setSubStatus('loading')
      // TODO: Connect to email service (Mailchimp / Brevo / Sendgrid)
      await new Promise<void>(resolve => setTimeout(resolve, 1200))
      setSubStatus('success')
    },
    [email, subStatus],
  )

  return (
    <footer
      aria-label="Site footer"
      style={{
        background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 45%, #0d1240 100%)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* ── About (no accordion title) ── */}
          <div className="space-y-4">
            <Link href="/" className="inline-block" aria-label="Dominion Faith home">
              <Image
                src="/logo.png"
                alt="Dominion Faith International Ministry"
                width={48}
                height={48}
                className="rounded-full object-contain"
              />
            </Link>

            <p className="text-[13px] leading-relaxed text-white/50">
              DFIM is a place where champions are made by God's word, so come
              and become that champion by His word.
            </p>

            <div className="space-y-2 text-[13px] text-white/50">
              <a
                href="https://maps.app.goo.gl/SjQqahPJix5dge9J8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors hover:text-white"
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                <span>1 Dominion Avenue, Onireke, Opposite Ojo Barrack, Lagos, Nigeria</span>
              </a>
              <a href="tel:+2347034543971" className="flex items-center gap-2 transition-colors hover:text-white">
                <Phone className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                +234 703 454 3971
              </a>
              <a href="mailto:info@dominionfaith.com" className="flex items-center gap-2 transition-colors hover:text-white">
                <Mail className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                info@dominionfaith.com
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <FooterSection title="Quick Links" open={openSection === 'links'} onToggle={() => toggle('links')}>
            <ul className="space-y-1.5">
              {QUICK_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* ── Ministries ── */}
          <FooterSection title="Ministries" open={openSection === 'ministries'} onToggle={() => toggle('ministries')}>
            <ul className="space-y-1.5">
              {MINISTRY_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* ── Connect ── */}
          <FooterSection title="Connect" open={openSection === 'connect'} onToggle={() => toggle('connect')}>
            <div className="space-y-6">
              {/* Newsletter */}
              <div>
                <p className="mb-3 text-[13px] text-white/50">
                  Get weekly teachings and event updates delivered to your inbox.
                </p>
                {subStatus === 'success' ? (
                  <p
                    className="rounded-xl px-4 py-3 text-[13px] font-semibold"
                    style={{
                      background: 'var(--color-success-bg)',
                      color: 'var(--color-success)',
                      border: '1px solid var(--color-success-border)',
                    }}
                  >
                    ✓ You're subscribed! Welcome to the family.
                  </p>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      aria-label="Email address for newsletter"
                      className="input-glass w-full px-4 py-2.5 text-sm"
                    />
                    <button
                      type="submit"
                      disabled={subStatus === 'loading'}
                      className="w-full rounded-xl py-2.5 text-sm font-bold text-white transition-opacity disabled:opacity-60"
                      style={{ background: 'var(--color-primary)' }}
                    >
                      {subStatus === 'loading' ? 'Subscribing…' : 'Subscribe'}
                    </button>
                  </form>
                )}
              </div>

              {/* Social icons */}
              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-white/30">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {SOCIAL.map(({ label, href, icon: Icon, hoverColor }) => (
                    <MotionA
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${label}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white/60"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                      whileHover={{
                        scale: 1.15,
                        rotate: 8,
                        color: hoverColor,
                        backgroundColor: `${hoverColor}22`,
                        borderColor: `${hoverColor}55`,
                      }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Icon />
                    </MotionA>
                  ))}
                </div>
              </div>
            </div>
          </FooterSection>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="border-t px-6 py-5 md:px-16 lg:px-24"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-[11px] text-white/30">
          <p>
            © {new Date().getFullYear()} Dominion Faith International Ministry. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
            <span aria-hidden="true">·</span>
            <span>
              Built by{' '}
              <a
                href="https://chronixtechnology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Chronix Technology Limited
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
