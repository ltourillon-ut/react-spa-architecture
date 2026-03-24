import React from 'react'
import ReactDOM from 'react-dom/client'

import { AppProviders } from '@/app/providers'
import { createAppQueryClient } from '@/app/query-client'
import { AppRouter } from '@/app/router'
import '@/app/styles.css'
import { enableMocking } from '@mocks/browser'

async function bootstrap() {
  await enableMocking()

  const container = document.getElementById('root')

  if (!container) {
    throw new Error('The root container could not be found.')
  }

  const queryClient = createAppQueryClient()

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <AppProviders queryClient={queryClient}>
        <AppRouter />
      </AppProviders>
    </React.StrictMode>,
  )
}

void bootstrap()
