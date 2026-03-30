export const en = {
  shared: {
    backToPokedex: 'Back to the Pokedex',
  },

  widgets: {
    appHeader: {
      eyebrow: 'Feature Sliced Design',
      title: 'Pokedex',
      description:
        'React Router for routing, TanStack Query for server state, MSW for local development mocks, and Tailwind utilities only.',
      statusSyncing: 'Syncing data',
      statusReady: 'Ready',
    },
    pokemonRoster: {
      loadingEyebrow: 'Loading',
      loadingTitle: 'Loading Pokedex',
      loadingDescription: 'Fetching the first generation Pokemon roster.',
      emptyEyebrow: 'Empty roster',
      emptyTitle: 'No Pokemon found',
      emptyDescription:
        'The mocked BFF responded successfully but did not return any Pokemon to display.',
      errorEyebrow: 'Error',
      errorTitle: 'Failed to load Pokedex',
      errorDescription: 'Something went wrong while fetching the Pokemon roster.',
      retryButton: 'Try again',
      dataEyebrow: 'Original 151',
      dataTitle: 'Generation I Pokedex',
      dataDescription:
        'Browse the original Pokemon roster. Every card is a route into a detail page that reuses the same TanStack Query contract as the route component.',
      pokemonCount_one: '{{count}} Pokemon',
      pokemonCount_other: '{{count}} Pokemon',
      techStack: 'React Router + TanStack Query + MSW',
    },
    pokemonProfile: {
      loadingEyebrow: 'Loading',
      loadingTitle: 'Loading Pokemon detail',
      loadingDescription: 'Fetching the selected Pokemon entry.',
      errorEyebrow: 'Error',
      errorTitle: 'Failed to load Pokemon',
      errorDescription: 'Something went wrong while fetching this Pokemon.',
      retryButton: 'Try again',
      detailLabel: 'Pokemon Detail',
      heightLabel: 'Height',
      weightLabel: 'Weight',
      abilitiesTitle: 'Abilities',
      battleStatsTitle: 'Battle stats',
    },
  },

  pages: {
    pokemonDetail: {
      notFoundEyebrow: '404',
      notFoundTitle: 'Pokemon not found',
      notFoundDescription:
        'The requested Pokemon id is invalid. Use a number between 1 and 151.',
    },
  },

  entities: {
    pokemon: {
      typeCount_one: '{{count}} type',
      typeCount_other: '{{count}} types',
      types: {
        Bug: 'Bug',
        Dragon: 'Dragon',
        Electric: 'Electric',
        Fairy: 'Fairy',
        Fighting: 'Fighting',
        Fire: 'Fire',
        Flying: 'Flying',
        Ghost: 'Ghost',
        Grass: 'Grass',
        Ground: 'Ground',
        Ice: 'Ice',
        Normal: 'Normal',
        Poison: 'Poison',
        Psychic: 'Psychic',
        Rock: 'Rock',
        Water: 'Water',
      },
    },
  },
}
