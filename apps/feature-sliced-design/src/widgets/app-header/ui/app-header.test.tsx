import { describe, expect, it } from 'vitest'

import { renderWithProviders, screen } from '@/shared/testing/render'

import { AppHeader } from './app-header'

describe('AppHeader', () => {
  it('renders the architecture eyebrow text', () => {
    renderWithProviders(<AppHeader />)

    expect(screen.getByText('Feature Sliced Design')).toBeInTheDocument()
  })

  it('renders Pokedex as a link to home', () => {
    renderWithProviders(<AppHeader />)

    const link = screen.getByRole('link', { name: 'Pokedex' })
    expect(link).toHaveAttribute('href', '/')
  })

  it('shows Ready status when no queries are fetching', () => {
    renderWithProviders(<AppHeader />)

    expect(screen.getByText('Ready')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    renderWithProviders(<AppHeader />)

    expect(screen.getByText(/React Router for routing/)).toBeInTheDocument()
  })
})
