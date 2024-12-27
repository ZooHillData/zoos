# What is Zoos?

[Docs](./docs) | [Ideas, Feedback, Bugs](https://github.com/ZooHillData/zoos/discussions/new?category=ideas) | [NPM Packages](https://www.npmjs.com/~alexryanterry)

Monorepo of composable libraries and methods to build React web apps.

- **Zoos App -** A Vite, Tanstack Router app composing core React libraries - lots of examples and documentation
- **React Libraries -** small, focused, highly composable React libraries

## Zoos App

Entrypoint into core libraries.

### Quick Start

1. `npm install`
2. `npx nx serve zoos`
3. Go to: [http://localhost:4200](http://localhost:4200)

### Features

#### Tanstack Router standard setup

Standard Tanstack Router setup will include:

- **React Router With Query -** - set up using `@tanstack/react-router-with-query`
- **Auto-generated navigation -** from routeTree.gen.ts (or Router API)
- **Dialogs, Toasts -** state management in zustand store w/ component shells placed in `__root.tsx` (toast, dialog, etc.)
- **Global Zustand store -** - with `immer`, `local persist` plugins, type inference, auto useShallow and other DX enhancements
- **Authentication Routes -** routes (login, forgot password, ..), react-query options with invalidation / query key wiring, login, signup components and redirects wired up

#### Routes Examples

Defined in `apps/zoos/src/routes`. They provide:

- Playgrounds and documentation for the core Zoos libraries
- Examples composing Zoos libraries into standard features

## React Libraries

React libraries are documented in the Zoos app, one folder in `routes` per library.

Library API documentation in Route files: [Route files](https://github.com/zoohilldata/zoos/tree/main/apps/zoos/src/routes)

[NPM Packages](https://www.npmjs.com/~alexryanterry)

### Philosophy

- Work well independently, built as a whole
- Designed for incremental adoption
- All versions package versions upgrade together
- Maintain high degree of interoperability between versions

### Incremental Adoption

Libraries are designed specifically for incremental, low effort adoption and wide version interoperatbility.

If you have ideas to...

- remove an assumption so your use case is met
- reduce friction in adopting this library
- make upgrading to take advantage of latest features easy
- make the library simpler or more flexible

, please [start a discussion](https://github.com/ZooHillData/zoos/discussions/new?category=ideas).
