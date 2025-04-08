---
id: core-concepts
title: Core Concepts
sidebar_label: Core Concepts
sidebar_position: 4
---

## Overview

Zustand Q builds on the foundation of Zustand, enhancing it with features tailored for modern React applications. This section explores the core concepts that define `zustand-q`, including its differences from vanilla Zustand, support for asynchronous operations, and integrations like devtools and persistence.

## Differences from Zustand's `create`

Zustand Q’s `createStore` extends the original `create` function from Zustand, offering a more powerful and type-safe API. Here’s how it differs:

- **Asynchronous Support**:

  - `create`: Limited to synchronous state updates via `set`.
  - `createStore`: Adds built-in `queries` and `mutations` for async data fetching and updates.

- **Simplified Devtools & Persistence**:

  - `create`: Requires manual middleware setup (e.g., `devtools`, `persist`).
  - `createStore`: Integrates these features directly with `devtoolsName` and `persistName` options.

- **Type Improvements**:
  - `create`: Basic TypeScript support with manual type definitions.
  - `createStore`: Enhanced typing for state, actions, queries, and mutations using generics.

### Example Comparison

**Vanilla Zustand (`create`)**:

```typescript
import create from "zustand";

interface State {
  count: number;
}

const useStore = create<State>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

**Zustand Q (`createStore`)**:

```typescript
import { createStore } from "zustand-q";

interface State {
  count: number;
}

const useStore = createStore<State, { increment: () => void }>({
  initialData: { count: 0 },
  actions: (set) => ({
    increment: () => set((state) => ({ count: state.count + 1 })),
  }),
  devtoolsName: "CounterStore",
});
```

In `zustand-q`, the configuration object provides a structured approach, with optional async features and better TypeScript inference.

## Queries and Mutations

Zustand Q introduces two powerful abstractions for managing asynchronous state:

### Queries

Queries handle data fetching and store updates, inspired by Tanstack React Query’s `useQuery`.

- **Purpose**: Fetch data from an API and sync it with the store.
- **Key Features**:

  - `queryFn`: Async function to fetch data.
  - `onStore`: Updates the store with fetched data.
  - `enabled`: Controls automatic fetching (default: `true`).
  - Lifecycle hooks: `onStart`, `onSuccess`, `onError`, `onFinish`.

- **Example**:

  ```typescript
  const useStore = createStore({
    initialData: { items: [] as string[] },
    queries: {
      getItems: {
        queryFn: async () => ({ data: ["item1", "item2"] }),
        onStore: (data, set) => set({ items: data.data }),
      },
    },
  });

  const { items, getItems } = useStore();
  getItems({ enabled: true });
  ```

### Mutations

Mutations manage state changes like creating, updating, or deleting data.

- **Purpose**: Perform async operations that modify the store.
- **Key Features**:

  - `mutationFn`: Async function to execute the mutation.
  - `onStore`: Applies the mutation result to the store.
  - Lifecycle hooks: `onStart`, `onSuccess`, `onError`, `onFinish`.

- **Example**:

  ```typescript
  const useStore = createStore({
    initialData: { items: [] as string[] },
    mutations: {
      addItem: {
        mutationFn: async (vars: { name: string }) => ({ data: vars.name }),
        onStore: (data, set) =>
          set((state) => ({ items: [...state.items, data.data] })),
      },
    },
  });

  const { addItem } = useStore();
  const { mutate } = addItem();
  mutate({ name: "newItem" });
  ```

For detailed usage, see [createStore](./api-reference/create-store), [Queries](./api-reference/queries), and [Mutations](./api-reference/mutations).

## Devtools and Persistence

Zustand Q simplifies debugging and state persistence with built-in options:

### Devtools

Enable Redux DevTools integration for real-time state inspection.

- **Usage**:
  ```typescript
  const useStore = createStore({
    initialData: { count: 0 },
    actions: (set) => ({
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    devtoolsName: "MyStore",
  });
  ```
- **Result**: Open Redux DevTools in your browser to see the store labeled "MyStore", track state changes, and replay actions.

- **Benefits**: Streamlines debugging without extra middleware setup.

### Persistence

Persist state to local storage to retain it across sessions.

- **Usage**:
  ```typescript
  const useStore = createStore({
    initialData: { theme: "light" as "light" | "dark" },
    persistName: "app-theme",
  });
  ```
- **Result**: The state is saved to `localStorage` under `"app-theme"` and restored on page reload.

- **Benefits**: Ideal for preserving user preferences or app settings with minimal effort.

## Key Benefits

- **Unified API**: Combines synchronous and asynchronous state management in one configuration.
- **Type Safety**: Leverages TypeScript generics for robust error checking (see [Type Improvements](./type-improvements)).
- **Ease of Use**: Reduces boilerplate for devtools and persistence compared to vanilla Zustand.
- **Flexibility**: Scales from simple state to complex async workflows.

Zustand Q’s core concepts make it a modern, developer-friendly evolution of Zustand, tailored for real-world React applications.
