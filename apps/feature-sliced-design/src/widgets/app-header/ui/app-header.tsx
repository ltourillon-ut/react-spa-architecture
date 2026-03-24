import { useIsFetching } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export function AppHeader() {
  const activeQueries = useIsFetching()
  const isFetching = activeQueries > 0

  return (
    <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 px-6 py-5 backdrop-blur sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Feature Sliced Design</p>

        <div>
          <Link
            to="/"
            className="text-3xl font-semibold tracking-tight text-white transition hover:text-cyan-200"
          >
            Pokedex
          </Link>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
            React Router for routing, TanStack Query for server state, MSW for local
            development mocks, and Tailwind utilities only.
          </p>
        </div>
      </div>

      <div className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-300">
        {isFetching ? 'Syncing data' : 'Ready'}
      </div>
    </header>
  )
}
