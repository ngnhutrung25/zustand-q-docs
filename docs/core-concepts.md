---
id: core-concepts
title: Core Concepts
sidebar_label: Core Concepts
sidebar_position: 4
---

## Differences from Zustand's `create`

Zustand Q extends the original `create` function from Zustand with additional features:

- **Asynchronous Support**: Built-in queries and mutations for fetching and updating data.
- **Simplified Devtools & Persistence**: Enable debugging and state persistence with minimal configuration.
- **Type Improvements**: Enhanced TypeScript support for safer code.

Unlike `create`, `createStore` in Zustand Q accepts a configuration object with `initialData`, `actions`, `queries`, `mutations`, `devtoolsName`, and `persistName`.

## Queries and Mutations

Zustand Q introduces two key concepts for asynchronous state management:

### Queries

Queries are used to fetch data and update the store. They are similar to Tanstack React Query's `useQuery`.

- **Example**: Fetching a list of items.
- **Features**: `queryFn`, `onStore`, `enabled`, lifecycle hooks (`onStart`, `onSuccess`, etc.).

### Mutations

Mutations handle state changes like adding, updating, or deleting data.

- **Example**: Adding a new item to a list.
- **Features**: `mutationFn`, `onStore`, lifecycle hooks.

See [API Reference](./api-reference/create-store) for detailed usage.

## Devtools and Persistence

### Devtools

Enable Redux DevTools integration with `devtoolsName`:

```typescript
const useStore = createStore({
  initialData: { count: 0 },
  devtoolsName: "MyStore",
});
```

Open Redux DevTools in your browser to inspect the store named "MyStore".

### Persistence

Persist state to local storage with `persistName`:

```typescript
const useStore = createStore({
  initialData: { theme: "light" },
  persistName: "app-theme",
});
```

The state will persist across page reloads under the key `"app-theme"`.
