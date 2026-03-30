import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { renderWithProviders, screen, waitFor } from '@/shared/testing/render'
import { server } from '@/shared/testing/server'

import { PokemonProfile } from './pokemon-profile'

describe('PokemonProfile', () => {
  it('shows loading state initially', () => {
    renderWithProviders(<PokemonProfile id={1} />)

    expect(screen.getByTestId('profile-loading')).toBeInTheDocument()
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
      const link = screen.getByRole('link', { name: /back to the pokedex/i })
      expect(link).toHaveAttribute('href', '/')
    })
  })

  it('renders type badges for the pokemon', async () => {
    renderWithProviders(<PokemonProfile id={1} />)

    await waitFor(() => {
      expect(screen.getByText('Grass')).toBeInTheDocument()
    })

    expect(screen.getByText('Poison')).toBeInTheDocument()
  })

  it('shows error state and retry button when request fails', async () => {
    server.use(
      http.get('/api/pokemon/:id', () => {
        return HttpResponse.error()
      }),
    )

    renderWithProviders(<PokemonProfile id={1} />)

    await waitFor(() => {
      expect(screen.getByTestId('profile-error')).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })
})
