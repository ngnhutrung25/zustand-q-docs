---
id: type-improvements
title: Type Improvements
sidebar_label: Type Improvements
sidebar_position: 6
---

## Why TypeScript Matters

Zustand Q is designed with TypeScript in mind, offering robust type definitions to catch errors early and improve developer productivity. Unlike vanilla Zustand, Zustand Q provides detailed types for state, actions, queries, and mutations.

## Key Type Features

- **State Typing**: Define the shape of your state with `TState`.
- **Action Typing**: Type-safe actions with `TActions`.
- **Query Typing**: Strongly-typed `queryFn`, `onStore`, and lifecycle hooks.
- **Mutation Typing**: Type-safe `mutationFn` and responses.

## Example

```typescript
import { createStore } from "zustand-q";

interface Cat {
  id: string;
  name: string;
}

interface CatState {
  cats: Cat[];
}

export const useCatStore = createStore({
  initialData: { cats: [] } as CatState,
  queries: {
    getCatList: {
      queryFn: async () => ({ data: [{ id: "1", name: "Mimi" }] }),
      onStore: (data, set) => set({ cats: data.data }),
    },
  },
});
```

In this example, TypeScript ensures that:

- `cats` is an array of `Cat`.
- `queryFn` returns a compatible response.
- `onStore` updates the state correctly.

## Type Definitions

See the full type definitions in the [source code](https://github.com/your-repo/zustand-q/blob/main/types.ts), including:

- `QueryConfig<TData, TVariables, TState>`
- `MutationConfig<TData, TVariables, TState>`
- `QueryHook<TData, TVariables>`
- `MutationHook<TData, TVariables>`
