import type { PokemonDetail, PokemonStat } from './pokemon.types'

const defaults: PokemonDetail = {
  id: 1,
  name: 'Bulbasaur',
  spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  types: ['Grass', 'Poison'],
  height: '0.71 m',
  weight: '6.9 kg',
  abilities: ['Overgrow', 'Chlorophyll'],
  stats: [
    { name: 'HP', value: 45 },
    { name: 'Attack', value: 49 },
    { name: 'Defense', value: 49 },
    { name: 'Sp. Atk', value: 65 },
    { name: 'Sp. Def', value: 65 },
    { name: 'Speed', value: 45 },
  ],
}

export function buildPokemonDetail(overrides?: Partial<PokemonDetail>): PokemonDetail {
  return { ...defaults, ...overrides }
}

export function buildPokemonStat(overrides?: Partial<PokemonStat>): PokemonStat {
  return { name: 'HP', value: 45, ...overrides }
}
