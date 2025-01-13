import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/libraries/shadcn/button')({
  component: RouteComponent,
})

///
/// Component
///
import { HandHeartIcon } from 'lucide-react'

import { Button, buttonVariants, cn } from '@zoos/shadcn'

const variants = [
  'default',
  'secondary',
  'destructive',
  'warning',
  'success',
  'outline',
  'ghost',
  'link',
] as const

const sizes = ['lg', 'default', 'sm', 'icon'] as const

export function RouteComponent() {
  return (
    <div className="flex w-[500px] flex-col gap-2 rounded border p-4">
      <div className="flex w-full items-center justify-between gap-2 border-b">
        {sizes.map((size) => (
          <p
            key={size}
            className={cn(buttonVariants({ variant: 'ghost', size }))}
          >
            {size}
          </p>
        ))}
      </div>
      {variants.map((variant) => (
        <div
          key={variant}
          className="flex w-full items-center justify-between gap-2"
        >
          {sizes.map((size) => (
            <Button key={size} size={size} variant={variant}>
              {size === 'icon' ? <HandHeartIcon /> : variant}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}
