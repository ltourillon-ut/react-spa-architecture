import { apiClient } from '@/api/client'
import type {
  PokemonDetail,
  PokemonDetailResponse,
  PokemonSummary,
  PokemonSummaryResponse,
} from '@/api/pokemon/pokemon.types'

export async function getPokemonList(): Promise<PokemonSummary[]> {
  const response = await apiClient.get<PokemonSummaryResponse>('/pokemon')
  return response.data.data
}

export async function getPokemonDetail(id: number): Promise<PokemonDetail> {
  const response = await apiClient.get<PokemonDetailResponse>(`/pokemon/${id}`)
  return response.data.data
}
