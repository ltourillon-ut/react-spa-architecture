import type { PokemonType } from '@/domain/pokemon'

export interface ApiDataResponse<TData> {
  data: TData
}

export interface PokemonSummaryDto {
  id: number
  name: string
  spriteUrl: string
  types: PokemonType[]
}

export interface PokemonStatDto {
  name: string
  value: number
}

export interface PokemonDetailDto extends PokemonSummaryDto {
  imageUrl: string
  height: string
  weight: string
  abilities: string[]
  stats: PokemonStatDto[]
}

export type PokemonSummaryResponse = ApiDataResponse<PokemonSummaryDto[]>
export type PokemonDetailResponse = ApiDataResponse<PokemonDetailDto>
