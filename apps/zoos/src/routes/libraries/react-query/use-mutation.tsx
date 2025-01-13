import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/libraries/react-query/use-mutation')({
  component: RouteComponent,
})

///
// Route Component
///

import { useMutation } from '@tanstack/react-query'
import { createMutationOptions } from '@zoos/react-query'
import { Button } from '@zoos/shadcn'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const getMutationOptions = createMutationOptions({
  // The final queryKey will merge with the params required,
  // by the `queryFn`.
  //
  // e.g. ["generic-fetch", { url: "https://google.com" }]
  mutationKey: ['generic-mutation'],
  mutationFn: async (variables: { id: string }) => {
    await sleep(200)
    return { id: variables.id, status: 'success' }
  },
  // Optionally, set baseOptions on the query
  // these will be merged with the options passed
  // when the useQuery hook is called
  options: {
    onSuccess: ({ data, queryClient }) => {
      window.alert(`onSuccess from creation: ${JSON.stringify({ data })}`)
      // This will invalidate all queries that start with ["query", "key", "base"]
      queryClient.invalidateQueries({ queryKey: ['query', 'key', 'base'] })
    },
  },
})

function RouteComponent() {
  const { queryClient } = Route.useRouteContext()

  const { mutate } = useMutation(
    getMutationOptions({
      options: {
        onSuccess: () => {
          window.alert('onSuccess from useMutation!')
        },
      },
      queryClient,
    }),
  )

  return (
    <div className="flex h-full items-center justify-center">
      <Button onClick={() => mutate({ id: '1' })}>Mutate</Button>
    </div>
  )
}
