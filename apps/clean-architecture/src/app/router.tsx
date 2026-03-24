import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { RootLayout } from '@/presentation/app/root-layout'
import { PokedexPage, PokemonDetailPage } from '@/presentation/pokemon'

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
            element={<PokedexPage />}
          />
          <Route
            path="pokemon/:id"
            element={<PokemonDetailPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
