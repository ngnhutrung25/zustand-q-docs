---
id: mutations
title: Mutations
sidebar_label: Mutations
sidebar_position: 3
---

## Overview

Mutations in Zustand Q handle state updates such as adding, updating, or deleting data, with built-in support for asynchronous operations. They integrate seamlessly with Zustand's store, providing a straightforward way to manage side effects and state changes.

## Configuration

Define mutations in the `mutations` object of `createStore`. Each mutation is configured with the following properties:

```typescript
mutations: {
  addItem: {
    mutationFn: (variables: TVariables) => Promise<TData>,
    onStore: (data: TData, set: SetState<TState>) => void,
    onStart?: () => void,
    onSuccess?: (data: TData) => void,
    onError?: (error: unknown) => void,
    onFinish?: (data?: TData, error?: unknown) => void,
  },
},
```

- **`mutationFn`**: An async function that performs the mutation, accepting `variables` (type `TVariables`) and returning a promise of `TData`.
- **`onStore`**: A function to update the store with the mutation result, using Zustand's `set` method.
- **Lifecycle Hooks**: Optional callbacks (`onStart`, `onSuccess`, `onError`, `onFinish`) for handling mutation lifecycle events.

> Note: `TVariables` and `TData` are generic types you define based on your mutation's input and output.

## Usage

Call a mutation from your store with optional configuration overrides to customize its behavior:

```typescript
const { mutate: addItem, isPending } = useMyStore().addItem({
  onStart: () => console.log("Starting mutation..."),
  onSuccess: (data) => console.log("Added:", data),
  onError: (error) => console.error("Error:", error),
  onFinish: (data, error) => console.log("Finished with:", data || error),
});

// Trigger the mutation with variables
addItem({ name: "New Item" });
```

### Optional Configuration Overrides

When calling a mutation, you can provide an object with the following optional lifecycle hooks:

- **`onStart?: () => void`**: Runs **after** the `onStart` from the configuration when the mutation begins.
- **`onSuccess?: (data: TData) => void`**: Runs **after** the `onSuccess` from the configuration on successful mutation.
- **`onError?: (error: unknown) => void`**: Runs **after** the `onError` from the configuration if an error occurs.
- **`onFinish?: (data?: TData, error?: unknown) => void`**: Runs **after** the `onFinish` from the configuration when the mutation completes, receiving `data` (if successful) or `error` (if failed).

> **Note**: These lifecycle hooks execute **after** their counterparts in the mutation configuration, allowing you to extend or customize behavior without altering the original setup.

### Return Values

Mutations return an object with the following properties:

- **`mutate`**: `(variables: TVariables) => Promise<TData>` - Function to trigger the mutation with specified variables.
- **`isPending`**: `boolean` - `true` while the mutation is in progress.
- **`isSuccess`**: `boolean` - `true` if the mutation completed successfully.
- **`isError`**: `boolean` - `true` if the mutation failed.
- **`error`**: `unknown | null` - The error object if the mutation fails, or `null` if no error.
- **`successAt`**: `number | undefined` - Timestamp (in milliseconds) of the last successful mutation, or `undefined` if not yet successful.
- **`errorAt`**: `number | undefined` - Timestamp (in milliseconds) of the last error, or `undefined` if no error occurred.
- **`status`**: `"success" | "error" | "pending"` - Current state of the mutation.

## Example

Here’s a practical example of adding a cat to a list:

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
      onStart: () => console.log("Mutation started from config"),
    },
  },
});

const App = () => {
  const { cats, addCat } = useCatStore();
  const {
    mutate: createCat,
    isPending,
    status,
  } = addCat({
    onStart: () => console.log("Mutation started from override"),
    onSuccess: (data) => console.log("Cat added:", data.data),
  });

  return (
    <div>
      <button onClick={() => createCat({ name: "Mimi" })} disabled={isPending}>
        {isPending ? "Adding..." : "Add Cat"}
      </button>
      <p>Status: {status}</p>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>
            {cat.name} (ID: {cat.id})
          </li>
        ))}
      </ul>
    </div>
  );
};
```

In this example:

- The `addCat` mutation sends a POST request to add a new cat and updates the `cats` array in the store.
- The `onStart` from the configuration runs first, followed by the `onStart` from the override.
- The component displays the mutation status and the updated cat list.
