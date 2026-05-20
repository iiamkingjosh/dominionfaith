import { render, screen, fireEvent } from '@testing-library/react'
import EventGrid from '@/components/EventGrid'
import type { ChurchEvent } from '@/types/event'

const makeEvent = (overrides: Partial<ChurchEvent> & Pick<ChurchEvent, 'id' | 'category'>): ChurchEvent => ({
  title: `Event ${overrides.id}`,
  description: 'Test description',
  startDate: '2026-06-01',
  time: '9:00 AM',
  location: 'Lagos',
  ...overrides,
})

const EVENTS: ChurchEvent[] = [
  makeEvent({ id: '1', category: 'services', title: 'Sunday Service' }),
  makeEvent({ id: '2', category: 'youth',    title: 'Youth Summit' }),
  makeEvent({ id: '3', category: 'women',    title: "Women's Summit" }),
  makeEvent({ id: '4', category: 'men',      title: "Men's Summit" }),
  makeEvent({ id: '5', category: 'children', title: "Children's Day" }),
  makeEvent({ id: '6', category: 'special',  title: 'Annual Convention' }),
  makeEvent({ id: '7', category: 'youth',    title: 'Teens Summit' }),
  makeEvent({ id: '8', category: 'services', title: 'General Vigil' }),
]

describe('EventGrid', () => {
  it('renders all filter tab labels', () => {
    render(<EventGrid events={EVENTS} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Youth' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Women' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Men' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Children' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Special Events' })).toBeInTheDocument()
  })

  it('shows first 6 events by default', () => {
    render(<EventGrid events={EVENTS} />)
    // 8 events total, only 6 rendered initially
    expect(screen.getByText('Sunday Service')).toBeInTheDocument()
    expect(screen.getByText('Annual Convention')).toBeInTheDocument()
    expect(screen.queryByText('Teens Summit')).not.toBeInTheDocument()
  })

  it('shows Load More button when events exceed visible count', () => {
    render(<EventGrid events={EVENTS} />)
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument()
  })

  it('does not show Load More when all events are visible', () => {
    render(<EventGrid events={EVENTS.slice(0, 4)} />)
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument()
  })

  it('Load More reveals additional events', () => {
    render(<EventGrid events={EVENTS} />)
    fireEvent.click(screen.getByRole('button', { name: /load more/i }))
    expect(screen.getByText('Teens Summit')).toBeInTheDocument()
    expect(screen.getByText('General Vigil')).toBeInTheDocument()
  })

  it('filters to youth events only', () => {
    render(<EventGrid events={EVENTS} />)
    fireEvent.click(screen.getByRole('button', { name: 'Youth' }))
    expect(screen.getByText('Youth Summit')).toBeInTheDocument()
    expect(screen.getByText('Teens Summit')).toBeInTheDocument()
    expect(screen.queryByText('Sunday Service')).not.toBeInTheDocument()
    expect(screen.queryByText("Men's Summit")).not.toBeInTheDocument()
  })

  it('filters to women events only', () => {
    render(<EventGrid events={EVENTS} />)
    fireEvent.click(screen.getByRole('button', { name: 'Women' }))
    expect(screen.getByText("Women's Summit")).toBeInTheDocument()
    expect(screen.queryByText('Annual Convention')).not.toBeInTheDocument()
  })

  it('All filter shows all events (up to visible limit)', () => {
    render(<EventGrid events={EVENTS} />)
    fireEvent.click(screen.getByRole('button', { name: 'Youth' }))
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(screen.getByText('Sunday Service')).toBeInTheDocument()
    expect(screen.getByText('Youth Summit')).toBeInTheDocument()
  })

  it('filter reset visible count when tab changes', () => {
    render(<EventGrid events={EVENTS} />)
    // Load more to show 8
    fireEvent.click(screen.getByRole('button', { name: /load more/i }))
    expect(screen.getByText('Teens Summit')).toBeInTheDocument()
    // Switch filter — visible resets to 6
    fireEvent.click(screen.getByRole('button', { name: 'Services' }))
    // services events: Sunday Service, General Vigil (2 < 6, no Load More)
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument()
  })

  it('shows empty state when no events match filter', () => {
    render(<EventGrid events={EVENTS.filter(e => e.category !== 'children')} />)
    fireEvent.click(screen.getByRole('button', { name: 'Children' }))
    expect(screen.getByText(/no events/i)).toBeInTheDocument()
  })
})
