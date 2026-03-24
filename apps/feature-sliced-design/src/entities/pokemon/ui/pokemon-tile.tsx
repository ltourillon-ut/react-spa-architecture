import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { pokemonQueries } from '../api'
import { formatPokemonId } from '../model/pokemon'
import type { PokemonSummary } from '../model/pokemon.types'

import { TypeBadge } from './type-badge'

type PokemonTileProps = {
  pokemon: PokemonSummary
}

export function PokemonTile({ pokemon }: PokemonTileProps) {
  const queryClient = useQueryClient()

  function prefetchPokemonDetail() {
    void queryClient.prefetchQuery(pokemonQueries.detail({ id: pokemon.id }))
  }

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      onFocus={prefetchPokemonDetail}
      onMouseEnter={prefetchPokemonDetail}
      className="group flex h-full flex-col gap-4 rounded-3xl border border-slate-800/80 bg-slate-900/70 p-4 transition hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-slate-400">
        <span>{formatPokemonId(pokemon.id)}</span>
        <span>{pokemon.types.length} type{pokemon.types.length > 1 ? 's' : ''}</span>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-2xl bg-slate-950/80 p-4">
        <img
          src={pokemon.spriteUrl}
          alt={pokemon.name}
          loading="lazy"
          className="size-24 transition duration-200 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-white">{pokemon.name}</h2>

        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <TypeBadge
              key={type}
              type={type}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
