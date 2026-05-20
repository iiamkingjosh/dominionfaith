import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import GiveSection from '@/components/GiveSection'

jest.mock('canvas-confetti', () => jest.fn())

describe('GiveSection', () => {
  it('renders the headline', () => {
    render(<GiveSection />)
    expect(screen.getByText('Partner With Us')).toBeInTheDocument()
  })

  it('renders all three tier cards', () => {
    render(<GiveSection />)
    expect(screen.getByText('One-time Gift')).toBeInTheDocument()
    expect(screen.getByText('Monthly Partner')).toBeInTheDocument()
    expect(screen.getByText('Honor Gift')).toBeInTheDocument()
  })

  it('renders all stats labels', () => {
    render(<GiveSection />)
    expect(screen.getByText('Years of Ministry')).toBeInTheDocument()
    expect(screen.getByText('Lives Changed')).toBeInTheDocument()
    expect(screen.getByText('Nations Reached')).toBeInTheDocument()
  })

  it('renders amount preset buttons', () => {
    render(<GiveSection />)
    expect(screen.getByRole('button', { name: '₦1,000' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '₦5,000' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '₦50,000' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Custom' })).toBeInTheDocument()
  })

  it('shows custom amount input when Custom preset is selected', () => {
    render(<GiveSection />)
    expect(screen.queryByLabelText(/custom amount/i)).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Custom' }))
    expect(screen.getByLabelText(/custom amount/i)).toBeInTheDocument()
  })

  it('tier selection toggles aria-pressed', () => {
    render(<GiveSection />)
    const honorBtn = screen.getByRole('button', { name: 'Honor Gift' })
    expect(honorBtn).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(honorBtn)
    expect(honorBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows name validation error on empty submit', async () => {
    render(<GiveSection />)
    fireEvent.click(screen.getByRole('button', { name: /give securely/i }))
    await waitFor(() => {
      expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument()
    })
  })

  it('shows email validation error on invalid email', async () => {
    render(<GiveSection />)
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Joshua' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'bad-email' } })
    fireEvent.click(screen.getByRole('button', { name: /give securely/i }))
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
    })
  })

  it('shows processing state during submission', async () => {
    render(<GiveSection />)
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Joshua Moses' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'josh@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /give securely/i }))
    expect(screen.getByText(/processing/i)).toBeInTheDocument()
  })

  it('transitions to success state after payment completes', async () => {
    render(<GiveSection />)
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Joshua Moses' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'josh@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /give securely/i }))
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    }, { timeout: 5000 })
  })

  it('renders all three payment method buttons', () => {
    render(<GiveSection />)
    expect(screen.getByRole('button', { name: 'Card' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Bank Transfer' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mobile Money' })).toBeInTheDocument()
  })

  it('renders Give Securely submit button', () => {
    render(<GiveSection />)
    expect(screen.getByRole('button', { name: /give securely/i })).toBeInTheDocument()
  })

  it('renders SSL security badge', () => {
    render(<GiveSection />)
    expect(screen.getByText(/ssl secured/i)).toBeInTheDocument()
  })

  it('Give Again button resets to idle form', async () => {
    render(<GiveSection />)
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Joshua Moses' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'josh@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /give securely/i }))
    await waitFor(() => screen.getByText(/thank you/i), { timeout: 5000 })
    fireEvent.click(screen.getByRole('button', { name: /give again/i }))
    expect(screen.getByText('Partner With Us')).toBeInTheDocument()
  })
})
