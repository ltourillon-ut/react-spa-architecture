import { apiClient } from '@/shared/api'

import type { PokemonSummary, PokemonSummaryResponse } from '../model/pokemon.types'

export async function getPokemonList(): Promise<PokemonSummary[]> {
  const response = await apiClient.get<PokemonSummaryResponse>('/pokemon')
  return response.data.data
}
