import {
  createPokemonId,
  type PokemonDetail,
  type PokemonId,
  type PokemonSummary,
} from '@/domain/pokemon'

import type { PokemonDetailDto, PokemonSummaryDto } from './pokemon-response'

function mapPokemonId(id: number): PokemonId {
  const pokemonId = createPokemonId(id)

  if (pokemonId === null) {
    throw new Error(`Received an invalid Pokemon id from the API: ${id}`)
  }

  return pokemonId
}

export function mapPokemonSummary(dto: PokemonSummaryDto): PokemonSummary {
  return {
    id: mapPokemonId(dto.id),
    name: dto.name,
    spriteUrl: dto.spriteUrl,
    types: dto.types,
  }
}

export function mapPokemonDetail(dto: PokemonDetailDto): PokemonDetail {
  return {
    ...mapPokemonSummary(dto),
    abilities: dto.abilities,
    height: dto.height,
    imageUrl: dto.imageUrl,
    stats: dto.stats,
    weight: dto.weight,
  }
}
