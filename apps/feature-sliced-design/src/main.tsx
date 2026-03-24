import { enableMocking } from '@mocks/browser'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { QueryProvider } from '@/app/providers'
import { AppRouter } from '@/app/router'
import '@/app/styles/index.css'
import { queryClient } from '@/shared/api'

async function bootstrap() {
  await enableMocking()

  const container = document.getElementById('root')

  if (!container) {
    throw new Error('The root container could not be found.')
  }
  ReactDOM.createRoot(container).render(
    <StrictMode>
      <QueryProvider client={queryClient}>
        <AppRouter />
      </QueryProvider>
    </StrictMode>,
  )
}

void bootstrap()
