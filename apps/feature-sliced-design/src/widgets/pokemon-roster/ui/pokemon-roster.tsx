import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { pokemonApi, PokemonTile } from '@/entities/pokemon'
import { StatePanel } from '@/shared/ui/state-panel'

import { PokemonGrid } from './pokemon-grid'

export function PokemonRoster() {
  const { t } = useTranslation()
  const { data: pokemon, isPending, isError, refetch } = useQuery(pokemonApi.pokemonQueries.list())

  if (isPending) {
    return (
      <StatePanel
        data-testid="roster-loading"
        eyebrow={t('widgets.pokemonRoster.loadingEyebrow')}
        title={t('widgets.pokemonRoster.loadingTitle')}
        description={t('widgets.pokemonRoster.loadingDescription')}
      />
    )
  }

  if (isError) {
    return (
      <StatePanel
        data-testid="roster-error"
        eyebrow={t('widgets.pokemonRoster.errorEyebrow')}
        title={t('widgets.pokemonRoster.errorTitle')}
        description={t('widgets.pokemonRoster.errorDescription')}
        action={
          <button
            onClick={() => void refetch()}
            className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            {t('widgets.pokemonRoster.retryButton')}
          </button>
        }
      />
    )
  }

  if (!pokemon || pokemon.length === 0) {
    return (
      <StatePanel
        data-testid="roster-empty"
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
