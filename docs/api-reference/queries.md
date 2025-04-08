---
id: queries
title: Queries
sidebar_label: Queries
sidebar_position: 2
---

## Overview

Queries in Zustand Q allow you to fetch data asynchronously and seamlessly update your store, integrating tightly with Zustand's state management. They are inspired by Tanstack React Query's `useQuery`, offering a simple yet powerful way to handle async operations.

## Configuration

Define queries in the `queries` object of `createStore`. Each query is configured with the following properties:

```typescript
queries: {
  getData: {
    queryFn: (variables: TVariables) => Promise<TData>,
    onStore: (data: TData, set: SetState<TState>) => void,
    enabled?: boolean,
    dependencies?: unknown[],
    onStart?: () => void,
    onSuccess?: (data: TData) => void,
    onError?: (error: unknown) => void,
    onFinish?: (data?: TData, error?: unknown) => void,
  },
},
```

- **`queryFn`**: An async function that fetches data, accepting `variables` (type `TVariables`) and returning a promise of `TData`.
- **`onStore`**: A function to update the store with the fetched `TData`, using Zustand's `set` method.
- **`enabled`**: Controls whether the query runs automatically when mounted (defaults to `true`).
- **`dependencies`**: An array of values; if any change, the query refetches.
- **Lifecycle Hooks**: Optional callbacks (`onStart`, `onSuccess`, `onError`, `onFinish`) for handling fetch lifecycle events.

> Note: `TVariables` and `TData` are generic types you define based on your query's input and output.

## Usage

Call a query from your store with optional configuration overrides to customize its behavior:

```typescript
const { isPending, refetch } = useMyStore().getData({
  fnVariables: { id: "1" },
  enabled: true,
  dependencies: [someValue],
  onStart: () => console.log("Starting fetch..."),
  onSuccess: (data) => console.log("Fetched:", data),
  onError: (error) => console.error("Error:", error),
  onFinish: (data, error) => console.log("Finished with:", data || error),
});
```

### Optional Configuration Overrides

When calling a query, you can provide an object with the following optional properties:

- **`fnVariables?: TVariables`**: Variables passed to `queryFn` for dynamic data fetching (e.g., an ID or query params).
- **`enabled?: boolean`**: Overrides the `enabled` value from the query configuration. If `false`, the query won’t run automatically.
- **`dependencies?: unknown[]`**: Overrides the `dependencies` array from the configuration, triggering a refetch when these values change.
- **`onStart?: () => void`**: Runs **after** the `onStart` from the configuration when fetching begins.
- **`onSuccess?: (data: TData) => void`**: Runs **after** the `onSuccess` from the configuration on successful fetch.
- **`onError?: (error: unknown) => void`**: Runs **after** the `onError` from the configuration if an error occurs.
- **`onFinish?: (data?: TData, error?: unknown) => void`**: Runs **after** the `onFinish` from the configuration when fetching completes, receiving `data` (if successful) or `error` (if failed).

> **Note**: The `enabled` and `dependencies` values provided here will **override** those in the original configuration. Lifecycle hooks (`onStart`, `onSuccess`, `onError`, `onFinish`) will execute **after** their counterparts in the configuration, allowing you to extend or customize behavior.

### Return Values

Queries return an object with the following properties:

- **`isPending`**: `boolean` - `true` while the query is fetching.
- **`isSuccess`**: `boolean` - `true` if the query completed successfully.
- **`isError`**: `boolean` - `true` if the query failed.
- **`error`**: `unknown` - The error object if the query fails.
- **`refetch`**: `() => void` - Manually triggers a refetch of the query.
- **`successAt`**: `number | undefined` - Timestamp (in milliseconds) of the last successful fetch, or `undefined` if not yet successful.
- **`errorAt`**: `number | undefined` - Timestamp (in milliseconds) of the last error, or `undefined` if no error occurred.
- **`status`**: `"success" | "error" | "pending"` - Current state of the query.

## Example

Here’s a practical example of fetching a list of cats:

```typescript
import { createStore } from "zustand-q";
import axios from "axios";

interface Cat {
  id: string;
  name: string;
}

export const useCatStore = createStore({
  initialData: { cats: [] as Cat[] },
  queries: {
    getCatList: {
      queryFn: async () =>
        await axios.get<{ data: Cat[] }>("https://api.example.com/cats"),
      onStore: (data, set) => set({ cats: data.data }),
      onStart: () => console.log("Query started from config"),
    },
  },
});

const App = () => {
  const { cats, getCatList } = useCatStore();
  const { isPending, refetch, status } = getCatList({
    enabled: true,
    onStart: () => console.log("Query started from override"),
    onSuccess: (data) => console.log("Cats fetched:", data.data),
  });

  return (
    <div>
      <button onClick={refetch} disabled={isPending}>
        {isPending ? "Loading..." : "Fetch Cats"}
      </button>
      <p>Status: {status}</p>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>
            {cat.name} (ID: {cat.id})
          </li>
        ))}
      </ul>
    </div>
  );
};
```

In this example:

- The `getCatList` query fetches a list of cats and updates the `cats` array in the store.
- The `onStart` from the configuration runs first, followed by the `onStart` from the override.
- The component shows the fetch status and renders the fetched cats.
