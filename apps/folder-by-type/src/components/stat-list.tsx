import type { PokemonStat } from '@/api/pokemon/pokemon.types'

interface StatListProps {
  stats: PokemonStat[]
}

export function StatList({ stats }: StatListProps) {
  return (
    <div className="space-y-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="space-y-2"
        >
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>{stat.name}</span>
            <span className="font-semibold text-white">{stat.value}</span>
          </div>

          <div className="h-2 rounded-full bg-slate-800">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-500"
              style={{ width: `${Math.min(stat.value, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
