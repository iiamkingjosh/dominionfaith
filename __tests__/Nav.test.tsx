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
    for (const label of ['Home', 'About', 'Media', 'Sermons', 'Events', 'Blog']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    }
  })

  it('renders Blog sub-items (Contact and Locations) in the mobile overlay', () => {
    render(<Nav />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    fireEvent.click(screen.getByLabelText('Open Blog submenu'))
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Locations')).toBeInTheDocument()
  })

  it('renders the Ministries dropdown trigger', () => {
    render(<Nav />)
    expect(screen.getAllByText('Ministries').length).toBeGreaterThan(0)
  })

  it('renders the Media dropdown trigger', () => {
    render(<Nav />)
    expect(screen.getAllByText('Media').length).toBeGreaterThan(0)
  })

  it('renders Media sub-items in the mobile overlay', () => {
    render(<Nav />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    fireEvent.click(screen.getByLabelText('Open Media submenu'))
    expect(screen.getByText('Sermon Archive')).toBeInTheDocument()
    expect(screen.getByText('Sermon Series')).toBeInTheDocument()
    expect(screen.getAllByText(/Watch Live/i).length).toBeGreaterThan(0)
  })

  it('renders Ministries sub-items in the mobile overlay', () => {
    render(<Nav />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    // Expand the Ministries accordion via the chevron toggle button
    fireEvent.click(screen.getByLabelText('Open Ministries submenu'))
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
