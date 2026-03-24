import { queryOptions, useQuery } from '@tanstack/react-query'

import type { GetPokemonDetailUseCase, GetPokemonListUseCase } from '@/application/pokemon'
import type { PokemonId } from '@/domain/pokemon'
import { unwrapPokemonId } from '@/domain/pokemon'

import { usePokemonUseCases } from './pokemon-application-context'

export const pokemonQueryKeys = {
  all: ['pokemon'] as const,
  list: () => [...pokemonQueryKeys.all, 'list'] as const,
  detail: (id: PokemonId) => [...pokemonQueryKeys.all, 'detail', unwrapPokemonId(id)] as const,
}

export function createPokemonListQueryOptions(getPokemonList: GetPokemonListUseCase) {
  return queryOptions({
    queryKey: pokemonQueryKeys.list(),
    queryFn: getPokemonList,
    staleTime: 1000 * 60 * 5,
  })
}

export function createPokemonDetailQueryOptions(
  getPokemonDetail: GetPokemonDetailUseCase,
  id: PokemonId,
) {
  return queryOptions({
    queryKey: pokemonQueryKeys.detail(id),
    queryFn: () => getPokemonDetail({ id }),
    staleTime: 1000 * 60 * 5,
  })
}

export function usePokemonQueries() {
  const { getPokemonDetail, getPokemonList } = usePokemonUseCases()

  return {
    list: () => createPokemonListQueryOptions(getPokemonList),
    detail: (id: PokemonId) => createPokemonDetailQueryOptions(getPokemonDetail, id),
  }
}

export function usePokemonListQuery() {
  const pokemonQueries = usePokemonQueries()

  return useQuery(pokemonQueries.list())
}

export function usePokemonDetailQuery(id: PokemonId) {
  const pokemonQueries = usePokemonQueries()

  return useQuery(pokemonQueries.detail(id))
}
