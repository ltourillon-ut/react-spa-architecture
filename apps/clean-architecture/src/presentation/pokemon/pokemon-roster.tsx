import { StatePanel } from '@/presentation/shared'

import { PokemonGrid } from './pokemon-grid'
import { usePokemonListQuery } from './pokemon-queries'
import { PokemonTile } from './pokemon-tile'

export function PokemonRoster() {
  const { data: pokemon, isPending } = usePokemonListQuery()

  if (isPending) {
    return (
      <StatePanel
        eyebrow="Loading"
        title="Loading Pokedex"
        description="Fetching the first generation Pokemon roster."
      />
    )
  }

  if (!pokemon || pokemon.length === 0) {
    return (
      <StatePanel
        eyebrow="Empty roster"
        title="No Pokemon found"
        description="The mocked BFF responded successfully but did not return any Pokemon to display."
      />
    )
  }

  return (
    <div className="space-y-8">
      <StatePanel
        eyebrow="Original 151"
        title="Generation I Pokedex"
        description="Browse the original Pokemon roster. Every card is a route into a detail page that reuses the same TanStack Query contract as the route component."
      >
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
            {pokemon.length} Pokemon
          </span>
          <span className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1">
            React Router + TanStack Query + MSW
          </span>
        </div>
      </StatePanel>

      <PokemonGrid>
        {pokemon.map((entry) => (
          <PokemonTile
            key={entry.id}
            pokemon={entry}
          />
        ))}
      </PokemonGrid>
    </div>
  )
}
