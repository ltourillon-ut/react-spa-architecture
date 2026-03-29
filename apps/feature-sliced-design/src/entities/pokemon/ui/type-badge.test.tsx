import { describe, expect, it } from 'vitest'

import { renderWithProviders, screen } from '@/test/render'

import { TypeBadge } from './type-badge'

describe('TypeBadge', () => {
  it('renders the type name', () => {
    renderWithProviders(<TypeBadge type="Fire" />)

    expect(screen.getByText('Fire')).toBeInTheDocument()
  })

  it('applies type-specific classes', () => {
    renderWithProviders(<TypeBadge type="Water" />)

    const badge = screen.getByText('Water')
    expect(badge.className).toContain('bg-blue-500/20')
  })
})
