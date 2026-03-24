const architectureLayers = ['app', 'presentation', 'infrastructure', 'application', 'domain']
const appImports = [...architectureLayers, 'mocks']

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['boundaries', 'import'],
  extends: ['plugin:import/recommended', 'plugin:import/typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'boundaries/ignore': ['**/mocks/**/*'],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.app.json',
      },
    },
    'boundaries/elements': [
      {
        type: 'app',
        pattern: 'src/main.tsx',
        mode: 'file',
      },
      {
        type: 'app',
        pattern: 'src/app/**/*',
        mode: 'file',
      },
      {
        type: 'mocks',
        pattern: '../../mocks/**/*',
        mode: 'file',
      },
      {
        type: 'presentation',
        pattern: 'src/presentation/**/*',
        mode: 'file',
      },
      {
        type: 'infrastructure',
        pattern: 'src/infrastructure/**/*',
        mode: 'file',
      },
      {
        type: 'application',
        pattern: 'src/application/**/*',
        mode: 'file',
      },
      {
        type: 'domain',
        pattern: 'src/domain/**/*',
        mode: 'file',
      },
    ],
  },
  rules: {
    'boundaries/no-unknown-files': 'error',
    'boundaries/no-unknown': 'error',
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        message:
          '${file.type} cannot depend on ${dependency.type}. Follow the Clean Architecture dependency rule.',
        rules: [
          {
            from: 'app',
            allow: appImports,
          },
          {
            from: 'presentation',
            allow: ['presentation', 'application', 'domain'],
          },
          {
            from: 'infrastructure',
            allow: ['infrastructure', 'application', 'domain'],
          },
          {
            from: 'application',
            allow: ['application', 'domain'],
          },
          {
            from: 'domain',
            allow: ['domain'],
          },
        ],
      },
    ],
    'boundaries/external': [
      'error',
      {
        default: 'allow',
        rules: [
          {
            from: 'domain',
            disallow: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query', 'axios'],
          },
          {
            from: 'application',
            disallow: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query', 'axios'],
          },
          {
            from: 'infrastructure',
            disallow: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
          },
          {
            from: 'presentation',
            disallow: ['axios'],
          },
        ],
      },
    ],
    'import/no-cycle': 'error',
  },
  ignorePatterns: ['dist'],
}
