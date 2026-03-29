import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { pokemonApi, PokemonTile } from '@/entities/pokemon'
import { StatePanel } from '@/shared/ui/state-panel'

import { PokemonGrid } from './pokemon-grid'

export function PokemonRoster() {
  const { t } = useTranslation()
  const { data: pokemon, isPending } = useQuery(pokemonApi.pokemonQueries.list())

  if (isPending) {
    return (
      <StatePanel
        eyebrow={t('widgets.pokemonRoster.loadingEyebrow')}
        title={t('widgets.pokemonRoster.loadingTitle')}
        description={t('widgets.pokemonRoster.loadingDescription')}
      />
    )
  }

  if (!pokemon || pokemon.length === 0) {
    return (
      <StatePanel
        eyebrow={t('widgets.pokemonRoster.emptyEyebrow')}
        title={t('widgets.pokemonRoster.emptyTitle')}
        description={t('widgets.pokemonRoster.emptyDescription')}
      />
    )
  }

  return (
    <div className="space-y-8">
      <StatePanel
        eyebrow={t('widgets.pokemonRoster.dataEyebrow')}
        title={t('widgets.pokemonRoster.dataTitle')}
        description={t('widgets.pokemonRoster.dataDescription')}
      >
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
            {t('widgets.pokemonRoster.pokemonCount', { count: pokemon.length })}
          </span>
          <span className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1">
            {t('widgets.pokemonRoster.techStack')}
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
