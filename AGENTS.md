# AGENTS.md

## Documentation

This monorepo contains three frontend apps, each with its own canonical documentation. When working on an app, read its docs first.

### Per-app docs location

Each app under `apps/` has a `docs/` directory containing:

| File                       | Covers                                                        |
|----------------------------|---------------------------------------------------------------|
| `frontend-architecture.md` | App architecture, boundaries, import rules, shared code rules |
| `frontend-standards.md`    | React/TypeScript conventions, component rules, naming, a11y, async/error handling |
| `frontend-testing.md`      | Unit/integration/e2e strategy, mocks, builders, critical flows, coverage |

### Paths

- `apps/clean-architecture/docs/`
- `apps/feature-sliced-design/docs/`
- `apps/folder-by-type/docs/`

## Rules

- These per-app docs are the canonical source of truth for frontend standards.
- Do not duplicate doc content in this file or in CLAUDE.md -- point to the app docs instead.
- When modifying an app, respect the architecture and standards defined in that app's docs.
- Each app may have different conventions -- do not assume rules from one app apply to another.
