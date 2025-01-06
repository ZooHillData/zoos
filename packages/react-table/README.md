# @zoos/react-table

Library of components, hooks and functions for building tables with `@tanstack/react-table`.

## Features

### `useControlledTable`

- Provides fully controlled table state with performance guardrails on frequently firing events (e.g. column resizing `onStateChange` only fires once column resizing completes)
- Sets up row models: core, expanded, faceted, filtered, sorted, grouped
- Adds filter, sort functions and a few other helpful defaults to `useReactTable` (e.g. `columnResizeMode: "onChange"`)

```tsx
import { useControlledTable } from "@zoos/react-table";

// Controlled external table state
const [state, setState] = React.useState({} as TableState);

// Takes in same options as standard `useReactTable` except
// for the individual onStateChange handlers (e.g. onColumnVisibilityChange)
const { table } = useControlledTable({
  data,
  columns,
  state,
  onStateChange: (state) => setState(state),
});
```

### `useVirtualization`

- Hook wires up table with column and row virtualization

  ```tsx
  import { useVirtualization } from "@zoos/react-table";

  const {
    // Scroll container immediately wrapping table
    scrollContainerRef,
    // Row virtualization
    rowVirtualizer,
    virtualRows,
    // Column Virtualization -
    // padding left and padding right are used to add fake columns
    columnVirtualizer,
    virtualColumns,
    virtualPaddingLeft,
    virtualPaddingRight,
  } = useVirtualization({
    // Standard `Table` returned from `useReactTable`
    table,
    // `row` and `column` are standard options passed
    // to `useVirtualizer` (omitting ones defined from table)
    row: {
      // Row height in pixels - helps with scrolling smoothness
      estimateSize: () => 20,
      // How many rows to render on either side of viewport
      overscan: 5,
    },
    column: {
      // How many columns to render on either side of viewport
      overscan: 3,
    },
  });
  ```

### Feature Props

Tanstack Table is amazing. There are examples for everything you need (column pinning, resizing, etc.).

Unfortunately, each feature requires passing CSS rules (and other props) to each table component (`<thead />`, `<tr />`, `<td />`, ... ) in certain ways.

So you don't have to worry about the prop wiring for standard features, we've provided prop getters in `featureProps`. For styling, we used Tailwind classes (where we could) and inline styles when dynamic values were required.

_If people aren't using Tailwind, we can provide a pure inline styles version or you can look at the `featureProps` definitions in [./packages/react-table/src/lib/feature-props](https://github.com/zoohilldata/zoos/tree/main/packages/react-table/src/lib/feature-props) and replicate._

```tsx
import { featureProps, mergeFeatureProps } from "@zoos/react-table";

// Usually memoized for performance
const componentProps = React.useMemo(
  () =>
    mergeFeatureProps([
      // Row virtualization props - some feature props require data to work
      featureProps.rowVirtualization({ scrollContainerRef, rowVirtualizer }),

      // Sticky header
      featureProps.stickyHeader({
        // In most feature prop getters, you can provide custom props
        // that will be merged into that feature through the `custom`
        // field.
        //
        // For stickyHeader, `thead` is the only table component
        // affected, and therefore, the only table component that
        // can be customized.
        //
        // For stickyHeader, if you don't already have a background set
        // on `thead`, rows will show through the sticky header.
        //
        // Like stickyHeader, there are other features that require custom
        // props for them to work *fully*.
        custom: {
          thead: { className: "bg-slate-50" },
        },
      }),
      // You can also merge in your own custom styles
      {
        table: { className: "text-sm" },
        th: () => ({ className: "px-1 py-0.5" }),
        td: () => ({ className: "px-1 py-0.5" }),
      },
    ]),
  [scrollContainerRef, rowVirtualizer],
);

return (
  // Spread component props into the main table components
  <div {...componentProps.container}>
    <table {...componentProps.table}>
      <thead {...componentProps.thead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} {...componentProps.trHead?.({ headerGroup })}>
            {headerGroup.headers.map((header) => {
              return (
                // When components rendered in iterator,
                // componentProp is a function that gets relevant iteration context
                <th key={header.id} {...componentProps.th?.({ header })}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...componentProps.tbody}>
        {virtualRows.map((virtualRow) => {
          const row = table.getRowModel().rows[virtualRow.index];
          return (
            <tr key={virtualRow.index} {...componentProps.trBody?.({ row, virtualRow })}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id} {...componentProps.td?.({ cell, virtualRow })}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
```

### Components

Components useful for building more advanced table features.

We are pretty early on building the components, so there are only a few right now:

- `<HeaderContextMenu />` - Context menu for column headers, providing sort, show / hide, column pinning
- `<HeaderSortIndicator />` - Sort indicator icon with sort index (for multi-column sorting)

You can see examples of their use in `./apps/zoos/src/routes/react-table/standard.tsx`.

### `getColumns` - "Column Type Inference"

Infer columns from data passed to reduce the boilerplate for a generic table.

#### Current State

- No type inference, return columnHelper.accessor() for each column ID

#### Coming Shortly

- type inference automatically sets up correct filter, sort, edit, etc.
- simple override experience to deep merge / override

### Backlog Features

- Column reorder, double click makes it big enough to fit the widest
- Row reorder and resize, default height, double click makes it big enough
- Column / Row selection
- Saving views with permissions
