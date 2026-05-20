import { render, screen, fireEvent } from '@testing-library/react'
import SermonCard from '@/components/SermonCard'
import type { Sermon } from '@/types/sermon'

const sermon: Sermon = {
  id: '1',
  videoId: 'abc123',
  title: 'Walking in Dominion',
  speaker: 'Pastor Joshua',
  speakerPhoto: '/speakers/pastor-joshua.jpg',
  date: '2024-03-10',
  series: 'Kingdom Foundations',
  downloadUrl: 'https://example.com/sermon.mp3',
}

const noop = jest.fn()

describe('SermonCard', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renders the sermon title', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    expect(screen.getByText('Walking in Dominion')).toBeInTheDocument()
  })

  it('renders the speaker name', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    expect(screen.getByText('Pastor Joshua')).toBeInTheDocument()
  })

  it('renders the series badge when series is provided', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    expect(screen.getByText('Kingdom Foundations')).toBeInTheDocument()
  })

  it('does not render series badge when series is absent', () => {
    const noSeries = { ...sermon, series: undefined }
    render(<SermonCard sermon={noSeries} onWatch={noop} />)
    expect(screen.queryByText('Kingdom Foundations')).not.toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    expect(screen.getByText(/Mar.*2024/)).toBeInTheDocument()
  })

  it('calls onWatch when Watch button is clicked', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    fireEvent.click(screen.getByRole('button', { name: /watch/i }))
    expect(noop).toHaveBeenCalledWith(sermon)
    expect(noop).toHaveBeenCalledTimes(1)
  })

  it('renders Download link when downloadUrl is provided', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    expect(screen.getByRole('link', { name: /download/i })).toBeInTheDocument()
  })

  it('does not render Download link when downloadUrl is absent', () => {
    const noDownload = { ...sermon, downloadUrl: undefined }
    render(<SermonCard sermon={noDownload} onWatch={noop} />)
    expect(screen.queryByRole('link', { name: /download/i })).not.toBeInTheDocument()
  })

  it('renders YouTube thumbnail image', () => {
    render(<SermonCard sermon={sermon} onWatch={noop} />)
    const img = screen.getByRole('img', { name: /walking in dominion/i })
    expect(img).toHaveAttribute('src', expect.stringContaining('abc123'))
  })
})
