import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/libraries/react-query')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Outlet />
    </div>
  )
}
