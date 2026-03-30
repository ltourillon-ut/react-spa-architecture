import type { PokemonSummary } from './pokemon.types'

const defaults: PokemonSummary = {
  id: 1,
  name: 'Bulbasaur',
  spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  types: ['Grass', 'Poison'],
}

export function buildPokemonSummary(overrides?: Partial<PokemonSummary>): PokemonSummary {
  return { ...defaults, ...overrides }
}
