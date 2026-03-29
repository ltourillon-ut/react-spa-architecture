# Frontend Architecture

## Application Structure

- Follow Feature-Sliced Design (FSD) as the structural reference.
- Layers: `app → pages → widgets → features → entities → shared`.
- Layers import downward only. No upward or sideways imports.
- Features do not import from other features. Cross-feature coordination goes through `shared` or a parent layer.
- Each slice exposes a public API (`index.ts`). No deep imports into a slice's internals.
- `shared` is not a dumping ground — only genuinely reused, business-logic-free code belongs there.
- New code follows FSD structure. Existing code remains as-is unless actively modified.
- Import boundaries are enforced via linting (e.g. `eslint-plugin-boundaries`), not just documentation.

## Naming Conventions

All files use **kebab-case**. No PascalCase filenames.

| Type | File name | Export name | Example |
|------|-----------|-------------|---------|
| Components | `kebab-case.tsx` | `PascalCase` | `user-card.tsx` → `UserCard` |
| Pages | `{name}-page.tsx` | `{Name}Page` | `settings-page.tsx` → `SettingsPage` |
| Hooks | `use-{name}.ts` | `use{Name}` | `use-user-filters.ts` → `useUserFilters` |
| Query hooks | `use-{resource}-query.ts` | `use{Resource}Query` | `use-users-query.ts` → `useUsersQuery` |
| Stores | `{name}.store.ts` | `use{Name}Store` | `filter.store.ts` → `useFilterStore` |
| Types | `{name}.types.ts` | — | `user.types.ts` |
| Tests | `{name}.test.tsx` | — | `user-card.test.tsx` |
| Builders | `{name}.builder.ts` | `{Name}Builder` | `user.builder.ts` → `UserBuilder` |

- Suffixes are mandatory — no `Service`, `Manager`, `Handler` drift across repos.
- One component per file. File name matches the export name (kebab-case file → PascalCase export).

## File Colocation

- Tests are colocated next to the file they test, not in a parallel `__tests__` tree.
- Types, constants, styles, and schemas live inside the slice that owns them.
- Query hooks are colocated within the feature/slice that owns the data.
- Shared builders live in the feature that owns the domain object.

## UI System

- Use Mosaïc as the default for UI primitives. Custom-build only when the design system doesn't cover the need.
- Feature-specific components stay inside the feature. Promote to `shared` only when reused by two or more features.
- Shared UI components are presentational — no business logic, no store access, no data fetching.
- Shared components have explicit prop-driven APIs. No implicit dependencies on context or global state.
