'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { BookOpen, Wind, Zap } from 'lucide-react'
import PillarCard from '@/components/ui/pillar-card'

// ── Stable motion references ────────────────────────────────────
const MotionDiv = motion.div
const MotionH1 = motion.h1
const MotionP = motion.p

// ── Data ────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: <BookOpen size={24} />,
    title: 'The Word',
    description:
      'Rooted in Scripture, every message and ministry flows from the uncompromising Word of God — our final authority and the source of all true dominion.',
    accentColor: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    borderColor: 'rgba(59,130,246,0.18)',
    iconBgColor: 'rgba(59,130,246,0.14)',
  },
  {
    icon: <Wind size={24} />,
    title: 'The Spirit',
    description:
      'We welcome the full ministry of the Holy Spirit. Every believer is invited to live and minister in the supernatural dimension of the Spirit of God.',
    accentColor: '#ef4444',
    bgColor: 'rgba(239,68,68,0.06)',
    borderColor: 'rgba(239,68,68,0.18)',
    iconBgColor: 'rgba(239,68,68,0.14)',
  },
  {
    icon: <Zap size={24} />,
    title: 'Faith in Action',
    description:
      'Faith is not passive — it is a force. We equip members to apply Kingdom principles in business, family, health, and community life.',
    accentColor: '#f97316',
    bgColor: 'rgba(249,115,22,0.06)',
    borderColor: 'rgba(249,115,22,0.18)',
    iconBgColor: 'rgba(249,115,22,0.14)',
  },
]

const VISIONS = [
  { num: '01', text: 'To raise people who shall exercise Dominion.', ref: 'Gen 1:26' },
  { num: '02', text: 'To raise sons that will express His image.', ref: 'Romans 8:29, Gal 4:4–7' },
  { num: '03', text: 'To raise peculiar people who shall show the light.', ref: '1 Pet 2:9–10' },
  { num: '04', text: 'To be a Word-based church.', ref: 'Psalm 119:9' },
  { num: '05', text: 'To be a church aggressive for souls.', ref: 'Mark 16:15, John 15:7–9' },
  { num: '06', text: 'To be a church that practises true love.', ref: 'Romans 5:5, 1 Cor 13:13' },
  { num: '07', text: 'To be a church that cares for the needy.', ref: 'Matt 25:34–40' },
  { num: '08', text: 'To embark on Christian Education from Nursery to University.', ref: 'Daniel 1:3–6' },
  { num: '09', text: 'To be a church that cares for youths and children.', ref: 'Proverbs 22:6' },
  { num: '10', text: 'To influence our community and nation through development projects.', ref: '' },
  { num: '11', text: 'To play a major role in the unification of the saints.', ref: 'John 17:11, Psalm 133:1–3' },
  { num: '12', text: 'To prepare members for the second coming of our Lord Jesus Christ.', ref: '1 Thess 5:1–11' },
]

const CARDINAL = [
  'Must Be Born Again',
  'Must Belong To A House Care Fellowship',
  'Must Believe In The Vision Of DFIM',
  'Must Pay His Kingdom Seed Regularly',
  'Must Attend Services Regularly',
  'Must Obey The Authority Of The Church',
]

// ── Scroll-reveal wrapper ────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionDiv>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
      {children}
    </span>
  )
}

// ── Component ────────────────────────────────────────────────────

export default function VisionSection() {
  return (
    <main>
      {/* ── 1. HERO ── */}
      <section
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
        aria-label="About Dominion Faith International Ministry"
        style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 45%, #0d1240 100%)' }}
      >
        {/* Animated gradient orbs */}
        <MotionDiv
          animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.26, 0.18] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-48 -top-48 h-[700px] w-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 68%)' }}
          aria-hidden="true"
        />
        <MotionDiv
          animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="pointer-events-none absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 68%)' }}
          aria-hidden="true"
        />
        <MotionDiv
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 68%)' }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-16">
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-block rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            About Us
          </MotionDiv>

          <MotionH1
            initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 font-black leading-tight tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
          >
            A Place Where{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Champions
            </span>{' '}
            Are Made
          </MotionH1>

          <MotionP
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-base text-white/50 md:text-lg"
          >
            Word-based&nbsp;&nbsp;·&nbsp;&nbsp;Spirit-led&nbsp;&nbsp;·&nbsp;&nbsp;Faith-driven
          </MotionP>
        </div>

        {/* Scroll cue */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
          aria-hidden="true"
        >
          <MotionDiv
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-7 w-px bg-white/25"
          />
        </MotionDiv>
      </section>

      {/* ── 2. ORIGIN STORY ── */}
      <section
        className="w-full py-24 md:py-32"
        style={{ background: 'linear-gradient(180deg, #0d1240 0%, #07071f 100%)' }}
      >
        <div className="mx-auto max-w-5xl px-6 md:px-16">
          <FadeUp className="mb-3">
            <SectionLabel>Our Story</SectionLabel>
          </FadeUp>

          <FadeUp delay={0.06} className="mb-12">
            <h2
              className="font-black tracking-tight text-white"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
            >
              Born of a Vision,{' '}
              <span className="text-white/40">Built by God</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-[220px_1fr]">
            {/* Year badge */}
            <FadeUp delay={0.1}>
              <div
                className="flex flex-col items-start gap-1 rounded-2xl p-7"
                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                  Founded
                </span>
                <span
                  className="font-black leading-none text-white/20"
                  style={{ fontSize: '52px' }}
                  aria-hidden="true"
                >
                  2006
                </span>
              </div>
            </FadeUp>

            {/* Story body */}
            <div className="space-y-6 text-[15px] leading-[1.85] text-white/65">
              <FadeUp delay={0.14}>
                <p>
                  Dominion Faith International Ministry was born of the vision which the Lord gave to His servant{' '}
                  <strong className="text-white/90">Dr. Paul C. Igwe</strong>. This came as a result of his nine
                  years of successful missionary work in Asia — China precisely — and was officially commissioned
                  on the <strong className="text-white/90">22nd of April 2006</strong>.
                </p>
              </FadeUp>

              <FadeUp delay={0.18}>
                <p>
                  As God directed him, the ministry began in a flat apartment at No. 8 Alhaji Yusuf Adebayo Street,
                  Olodi Apapa, Lagos. From that one flat and a few faithful brethren, it grew like a wildfire —
                  moving to a warehouse, then to a large expanse of land where the present International Headquarters
                  was built in less than four months.
                </p>
              </FadeUp>

              <FadeUp delay={0.22}>
                <blockquote
                  className="rounded-xl py-5 pl-6 italic text-white/80"
                  style={{ borderLeft: '3px solid #6366f1', background: 'rgba(99,102,241,0.06)' }}
                >
                  <p>
                    "Let us make man in our image, after our likeness; and let them have dominion over the fish of
                    the sea, over the bird of the air, over every creeping thing that creepeth on the earth."
                  </p>
                  <cite className="mt-2 block text-[12px] not-italic text-white/40">— Genesis 1:26</cite>
                </blockquote>
              </FadeUp>

              <FadeUp delay={0.26}>
                <p>
                  The Lord was very clear in His directives. He gave His servant two powerful scriptures —
                  Genesis 1:26 and 1 John 5:4 — which form the focal point of DFIM. By the leading of the Holy
                  Spirit, the mandate was defined: raise sons who will rule and dominate by the teaching of the
                  Word of Faith.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <p>
                  We are optimistic that the God of Dominion is building a formidable Church. Because He is in
                  charge, there is no doubt that the future of this ministry is promising and glorious.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THREE PILLARS ── */}
      <section
        className="w-full py-24 md:py-32"
        style={{ background: '#07071f' }}
      >
        <div className="mx-auto max-w-6xl px-6 md:px-16">
          <FadeUp className="mb-3 text-center">
            <SectionLabel>Our Foundation</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.06} className="mb-14 text-center">
            <h2
              className="font-black tracking-tight text-white"
              style={{ fontSize: 'clamp(26px, 4vw, 48px)' }}
            >
              Three Pillars of{' '}
              <span className="text-white/40">Ministry</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.title} {...pillar} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TWELVE VISIONS ── */}
      <section
        className="w-full py-24 md:py-32"
        style={{ background: 'linear-gradient(180deg, #07071f 0%, #0d1240 100%)' }}
      >
        <div className="mx-auto max-w-6xl px-6 md:px-16">
          <FadeUp className="mb-3 text-center">
            <SectionLabel>Twelve Visions of DFIM</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.06} className="mb-14 text-center">
            <h2
              className="font-black tracking-tight text-white"
              style={{ fontSize: 'clamp(26px, 4vw, 48px)' }}
            >
              What We Are{' '}
              <span className="text-white/40">Building</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {VISIONS.map((v, i) => (
              <FadeUp key={v.num} delay={(i % 6) * 0.06}>
                <div
                  className="flex gap-5 rounded-2xl p-6 transition-colors hover:bg-white/[0.03]"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span
                    className="flex-shrink-0 select-none font-black leading-none text-white/10"
                    style={{ fontSize: 'clamp(34px, 3vw, 48px)' }}
                    aria-hidden="true"
                  >
                    {v.num}
                  </span>
                  <div className="pt-1">
                    <p className="text-[14px] font-semibold leading-snug text-white/80">{v.text}</p>
                    {v.ref && (
                      <p className="mt-2 text-[11px] italic text-white/35">{v.ref}</p>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CARDINAL POINTS ── */}
      <section
        className="w-full py-24 md:py-32"
        style={{
          background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 45%, #0d1240 100%)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center md:px-16">
          <FadeUp className="mb-3">
            <SectionLabel>Every Member</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.06} className="mb-14">
            <h2
              className="font-black tracking-tight text-white"
              style={{ fontSize: 'clamp(26px, 4vw, 48px)' }}
            >
              Cardinal Points of{' '}
              <span className="text-white/40">Membership</span>
            </h2>
          </FadeUp>

          <div className="space-y-3">
            {CARDINAL.map((point, i) => (
              <FadeUp key={point} delay={i * 0.07}>
                <div
                  className="flex items-center gap-5 rounded-2xl px-6 py-5 text-left"
                  style={{
                    background: 'rgba(99,102,241,0.05)',
                    border: '1px solid rgba(99,102,241,0.15)',
                  }}
                >
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-black"
                    style={{ background: 'rgba(99,102,241,0.18)', color: '#818cf8' }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="font-semibold text-white/80">{point}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
