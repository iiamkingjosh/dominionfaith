// __tests__/live/page.test.tsx
import { render, screen } from '@testing-library/react'

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

jest.mock('../../lib/live', () => ({
  isLiveNow: jest.fn(),
}))

import { isLiveNow } from '../../lib/live'
import LivePage from '../../app/live/page'

describe('LivePage', () => {
  const originalEnv = process.env

  afterEach(() => {
    process.env = { ...originalEnv }
    jest.clearAllMocks()
  })

  it('renders OfflineView when isLiveNow returns false', () => {
    ;(isLiveNow as jest.Mock).mockReturnValue(false)
    render(<LivePage />)
    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent("We're not live right now")
  })

  it('renders OfflineView when isLiveNow returns true but channelId is missing', () => {
    ;(isLiveNow as jest.Mock).mockReturnValue(true)
    delete process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID
    render(<LivePage />)
    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent("We're not live right now")
  })

  it('renders LiveView when isLiveNow returns true and channelId is set', () => {
    ;(isLiveNow as jest.Mock).mockReturnValue(true)
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID = 'UCtest'
    render(<LivePage />)
    expect(screen.getByText(/Live Now/i)).toBeInTheDocument()
    expect(screen.getByTestId('give-section')).toBeInTheDocument()
  })
})
