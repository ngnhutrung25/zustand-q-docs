---
id: installation
title: Installation
sidebar_label: Installation
sidebar_position: 2
---

## Prerequisites

Before installing Zustand Q, ensure you have the following:

- **Node.js**: Version 14 or higher.
- **React**: Version 16.8.0 or higher. Works with both React and React Native projects.

## Install Zustand Q

Install Zustand Q via npm or Yarn:

```bash
npm install zustand-q
```

or

```bash
yarn add zustand-q
```

This will also install `zustand` (version 5.0.3 or higher) as a dependency automatically.

### Optional Dependencies

If your project involves HTTP requests (e.g., as shown in the examples), you may want to install `axios`:

```bash
npm install axios
```

or

```bash
yarn add axios
```

### Note for TypeScript Users

Zustand Q is built with TypeScript and provides type definitions out of the box. Ensure your project has TypeScript installed (`npm install typescript`) and a `tsconfig.json` file configured if you want to leverage its type safety features.
