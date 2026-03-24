import type { GetPokemonDetailUseCase } from './get-pokemon-detail'
import type { GetPokemonListUseCase } from './get-pokemon-list'

export {
  createGetPokemonDetailUseCase,
  type GetPokemonDetailInput,
  type GetPokemonDetailUseCase,
} from './get-pokemon-detail'
export { createGetPokemonListUseCase, type GetPokemonListUseCase } from './get-pokemon-list'
export type { PokemonRepository } from './pokemon-repository'

export interface PokemonUseCases {
  getPokemonDetail: GetPokemonDetailUseCase
  getPokemonList: GetPokemonListUseCase
}
