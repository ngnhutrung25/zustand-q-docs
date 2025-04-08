---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
sidebar_position: 3
---

## Overview

Welcome to Zustand Q! This guide will help you get started with a simple counter application, introducing you to the core concepts of `zustand-q`. Whether you’re new to state management or transitioning from vanilla Zustand, this example demonstrates how easy it is to set up a store, define actions, and use them in your React components. Let’s dive in and build a foundation for exploring more advanced features like queries and mutations.

## Basic Example

Follow these steps to create a simple counter application with Zustand Q.

### Step 1: Create a Store

Define a store with initial state and actions in a dedicated file.

```typescript
// store/counterStore.ts
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
```

- **`initialData`**: Sets the starting state with `count: 0`.
- **`actions`**: Defines `increment` and `decrement` to update the state.

### Step 2: Use the Store in a Component

Integrate the store into your React application.

```typescript
// App.tsx
import { useCounterStore } from "./store/counterStore";

const App = () => {
  const count = useCounterStore((state) => state.count); // Selector for count
  const { increment, decrement } = useCounterStore(); // Destructure actions

  return (
    <div style={{ padding: 20 }}>
      <h1>Counter: {count}</h1>
      <button onClick={increment} style={{ marginRight: 10 }}>
        Increment
      </button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default App;
```

- Run your app (e.g., `npm start`) and interact with the buttons to see the counter update!

### Step 3: Verify It Works

- Open your browser and click "Increment" or "Decrement".
- The `count` value should update instantly, reflecting Zustand Q’s reactive state management.

## Explanation

Here’s how this example works:

- **Store Creation**:

  - `createStore` initializes a store with a typed state (`CounterState`) and actions (`CounterActions`).
  - The `initialData` object defines the starting value (`count: 0`).
  - The `actions` function uses `set` to update the state immutably, ensuring predictable behavior.

- **Component Usage**:

  - The `useCounterStore` hook provides access to the store.
  - A **selector** (`(state) => state.count`) extracts the `count` value, optimizing re-renders by subscribing only to changes in `count`.
  - Destructuring `{ increment, decrement }` gives direct access to action functions.

- **Reactivity**:
  - When `increment` or `decrement` is called, the store updates, and the component re-renders automatically with the new `count`.

This example showcases `zustand-q`’s simplicity and type safety, making it a great starting point for React developers.

## Next Steps

Now that you’ve built a basic counter, explore more of `zustand-q`’s capabilities:

- **Add Asynchronous Logic**: Use `queries` to fetch data or `mutations` to update it (see [Queries](./api-reference/queries) and [Mutations](./api-reference/mutations)).
- **Enable Debugging**: Add `devtoolsName` to inspect your store in Redux DevTools (see [createStore](./api-reference/create-store)).
- **Persist State**: Use `persistName` to save the counter across page reloads (see [createStore](./api-reference/create-store)).
- **Try a Real Example**: Check out the [Cat List](./examples/cat-list) demo for a more complex application.

Start experimenting and see how `zustand-q` fits into your projects!
