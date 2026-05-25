// __tests__/live/LiveView.test.tsx
import { render, screen } from '@testing-library/react'
import LiveView from '../../components/live/LiveView'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

jest.mock('../../components/GiveSection', () => ({
  __esModule: true,
  default: () => <div data-testid="give-section">GiveSection</div>,
}))

describe('LiveView', () => {
  const channelId = 'UCtest123abc'

  it('renders the Live Now badge', () => {
    render(<LiveView channelId={channelId} />)
    expect(screen.getByText(/Live Now/i)).toBeInTheDocument()
  })

  it('renders a YouTube iframe with the channel live-stream URL', () => {
    render(<LiveView channelId={channelId} />)
    const iframe = document.querySelector('iframe')
    expect(iframe).not.toBeNull()
    expect(iframe!.src).toContain(channelId)
    expect(iframe!.src).toContain('live_stream')
  })

  it('renders the Sunday service time', () => {
    render(<LiveView channelId={channelId} />)
    expect(screen.getByText('9:00 AM')).toBeInTheDocument()
  })

  it('renders the GiveSection', () => {
    render(<LiveView channelId={channelId} />)
    expect(screen.getByTestId('give-section')).toBeInTheDocument()
  })
})
