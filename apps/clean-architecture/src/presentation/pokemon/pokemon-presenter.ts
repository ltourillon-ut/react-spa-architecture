import type { PokemonId, PokemonType } from '@/domain/pokemon'
import { unwrapPokemonId } from '@/domain/pokemon'

const pokemonTypeClasses: Record<PokemonType, string> = {
  Bug: 'bg-lime-500/20 text-lime-200 ring-1 ring-lime-400/40',
  Dragon: 'bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-400/40',
  Electric: 'bg-yellow-500/20 text-yellow-100 ring-1 ring-yellow-400/40',
  Fairy: 'bg-pink-500/20 text-pink-100 ring-1 ring-pink-400/40',
  Fighting: 'bg-orange-500/20 text-orange-100 ring-1 ring-orange-400/40',
  Fire: 'bg-rose-500/20 text-rose-100 ring-1 ring-rose-400/40',
  Flying: 'bg-sky-500/20 text-sky-100 ring-1 ring-sky-400/40',
  Ghost: 'bg-violet-500/20 text-violet-100 ring-1 ring-violet-400/40',
  Grass: 'bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-400/40',
  Ground: 'bg-amber-500/20 text-amber-100 ring-1 ring-amber-400/40',
  Ice: 'bg-cyan-500/20 text-cyan-100 ring-1 ring-cyan-400/40',
  Normal: 'bg-slate-500/20 text-slate-100 ring-1 ring-slate-300/40',
  Poison: 'bg-fuchsia-500/20 text-fuchsia-100 ring-1 ring-fuchsia-400/40',
  Psychic: 'bg-pink-500/20 text-pink-100 ring-1 ring-pink-400/40',
  Rock: 'bg-stone-500/20 text-stone-100 ring-1 ring-stone-300/40',
  Water: 'bg-blue-500/20 text-blue-100 ring-1 ring-blue-400/40',
}

export function formatPokemonId(id: PokemonId) {
  return `#${unwrapPokemonId(id).toString().padStart(3, '0')}`
}

export function getPokemonTypeClasses(type: PokemonType) {
  return pokemonTypeClasses[type]
}
