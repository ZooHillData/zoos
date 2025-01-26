import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/features/objects/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/features/objects/admin"!</div>
}
