# Frontend Testing

## What to Test

- Default to integration-style tests: render the component, simulate user interaction, assert on visible outcomes.
- Unit tests are for pure logic, complex transformations, and isolated hooks — not for testing components in isolation.
- E2e tests cover critical cross-page journeys and high-risk production flows only.
- Test business behavior, not implementation details. Don't assert on internal state, hook calls, or component structure.
- New code includes test updates/additions for any behavior change.

## How to Mock

- Mock at the network boundary only (MSW or similar). No mocking internal hooks, stores, or router.
- Browser APIs and third-party services can be mocked when needed.
- If you need to mock internals to test something, the code probably needs refactoring, not more mocks.

## Test Data

- Builders are the default for domain objects — sensible defaults, explicit overrides.
- Fixtures for stable API payloads or contract-like reference shapes.
- No random/faker data unless deterministic and clearly justified.
- Test setup stays close to the test. Shared builders live in the feature that owns the domain object.

## Conventions

- Tests are colocated next to the file they test (`{name}.test.tsx`), not in a parallel `__tests__` tree.
- Prefer `data-testid` and page objects over brittle CSS/text selectors.
- Do not commit `.only` or `.skip`.
