---
id: type-improvements
title: Type Improvements
sidebar_label: Type Improvements
sidebar_position: 6
---

## Why TypeScript Matters

Zustand Q is built with TypeScript at its core, providing a robust and type-safe experience that enhances developer productivity and reduces runtime errors. While vanilla Zustand offers basic TypeScript support, Zustand Q takes it further by introducing detailed type definitions for state, actions, queries, and mutations. This ensures early error detection, better IDE support (e.g., autocompletion, refactoring), and a more maintainable codebase—especially in large-scale applications with complex async workflows.

## Key Type Features

Zustand Q’s type system offers the following improvements:

- **State Typing (`TState`)**:

  - Define the exact shape of your store’s state with a custom interface or type.
  - Prevents invalid state updates and ensures consistency across your app.

- **Action Typing (`TActions`)**:

  - Type-safe action functions with full inference for parameters and return types.
  - Guarantees that actions match the state structure they modify.

- **Query Typing**:

  - Strongly-typed `queryFn` with `TVariables` and `TData` for input and output.
  - `onStore` ensures the fetched data aligns with `TState`.
  - Lifecycle hooks (`onSuccess`, `onError`, etc.) are typed to match the query’s data or errors.

- **Mutation Typing**:
  - `mutationFn` enforces type safety for variables and responses.
  - `onStore` validates that mutation results integrate correctly with the state.
  - Return values (e.g., `mutate`, `status`) are fully typed for predictable behavior.

These features make `zustand-q` a powerful choice for TypeScript developers, bridging the gap between simplicity and safety.

## Usage Examples

### Basic State and Actions

Define a typed store with state and actions:

```typescript
import { createStore } from "zustand-q";

interface CounterState {
  count: number;
}

interface CounterActions {
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = createStore<CounterState, CounterActions>({
  initialData: { count: 0 },
  actions: (set) => ({
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }),
});

const App = () => {
  const { count, increment } = useCounterStore();
  return <button onClick={increment}>Count: {count}</button>;
};
```

- `count` is typed as `number`.
- `increment` is inferred as `() => void`.
- TypeScript catches errors if you try to assign `count` a string or call `increment` with arguments.

### Queries with Async Data

Fetch a list of cats with typed queries:

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
      queryFn: async () => ({
        data: [{ id: "1", name: "Mimi" }] as { data: Cat[] },
      }),
      onStore: (data, set) => set({ cats: data.data }),
      onSuccess: (data) => console.log("Fetched cats:", data.data),
    },
  },
});

const App = () => {
  const { cats, getCatList } = useCatStore();
  const { refetch } = getCatList({ enabled: true });
  return (
    <ul>
      {cats.map((cat) => (
        <li key={cat.id}>{cat.name}</li>
      ))}
    </ul>
  );
};
```

- `cats` is typed as `Cat[]`.
- `queryFn` returns `{ data: Cat[] }`, and TypeScript enforces this structure.
- `onStore` ensures `data.data` matches `Cat[]`.

### Mutations with Type Safety

Add a cat with a typed mutation:

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
  mutations: {
    addCat: {
      mutationFn: async (variables: { name: string }) =>
        ({ data: { id: "2", name: variables.name } } as { data: Cat }),
      onStore: (data, set) =>
        set((state) => ({ cats: [...state.cats, data.data] })),
    },
  },
});

const App = () => {
  const { addCat } = useCatStore();
  const { mutate: createCat } = addCat();
  return <button onClick={() => createCat({ name: "Lulu" })}>Add Cat</button>;
};
```

- `variables` is typed as `{ name: string }`.
- `mutationFn` returns `{ data: Cat }`, enforced by TypeScript.
- `mutate` accepts only `{ name: string }`, preventing invalid calls.

## Type Definitions

Zustand Q provides comprehensive type definitions to support its features. Key types include:

- **`QueryConfig<TData, TVariables, TState>`**: Defines the structure of a query, including `queryFn` (`TVariables => Promise<TData>`), `onStore` (`TData => TState`), and lifecycle hooks.
- **`MutationConfig<TData, TVariables, TState>`**: Shapes a mutation with `mutationFn` and `onStore`, ensuring type-safe async updates.
- **`QueryHook<TData, TVariables>`**: Types the return value of a query (e.g., `isPending`, `refetch`), with `TVariables` for dynamic inputs.
- **`MutationHook<TData, TVariables>`**: Types the mutation hook’s output (e.g., `mutate`, `status`), aligning with `TData` responses.

Explore the full definitions in the [source code](https://github.com/ngnhutrung25/zustand-q/blob/main/src/types.ts).

## Benefits

- **Error Prevention**: Catch type mismatches at compile time (e.g., passing a number to a string field).
- **IDE Support**: Get autocompletion and hover documentation in editors like VS Code.
- **Scalability**: Maintain type consistency as your app grows, especially with complex async logic.

Zustand Q’s type improvements make it a standout choice for TypeScript-first projects, offering both simplicity and safety.
