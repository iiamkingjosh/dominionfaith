import { render, screen } from '@testing-library/react'
import EnrollmentForm from '@/components/forms/enrollment-form'

jest.mock('../../lib/actions/enroll', () => ({
  submitEnrollment: jest.fn(),
}))

describe('EnrollmentForm', () => {
  it('renders step 1 with email field', () => {
    render(<EnrollmentForm />)
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
  })

  it('renders the step indicator', () => {
    render(<EnrollmentForm />)
    expect(screen.getByText('Personal Details')).toBeInTheDocument()
  })

  it('renders the Next button on step 1', () => {
    render(<EnrollmentForm />)
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })
})
