import { Link } from 'react-router-dom'

import type { PokemonId } from '@/domain/pokemon'
import { StatePanel } from '@/presentation/shared'

import { formatPokemonId } from './pokemon-presenter'
import { usePokemonDetailQuery } from './pokemon-queries'
import { StatList } from './stat-list'
import { TypeBadge } from './type-badge'

type PokemonProfileProps = {
  id: PokemonId
}

export function PokemonProfile({ id }: PokemonProfileProps) {
  const { data: pokemon, isPending } = usePokemonDetailQuery(id)

  if (isPending) {
    return (
      <StatePanel
        eyebrow="Loading"
        title="Loading Pokemon detail"
        description="Fetching the selected Pokemon entry."
      />
    )
  }

  if (!pokemon) {
    return null
  }

  return (
    <div className="space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Back to the Pokedex</span>
      </Link>

      <section className="grid gap-6 xl:grid-cols-[20rem_minmax(0,1fr)]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="flex h-full items-center justify-center rounded-2xl bg-slate-950/80 p-8">
            <img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              className="aspect-square w-full max-w-72 object-contain"
            />
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.32em] text-slate-400">
              <span>{formatPokemonId(pokemon.id)}</span>
              <span>Pokemon Detail</span>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-white">{pokemon.name}</h1>

                <div className="flex flex-wrap gap-2">
                  {pokemon.types.map((type) => (
                    <TypeBadge
                      key={type}
                      type={type}
                    />
                  ))}
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                  <dt className="text-xs uppercase tracking-[0.24em] text-slate-500">Height</dt>
                  <dd className="mt-2 text-lg font-semibold text-white">{pokemon.height}</dd>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                  <dt className="text-xs uppercase tracking-[0.24em] text-slate-500">Weight</dt>
                  <dd className="mt-2 text-lg font-semibold text-white">{pokemon.weight}</dd>
                </div>
              </dl>
            </div>
          </div>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Abilities</h2>
              <ul className="space-y-3">
                {pokemon.abilities.map((ability) => (
                  <li
                    key={ability}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-200"
                  >
                    {ability}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Battle stats</h2>
              <StatList stats={pokemon.stats} />
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
