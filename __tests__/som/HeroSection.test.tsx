import { render, screen } from '@testing-library/react'
import HeroSection from '@/components/sections/som/hero-section'

describe('HeroSection', () => {
  it('renders the main heading', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders Enroll Now CTA linking to #enroll', () => {
    render(<HeroSection />)
    const link = screen.getByRole('link', { name: /enroll now/i })
    expect(link).toHaveAttribute('href', '#enroll')
  })

  it('renders View Courses CTA linking to #courses', () => {
    render(<HeroSection />)
    const link = screen.getByRole('link', { name: /view courses/i })
    expect(link).toHaveAttribute('href', '#courses')
  })

  it('renders the intake badge', () => {
    render(<HeroSection />)
    expect(screen.getByText(/New Intake/i)).toBeInTheDocument()
  })
})
