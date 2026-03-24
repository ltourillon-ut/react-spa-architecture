import { createContext, PropsWithChildren, useContext } from 'react'

import type { PokemonUseCases } from '@/application/pokemon'

const PokemonApplicationContext = createContext<PokemonUseCases | null>(null)

type PokemonApplicationProviderProps = PropsWithChildren<{
  value: PokemonUseCases
}>

export function PokemonApplicationProvider({
  children,
  value,
}: PokemonApplicationProviderProps) {
  return (
    <PokemonApplicationContext.Provider value={value}>
      {children}
    </PokemonApplicationContext.Provider>
  )
}

export function usePokemonUseCases() {
  const value = useContext(PokemonApplicationContext)

  if (!value) {
    throw new Error('Pokemon application context is not available.')
  }

  return value
}
