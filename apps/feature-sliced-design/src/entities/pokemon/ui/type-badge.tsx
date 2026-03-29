import { useTranslation } from 'react-i18next'

import { getPokemonTypeClasses } from '../model/pokemon'
import type { PokemonType } from '../model/pokemon.types'

type TypeBadgeProps = {
  type: PokemonType
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const { t } = useTranslation()

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getPokemonTypeClasses(type)}`}>
      {t(`entities.pokemon.types.${type}`)}
    </span>
  )
}
