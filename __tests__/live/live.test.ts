// __tests__/live/live.test.ts
import { isLiveNow } from '../../lib/live'

describe('isLiveNow', () => {
  beforeAll(() => jest.useFakeTimers())
  afterAll(() => jest.useRealTimers())
  afterEach(() => jest.restoreAllMocks())

  it('returns true at 9:00 AM WAT on Sunday', () => {
    jest.setSystemTime(new Date('2024-01-07T08:00:00Z'))
    expect(isLiveNow()).toBe(true)
  })

  it('returns true at 1:00 PM WAT on Sunday', () => {
    jest.setSystemTime(new Date('2024-01-07T12:00:00Z'))
    expect(isLiveNow()).toBe(true)
  })

  it('returns false at 1:30 PM WAT on Sunday (service over)', () => {
    jest.setSystemTime(new Date('2024-01-07T12:30:00Z'))
    expect(isLiveNow()).toBe(false)
  })

  it('returns false at 8:59 AM WAT on Sunday (before service)', () => {
    jest.setSystemTime(new Date('2024-01-07T07:59:00Z'))
    expect(isLiveNow()).toBe(false)
  })

  it('returns false on a weekday', () => {
    jest.setSystemTime(new Date('2024-01-08T09:00:00Z'))
    expect(isLiveNow()).toBe(false)
  })

  it('returns true on a weekday when FORCE_LIVE=true (special event)', () => {
    jest.setSystemTime(new Date('2024-01-08T09:00:00Z'))
    process.env.FORCE_LIVE = 'true'
    expect(isLiveNow()).toBe(true)
    delete process.env.FORCE_LIVE
  })

  it('returns false outside Sunday window even if FORCE_LIVE is unset', () => {
    jest.setSystemTime(new Date('2024-01-08T09:00:00Z'))
    delete process.env.FORCE_LIVE
    expect(isLiveNow()).toBe(false)
  })
})
