---
id: cat-manager
title: Cat Manager
sidebar_label: Cat Manager
sidebar_position: 6
---

## Overview

This example demonstrates how to use Zustand Q to manage a list of cats, including fetching data (queries) and adding new cats (mutations).

## Store Setup

```typescript
// store/catStore.ts
import axios from "axios";
import { createStore } from "zustand-q";

export interface Cat {
  id: string;
  name: string;
}

interface CatState {
  cats: Cat[];
}

export const useCatStore = createStore({
  initialData: { cats: [] } as CatState,
  actions: (set) => ({
    clearCats: () => set({ cats: [] }),
    addCats: (name: string) => set({ cats: [{ id: "123", name }] }),
  }),
  queries: {
    getCatList: {
      queryFn: async () =>
        await axios.get<{ data: Cat[] }>("https://api.example.com/cats"),
      onStore: (data, set) => set({ cats: data.data }),
    },
  },
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
```

## Component Usage

```typescript
// App.tsx
import { useState } from "react";
import { useCatStore } from "./store/catStore";

const App = () => {
  const [name, setName] = useState("");
  const { addCat, getCatList } = useCatStore();
  const cats = useCatStore((state) => state.cats);
  const { isPending, refetch } = getCatList({ enabled: true });
  const { mutate: createCat } = addCat();

  const handleAddCat = () => {
    if (name) {
      createCat({ name });
      setName("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Cat Manager</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Cat name"
      />
      <button onClick={handleAddCat}>Add Cat</button>
      <button onClick={() => refetch()}>Fetch Cats</button>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cats.map((cat) => (
            <li key={cat.id}>
              {cat.name} (ID: {cat.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
```

## Explanation

- **Store**: Defines a `cats` state, a query (`getCatList`) to fetch cats, and a mutation (`addCat`) to add new cats.
- **Component**: Uses the store to fetch and display cats, and allows adding new ones via a form.

This example showcases the power of Zustand Q's asynchronous state management.
