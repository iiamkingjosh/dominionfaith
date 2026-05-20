import { render, screen, fireEvent } from '@testing-library/react'
import SermonGrid from '@/components/SermonGrid'
import type { Sermon } from '@/types/sermon'

const SERMONS: Sermon[] = [
  { id: '1', videoId: 'vid1', title: 'Sermon One', speaker: 'Pastor A', date: '2024-01-01', series: 'Series A' },
  { id: '2', videoId: 'vid2', title: 'Sermon Two', speaker: 'Pastor B', date: '2024-01-08' },
  { id: '3', videoId: 'vid3', title: 'Sermon Three', speaker: 'Pastor A', date: '2024-01-15' },
]

describe('SermonGrid', () => {
  it('renders all sermon cards', () => {
    render(<SermonGrid sermons={SERMONS} />)
    expect(screen.getByText('Sermon One')).toBeInTheDocument()
    expect(screen.getByText('Sermon Two')).toBeInTheDocument()
    expect(screen.getByText('Sermon Three')).toBeInTheDocument()
  })

  it('modal is closed by default', () => {
    render(<SermonGrid sermons={SERMONS} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens modal when Watch is clicked', () => {
    render(<SermonGrid sermons={SERMONS} />)
    fireEvent.click(screen.getAllByRole('button', { name: /watch/i })[0])
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('modal contains an iframe with correct YouTube src', () => {
    render(<SermonGrid sermons={SERMONS} />)
    fireEvent.click(screen.getAllByRole('button', { name: /watch/i })[0])
    const iframe = screen.getByTitle(/sermon one/i)
    expect(iframe).toHaveAttribute('src', expect.stringContaining('vid1'))
  })

  it('closes modal when close button is clicked', () => {
    render(<SermonGrid sermons={SERMONS} />)
    fireEvent.click(screen.getAllByRole('button', { name: /watch/i })[0])
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders empty state when no sermons provided', () => {
    render(<SermonGrid sermons={[]} />)
    expect(screen.getByText(/no sermons/i)).toBeInTheDocument()
  })
})
