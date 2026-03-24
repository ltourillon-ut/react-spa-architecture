import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

import type { PokemonUseCases } from '@/application/pokemon'
import { PokemonApplicationProvider } from '@/presentation/pokemon'

type AppProvidersProps = PropsWithChildren<{
  queryClient: QueryClient
  pokemonUseCases: PokemonUseCases
}>

export function AppProviders({ children, pokemonUseCases, queryClient }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonApplicationProvider value={pokemonUseCases}>{children}</PokemonApplicationProvider>
    </QueryClientProvider>
  )
}
