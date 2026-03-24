module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    '@feature-sliced/eslint-config/rules/import-order',
    '@feature-sliced/eslint-config/rules/public-api/lite',
    '@feature-sliced/eslint-config/rules/layers-slices',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.app.json',
      },
    },
  },
  rules: {
    'import/no-internal-modules': [
      'error',
      {
        allow: [
          '**/*(app|processes|pages|widgets|features|entities)/!(ui|model|lib|api|config|assets|ui.*|model.*|lib.*|api.*|config.*|assets.*)',
          '**/*(app|processes|pages|widgets|features|entities)/!(ui|model|lib|api|config|assets|ui.*|model.*|lib.*|api.*|config.*|assets.*)/!(ui|model|lib|api|config|assets|ui.*|model.*|lib.*|api.*|config.*|assets.*)',
          '**/*shared/*(ui|model|lib|api|config|assets|ui.*|model.*|lib.*|api.*|config.*|assets.*)/!(ui|model|lib|api|config|assets|ui.*|model.*|lib.*|api.*|config.*|assets.*)',
          '**/*shared/*(ui|model|lib|api|config|assets|ui.*|model.*|lib.*|api.*|config.*|assets.*)',
          '**/node_modules/**',
          '**/*shared/_*',
          '**/*shared/_*/*',
          'api',
          'api/**',
          'assets',
          'assets/**',
          'config',
          'config/**',
          'lib',
          'lib/**',
          'model',
          'model/**',
          'ui',
          'ui/**',
        ],
      },
    ],
  },
  ignorePatterns: ['dist'],
}
