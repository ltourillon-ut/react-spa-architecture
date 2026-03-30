# Frontend Standards

## Server State

- No raw `useEffect` for data fetching. All server state goes through query/mutation hooks (TanStack Query or similar).
- Query keys follow a consistent convention: `[scope, resource, params]`.
- Server state stays in the query cache. Do not copy it into Zustand, Redux, or React context.
- Mutations use the library's mutation hooks with explicit invalidation — no manual refetching via `useEffect`.
- Error and loading states are handled through the library's built-in status, not manual `useState` flags.
- Conventions for cache invalidation strategy are documented per feature.

### Query hook pattern

Query hooks are colocated inside the feature that owns the data:

```ts
// features/tests/api/use-tests-query.ts
import { useQuery } from '@tanstack/react-query'
import { fetchTests } from '@/shared/api/tests-api'
import type { Test } from '../model/test.types'

export function useTestsQuery(projectId: string) {
  return useQuery<Test[]>({
    queryKey: ['tests', 'list', { projectId }],
    queryFn: () => fetchTests(projectId),
  })
}
```

```ts
// features/tests/api/use-create-test-mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTest } from '@/shared/api/tests-api'

export function useCreateTestMutation(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests', 'list', { projectId }] })
    },
  })
}
```

### Don't copy server state into client stores

```ts
// Bad: syncing query data into Zustand
const { data: tests } = useTestsQuery(projectId)
useEffect(() => {
  if (tests) setTests(tests) // don't do this
}, [tests])

// Good: consume query data directly
const { data: tests = [], isLoading } = useTestsQuery(projectId)
```

## Client State

- State is local by default — `useState`, `useReducer`, or component-scoped context.
- Promote to a shared store only when two or more unrelated components need to read or write it.
- Shared stores are scoped per feature/domain, not one global store for the entire app.
- Server state never goes into a client store — that belongs in the query cache.
- No derived state in stores. If it can be computed from existing state, compute it at render time.
- Context is for dependency injection and narrow subtree sharing, not as a global state mechanism.
- Each store has a clear owner (one feature/slice). If two features need the same store, it moves to `shared` with explicit justification.

### When to promote state to a store

```tsx
// Local state is enough — only this component cares
function TestFilters() {
  const [search, setSearch] = useState('')
  return <input value={search} onChange={(e) => setSearch(e.target.value)} />
}

// Store is justified — sidebar and header both need the active filter
// features/tests/model/test-filters.store.ts
export const useTestFiltersStore = create<TestFiltersState>((set) => ({
  status: 'all',
  setStatus: (status: string) => set({ status }),
}))
```

### Don't store derived state

```ts
// Bad: storing a value that can be computed
const [tests, setTests] = useState<Test[]>([])
const [activeCount, setActiveCount] = useState(0)
useEffect(() => {
  setActiveCount(tests.filter((t) => t.status === 'active').length)
}, [tests])

// Good: compute during render
const activeCount = tests.filter((t) => t.status === 'active').length
```

## Form State

- Use a dedicated form library (React Hook Form or similar) for non-trivial forms. Native state is fine for simple one-or-two-field forms.
- Pick one form library and use it consistently across repos.
- Validation rules live on the form schema, not scattered in submit handlers.
- Form state stays local — don't push it into shared stores unless the form spans multiple routes/steps.

## React Rules of Thumb

- Components stay pure: render derives UI from props and state, no side effects during render.
- Do not store derived state — if it can be computed from existing state, compute it at render time.
- Prefer event handlers for user-driven actions. Effects are for synchronization with external systems only.
- Before reaching for `useEffect`, consult React's official guidance: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect).
- Extract custom hooks to isolate reusable behavior, not just to move code out of a component.
- Prefer composition over giant components with many boolean props.
- Define consistent patterns for loading, empty, error, and retry states across the app.
- Memoization is opt-in for measured performance problems, not a default habit.

### Composition over boolean props

```tsx
// Bad: one component doing everything via flags
<TestCard showActions showParticipants isCompact isEditable showStatusBadge />

// Good: compose smaller pieces
<TestCard>
  <TestCard.Status />
  <TestCard.Participants />
  <TestCard.Actions />
</TestCard>
```

### Consistent loading/empty/error states

```tsx
// Bad: every component handles it differently
if (loading) return <p>Loading...</p>
if (!data) return <p>Nothing here</p>
if (error) return <p>Something went wrong</p>

// Good: shared pattern across the app
if (isLoading) return <LoadingState />
if (error) return <ErrorState message="Failed to load tests" onRetry={refetch} />
if (!tests.length) return <EmptyState title="No tests yet" />
```

### useEffect: sync only, not for logic

```tsx
// Bad: useEffect for derived state
const [fullName, setFullName] = useState('')
useEffect(() => {
  setFullName(`${firstName} ${lastName}`)
}, [firstName, lastName])

// Good: compute during render
const fullName = `${firstName} ${lastName}`
```

```tsx
// Bad: useEffect to react to an event
useEffect(() => {
  if (submitted) saveForm()
}, [submitted])

// Good: call it from the event handler
function handleSubmit() {
  saveForm()
}
```

```tsx
// Good: useEffect for actual external sync (e.g. analytics, DOM APIs)
useEffect(() => {
  analytics.page('TestDetails', { testId })
}, [testId])
```

## TypeScript

- Do not use `any` in app logic. Allowed only for third-party boundary shims/mocks/tests with inline justification.

## Accessibility & i18n

- User-facing strings should come from i18n keys (inline copy only as explicit fallback).
- Ensure interactive elements are keyboard-accessible and have accessible names/roles.

### Accessible interactive elements

```tsx
// Bad: div pretending to be a button
<div onClick={handleDelete}>Delete</div>

// Bad: icon button with no accessible name
<button onClick={handleDelete}>
  <TrashIcon />
</button>

// Good: semantic element with accessible name
<button onClick={handleDelete} aria-label="Delete test">
  <TrashIcon />
</button>
```
