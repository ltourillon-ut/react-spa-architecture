import { enableMocking } from '@mocks/browser'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createAppDependencies } from '@/app/create-dependencies'
import { AppProviders } from '@/app/providers'
import { createAppQueryClient } from '@/app/query-client'
import { AppRouter } from '@/app/router'
import '@/app/styles.css'

async function bootstrap() {
  await enableMocking()

  const container = document.getElementById('root')

  if (!container) {
    throw new Error('The root container could not be found.')
  }

  const queryClient = createAppQueryClient()
  const { pokemonUseCases } = createAppDependencies()

  createRoot(container).render(
    <StrictMode>
      <AppProviders
        queryClient={queryClient}
        pokemonUseCases={pokemonUseCases}
      >
        <AppRouter />
      </AppProviders>
    </StrictMode>,
  )
}

void bootstrap()
