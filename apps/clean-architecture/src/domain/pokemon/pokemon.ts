import type { PokemonId } from './pokemon-id'

export type PokemonType =
  | 'Bug'
  | 'Dragon'
  | 'Electric'
  | 'Fairy'
  | 'Fighting'
  | 'Fire'
  | 'Flying'
  | 'Ghost'
  | 'Grass'
  | 'Ground'
  | 'Ice'
  | 'Normal'
  | 'Poison'
  | 'Psychic'
  | 'Rock'
  | 'Water'

export interface PokemonSummary {
  id: PokemonId
  name: string
  spriteUrl: string
  types: PokemonType[]
}

export interface PokemonStat {
  name: string
  value: number
}

export interface PokemonDetail extends PokemonSummary {
  imageUrl: string
  height: string
  weight: string
  abilities: string[]
  stats: PokemonStat[]
}
