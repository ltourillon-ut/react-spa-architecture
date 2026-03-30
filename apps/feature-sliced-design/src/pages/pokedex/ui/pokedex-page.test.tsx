import { describe, expect, it } from 'vitest'

import { renderWithProviders, screen } from '@/shared/testing/render'

import { PokedexPage } from './pokedex-page'

describe('PokedexPage', () => {
  it('renders the pokemon roster loading state', () => {
    renderWithProviders(<PokedexPage />)

    expect(screen.getByText('Loading Pokedex')).toBeInTheDocument()
  })
})
