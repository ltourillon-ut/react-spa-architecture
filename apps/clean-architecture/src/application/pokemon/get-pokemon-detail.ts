import type { PokemonDetail, PokemonId } from '@/domain/pokemon'

import type { PokemonRepository } from './pokemon-repository'

export type GetPokemonDetailInput = {
  id: PokemonId
}

export type GetPokemonDetailUseCase = (input: GetPokemonDetailInput) => Promise<PokemonDetail>

type CreateGetPokemonDetailUseCaseDeps = {
  pokemonRepository: PokemonRepository
}

export function createGetPokemonDetailUseCase({
  pokemonRepository,
}: CreateGetPokemonDetailUseCaseDeps): GetPokemonDetailUseCase {
  return ({ id }) => pokemonRepository.getPokemonDetail(id)
}
