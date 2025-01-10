import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/auth/confirm-otp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/confirm-otp"!</div>
}
