import { Link, useParams } from 'react-router-dom'

import { PokemonProfile } from '@/widgets/pokemon-profile'
import { parsePokemonId } from '@/entities/pokemon'
import { StatePanel } from '@/shared/ui/state-panel'

export function PokemonDetailPage() {
  const { id: rawId } = useParams()
  const id = parsePokemonId(rawId)

  if (id === null) {
    return (
      <StatePanel
        eyebrow="404"
        title="Pokemon not found"
        description="The requested Pokemon id is invalid. Use a number between 1 and 151."
        action={
          <Link
            to="/"
            className="inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Back to the Pokedex
          </Link>
        }
      />
    )
  }

  return <PokemonProfile id={id} />
}
