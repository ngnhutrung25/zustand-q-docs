---
id: create-store
title: createStore
sidebar_label: createStore
sidebar_position: 1
---

## Overview

The `createStore` function is the foundation of Zustand Q, enabling you to create a centralized store for managing state, actions, and asynchronous operations like queries and mutations. It combines the simplicity of Zustand’s state management with powerful async capabilities, while offering optional integrations like persistence and Redux DevTools for enhanced development workflows.

## Syntax

Define a store with the following configuration:

```typescript
createStore<TState, TActions, TQueries, TMutations>({
  initialData: TState,
  actions: (
    set: SetState<TState>,
    get: GetState<TState>,
    api: StoreApi<TState>
  ) => TActions,
  queries: TQueries,
  mutations: TMutations,
  persistName: string,
  devtoolsName: string,
});
```

- **`initialData: TState`**:

  - The initial state of the store, typed as `TState`.
  - Required to set up the store’s starting values.

- **`actions?: (set, get, api) => TActions`**:

  - An optional function to define synchronous state updates (actions).
  - Receives:
    - `set`: Function to update the state.
    - `get`: Function to access the current state.
    - `api`: The full store API for advanced usage.
  - Returns an object of type `TActions` containing action methods.

- **`queries?: TQueries`**:

  - Optional configurations for fetching data asynchronously.
  - See [Queries](./queries) for details.

- **`mutations?: TMutations`**:

  - Optional configurations for mutating data asynchronously (e.g., POST, PUT, DELETE).
  - See [Mutations](./mutations) for details.

- **`persistName?: string`**:

  - Optional key to persist the store’s state to local storage.
  - State is saved and restored across sessions using this name.

- **`devtoolsName?: string`**:
  - Optional name for the store in Redux DevTools.
  - Helps identify the store during debugging.

> **Note**: The generic types (`TState`, `TActions`, `TQueries`, `TMutations`) ensure type safety across your store’s state and operations.

## Usage

### Basic Store with Actions

Create a simple counter store:

```typescript
import { createStore } from "zustand-q";

interface State {
  count: number;
}

export const useMyStore = createStore<State, { increment: () => void }>({
  initialData: { count: 0 },
  actions: (set) => ({
    increment: () => set((state) => ({ count: state.count + 1 })),
  }),
});

const App = () => {
  const { count, increment } = useMyStore();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
```

### Store with Queries and Mutations

Manage a list of cats with async operations:

```typescript
import { createStore } from "zustand-q";
import axios from "axios";

interface Cat {
  id: string;
  name: string;
}

interface State {
  cats: Cat[];
}

export const useCatStore = createStore({
  initialData: { cats: [] as Cat[] },
  actions: (set) => ({
    clearCats: () => set({ cats: [] }),
  }),
  queries: {
    getCatList: {
      queryFn: async () =>
        await axios.get<{ data: Cat[] }>("https://api.example.com/cats"),
      onStore: (data, set) => set({ cats: data.data }),
    },
  },
  mutations: {
    addCat: {
      mutationFn: async (variables: { name: string }) =>
        await axios.post<{ data: Cat }>(
          "https://api.example.com/cats",
          variables
        ),
      onStore: (data, set) =>
        set((state) => ({ cats: [...state.cats, data.data] })),
    },
  },
  persistName: "cat-store",
  devtoolsName: "CatStore",
});

const App = () => {
  const { cats, clearCats, getCatList, addCat } = useCatStore();
  const { refetch } = getCatList({ enabled: true });
  const { mutate: createCat } = addCat();

  return (
    <div>
      <button onClick={refetch}>Fetch Cats</button>
      <button onClick={() => createCat({ name: "Mimi" })}>Add Cat</button>
      <button onClick={clearCats}>Clear Cats</button>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

In this example:

- `actions` defines a `clearCats` method.
- `queries` fetches the cat list.
- `mutations` adds a new cat.
- `persistName` saves the state to local storage.
- `devtoolsName` labels the store in Redux DevTools.

## Integration Details

### Queries and Mutations

`createStore` supports asynchronous state management through `queries` (data fetching) and `mutations` (data updates). Refer to:

- [Queries](./queries)
- [Mutations](./mutations)

### Persistence

Enable persistence by setting `persistName`. The state will be saved to `localStorage` under the specified key and restored on page reload.

### DevTools

Enable Redux DevTools by setting `devtoolsName`. Open the DevTools extension to inspect state changes and dispatch actions.

## Notes

- **Type Safety**: Use TypeScript generics to enforce type consistency across `initialData`, `actions`, `queries`, and `mutations`.
- **Flexibility**: `createStore` scales from simple state management to complex async workflows, making it suitable for small and large apps alike.
- **Persistence**: Use `persistName` for states you want to retain across sessions (e.g., user preferences). Avoid persisting sensitive data unless encrypted.
- **DevTools**: `devtoolsName` is optional but highly recommended during development for debugging and state inspection.
- **When to Use**: Choose `createStore` when you need a centralized store with actions, queries, or mutations. For simpler global state, consider `useStore` (see [useStore](./use-store)).

## Tips

- **Modularize Large Stores**: Split actions, queries, and mutations into separate files for large projects and combine them in `createStore`.
- **Debugging**: Combine `devtoolsName` with console logs in actions to trace state changes effectively.
- **Performance**: Avoid overusing persistence for frequently changing state to prevent I/O bottlenecks.
