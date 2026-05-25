import { enrollmentSchema } from '@/schemas/enrollment.schema'

describe('enrollmentSchema', () => {
  const base = {
    email: 'test@example.com',
    passportPhoto: 'data:image/png;base64,abc123',
    title: 'Mr.' as const,
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    gender: 'Male' as const,
    maritalStatus: 'Single' as const,
    nationality: 'Nigerian',
    phone: '08012345678',
    homeAddress: '1 Test Street, Lagos',
    churchName: 'Dominion Faith',
    district: 'HQ' as const,
    programmeMode: 'Online' as const,
    employed: 'No' as const,
    previousSOM: 'No' as const,
    educationBackground: 'University of Lagos, B.Sc, 2019',
    newBirthExperience: 'I gave my life to Christ in 2010 at DFIM Lagos.',
    placeOfWorship: 'Dominion Faith, 1 Dominion Avenue, Lagos',
    previousBibleCollege: 'No' as const,
    departmentInChurch: 'Choir',
    indemnity: true as const,
    paymentProof: 'data:image/png;base64,xyz789',
  }

  it('accepts a valid complete application', () => {
    expect(enrollmentSchema.safeParse(base).success).toBe(true)
  })

  it('rejects invalid Nigerian phone number', () => {
    const r = enrollmentSchema.safeParse({ ...base, phone: '1234567890' })
    expect(r.success).toBe(false)
  })

  it('rejects email without @ symbol', () => {
    const r = enrollmentSchema.safeParse({ ...base, email: 'notanemail' })
    expect(r.success).toBe(false)
  })

  it('rejects missing indemnity agreement', () => {
    const r = enrollmentSchema.safeParse({ ...base, indemnity: false })
    expect(r.success).toBe(false)
  })

  it('rejects empty passport photo', () => {
    const r = enrollmentSchema.safeParse({ ...base, passportPhoto: '' })
    expect(r.success).toBe(false)
  })
})
