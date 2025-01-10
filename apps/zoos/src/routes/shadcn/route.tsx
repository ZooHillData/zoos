import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/shadcn')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Outlet />
    </div>
  )
}