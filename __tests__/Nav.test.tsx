import { render, screen, fireEvent } from '@testing-library/react'
import Nav from '../components/Nav'

jest.mock('next/navigation', () => ({ usePathname: () => '/' }))
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => <img {...props} alt={props.alt ?? ''} />,
}))
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('Nav', () => {
  it('renders the navigation landmark', () => {
    render(<Nav />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders the logo image', () => {
    render(<Nav />)
    expect(screen.getByAltText('Dominion Faith International Ministry')).toBeInTheDocument()
  })

  it('renders a hamburger button', () => {
    render(<Nav />)
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('opens the mobile overlay when hamburger is clicked', () => {
    render(<Nav />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
  })

  it('closes the mobile overlay when X is clicked', () => {
    render(<Nav />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    fireEvent.click(screen.getByLabelText('Close menu'))
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('renders all top-level nav items', () => {
    render(<Nav />)
    for (const label of ['Home', 'About', 'Media', 'Sermons', 'Events', 'Blog', 'Contact']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    }
  })

  it('renders the Ministries dropdown trigger', () => {
    render(<Nav />)
    expect(screen.getAllByText('Ministries').length).toBeGreaterThan(0)
  })

  it('renders Ministries sub-items in the mobile overlay', () => {
    render(<Nav />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    // Expand the Ministries accordion in mobile
    const ministryButtons = screen.getAllByText('Ministries')
    // The last one is in the overlay
    fireEvent.click(ministryButtons[ministryButtons.length - 1])
    expect(screen.getByText('Leadership')).toBeInTheDocument()
    expect(screen.getByText('School of Ministry')).toBeInTheDocument()
    expect(screen.getByText('Departments')).toBeInTheDocument()
    expect(screen.getByText('House Fellowship')).toBeInTheDocument()
  })

  it('renders Give and Watch Live CTA links', () => {
    render(<Nav />)
    expect(screen.getAllByText('Give').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Watch Live/).length).toBeGreaterThan(0)
  })
})
