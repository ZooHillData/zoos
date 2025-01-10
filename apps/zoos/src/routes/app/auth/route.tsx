import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth"!</div>
}
