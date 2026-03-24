import { PropsWithChildren } from 'react'

export function PokemonGrid({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">{children}</div>
}
