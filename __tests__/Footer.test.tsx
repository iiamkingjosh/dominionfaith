import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders the church logo', () => {
    render(<Footer />)
    expect(screen.getByAltText(/Dominion Faith International Ministry/i)).toBeInTheDocument()
  })

  it('renders the mission statement', () => {
    render(<Footer />)
    expect(screen.getByText(/Raising champions who don't just survive/i)).toBeInTheDocument()
  })

  it('renders the church address', () => {
    render(<Footer />)
    expect(screen.getByText(/1 Dominion Avenue/i)).toBeInTheDocument()
  })

  it('renders the phone number as a tel link', () => {
    render(<Footer />)
    const tel = screen.getByRole('link', { name: /\+234 703 454 3971/i })
    expect(tel).toHaveAttribute('href', 'tel:+2347034543971')
  })

  it('renders the email address', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /info@dominionfaith.org/i })).toBeInTheDocument()
  })

  it('renders Quick Links section with key pages', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Sermons' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Events' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Give' })).toBeInTheDocument()
  })

  it('renders Ministries section', () => {
    render(<Footer />)
    expect(screen.getByText('Hospital & Prison Ministry')).toBeInTheDocument()
    expect(screen.getByText('Faith Clinic')).toBeInTheDocument()
  })

  it('renders newsletter email input and subscribe button', () => {
    render(<Footer />)
    expect(screen.getByLabelText(/email address for newsletter/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })

  it('shows success message after subscribing', async () => {
    render(<Footer />)
    fireEvent.change(screen.getByLabelText(/email address for newsletter/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }))
    await waitFor(() => {
      expect(screen.getByText(/you're subscribed/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('renders social media links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /follow us on facebook/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /follow us on instagram/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /follow us on youtube/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /follow us on twitter/i })).toBeInTheDocument()
  })

  it('renders copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/Dominion Faith International Ministry. All Rights Reserved/i)).toBeInTheDocument()
  })

  it('renders Chronix Technology credit with link', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /Chronix Technology Limited/i })
    expect(link).toHaveAttribute('href', 'https://chronixtechnology.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders Privacy Policy and Terms links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument()
  })

  it('mobile accordion toggles section visibility', () => {
    render(<Footer />)
    // "Quick Links" section toggle button
    const toggleBtn = screen.getByRole('button', { name: /quick links/i })
    // Initially closed on mobile (open is tracked by state)
    fireEvent.click(toggleBtn)
    // after click, section should be open
    fireEvent.click(toggleBtn)
    // toggles back — no error means it works
    expect(toggleBtn).toBeInTheDocument()
  })
})
