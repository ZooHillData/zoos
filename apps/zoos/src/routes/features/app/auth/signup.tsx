import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/features/app/auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/signup"!</div>
}
