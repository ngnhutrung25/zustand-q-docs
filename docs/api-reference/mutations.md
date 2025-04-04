---
id: mutations
title: mutations
sidebar_label: mutations
sidebar_position: 3
---

## Overview

Mutations in Zustand Q handle state updates like adding, updating, or deleting data, with support for asynchronous operations.

## Configuration

Define mutations in the `mutations` object of `createStore`:

```typescript
mutations: {
  addItem: {
    mutationFn: (variables: TVariables) => Promise<TData>,
    onStore: (data: TData, set: SetState<TState>) => void,
    onStart?: () => void,
    onSuccess?: (data: TData) => void,
    onError?: (error: unknown) => void,
    onFinish?: () => void,
  },
},
```

- **mutationFn**: Async function to perform the mutation.
- **onStore**: Updates the store with the mutation result.
- **Lifecycle Hooks**: `onStart`, `onSuccess`, `onError`, `onFinish`.

## Usage

```typescript
const { mutate: addItem, isPending } = useMyStore().addItem({
  onSuccess: (data) => console.log("Added:", data),
});
addItem({ name: "New Item" });
```

### Return Values

- **mutate**: Function to trigger the mutation.
- **isPending**: `true` while mutating.
- **isSuccess**: `true` on success.
- **isError**: `true` on error.
- **error**: Error object if failed.

## Example

```typescript
import { createStore } from "zustand-q";
import axios from "axios";

interface Cat {
  id: string;
  name: string;
}

export const useCatStore = createStore({
  initialData: { cats: [] as Cat[] },
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
});

const App = () => {
  const { addCat } = useCatStore();
  const { mutate: createCat } = addCat();

  return <button onClick={() => createCat({ name: "Mimi" })}>Add Cat</button>;
};
```
