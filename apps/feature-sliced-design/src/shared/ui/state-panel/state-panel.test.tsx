import { describe, expect, it } from 'vitest'

import { renderWithProviders, screen } from '@/shared/testing/render'

import { StatePanel } from './state-panel'

describe('StatePanel', () => {
  it('renders eyebrow, title, and description', () => {
    renderWithProviders(
      <StatePanel eyebrow="Test Eyebrow" title="Test Title" description="Test description text" />,
    )

    expect(screen.getByText('Test Eyebrow')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test description text')).toBeInTheDocument()
  })

  it('renders children when provided', () => {
    renderWithProviders(
      <StatePanel eyebrow="E" title="T" description="D">
        <span>Child content</span>
      </StatePanel>,
    )

    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('renders action slot when provided', () => {
    renderWithProviders(
      <StatePanel eyebrow="E" title="T" description="D" action={<button>Action</button>} />,
    )

    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })

  it('does not render children container when no children', () => {
    const { container } = renderWithProviders(
      <StatePanel eyebrow="E" title="T" description="D" />,
    )

    const section = container.querySelector('section')!
    // Should have only the text content div, no mt-6 children/action wrappers
    expect(section.children).toHaveLength(1)
  })
})
