import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/core/shadcn/propose-class-name-override',
)({
  component: RouteComponent,
})

import { type WithClassNameFn, createCn } from '@zoos/shadcn'

// props are the same as <div>
const Container = ({
  className = (className) => className || '',
  ...props
}: WithClassNameFn<React.HTMLAttributes<HTMLDivElement>>) => (
  <div
    className={className('flex flex-col gap-4 bg-green-500 p-8')}
    {...props}
  />
)

function RouteComponent() {
  return (
    <div className="flex gap-8">
      <div>
        <h2>
          Standard <code>cn</code> merge
        </h2>
        {
          //
          /* 
        ~ className override pattern proposal
          
        Pass a function for className: {className: (componentClassName?: string) => string}
            - `componentClassName` is the classname set internally by the component
            - function return fully overwrites the className

        If want to do standard cn(componentClassName, "new-class"), use: `createCn`

        For a full className override, pass a function that throws out the componentClassName, e.g., 
            `className: () => "new-class"` // will replace the entire className
         */
        }
        <Container className={createCn('text-black')}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Container>
      </div>

      <div>
        <h2>
          Full <code>className</code> override
        </h2>
        <Container
          className={() => 'flex gap-4 bg-pink-500 p-2 font-medium text-black'}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Container>
      </div>
    </div>
  )

  /*
  ~ Another pattern (meh 😐): `freshClassName`

  1. add another prop to all components, `freshClassName` 
  2. typical classname in component will look like this:
      `className={freshClassName || cn("flex gap-1", className)}`

      i.e. if passed, `freshClassName` takes precedence, then standard `cn` merge
  
  ~ BEST pattern 🎉: if (typeof className === "string" => run standard cn function)
     type ClassName =  (() => string) | string;

  Instead of createCn being called on the external, change the className 
  type to be the existing function type OR string.

  When it's string, use standard cn, if not, call function.
  Create a helper that component authors can use to add this feature
  instead of requiring that for override
  */
}
