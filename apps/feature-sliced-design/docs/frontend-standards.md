# Frontend Standards

## Server State

- No raw `useEffect` for data fetching. All server state goes through query/mutation hooks (TanStack Query or similar).
- Query keys follow a consistent convention: `[scope, resource, params]`.
- Server state stays in the query cache. Do not copy it into Zustand, Redux, or React context.
- Mutations use the library's mutation hooks with explicit invalidation — no manual refetching via `useEffect`.
- Error and loading states are handled through the library's built-in status, not manual `useState` flags.
- Conventions for cache invalidation strategy are documented per feature.

## Client State

- State is local by default — `useState`, `useReducer`, or component-scoped context.
- Promote to a shared store only when two or more unrelated components need to read or write it.
- Shared stores are scoped per feature/domain, not one global store for the entire app.
- Server state never goes into a client store — that belongs in the query cache.
- No derived state in stores. If it can be computed from existing state, compute it at render time.
- Context is for dependency injection and narrow subtree sharing, not as a global state mechanism.
- Each store has a clear owner (one feature/slice). If two features need the same store, it moves to `shared` with explicit justification.

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

## TypeScript

- Do not use `any` in app logic. Allowed only for third-party boundary shims/mocks/tests with inline justification.

## Accessibility & i18n

- User-facing strings should come from i18n keys (inline copy only as explicit fallback).
- Ensure interactive elements are keyboard-accessible and have accessible names/roles.
