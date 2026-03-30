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

### Boundary mocking with MSW

```tsx
// features/tests/ui/test-list.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '@/shared/testing/server'
import { buildTest } from '../model/test.factory'
import { TestList } from './test-list'

const tests = [
  buildTest({ name: 'Checkout flow', status: 'active' }),
  buildTest({ name: 'Onboarding', status: 'draft' }),
]

beforeEach(() => {
  server.use(
    http.get('/api/tests', () => HttpResponse.json(tests)),
  )
})

it('renders tests and filters by status', async () => {
  render(<TestList projectId="123" />)

  expect(await screen.findByText('Checkout flow')).toBeInTheDocument()
  expect(screen.getByText('Onboarding')).toBeInTheDocument()

  await userEvent.click(screen.getByRole('button', { name: /active/i }))

  expect(screen.getByText('Checkout flow')).toBeInTheDocument()
  expect(screen.queryByText('Onboarding')).not.toBeInTheDocument()
})
```

### What not to mock

```tsx
// Bad: mocking internal hooks — tests implementation, not behavior
vi.mock('../api/use-tests-query', () => ({
  useTestsQuery: () => ({ data: mockTests, isLoading: false }),
}))

// Bad: mocking the router
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

// Good: let internals run for real, mock only the network
server.use(
  http.get('/api/tests', () => HttpResponse.json(mockTests)),
)
```

## Test Data

- Builders or factories are the default for all test data. No ad hoc hardcoded object literals in tests.
- Use a factory/builder library to reduce boilerplate — hand-rolling every builder is not required.
- If using Zod schemas for validation, consider generating test data from them to keep a single source of truth.
- Fixtures are reserved for stable API contract shapes only — not as the default way to create test data.
- No random/faker data unless deterministic and clearly justified.
- Test setup stays close to the test. Shared builders/factories live in the feature that owns the domain object.

### Factory / builder pattern

```ts
// features/tests/model/test.factory.ts
import type { Test } from './test.types'

const defaults: Test = {
  id: 'test-1',
  name: 'Default test',
  status: 'draft',
  createdAt: '2025-01-01T00:00:00Z',
  participantCount: 0,
}

export function buildTest(overrides: Partial<Test> = {}): Test {
  return { ...defaults, ...overrides }
}
```

### Usage in tests

```ts
// Minimal — just override what matters for this test
const draft = testFactory.build({ status: 'draft' })
const active = testFactory.build({ name: 'Checkout flow', status: 'active', participantCount: 12 })
const batch = testFactory.buildList(5, { status: 'active' })

// Fixtures — only for stable API contract shapes
// features/tests/model/test.fixture.ts
export const testListResponse = [
  { id: 'test-1', name: 'Checkout flow', status: 'active', createdAt: '2025-01-01T00:00:00Z', participantCount: 5 },
  { id: 'test-2', name: 'Onboarding', status: 'draft', createdAt: '2025-02-01T00:00:00Z', participantCount: 0 },
]
```

## Conventions

- Tests are colocated next to the file they test (`{name}.test.tsx`), not in a parallel `__tests__` tree.
- Prefer `data-testid` and page objects over brittle CSS/text selectors.
- Do not commit `.only` or `.skip`.
