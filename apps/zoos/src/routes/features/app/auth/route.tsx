import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/features/app/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth"!</div>
}
