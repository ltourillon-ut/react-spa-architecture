import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import { PokemonProfile } from '@/widgets/pokemon-profile'
import { parsePokemonId } from '@/entities/pokemon'
import { StatePanel } from '@/shared/ui/state-panel'

export function PokemonDetailPage() {
  const { t } = useTranslation()
  const { id: rawId } = useParams()
  const id = parsePokemonId(rawId)

  if (id === null) {
    return (
      <StatePanel
        eyebrow={t('pages.pokemonDetail.notFoundEyebrow')}
        title={t('pages.pokemonDetail.notFoundTitle')}
        description={t('pages.pokemonDetail.notFoundDescription')}
        action={
          <Link
            to="/"
            className="inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            {t('shared.backToPokedex')}
          </Link>
        }
      />
    )
  }

  return <PokemonProfile id={id} />
}
