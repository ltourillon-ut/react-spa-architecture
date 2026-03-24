export const MAX_POKEMON_ID = 151

declare const pokemonIdBrand: unique symbol

export type PokemonId = number & {
  readonly [pokemonIdBrand]: 'PokemonId'
}

export function createPokemonId(value: number): PokemonId | null {
  if (!Number.isInteger(value) || value < 1 || value > MAX_POKEMON_ID) {
    return null
  }

  return value as PokemonId
}

export function parsePokemonId(rawId: string | undefined): PokemonId | null {
  return createPokemonId(Number(rawId))
}

export function unwrapPokemonId(id: PokemonId) {
  return id as number
}
