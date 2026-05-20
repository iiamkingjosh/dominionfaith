import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('Hero', () => {
  it('renders the display headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'A Place Where Champions are Made'
    )
  })

  it('renders the mission statement', () => {
    render(<Hero />)
    expect(screen.getByText(/For over a decade/)).toBeInTheDocument()
  })

  it('renders the eyebrow pill', () => {
    render(<Hero />)
    expect(
      screen.getByText(/Dominion Faith International Ministry/)
    ).toBeInTheDocument()
  })

  it('renders all three service cards with correct day, name and time', () => {
    render(<Hero />)
    expect(screen.getByText('Sunday')).toBeInTheDocument()
    expect(screen.getByText('Temple Celebration')).toBeInTheDocument()
    expect(screen.getByText('9am')).toBeInTheDocument()

    expect(screen.getByText('Wednesday')).toBeInTheDocument()
    expect(screen.getByText('Housecare Fellowship')).toBeInTheDocument()
    expect(screen.getByText('7pm')).toBeInTheDocument()

    expect(screen.getByText('Friday')).toBeInTheDocument()
    expect(screen.getByText('Dominion Service')).toBeInTheDocument()
    expect(screen.getByText('5pm')).toBeInTheDocument()
  })

  it('renders Plan Your Visit CTA linking to /locations', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /Plan Your Visit/i })
    expect(link).toHaveAttribute('href', '/locations')
  })

  it('renders Watch Live CTA linking to /live', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /Watch Live/i })
    expect(link).toHaveAttribute('href', '/live')
  })

  it('renders the location line', () => {
    render(<Hero />)
    expect(
      screen.getByText(/1 Dominion Avenue, Onireke, Lagos/)
    ).toBeInTheDocument()
  })
})
