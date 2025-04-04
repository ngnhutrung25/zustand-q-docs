---
id: selectors
title: Selectors
sidebar_label: Selectors
sidebar_position: 5
---

## Overview

Selectors allow you to access specific parts of the state efficiently in Zustand Q.

## Syntax

```typescript
const value = useStore((state) => state.key);
// or
const value = useStore<T>("key");
```

- **Function Selector**: Use a function to derive state.
- **String Selector**: Use a string to directly access a key.

## Example

```typescript
import { createStore } from "zustand-q";

interface State {
  count: number;
}

export const useMyStore = createStore({
  initialData: { count: 0 } as State,
});

const App = () => {
  const count = useMyStore((state) => state.count);
  const count2 = useMyStore<number>("count");

  return (
    <div>
      Count: {count} (or {count2})
    </div>
  );
};
```

## Notes

- String selectors are type-safe and concise.
- Function selectors are more flexible for computed values.
