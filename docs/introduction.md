---
id: introduction
title: Introduction to Zustand Q
sidebar_label: Introduction
sidebar_position: 1
---

## Overview

Zustand Q is a modern, enhanced state management library built on top of [Zustand](https://github.com/pmndrs/zustand), tailored for **React** and **React Native** applications. It preserves Zustand’s lightweight and minimalist philosophy while introducing powerful asynchronous state management features inspired by [Tanstack React Query](https://tanstack.com/query). Whether you’re fetching data from an API, performing CRUD operations, or persisting user settings, Zustand Q offers a simple, type-safe, and scalable solution that eliminates boilerplate and complexity.

Born from the need to bridge synchronous state management with robust async workflows, Zustand Q empowers developers to handle real-world scenarios without sacrificing the elegance of Zustand’s API.

## Purpose

Zustand Q aims to simplify state management in modern React applications by solving common pain points:

- **Effortless Async Operations**: Replace manual API call handling with built-in `queries` and `mutations`.
- **TypeScript Excellence**: Provide a first-class TypeScript experience with detailed type definitions.
- **Streamlined Tooling**: Enable debugging and persistence with minimal configuration, avoiding the middleware overhead of other libraries.

It’s designed to be your go-to choice when you need more than basic state management but don’t want the complexity of larger frameworks.

## Key Benefits

Zustand Q stands out with the following features:

- **Asynchronous State Management**:

  - **Queries**: Fetch data seamlessly and update the store (e.g., `getCatList` to load a list of cats).
  - **Mutations**: Perform updates like adding or deleting items with type-safe async logic.
  - Example: `mutate({ name: "Mimi" })` to add a cat, with automatic store updates.

- **Developer Tools**:

  - Integrate with Redux DevTools using a single `devtoolsName` option.
  - Example: `devtoolsName: "MyStore"` lets you inspect state changes in your browser.

- **Persistence Made Simple**:

  - Save state to local storage with `persistName`—no extra setup required.
  - Example: `persistName: "app-theme"` keeps your theme setting across reloads.

- **Flexible Selectors**:

  - Access state with concise string selectors (`useStore<number>("count")`) or powerful function selectors (`(state) => state.count`).
  - Optimized for performance with Zustand’s memoization.

- **Type Safety**:
  - Enhanced TypeScript support with generics for state, actions, queries, and mutations.
  - Example: Define `interface Cat { id: string; name: string }` and get full type checking throughout your store.

These benefits make Zustand Q a lightweight yet feature-rich alternative, ideal for both prototyping and production-grade apps.

## Who It’s For

Zustand Q is perfect for:

- **React Developers**: Seeking a simple, scalable state management solution without Redux-level complexity.
- **TypeScript Enthusiasts**: Wanting strong typing and IDE support for state and async operations.
- **Mobile Developers**: Building React Native apps with consistent state management needs.
- **Teams**: Looking to reduce boilerplate and improve maintainability in small to large projects.

Whether you’re building a quick demo or a complex application with real-time data, Zustand Q adapts to your needs with minimal overhead.

Ready to get started? Jump into the [Getting Started](./getting-started) guide and build your first store!
