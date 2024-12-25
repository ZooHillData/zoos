# What is Zoos?

Monorepo of composable libraries and methods to build React web apps. [Docs](./docs/index.md)

- **Zoos App -** A Vite / React / Tanstack Router app composing core React libraries into a full app - with lots of documentation / examples
- **React Libraries -** - small, focused, highly composable React libraries

## Zoos App

The entrypoint into the app.

### Quick Start

1. `npm install`
2. `npx nx serve zoos`
3. Go to: [http://localhost:4200](http://localhost:4200)

### Features

## Tanstack Router standard setup\*\*

Standard Tanstack Router setup will include:

- **`@tanstack/react-router-with-query` -** React Query / Router integration
- **Auto-generated navigation -** from routeTree.gen.ts (or Router API)
- **Dialogs, Toasts -** state management in zustand store w/ component shells placed in `__root.tsx` (toast, dialog, etc.)
- **Global Zustand store -** - with `immer`, `local persist` plugins, type inference, auto useShallow and other DX enhancements
- **Authentication Routes -** routes (login, forgot password, ..), react-query options with invalidation / query key wiring, login, signup components and redirects wired up

**Routes Examples**

Defined in `apps/zoos/src/routes`. They provide:

- Playgrounds and documentation for the core Zoos libraries
- Examples composing Zoos libraries into standard features

## React Libraries

- Work well independently but really shine when used together
- Packages are simple, focused and highly composable
- Designed for incremental adoption
- Releases will maintain full interoperability through the Zoos App

[@zoos packages on npm](https://www.npmjs.com/settings/zoos/packages)
