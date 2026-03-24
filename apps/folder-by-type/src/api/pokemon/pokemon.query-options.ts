import { queryOptions } from '@tanstack/react-query'

import { getPokemonDetail, getPokemonList } from '@/api/pokemon/pokemon.service'
import { pokemonKeys } from '@/api/pokemon/pokemon.keys'

export function pokemonListQueryOptions() {
  return queryOptions({
    queryKey: pokemonKeys.list(),
    queryFn: getPokemonList,
    staleTime: 1000 * 60 * 5,
  })
}

export function pokemonDetailQueryOptions(id: number) {
  return queryOptions({
    queryKey: pokemonKeys.detail(id),
    queryFn: () => getPokemonDetail(id),
    staleTime: 1000 * 60 * 5,
  })
}
