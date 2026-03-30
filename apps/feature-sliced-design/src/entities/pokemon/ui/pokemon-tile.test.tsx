import { describe, expect, it } from 'vitest'

import { renderWithProviders, screen } from '@/shared/testing/render'

import { buildPokemonSummary } from '../model/pokemon-summary.factory'

import { PokemonTile } from './pokemon-tile'

describe('PokemonTile', () => {
  it('renders pokemon name and formatted id', () => {
    const pokemon = buildPokemonSummary({ id: 25, name: 'Pikachu' })

    renderWithProviders(<PokemonTile pokemon={pokemon} />)

    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.getByText('#025')).toBeInTheDocument()
  })

  it('renders sprite image with pokemon name as alt', () => {
    const pokemon = buildPokemonSummary({ name: 'Charmander' })

    renderWithProviders(<PokemonTile pokemon={pokemon} />)

    const img = screen.getByAltText('Charmander')
    expect(img).toBeInTheDocument()
  })

  it('renders type badges', () => {
    const pokemon = buildPokemonSummary({ types: ['Fire', 'Flying'] })

    renderWithProviders(<PokemonTile pokemon={pokemon} />)

    expect(screen.getByText('Fire')).toBeInTheDocument()
    expect(screen.getByText('Flying')).toBeInTheDocument()
  })

  it('links to the correct detail route', () => {
    const pokemon = buildPokemonSummary({ id: 6 })

    renderWithProviders(<PokemonTile pokemon={pokemon} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/pokemon/6')
  })

  it('shows singular type count for single-type pokemon', () => {
    const pokemon = buildPokemonSummary({ types: ['Electric'] })

    renderWithProviders(<PokemonTile pokemon={pokemon} />)

    expect(screen.getByText('1 type')).toBeInTheDocument()
  })

  it('shows plural type count for multi-type pokemon', () => {
    const pokemon = buildPokemonSummary({ types: ['Grass', 'Poison'] })

    renderWithProviders(<PokemonTile pokemon={pokemon} />)

    expect(screen.getByText('2 types')).toBeInTheDocument()
  })
})
