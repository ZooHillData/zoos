# What is Zoos?

[Docs](./docs) | [Ideas, Feedback, Bugs](https://github.com/ZooHillData/zoos/discussions/new?category=ideas) | [NPM Packages](https://www.npmjs.com/~alexryanterry)

[Tanstack](https://tanstack.com) and [ShadCN (Tailwind / Radix)](https://ui.shadcn.com/) are very powerful and flexible libraries for building React apps. Because they are so flexible, it takes a bit of experimentation to figure out how to use them most effectively.

Zoos is a monorepo of small building blocks (functions, hooks, components, examples) that capture the way we've learned to build apps with these core libraries. In general, the libraries are small and highly focused, typically built to work with a single 3p library, e.g. `@tanstack/react-table` => `@zoos/react-table`.

The libraries do their best to stay true to the design principles and feel of the core libraries. Acting as a simple layer of examples, helper functions and components that can be pieced together at a slightly high level of abstraction.

## Architecture

- **Zoos App -** The entrypoint into the functionality provided by Zoos. A Vite, Tanstack Router app composing core React libraries into features - lots of examples and documentation.
- **React Libraries -** Small, focused libraries provide patterns for using
  - @tanstack/react-query
  - @tanstack/react-table
  - @tanstack/react-form
  - shadcn
  - _(COMING SOON)_
    - supabase
    - zustand
    - react-grid-layout
    - excalidraw
    - mdxeditor
    - recharts
    - plotly
    - @tanstack/react-router
    - @tanstack/start

## Zoos App

Entrypoint into core libraries.

### Quick Start

1. `npm install`
2. `npx nx serve zoos`
3. Go to: [http://localhost:4200](http://localhost:4200)

### Features

#### Routes Examples

Defined in `apps/zoos/src/routes`. They provide:

- Playgrounds and documentation for the core Zoos libraries
- Examples composing Zoos libraries into standard features

## React Libraries

- `@zoos/shadcn` ([Examples](https://github.com/ZooHillData/zoos/tree/main/apps/zoos/src/routes/shadcn) | [Code](https://github.com/ZooHillData/zoos/tree/main/packages/shadcn) | [NPM](https://www.npmjs.com/package/@zoos/shadcn)) - Simple wrapper around shadcn/ui

- `@zoos/react-form` ([Examples](https://github.com/ZooHillData/zoos/tree/main/apps/zoos/src/routes/react-form) | [Code](https://github.com/ZooHillData/zoos/tree/main/packages/react-form) | [NPM](https://www.npmjs.com/package/@zoos/react-form)) - Render forms with Tanstack Form, input components composing primitives from @zoos/shadcn

- `@zoos/react-query` ([Examples](https://github.com/ZooHillData/zoos/tree/main/apps/zoos/src/routes/react-query) | [Code](https://github.com/ZooHillData/zoos/tree/main/packages/react-form) | [NPM](https://www.npmjs.com/package/@zoos/react-form)) - Simple helper functions for generating queries and mutations with type inference

## Intentions, Request for Feedback

Libraries are designed specifically for incremental, low effort adoption, wide version interoperability, flexibility, developer experience and simplicity.

If you have ideas to...

- remove an assumption so your use case is met
- reduce friction in adopting this library
- make upgrading to take advantage of latest features easy
- make the library simpler or more flexible
- improve documentation or code readability
- make an API easier to understand

, please [start a discussion](https://github.com/ZooHillData/zoos/discussions/new?category=ideas).
