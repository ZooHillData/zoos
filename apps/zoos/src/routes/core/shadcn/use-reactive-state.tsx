import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/core/shadcn/use-reactive-state')({
  component: RouteComponent,
})

import React from 'react'
import { useReactiveState } from '@zoos/shadcn'

function RouteComponent() {
  // External state + useEffect is to mimic
  // a query or other update
  const [externalState, setExternalState] = React.useState('Loading...')
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setExternalState('Now loaded!')
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  // ~ Reactive state
  // value will update when externalState changes
  const [value, setValue] = useReactiveState(externalState)

  return <div>{value}</div>
}
