import type { PokemonDetail, PokemonId, PokemonSummary } from '@/domain/pokemon'

export interface PokemonRepository {
  getPokemonList(): Promise<PokemonSummary[]>
  getPokemonDetail(id: PokemonId): Promise<PokemonDetail>
}
