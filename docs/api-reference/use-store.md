---
id: use-store
title: useStore
sidebar_label: useStore
sidebar_position: 4
---

## Overview

The `useStore` hook in Zustand Q provides a lightweight and intuitive way to manage and share global state across components, combining the simplicity of React's `useState` with Zustand's powerful state management. Unlike `useState`, which is local to a component, `useStore` taps into a global state store, making it ideal for simple state sharing without the overhead of defining a full `createStore`.

## Syntax

The `useStore` hook can be used in two forms:

### 1. Direct Key Access

```typescript
const [value, setValue] = useStore<T>("key", defaultValue);
```

### 2. Selector Function

```typescript
const [value, setValue] = useStore<T>((state) => state.key, defaultValue);
```

- **`T`**: The TypeScript generic type for the state value, ensuring type safety.
- **`key`**: A string representing the state property to access in the global store.
- **`selector`**: An optional function to derive a specific value from the global state (similar to Zustand’s selector pattern).
- **`defaultValue`**: The fallback value of type `T` if the key doesn’t exist in the store.
- **`value`**: The current state value.
- **`setValue`**: A function to update the state, accepting either a new value or a callback `(prev: T) => T`.

## Usage

### Basic Example

Manage a simple theme toggle:

```typescript
import { useStore } from "zustand-q";

const App = () => {
  const [theme, setTheme] = useStore<"dark" | "light">("theme", "light");

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme: {theme}
    </button>
  );
};
```

### Sharing State Between Components

Share a counter value across components:

```typescript
import { useStore } from "zustand-q";

const CounterDisplay = () => {
  const [count] = useStore<number>("count", 0);
  return <p>Count: {count}</p>;
};

const CounterButton = () => {
  const [count, setCount] = useStore<number>("count", 0);
  return (
    <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
  );
};

const App = () => (
  <div>
    <CounterDisplay />
    <CounterButton />
  </div>
);
```

## Notes

- **When to Use `useStore`**: Ideal for simple, standalone state (e.g., theme, user preferences) that needs to be shared across components without the complexity of a full store. For managing complex state with queries, mutations, or multiple interdependent values, use `createStore` instead.
- **Global State**: `useStore` operates on a shared global state managed by Zustand Q. Any component using the same `key` or `selector` will access and update the same state.
- **Type Safety**: The generic type `T` ensures compile-time checks, making it a safer alternative to raw JavaScript state management.
- **Differences from `useState`**: Unlike `useState`, which is isolated to a single component, `useStore` provides global state persistence and reactivity across your app.

## Comparison

| Feature       | `useState`      | `useStore`        |
| ------------- | --------------- | ----------------- |
| Scope         | Component-local | Global            |
| State Sharing | Manual (props)  | Automatic         |
| Type Safety   | Basic           | Enhanced with `T` |
| Complexity    | Simple          | Simple to Medium  |
