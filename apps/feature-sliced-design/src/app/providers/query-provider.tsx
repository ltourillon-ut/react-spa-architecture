import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

type QueryProviderProps = PropsWithChildren<{
  client: QueryClient
}>

export function QueryProvider({ children, client }: QueryProviderProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
