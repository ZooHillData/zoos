import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/core/react-query/use-query')({
  component: RouteComponent,
})

///
// Route Component
///

import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { createQueryOptions } from '@zoos/react-query'

///
/// Define `getQueryOptions`
///

const myQueryOptions = createQueryOptions({
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
    myQueryOptions({
      params: {
        url: 'http://universities.hipolabs.com/search?name=georgia institute of technology',
        // onFetch running is defined as a parameter and called in
        // the `queryFn`.
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
