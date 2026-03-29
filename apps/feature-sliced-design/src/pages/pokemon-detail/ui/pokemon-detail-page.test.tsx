import { Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { renderWithProviders, screen, waitFor } from '@/test/render'

import { PokemonDetailPage } from './pokemon-detail-page'

function renderDetailPage(id: string) {
  return renderWithProviders(
    <Routes>
      <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
    </Routes>,
    { initialEntries: [`/pokemon/${id}`] },
  )
}

describe('PokemonDetailPage', () => {
  it('renders pokemon profile for a valid id', async () => {
    renderDetailPage('1')

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    })
  })

  it('shows 404 for non-numeric id', () => {
    renderDetailPage('abc')

    expect(screen.getByText('Pokemon not found')).toBeInTheDocument()
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('shows 404 for id above 151', () => {
    renderDetailPage('999')

    expect(screen.getByText('Pokemon not found')).toBeInTheDocument()
  })

  it('renders back link on 404 page', () => {
    renderDetailPage('abc')

    const link = screen.getByRole('link', { name: /back to the pokedex/i })
    expect(link).toHaveAttribute('href', '/')
  })
})
