import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/features/app/auth/confirm-otp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/confirm-otp"!</div>
}
