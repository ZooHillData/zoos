# What is Zoos?

[Docs](./docs) | [Ideas, Feedback, Bugs](https://github.com/ZooHillData/zoos/discussions/new?category=ideas) | [NPM Packages](https://www.npmjs.com/~alexryanterry)

[Tanstack](https://tanstack.com) and [ShadCN](https://ui.shadcn.com/) are powerful libraries for building apps. They are a bit _too powerful_ in some cases. Zoos is a monorepo of composable libraries and methods that provide a slightly more user-friendly and opinionated API on top of these and other foundational libraries (like [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)).

You can think of this library as the "ShadCN" of Tanstack.

## Architecture

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

- `@zoos/shadcn` ([Examples](https://github.com/ZooHillData/zoos/tree/main/apps/zoos/src/routes/shadcn) | [Code](https://github.com/ZooHillData/zoos/tree/main/packages/shadcn) | [NPM](https://www.npmjs.com/package/@zoos/shadcn)) - Simple wrapper around Shad UI

- `@zoos/react-form` ([Examples](https://github.com/ZooHillData/zoos/tree/main/apps/zoos/src/routes/react-form) | [Code](https://github.com/ZooHillData/zoos/tree/main/packages/react-form) | [NPM](https://www.npmjs.com/package/@zoos/react-form)) - Render forms with Tanstack Form, better input components composing @zoos/shad-ui

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
