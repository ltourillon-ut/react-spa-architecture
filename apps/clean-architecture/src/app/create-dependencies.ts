import {
  createGetPokemonDetailUseCase,
  createGetPokemonListUseCase,
  type PokemonUseCases,
} from '@/application/pokemon'
import { createApiClient } from '@/infrastructure/http'
import { createHttpPokemonRepository } from '@/infrastructure/pokemon'

export function createAppDependencies(): { pokemonUseCases: PokemonUseCases } {
  const apiClient = createApiClient()
  const pokemonRepository = createHttpPokemonRepository({ apiClient })

  return {
    pokemonUseCases: {
      getPokemonList: createGetPokemonListUseCase({ pokemonRepository }),
      getPokemonDetail: createGetPokemonDetailUseCase({ pokemonRepository }),
    },
  }
}
