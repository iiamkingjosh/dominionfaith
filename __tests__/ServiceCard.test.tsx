import { render, screen, fireEvent } from '@testing-library/react'
import ServiceCard from '../components/ServiceCard'

// Mock browser APIs unavailable in jsdom
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'blob:mock')
  global.URL.revokeObjectURL = jest.fn()
  // Prevent jsdom errors from anchor.click() in downloadIcs
  HTMLAnchorElement.prototype.click = jest.fn()
})

// framer-motion mocked via jest.config.ts moduleNameMapper

describe('ServiceCard', () => {
  it('renders the Service Times heading', () => {
    render(<ServiceCard />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Service Times')
  })

  it('renders the Join Us eyebrow label', () => {
    render(<ServiceCard />)
    expect(screen.getByText('Join Us')).toBeInTheDocument()
  })

  it('renders all three service days', () => {
    render(<ServiceCard />)
    expect(screen.getByText('Sunday')).toBeInTheDocument()
    expect(screen.getByText('Wednesday')).toBeInTheDocument()
    expect(screen.getByText('Friday')).toBeInTheDocument()
  })

  it('renders all three service names', () => {
    render(<ServiceCard />)
    expect(screen.getByText('Temple Celebration')).toBeInTheDocument()
    expect(screen.getByText('Housecare Fellowship')).toBeInTheDocument()
    expect(screen.getByText('Dominion Service')).toBeInTheDocument()
  })

  it('renders all three service times', () => {
    render(<ServiceCard />)
    expect(screen.getByText('9am')).toBeInTheDocument()
    expect(screen.getByText('7pm')).toBeInTheDocument()
    expect(screen.getByText('5pm')).toBeInTheDocument()
  })

  it('renders the full location text', () => {
    render(<ServiceCard />)
    expect(
      screen.getByText(/1 Dominion Avenue, Onireke, Opposite Ojo Barrack/)
    ).toBeInTheDocument()
  })

  it('renders the phone number as a tel: link', () => {
    render(<ServiceCard />)
    const link = screen.getByRole('link', { name: /\+234 703 454 3971/ })
    expect(link).toHaveAttribute('href', 'tel:+2347034543971')
  })

  it('renders the Google Maps iframe with correct title', () => {
    render(<ServiceCard />)
    expect(screen.getByTitle('Dominion Faith location map')).toBeInTheDocument()
  })

  it('renders the Get Directions link pointing to Google Maps', () => {
    render(<ServiceCard />)
    const link = screen.getByRole('link', { name: /Get Directions/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('google.com/maps'))
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the Add to Calendar toggle button', () => {
    render(<ServiceCard />)
    expect(
      screen.getByRole('button', { name: /Add to Calendar/i })
    ).toBeInTheDocument()
  })

  it('opens the calendar dropdown when the button is clicked', () => {
    render(<ServiceCard />)
    fireEvent.click(screen.getByRole('button', { name: /Add to Calendar/i }))
    expect(screen.getByText('Apple Calendar')).toBeInTheDocument()
    expect(screen.getByText('Google · Sunday')).toBeInTheDocument()
    expect(screen.getByText('Google · Wednesday')).toBeInTheDocument()
    expect(screen.getByText('Google · Friday')).toBeInTheDocument()
    expect(screen.getByText('Outlook / iCal')).toBeInTheDocument()
  })

  it('closes the calendar dropdown on a second button click', () => {
    render(<ServiceCard />)
    const btn = screen.getByRole('button', { name: /Add to Calendar/i })
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(screen.queryByText('Apple Calendar')).not.toBeInTheDocument()
  })
})
