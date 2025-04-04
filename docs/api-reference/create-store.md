---
id: create-store
title: createStore
sidebar_label: createStore
sidebar_position: 1
---

## Overview

The `createStore` function is the core of Zustand Q, allowing you to define a store with initial state, actions, queries, mutations, and optional devtools/persistence settings.

## Syntax

```typescript
createStore<TState, TActions, TQueries, TMutations>({
  initialData: TState,
  actions: (set, get, api) => TActions,
  queries: TQueries,
  mutations: TMutations,
  persistName: string,
  devtoolsName: string,
});
```

- **initialData**: The initial state of the store.
- **actions**: Optional functions to update the state.
- **queries**: Optional configurations for fetching data (see [Query](./queries)).
- **mutations**: Optional configurations for mutating data (see [Mutation](./mutations)).
- **persistName**: Persist state to local storage with this key.
- **devtoolsName**: Name the store in Redux DevTools for debugging.

## Example

```typescript
import { createStore } from "zustand-q";

interface State {
  count: number;
}

export const useMyStore = createStore({
  initialData: { count: 0 } as State,
  actions: (set) => ({
    increment: () => set((state) => ({ count: state.count + 1 })),
  }),
  devtoolsName: "CounterStore",
});
```

## Using Queries and Mutations

`createStore` supports asynchronous state management through `queries` and `mutations`. For detailed usage, refer to:

- [Query](./queries)
- [Mutation](./mutations)

## Notes

- Use `devtoolsName` to debug your store in Redux DevTools.
- Use `persistName` to save state across sessions.
