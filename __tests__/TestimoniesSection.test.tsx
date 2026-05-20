import { render, screen, fireEvent } from '@testing-library/react'
import TestimoniesSection from '@/components/TestimoniesSection'
import type { TestimonySlide } from '@/types/testimony'

const SLIDES: TestimonySlide[] = [
  {
    id: 'slide-1',
    featured: {
      id: 'v1',
      name: 'Bro. Test User',
      videoId: 'test-video-id',
      quote: 'God healed me completely.',
      transformationTag: 'From sickness to health',
    },
    cards: [
      { id: 'c1', name: 'Sis. Alpha', quote: 'Quote one.', transformationTag: 'From A to B' },
      { id: 'c2', name: 'Bro. Beta',  quote: 'Quote two.', transformationTag: 'From C to D' },
      { id: 'c3', name: 'Sis. Gamma', quote: 'Quote three.', transformationTag: 'From E to F' },
    ],
  },
  {
    id: 'slide-2',
    featured: {
      id: 'v2',
      name: 'Sis. Second Slide',
      videoId: 'test-video-id-2',
      quote: 'My marriage was restored.',
      transformationTag: 'From brokenness to wholeness',
    },
    cards: [
      { id: 'c4', name: 'Bro. Delta',   quote: 'Quote four.',  transformationTag: 'From G to H' },
      { id: 'c5', name: 'Sis. Epsilon', quote: 'Quote five.',  transformationTag: 'From I to J' },
      { id: 'c6', name: 'Bro. Zeta',    quote: 'Quote six.',   transformationTag: 'From K to L' },
    ],
  },
]

describe('TestimoniesSection', () => {
  it('renders the Champions Rising heading', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    expect(screen.getByText('Champions Rising')).toBeInTheDocument()
  })

  it('renders the featured testimony quote for the first slide', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    expect(screen.getByText(/God healed me completely/i)).toBeInTheDocument()
  })

  it('renders the featured person name', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    expect(screen.getByText('Bro. Test User')).toBeInTheDocument()
  })

  it('renders 3 text testimony cards', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    expect(screen.getByText('Sis. Alpha')).toBeInTheDocument()
    expect(screen.getByText('Bro. Beta')).toBeInTheDocument()
    expect(screen.getByText('Sis. Gamma')).toBeInTheDocument()
  })

  it('renders transformation tags', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    expect(screen.getByText('From sickness to health')).toBeInTheDocument()
    expect(screen.getByText('From A to B')).toBeInTheDocument()
  })

  it('renders play button on featured video', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    expect(screen.getByRole('button', { name: /play testimony/i })).toBeInTheDocument()
  })

  it('renders share buttons', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    expect(screen.getByRole('link', { name: /share on twitter/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /share on facebook/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /share on whatsapp/i })).toBeInTheDocument()
  })

  it('renders previous and next navigation buttons', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    expect(screen.getByRole('button', { name: /previous testimony/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next testimony/i })).toBeInTheDocument()
  })

  it('renders dot indicators (one per slide)', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    const dots = screen.getAllByRole('button', { name: /go to slide/i })
    expect(dots).toHaveLength(2)
  })

  it('Next button advances to the next slide', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    fireEvent.click(screen.getByRole('button', { name: /next testimony/i }))
    expect(screen.getByText(/My marriage was restored/i)).toBeInTheDocument()
    expect(screen.getByText('Sis. Second Slide')).toBeInTheDocument()
  })

  it('Previous button wraps to last slide from first', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    fireEvent.click(screen.getByRole('button', { name: /previous testimony/i }))
    expect(screen.getByText(/My marriage was restored/i)).toBeInTheDocument()
  })

  it('clicking a dot navigates to that slide', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    const dots = screen.getAllByRole('button', { name: /go to slide/i })
    fireEvent.click(dots[1])
    expect(screen.getByText(/My marriage was restored/i)).toBeInTheDocument()
  })

  it('clicking play shows the video iframe', () => {
    render(<TestimoniesSection slides={SLIDES} />)
    fireEvent.click(screen.getByRole('button', { name: /play testimony/i }))
    // After play, iframe should be present and play button removed
    expect(screen.queryByRole('button', { name: /play testimony/i })).not.toBeInTheDocument()
  })
})
