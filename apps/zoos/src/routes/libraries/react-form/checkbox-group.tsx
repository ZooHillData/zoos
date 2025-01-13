import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/libraries/react-form/checkbox-group')({
  component: RouteComponent,
})

import React from 'react'
import { CheckboxGroup, getOptions } from '@zoos/react-form'

const options = getOptions({
  values: ['3', '2', '1', '4'],
  // Optional getLabel function
  // (defaults to (value) => value)
  getLabel: (value) => `Option ${value}`,
})

function RouteComponent() {
  const [value, setValue] = React.useState<string[]>([])
  const [value2, setValue2] = React.useState<string[]>([])

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2>Vertical</h2>
        <div className="space-y-3">
          <CheckboxGroup
            value={value}
            onChange={(value) => setValue(value)}
            options={options}
          />
        </div>
      </div>
      <div className="space-y-2">
        <h2>Horizontal</h2>
        <div className="space-y-3">
          <CheckboxGroup
            value={value2}
            onChange={(value) => setValue2(value)}
            options={options}
          />
        </div>
      </div>
    </div>
  )
}
