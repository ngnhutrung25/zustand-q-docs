---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
sidebar_position: 3
---

## Basic Example

Let's create a simple counter application to get familiar with Zustand Q.

### Step 1: Create a Store

```typescript
// store/counterStore.ts
import { createStore } from "zustand-q";

export const useCounterStore = createStore({
  initialData: { count: 0 },
  actions: (set) => ({
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }),
});
```

### Step 2: Use the Store in a Component

```typescript
// App.tsx
import { useCounterStore } from "./store/counterStore";

const App = () => {
  const count = useCounterStore((state) => state.count);
  const { increment, decrement } = useCounterStore();

  return (
    <div style={{ padding: 20 }}>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default App;
```

### Explanation

- **Store Creation**: We use `createStore` to define initial state (`count: 0`) and actions (`increment` and `decrement`).
- **Usage**: The component subscribes to the `count` state and calls actions to update it.

This is a basic example of Zustand Q's core functionality. In later sections, we'll explore asynchronous state management with queries and mutations.
