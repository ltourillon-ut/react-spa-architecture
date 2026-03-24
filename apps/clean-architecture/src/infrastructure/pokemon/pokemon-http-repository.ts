import type { AxiosInstance } from 'axios'

import type { PokemonRepository } from '@/application/pokemon'
import { unwrapPokemonId } from '@/domain/pokemon'

import { mapPokemonDetail, mapPokemonSummary } from './pokemon-response-mappers'
import type { PokemonDetailResponse, PokemonSummaryResponse } from './pokemon-response'

type CreateHttpPokemonRepositoryDeps = {
  apiClient: AxiosInstance
}

export function createHttpPokemonRepository({
  apiClient,
}: CreateHttpPokemonRepositoryDeps): PokemonRepository {
  return {
    async getPokemonList() {
      const response = await apiClient.get<PokemonSummaryResponse>('/pokemon')
      return response.data.data.map(mapPokemonSummary)
    },
    async getPokemonDetail(id) {
      const response = await apiClient.get<PokemonDetailResponse>(
        `/pokemon/${unwrapPokemonId(id)}`,
      )

      return mapPokemonDetail(response.data.data)
    },
  }
}
