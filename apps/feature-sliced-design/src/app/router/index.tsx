import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PokedexPage } from '@/pages/pokedex'
import { PokemonDetailPage } from '@/pages/pokemon-detail'

import { RootLayout } from './root-layout'

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
