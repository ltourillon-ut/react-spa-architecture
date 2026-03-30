import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { renderWithProviders, screen, waitFor } from '@/shared/testing/render'
import { server } from '@/shared/testing/server'

import { PokemonRoster } from './pokemon-roster'

describe('PokemonRoster', () => {
  it('shows loading state initially', () => {
    renderWithProviders(<PokemonRoster />)

    expect(screen.getByTestId('roster-loading')).toBeInTheDocument()
  })

  it('renders pokemon list after data loads', async () => {
    renderWithProviders(<PokemonRoster />)

    await waitFor(() => {
      expect(screen.getByText('Generation I Pokedex')).toBeInTheDocument()
    })

    expect(screen.getByText('Original 151')).toBeInTheDocument()
    expect(screen.getByText('React Router + TanStack Query + MSW')).toBeInTheDocument()
  })

  it('shows pokemon count badge', async () => {
    renderWithProviders(<PokemonRoster />)

    await waitFor(() => {
      expect(screen.getByText(/\d+ Pokemon/)).toBeInTheDocument()
    })
  })

  it('shows empty state when API returns no pokemon', async () => {
    server.use(
      http.get('/api/pokemon', () => {
        return HttpResponse.json({ data: [] })
      }),
    )

    renderWithProviders(<PokemonRoster />)

    await waitFor(() => {
      expect(screen.getByTestId('roster-empty')).toBeInTheDocument()
    })
  })

  it('shows error state and retry button when request fails', async () => {
    server.use(
      http.get('/api/pokemon', () => {
        return HttpResponse.error()
      }),
    )

    renderWithProviders(<PokemonRoster />)

    await waitFor(() => {
      expect(screen.getByTestId('roster-error')).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })
})
