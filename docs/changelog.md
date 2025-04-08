---
id: changelog
title: Changelog
sidebar_label: Changelog
sidebar_position: 9
---

## Overview

This changelog tracks the evolution of Zustand Q, documenting new features, improvements, bug fixes, and breaking changes across versions. Each entry includes a release date and a detailed list of updates to help you understand what’s changed and how it impacts your usage. For the latest version, check the [GitHub releases](https://github.com/ngnhutrung25/zustand-q/releases).

## Version History

### v0.1.2 - 2025-04-03

_Initial Release_

The first public release of Zustand Q, introducing a lightweight state management library with async superpowers built on top of Zustand.

- **Features**:

  - Added support for **queries** to fetch data asynchronously and update the store (see [Queries](./api-reference/queries)).
  - Added support for **mutations** to handle CRUD operations with async workflows (see [Mutations](./api-reference/mutations)).
  - Introduced the `useStore` hook for simple, type-safe global state management (see [useStore](./api-reference/use-store)).
  - Enhanced **selectors** with both string and function-based syntax for efficient state access (see [Selectors](./api-reference/selectors)).
  - Added `devtoolsName` option in `createStore` for debugging with Redux DevTools (see [createStore](./api-reference/create-store)).
  - Added `persistName` option in `createStore` for persisting state to local storage (see [createStore](./api-reference/create-store)).

- **Improvements**:

  - Improved TypeScript support with generic types for `TState`, `TActions`, `TQueries`, and `TMutations`, ensuring type safety across the library.
  - Optimized integration with Zustand v5.0.3 for better performance and compatibility.

- **Documentation**:
  - Launched initial documentation site with guides and examples (e.g., [Cat List](./examples/cat-list)).

### v0.1.1 - 2025-03-25

_Pre-release (Internal)_

- Internal testing version with basic `createStore` functionality.
- Limited to core state management without async features.

### v0.1.0 - 2025-03-15

_Pre-release (Prototype)_

- Initial prototype of Zustand Q.
- Basic setup with TypeScript, Rollup, and Zustand dependency.

## Upcoming Versions

Stay tuned for future updates! Planned features include:

- Enhanced query caching and retry mechanisms.
- Middleware support for custom logic.
- More examples and integrations (e.g., React Native).

Check [GitHub Issues](https://github.com/ngnhutrung25/zustand-q/issues) for ongoing discussions and feature requests.

## Notes

- **Date Format**: Dates follow `YYYY-MM-DD` for consistency.
- **Versioning**: Follows [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH).
- **Contributing**: To add to this changelog, submit a PR with your changes (see [Contributing](./contributing)).

---

This is the end of the documentation. Return to [Introduction](./introduction).
