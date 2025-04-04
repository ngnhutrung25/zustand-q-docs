---
id: use-store
title: useStore
sidebar_label: useStore
sidebar_position: 4
---

## Overview

The `useStore` hook provides a simple way to manage state in Zustand Q, similar to React's `useState`.

## Syntax

```typescript
const [value, setValue] = useStore<T>("key", defaultValue);
```

or

```typescript
const [value, setValue] = useStore<T>((state) => state.key, defaultValue);
```

- **key**: The state key to access.
- **defaultValue**: Fallback value if the key doesn't exist.
- **selector**: Optional function to derive state.

## Example

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

## Notes

- Use `useStore` for simple state management outside of a full store.
- For complex state, prefer `createStore` with selectors.
