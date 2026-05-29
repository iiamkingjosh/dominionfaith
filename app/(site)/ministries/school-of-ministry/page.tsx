import type { Metadata } from 'next'
import HeroSection     from '@/components/sections/som/hero-section'
import CoursesGrid     from '@/components/sections/som/courses-grid'
import ScheduleSection from '@/components/sections/som/schedule-section'
import EnrollmentForm  from '@/components/forms/enrollment-form'

export const metadata: Metadata = {
  title:       'School of Ministry | Dominion Faith International Ministry',
  description: 'Enroll in our School of Ministry. Courses in Ministry, Spiritual Leadership, Spiritual Warfare, Word Foundation, and more. Online & In-Person. New intake every June.',
  keywords:    ['church school', 'ministry training', 'spiritual leadership', 'Lagos church'],
}

export default function SchoolOfMinistryPage() {
  return (
    <main>
      <HeroSection />
      <CoursesGrid />
      <ScheduleSection />

      <section
        id="enroll"
        className="w-full py-24"
        style={{ background: 'linear-gradient(160deg, #0f0f12 0%, #07071f 100%)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
              Get Started
            </p>
            <h2
              className="mb-4 font-black leading-tight tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              Apply for <span style={{ color: '#F9A916' }}>Enrollment</span>
            </h2>
            <p className="mx-auto max-w-lg text-[14px] leading-relaxed text-white/45">
              Fill in your details below. Our team will review your application and reach out within 48 hours.
            </p>
          </div>
          <EnrollmentForm />
        </div>
      </section>
    </main>
  )
}
