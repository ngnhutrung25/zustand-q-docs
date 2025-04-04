---
id: installation
title: Installation
sidebar_label: Installation
sidebar_position: 2
---

## Prerequisites

Before installing Zustand Q, ensure you have the following:

- Node.js (version 14 or higher)
- A React or React Native project

## Install Zustand Q

Install Zustand Q via npm or Yarn:

```bash
npm install zustand-q
```

or

```bash
yarn add zustand-q
```

### Peer Dependencies

Zustand Q relies on `zustand` as a peer dependency. If you haven't installed it yet, run:

```bash
npm install zustand
```

or

```bash
yarn add zustand
```

If your project uses HTTP requests (e.g., in the examples), you may also need `axios`:

```bash
npm install axios
```

or

```bash
yarn add axios
```

## Verify Installation

To confirm that Zustand Q is installed correctly, import it in your project:

```typescript
import { createStore } from "zustand-q";

const useMyStore = createStore({
  initialData: { count: 0 },
});

console.log(useMyStore); // Should log a Zustand store
```
