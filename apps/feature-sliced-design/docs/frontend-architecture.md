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

### Public API per slice

Each slice exposes only what consumers need through an `index.ts` barrel:

```ts
// features/tests/index.ts — public API
export { TestList } from './ui/test-list'
export { useTestsQuery } from './api/use-tests-query'
export type { Test } from './model/test.types'
```

```ts
// Bad: deep import bypassing public API
import { TestList } from '@/features/tests/ui/test-list'

// Good: import from the slice barrel
import { TestList } from '@/features/tests'
```

### Layer boundaries

```ts
// Bad: feature importing from another feature
// features/participants/ui/participant-list.tsx
import { useTestsQuery } from '@/features/tests'

// Good: cross-feature coordination happens in a parent layer (widgets or pages)
// widgets/test-participants/ui/test-participants.tsx
import { TestHeader } from '@/features/tests'
import { ParticipantList } from '@/features/participants'
```

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
| Factories | `{name}.factory.ts` | `build{Name}` | `test.factory.ts` → `buildTest` |

- Suffixes are mandatory — no `Service`, `Manager`, `Handler` drift across repos.
- One component per file. File name matches the export name (kebab-case file → PascalCase export).

## File Colocation

- Tests are colocated next to the file they test, not in a parallel `__tests__` tree.
- Types, constants, styles, and schemas live inside the slice that owns them.
- Query hooks are colocated within the feature/slice that owns the data.
- Shared builders live in the feature that owns the domain object.

Example file tree for a feature slice:

```
features/
  tests/
    api/
      use-tests-query.ts
      use-create-test-mutation.ts
    ui/
      test-list.tsx
      test-list.test.tsx
      test-card.tsx
      test-card.test.tsx
    model/
      test.types.ts
      test.factory.ts
    index.ts
```

## UI System

- Use `@usertestingenterprise/core-design-system-library` for design tokens (colors, typography, spacing, icons, variables).
- Use `@usertestingenterprise/core-design-system-library-react` components first. Custom-build only when the design system genuinely doesn't cover the need.
- Always use `Ut`-prefixed components (e.g. `UtButton`, `UtCard`). Never use legacy `Tk`-prefixed components in new code.
- Feature-specific components stay inside the feature. Promote to `shared` only when reused by two or more features.
- Shared UI components are presentational — no business logic, no store access, no data fetching.
- Shared components have explicit prop-driven APIs. No implicit dependencies on context or global state.
- Avoid custom CSS. Use design system tokens and components for all styling. When custom CSS is unavoidable, use CSS modules only — no inline styles, no raw values. Always reference design system variables (e.g. `var(--ut-spacing-md)`) instead of hardcoded values.
