import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { renderWithProviders, screen, waitFor } from '@/test/render'
import { server } from '@/test/setup'

import { PokemonRoster } from './pokemon-roster'

describe('PokemonRoster', () => {
  it('shows loading state initially', () => {
    renderWithProviders(<PokemonRoster />)

    expect(screen.getByText('Loading Pokedex')).toBeInTheDocument()
    expect(screen.getByText('Fetching the first generation Pokemon roster.')).toBeInTheDocument()
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
      expect(screen.getByText('No Pokemon found')).toBeInTheDocument()
    })

    expect(screen.getByText('Empty roster')).toBeInTheDocument()
  })
})
