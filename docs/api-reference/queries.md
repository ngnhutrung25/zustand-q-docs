---
id: queries
title: queries
sidebar_label: queries
sidebar_position: 2
---

## Overview

Queries in Zustand Q are used to fetch data asynchronously and update the store. They are similar to Tanstack React Query's `useQuery`.

## Configuration

Define queries in the `queries` object of `createStore`:

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
    onFinish?: () => void,
  },
},
```

- **queryFn**: Async function to fetch data.
- **onStore**: Updates the store with fetched data.
- **enabled**: Whether the query runs automatically (default: `true`).
- **dependencies**: Array of values to trigger refetching.
- **Lifecycle Hooks**: `onStart`, `onSuccess`, `onError`, `onFinish`.

## Usage

```typescript
const { isPending, refetch } = useMyStore().getData({
  enabled: true,
  onSuccess: (data) => console.log("Fetched:", data),
});
```

### Return Values

- **isPending**: `true` while fetching.
- **isSuccess**: `true` on successful fetch.
- **isError**: `true` on error.
- **error**: Error object if failed.
- **refetch**: Function to manually refetch data.

## Example

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
    },
  },
});

const App = () => {
  const { getCatList } = useCatStore();
  const { isPending, refetch } = getCatList({ enabled: true });

  return (
    <button onClick={refetch}>{isPending ? "Loading..." : "Fetch Cats"}</button>
  );
};
```
