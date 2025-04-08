---
id: selectors
title: Selectors
sidebar_label: Selectors
sidebar_position: 5
---

## Overview

Selectors in Zustand Q allow you to efficiently access and derive specific parts of the state from a store. They are a core feature of Zustand, enabling you to extract values or compute derived state while minimizing unnecessary re-renders. By using selectors, you can optimize performance and keep your components reactive only to the state they care about.

## Syntax

Selectors can be used in two ways when accessing state from a `createStore`:

### 1. Function Selector

```typescript
const value = useStore((state) => state.key);
```

### 2. String Selector

```typescript
const value = useStore<T>("key");
```

- **`useStore`**: The hook provided by your store (e.g., `useMyStore`) or `zustand-q`’s global `useStore`.
- **`state => state.key`**: A function selector that takes the entire state and returns a specific value or computed result.
- **`"key"`**: A string selector that directly accesses a state property by its key.
- **`T`**: The TypeScript generic type for the selected value, ensuring type safety (required for string selectors).

> **Note**: Both selector types are memoized by Zustand, meaning the component only re-renders when the selected value changes (based on shallow equality). In `zustand-q`, string selectors are a convenient shorthand for function selectors.

## Usage

### Basic Example

Access a counter value from a store:

```typescript
import { createStore } from "zustand-q";

interface State {
  count: number;
}

export const useMyStore = createStore({
  initialData: { count: 0 } as State,
});

const App = () => {
  const count = useMyStore((state) => state.count); // Function selector
  const count2 = useMyStore<number>("count"); // String selector

  return (
    <div>
      Count: {count} (or {count2})
    </div>
  );
};
```

### Computed Values with Function Selector

Derive a computed value:

```typescript
import { createStore } from "zustand-q";

interface State {
  firstName: string;
  lastName: string;
}

export const useMyStore = createStore({
  initialData: { firstName: "John", lastName: "Doe" } as State,
});

const App = () => {
  const fullName = useMyStore(
    (state) => `${state.firstName} ${state.lastName}`
  );

  return <div>Full Name: {fullName}</div>;
};
```

### Optimizing Performance

Prevent unnecessary re-renders with selectors:

```typescript
import { createStore } from "zustand-q";

interface State {
  count: number;
  unrelatedData: string;
}

export const useMyStore = createStore({
  initialData: { count: 0, unrelatedData: "hello" } as State,
  actions: (set) => ({
    increment: () => set((state) => ({ count: state.count + 1 })),
    updateUnrelated: () => set({ unrelatedData: "world" }),
  }),
});

const Counter = () => {
  const count = useMyStore((state) => state.count); // Only re-renders when count changes
  console.log("Counter rendered");
  return <div>Count: {count}</div>;
};

const App = () => {
  const { increment, updateUnrelated } = useMyStore();
  return (
    <div>
      <Counter />
      <button onClick={increment}>Increment</button>
      <button onClick={updateUnrelated}>Update Unrelated</button>
    </div>
  );
};
```

In this example, the `Counter` component only re-renders when `count` changes, not when `unrelatedData` is updated, thanks to memoization.

## Comparison

| Feature         | String Selector  | Function Selector |
| --------------- | ---------------- | ----------------- |
| Syntax          | Simple (`"key"`) | Flexible (fn)     |
| Type Safety     | Yes (via `T`)    | Yes (inferred)    |
| Computed Values | No               | Yes               |
| Memoization     | Yes (automatic)  | Yes (automatic)   |
| Use Case        | Direct access    | Derived state     |
