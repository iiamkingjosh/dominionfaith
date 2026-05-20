import { render, screen } from '@testing-library/react'
import EventCard from '@/components/EventCard'
import type { ChurchEvent } from '@/types/event'

const event: ChurchEvent = {
  id: 'test-1',
  title: 'Dominion Annual Convention',
  description: 'The biggest event of the year with anointed ministers.',
  startDate: '2026-04-21',
  endDate: '2026-04-26',
  time: '9:00 AM',
  location: 'HQ — 1 Dominion Avenue, Lagos',
  category: 'special',
  featured: true,
}

const regularEvent: ChurchEvent = {
  id: 'test-2',
  title: "Dominion Women's Summit",
  description: 'Daughters of Dominion gather.',
  startDate: '2026-05-16',
  time: '9:00 AM',
  location: 'HQ — 1 Dominion Avenue, Lagos',
  category: 'women',
}

describe('EventCard', () => {
  it('renders the event title', () => {
    render(<EventCard event={event} index={0} />)
    expect(screen.getByText('Dominion Annual Convention')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<EventCard event={event} index={0} />)
    expect(screen.getByText(/biggest event of the year/i)).toBeInTheDocument()
  })

  it('renders the location', () => {
    render(<EventCard event={event} index={0} />)
    expect(screen.getByText(/1 Dominion Avenue/i)).toBeInTheDocument()
  })

  it('renders the category badge with correct label', () => {
    render(<EventCard event={event} index={0} />)
    expect(screen.getByText('Special')).toBeInTheDocument()
  })

  it('renders women category badge for women event', () => {
    render(<EventCard event={regularEvent} index={0} />)
    expect(screen.getByText('Women')).toBeInTheDocument()
  })

  it('renders formatted start date', () => {
    render(<EventCard event={event} index={0} />)
    expect(screen.getAllByText(/Apr/i).length).toBeGreaterThan(0)
  })

  it('renders the day number for the calendar widget', () => {
    render(<EventCard event={event} index={0} />)
    expect(screen.getByText('21')).toBeInTheDocument()
  })

  it('never renders a Register link', () => {
    render(<EventCard event={event} index={0} />)
    expect(screen.queryByRole('link', { name: /register/i })).not.toBeInTheDocument()
  })

  it('renders the time when provided', () => {
    render(<EventCard event={event} index={0} />)
    expect(screen.getByText(/9:00 AM/)).toBeInTheDocument()
  })

  it('renders end date for multi-day events', () => {
    render(<EventCard event={event} index={0} />)
    expect(screen.getByText(/26/)).toBeInTheDocument()
  })

  it('shows Past Event badge for past events', () => {
    render(<EventCard event={event} index={0} isPast />)
    expect(screen.getByText(/past event/i)).toBeInTheDocument()
  })
})
