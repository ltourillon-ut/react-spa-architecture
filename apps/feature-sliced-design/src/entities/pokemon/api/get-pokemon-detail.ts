import { apiClient } from '@/shared/api'

import type { PokemonDetail, PokemonDetailResponse } from '../model/pokemon.types'

export type PokemonDetailQuery = {
  id: number
}

export async function getPokemonDetail({ id }: PokemonDetailQuery): Promise<PokemonDetail> {
  const response = await apiClient.get<PokemonDetailResponse>(`/pokemon/${id}`)
  return response.data.data
}
