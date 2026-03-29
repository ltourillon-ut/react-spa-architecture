# CLAUDE.md

## Project

React SPA Architecture monorepo -- three parallel Pokedex implementations comparing Clean Architecture, Feature-Sliced Design, and Folder-by-Type patterns.

## Documentation

Each app maintains its own canonical frontend docs. Always consult the relevant app's docs before making changes:

### Clean Architecture (`apps/clean-architecture/docs/`)
- [frontend-architecture.md](apps/clean-architecture/docs/frontend-architecture.md) -- Layer boundaries, dependency rules, DI patterns
- [frontend-standards.md](apps/clean-architecture/docs/frontend-standards.md) -- Conventions, naming, accessibility, error handling
- [frontend-testing.md](apps/clean-architecture/docs/frontend-testing.md) -- Test strategy, mocks, coverage

### Feature-Sliced Design (`apps/feature-sliced-design/docs/`)
- [frontend-architecture.md](apps/feature-sliced-design/docs/frontend-architecture.md) -- Layer/slice/segment rules, public API patterns
- [frontend-standards.md](apps/feature-sliced-design/docs/frontend-standards.md) -- Conventions, naming, accessibility, error handling
- [frontend-testing.md](apps/feature-sliced-design/docs/frontend-testing.md) -- Test strategy, mocks, coverage

### Folder-by-Type (`apps/folder-by-type/docs/`)
- [frontend-architecture.md](apps/folder-by-type/docs/frontend-architecture.md) -- Folder conventions, import rules
- [frontend-standards.md](apps/folder-by-type/docs/frontend-standards.md) -- Conventions, naming, accessibility, error handling
- [frontend-testing.md](apps/folder-by-type/docs/frontend-testing.md) -- Test strategy, mocks, coverage

## Quick Reference

- **Package manager:** pnpm (workspace monorepo)
- **Stack:** React 19, TypeScript 6 (strict), Vite 6, Tailwind CSS v4, TanStack Query v5, React Router v7, Axios, MSW v2
- **Path aliases:** `@/` -> `./src/`, `@mocks/` -> `../../mocks/`
- **Dev:** `pnpm dev` (folder-by-type default), `pnpm dev:clean-architecture`, `pnpm dev:feature-sliced-design`
- **Build:** `pnpm build` (all apps)
- **Typecheck:** `pnpm typecheck` (all apps)
- **Lint:** `pnpm lint:clean-architecture`, `pnpm lint:feature-sliced-design` (folder-by-type has no lint)
