import type { PokemonType } from '@/api/pokemon/pokemon.types'
import { getPokemonTypeClasses } from '@/lib/pokemon'

interface TypeBadgeProps {
  type: PokemonType
}

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getPokemonTypeClasses(type)}`}>
      {type}
    </span>
  )
}
