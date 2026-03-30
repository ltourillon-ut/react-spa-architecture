import { describe, expect, it } from 'vitest'

import { renderWithProviders, screen } from '@/test/render'

import { buildPokemonStat } from '../model/pokemon-detail.factory'

import { StatList } from './stat-list'

describe('StatList', () => {
  it('renders stat names and values', () => {
    const stats = [
      buildPokemonStat({ name: 'HP', value: 45 }),
      buildPokemonStat({ name: 'Attack', value: 80 }),
    ]

    renderWithProviders(<StatList stats={stats} />)

    expect(screen.getByText('HP')).toBeInTheDocument()
    expect(screen.getByText('45')).toBeInTheDocument()
    expect(screen.getByText('Attack')).toBeInTheDocument()
    expect(screen.getByText('80')).toBeInTheDocument()
  })

  it('caps bar width at 100% for values over 100', () => {
    const stats = [buildPokemonStat({ name: 'Speed', value: 150 })]

    const { container } = renderWithProviders(<StatList stats={stats} />)

    const bar = container.querySelector('[style]') as HTMLElement
    expect(bar.style.width).toBe('100%')
  })

  it('sets correct percentage width for normal values', () => {
    const stats = [buildPokemonStat({ name: 'Defense', value: 65 })]

    const { container } = renderWithProviders(<StatList stats={stats} />)

    const bar = container.querySelector('[style]') as HTMLElement
    expect(bar.style.width).toBe('65%')
  })
})
