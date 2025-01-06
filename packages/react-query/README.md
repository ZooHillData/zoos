# @zoos/react-query

A simple utility for creating mutation and query options with type inference and quality of life improvements.

**_!!! If you are querying supabase, use the functions from `@zoohilldata/supabase` !!!_**

> **Why `@zoohilldata/supabase`?**
>
> @zoohilldata/supabase provides `createGetQueryOptionsSupa` and `createGetMutationOptionsSupa` that have the correct query cache keys to ensure that authentication events will automatically invalidate the query.

## Core principles

- Define the important parts of queries / mutations and let the caller define the rest
- Types should be inferred based on `queryFn` or `mutationFn`

## Installation

```bash
npm install @zoohilldata/react-query
```

## Use

For more details, view examples in [React Query Demo](https://github.com/zoohilldata/zoos-turbo/tree/main/apps/demo/src/routes/react-query)

### `createGetQueryOptions`

```tsx
import { useQuery } from "@tanstack/react-query";
import { createGetQueryOptions } from "@zoohilldata/react-query";

///
/// Define `getQueryOptions`
///

// Type inference based on queryFn
const getQueryOptions = createGetQueryOptions({
  queryKey: ["my-query"],
  queryFn: async (params: { id: number }) => {
    const data = await getDataFn();

    if (!data) {
      throw new Error("Data not found");
    }

    return data;
  },
  options: {
    refetchInterval: 2000,
  },
});

///
/// Use in component
///

const App = () => {
  const { data } = useQuery(
    // Override the refetch interval for this specific query
    getQueryOptions({ params: { id: 1 }, options: { refetchInterval: 3000 } }),
  );

  //
  // ...
  //
};
```

### `createGetMutationOptions`

```tsx
import { useMutation } from "@tanstack/react-query";
import { createGetMutationOptions } from "@zoohilldata/react-query";

///
/// Define the mutation
///

const getMutationOptions = createGetMutationOptions({
  mutationKey: ["my-mutation"],
  mutationFn: async (variables: { id: number }) => {
    const data = await postDataFn(variables);

    if (!data) {
      throw new Error("Data not found");
    }

    return data;
  },
  options: {
    onSuccess: ({ data, variables, queryClient }) => {
      // Do things on success in the standard definition
      // mostly for query cache invalidation at this stage.
      //
      // We typically let the caller handle specific onSuccess
      // handlers like showing a toast
      queryClient.invalidateQueries({ queryKey: ["my-query"] });
    },
  },
});

///
/// Use in component
///

import { Button } from "@zoohilldata/ui";

const App = () => {
  // Get the query client to pass to the `getMutationOptions` function.
  //
  // If using `@tanstack/react-router-with-query` and passing queryClient
  // through route context (preferred), use:
  // const { queryClient } = Route.useRouterContext()
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    options: {
      onSuccess: ({ queryClient, data, variables }) => {
        window.alert(`Success: ${JSON.stringify({ data, variables })}`);
      },
    },
  });

  return <Button onClick={() => mutate({ id: 1 })}>Run Mutation</Button>;
};
```

## Gotchas - passing empty params / variables

When calling a `mutationFn` or initializing a query with `getQueryOptions`, you must pass
`params` into `getQueryOptions` and `variables` into `mutate()` function even if they are
not required in your `queryFn` / `mutationFn`.

E.g.,

```tsx
const getQueryOptions = createGetQueryOptions({
  queryKey: ["my-key"],
  // Query function does not require parameters
  queryFn: async () => doSomething(),
});

const App = () => {
  const { data } = useQuery(
    // Params must be passed even if not required in queryFn definition above.
    // it doesn't matter what you pass b/c params have type `unknown`, but {} is the convention
    getQueryoptions({
      params: {},
    }),
  );
};
```

> **Why?**
>
> The types don't flow through properly in this situation with the current implementation. We would like to fix this in a future release so you can call `getQueryOptions()` and `mutate()` without passing empty params / variables
