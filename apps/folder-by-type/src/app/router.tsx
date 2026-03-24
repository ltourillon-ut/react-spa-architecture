import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { HomeRoute } from '@/routes/home-route'
import { PokemonDetailRoute } from '@/routes/pokemon-detail-route'
import { RootLayout } from '@/routes/root-layout'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<RootLayout />}
        >
          <Route
            index
            element={<HomeRoute />}
          />
          <Route
            path="pokemon/:id"
            element={<PokemonDetailRoute />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
