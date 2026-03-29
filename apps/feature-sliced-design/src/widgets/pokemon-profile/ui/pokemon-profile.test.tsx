import { describe, expect, it } from 'vitest'

import { renderWithProviders, screen, waitFor } from '@/test/render'

import { PokemonProfile } from './pokemon-profile'

describe('PokemonProfile', () => {
  it('shows loading state initially', () => {
    renderWithProviders(<PokemonProfile id={1} />)

    expect(screen.getByText('Loading Pokemon detail')).toBeInTheDocument()
    expect(screen.getByText('Fetching the selected Pokemon entry.')).toBeInTheDocument()
  })

  it('renders pokemon details after data loads', async () => {
    renderWithProviders(<PokemonProfile id={1} />)

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    })

    expect(screen.getByText('#001')).toBeInTheDocument()
    expect(screen.getByText('Pokemon Detail')).toBeInTheDocument()
  })

  it('renders height and weight', async () => {
    renderWithProviders(<PokemonProfile id={1} />)

    await waitFor(() => {
      expect(screen.getByText('Height')).toBeInTheDocument()
    })

    expect(screen.getByText('Weight')).toBeInTheDocument()
  })

  it('renders abilities section', async () => {
    renderWithProviders(<PokemonProfile id={1} />)

    await waitFor(() => {
      expect(screen.getByText('Abilities')).toBeInTheDocument()
    })
  })

  it('renders battle stats section', async () => {
    renderWithProviders(<PokemonProfile id={1} />)

    await waitFor(() => {
      expect(screen.getByText('Battle stats')).toBeInTheDocument()
    })
  })

  it('renders back link to pokedex', async () => {
    renderWithProviders(<PokemonProfile id={1} />)

    await waitFor(() => {
      expect(screen.getByText('Back to the Pokedex')).toBeInTheDocument()
    })

    const link = screen.getByRole('link', { name: /back to the pokedex/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders type badges for the pokemon', async () => {
    renderWithProviders(<PokemonProfile id={1} />)

    await waitFor(() => {
      expect(screen.getByText('Grass')).toBeInTheDocument()
    })

    expect(screen.getByText('Poison')).toBeInTheDocument()
  })
})
