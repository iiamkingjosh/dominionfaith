'use client'

import CourseCard from '@/components/ui/course-card'
import { COURSES } from '@/data/courses'

export default function CoursesGrid() {
  return (
    <section
      id="courses"
      className="w-full py-24"
      style={{ background: 'linear-gradient(160deg, #07071f 0%, #0f0f12 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
            What You&apos;ll Study
          </p>
          <h2
            className="mb-4 font-black leading-tight tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            Our <span style={{ color: '#F9A916' }}>Courses</span>
          </h2>
          <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-white/45">
            Each course is designed to ground you in truth, sharpen your gifts, and prepare you for effective ministry
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
