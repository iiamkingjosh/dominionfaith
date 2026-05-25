import { render, screen } from '@testing-library/react'
import CoursesGrid from '@/components/sections/som/courses-grid'

describe('CoursesGrid', () => {
  it('renders all 6 course titles', () => {
    render(<CoursesGrid />)
    expect(screen.getByText('Ministry')).toBeInTheDocument()
    expect(screen.getByText('Purpose Driven Church')).toBeInTheDocument()
    expect(screen.getByText('The New Creation Reality')).toBeInTheDocument()
    expect(screen.getByText('Word Foundation')).toBeInTheDocument()
    expect(screen.getByText('Spiritual Leadership')).toBeInTheDocument()
    expect(screen.getByText('Spiritual Warfare')).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<CoursesGrid />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
})
