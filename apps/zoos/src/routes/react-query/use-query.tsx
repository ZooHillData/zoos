import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/react-query/use-query')({
  component: RouteComponent,
})

///
// Route Component
///

import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { createGetQueryOptions } from '@zoos/react-query'

///
/// Define `getQueryOptions`
///

const getQueryOptions = createGetQueryOptions({
  // The final queryKey will merge with the params required,
  // by the `queryFn`.
  //
  // e.g. ["generic-fetch", { url: "https://google.com" }]
  queryKey: ['generic-fetch'],
  queryFn: async (params: { url: string; onFetch?: () => void }) => {
    params.onFetch?.()
    const response = await fetch(params.url)
    const json = await response.json()
    return json as Record<string, unknown>
  },
  // Optionally, set baseOptions on the query
  // these will be merged with the options passed
  // when the useQuery hook is called
  options: {
    refetchOnWindowFocus: false,
  },
})

///
/// Use in Component
///

function RouteComponent() {
  const [fetchCount, setFetchCount] = React.useState(0)
  const { data } = useQuery(
    getQueryOptions({
      params: {
        url: 'http://universities.hipolabs.com/search?name=georgia institute of technology',
        // This is defined in the queryFn
        // ? Question for the reader:
        // Tanstack Query got rid of onSuccess, onError, etc. callbacks.
        //
        // If you want to replicate the `onSuccess` paradigm, you have to use an
        // effect on data. This doesn't fully work because this won't fire if
        // the data doesn't change even if the query ran successfully.
        //
        // Here is the link to the RFC on removing the onX callbacks
        // from react-query: https://github.com/TanStack/query/discussions/5279
        //
        // ? Question: do we want to add this functionality to the `createGetQueryOptions`
        // ? function as an optional argument?
        onFetch: () => {
          setFetchCount((prev) => prev + 1)
        },
      },
      options: {
        // Optionally, override the baseOptions
        // this example refetches every 3 seconds
        refetchInterval: 3000,
      },
    }),
  )

  return (
    <div>
      <span>Fetch count: {fetchCount}</span>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
