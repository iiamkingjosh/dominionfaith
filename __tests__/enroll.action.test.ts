const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'ok' })
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({ sendMail: mockSendMail })),
}))

import { submitEnrollment } from '@/lib/actions/enroll'
import type { EnrollmentData } from '@/schemas/enrollment.schema'

const valid: EnrollmentData = {
  email: 'applicant@test.com',
  passportPhoto: 'data:image/png;base64,abc',
  title: 'Mr.',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  gender: 'Male',
  maritalStatus: 'Single',
  nationality: 'Nigerian',
  phone: '08012345678',
  homeAddress: '1 Test Street, Lagos',
  churchName: 'Dominion Faith',
  district: 'HQ',
  programmeMode: 'Online',
  employed: 'No',
  previousSOM: 'No',
  educationBackground: 'University of Lagos, B.Sc, 2019',
  newBirthExperience: 'I gave my life to Christ in 2010 at DFIM Lagos.',
  placeOfWorship: 'Dominion Faith, 1 Dominion Avenue, Lagos',
  previousBibleCollege: 'No',
  departmentInChurch: 'Choir',
  indemnity: true,
  paymentProof: 'data:image/png;base64,xyz',
}

describe('submitEnrollment', () => {
  beforeEach(() => {
    mockSendMail.mockClear()
    process.env.GMAIL_USER         = 'test@gmail.com'
    process.env.GMAIL_APP_PASSWORD = 'testpassword'
  })

  it('returns success and sends two emails for valid data', async () => {
    const result = await submitEnrollment(valid)
    expect(result.success).toBe(true)
    expect(mockSendMail).toHaveBeenCalledTimes(2)
  })

  it('sends admin email to info@dominionfaith.com', async () => {
    await submitEnrollment(valid)
    const adminCall = mockSendMail.mock.calls[0][0]
    expect(adminCall.to).toBe('info@dominionfaith.com')
    expect(adminCall.subject).toContain('John Doe')
  })

  it('sends confirmation email to applicant', async () => {
    await submitEnrollment(valid)
    const applicantCall = mockSendMail.mock.calls[1][0]
    expect(applicantCall.to).toBe('applicant@test.com')
  })

  it('returns failure for invalid data', async () => {
    const result = await submitEnrollment({ ...valid, email: 'bad-email' } as EnrollmentData)
    expect(result.success).toBe(false)
    expect(mockSendMail).not.toHaveBeenCalled()
  })
})
