// __tests__/live/page.test.tsx
import { render, screen } from '@testing-library/react'
import LivePage from '../../app/live/page'

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

describe('LivePage', () => {
  const originalEnv = process.env

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  it('renders OfflineView when NEXT_PUBLIC_IS_LIVE is not set', () => {
    delete process.env.NEXT_PUBLIC_IS_LIVE
    render(<LivePage />)
    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent("We're not live right now")
  })

  it('renders OfflineView when NEXT_PUBLIC_IS_LIVE is "false"', () => {
    process.env.NEXT_PUBLIC_IS_LIVE = 'false'
    render(<LivePage />)
    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent("We're not live right now")
  })

  it('renders LiveView when NEXT_PUBLIC_IS_LIVE is "true"', () => {
    process.env.NEXT_PUBLIC_IS_LIVE = 'true'
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID = 'UCtest'
    render(<LivePage />)
    expect(screen.getByText(/Live Now/i)).toBeInTheDocument()
    expect(screen.getByTestId('give-section')).toBeInTheDocument()
  })
})
