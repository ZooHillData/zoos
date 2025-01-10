import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/login"!</div>
}
