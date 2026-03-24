import pokemonFixtureData from '@mocks/data/pokemon-fixtures.json'

export const pokemonDetails = pokemonFixtureData

export const pokemonSummaries = pokemonDetails.map(({ id, name, spriteUrl, types }) => ({
  id,
  name,
  spriteUrl,
  types,
}))
