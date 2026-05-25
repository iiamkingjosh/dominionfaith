// __tests__/live/OfflineView.test.tsx
import { render, screen } from '@testing-library/react'
import OfflineView from '../../components/live/OfflineView'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('OfflineView', () => {
  it('renders the not-live heading', () => {
    render(<OfflineView />)
    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent("We're not live right now")
  })

  it('renders the channel message', () => {
    render(<OfflineView />)
    expect(screen.getByText(/Visit our channel for all our messages/)).toBeInTheDocument()
  })

  it('renders a Watch on YouTube link opening the channel in a new tab', () => {
    render(<OfflineView />)
    const link = screen.getByRole('link', { name: /Watch on YouTube/i })
    expect(link).toHaveAttribute('href', 'https://youtube.com/@dominionfaithhq')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders the Sunday service time', () => {
    render(<OfflineView />)
    expect(screen.getByText('9:00 AM')).toBeInTheDocument()
    expect(screen.getByText(/Every Sunday/i)).toBeInTheDocument()
  })

  it('renders the giving nudge', () => {
    render(<OfflineView />)
    expect(screen.getByText(/You can still give/i)).toBeInTheDocument()
  })

  it('gives nudge links to /give', () => {
    render(<OfflineView />)
    const link = screen.getByRole('link', { name: /Give Now/i })
    expect(link).toHaveAttribute('href', '/give')
  })
})
