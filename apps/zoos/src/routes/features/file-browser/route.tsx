import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/features/file-browser')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Outlet />
    </div>
  )
}
