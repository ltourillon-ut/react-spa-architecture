import type { PokemonSummary } from '@/domain/pokemon'

import type { PokemonRepository } from './pokemon-repository'

export type GetPokemonListUseCase = () => Promise<PokemonSummary[]>

type CreateGetPokemonListUseCaseDeps = {
  pokemonRepository: PokemonRepository
}

export function createGetPokemonListUseCase({
  pokemonRepository,
}: CreateGetPokemonListUseCaseDeps): GetPokemonListUseCase {
  return () => pokemonRepository.getPokemonList()
}
