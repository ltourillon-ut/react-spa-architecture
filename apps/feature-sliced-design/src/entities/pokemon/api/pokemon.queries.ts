import { queryOptions } from '@tanstack/react-query'

import { getPokemonDetail, type PokemonDetailQuery } from './get-pokemon-detail'
import { getPokemonList } from './get-pokemon-list'

export const pokemonQueries = {
  all: () => ['pokemon'] as const,
  lists: () => [...pokemonQueries.all(), 'list'] as const,
  list: () =>
    queryOptions({
      queryKey: pokemonQueries.lists(),
      queryFn: getPokemonList,
      staleTime: 1000 * 60 * 5,
    }),
  details: () => [...pokemonQueries.all(), 'detail'] as const,
  detail: (query: PokemonDetailQuery) =>
    queryOptions({
      queryKey: [...pokemonQueries.details(), query.id],
      queryFn: () => getPokemonDetail(query),
      staleTime: 1000 * 60 * 5,
    }),
}
