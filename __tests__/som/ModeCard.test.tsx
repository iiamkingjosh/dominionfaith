import { render, screen } from '@testing-library/react'
import ModeCard from '@/components/ui/mode-card'
import { Laptop } from 'lucide-react'

describe('ModeCard', () => {
  it('renders the title and note', () => {
    render(
      <ModeCard
        icon={Laptop}
        title="Online"
        note="Available on Zoom"
        schedule={{ saturday: '7:00 PM', sunday: '7:00 PM' }}
      />
    )
    expect(screen.getByText('Online')).toBeInTheDocument()
    expect(screen.getByText('Available on Zoom')).toBeInTheDocument()
  })

  it('renders schedule times', () => {
    render(
      <ModeCard
        icon={Laptop}
        title="Online"
        note="Zoom"
        schedule={{ saturday: '7:00 PM', sunday: '9:00 AM' }}
      />
    )
    expect(screen.getByText('7:00 PM')).toBeInTheDocument()
    expect(screen.getByText('9:00 AM')).toBeInTheDocument()
  })
})
