import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/core/react-table/full-customization')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full items-center justify-center gap-1">
      <span>For full customization, copy contents of</span>
      <a
        className="text-primary hover:underline"
        rel="noreferrer"
        target="_blank"
        href="https://github.com/zoohilldata/zoos/tree/main/packages/react-table-ui/src/tables/standard.tsx"
      >
        Standard Table Setup
      </a>{' '}
      into your app.
    </div>
  )
}
