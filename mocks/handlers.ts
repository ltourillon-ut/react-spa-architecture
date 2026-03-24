import { delay, http, HttpResponse } from 'msw'

import { pokemonDetails, pokemonSummaries } from '@mocks/data/pokemon'

export const handlers = [
  http.get('/api/pokemon', async () => {
    await delay(250)

    return HttpResponse.json({
      data: pokemonSummaries,
    })
  }),

  http.get('/api/pokemon/:id', async ({ params }) => {
    await delay(300)

    const id = Number(params.id)
    const pokemon = pokemonDetails.find((entry) => entry.id === id)

    if (!Number.isInteger(id) || !pokemon) {
      return HttpResponse.json(
        {
          error: {
            code: 'NOT_FOUND',
            message: `Pokemon ${params.id} was not found.`,
          },
        },
        { status: 404 },
      )
    }

    return HttpResponse.json({
      data: pokemon,
    })
  }),
]
