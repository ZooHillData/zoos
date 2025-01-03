import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/react-table/simple-virtual")({
  component: RouteComponent,
});

import React from "react";
// Create fake user data
import { type User } from "../../lib/fake-data";
import { mergeStyleProps } from "@zoos/ui-shad";

import {
  createColumnHelper,
  type TableState,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<User>();
const columns: ColumnDef<User>[] = [
  columnHelper.group({
    header: "Person",
    columns: [
      columnHelper.accessor("first_name", { header: "First" }),
      columnHelper.accessor("last_name", { header: "Last" }),
      columnHelper.accessor("age", { header: "Age" }),
    ],
  }),
  columnHelper.group({
    header: "Address",
    columns: [
      columnHelper.accessor("street", { header: "Street" }),
      columnHelper.accessor("city", { header: "City" }),
      columnHelper.accessor("state", { header: "State" }),
      columnHelper.accessor("zip", { header: "Zip" }),
    ],
  }),
];

import {
  useControlledTable,
  useComponentProps,
  useVirtualization,
} from "@zoos/react-table";

function RouteComponent() {
  const { data } = Route.useRouteContext();

  const [state, setState] = React.useState({} as TableState);

  // Hook #1: Create table with single `state` / `onStateChange` entrypoint
  // pre-optimized for performance
  const { table } = useControlledTable({
    data,
    columns,
    state,
    onStateChange: (state) => setState(state),
  });

  // Hook #2: Row and column virtualization
  const { scrollContainerRef, rowVirtualizer, virtualRows } = useVirtualization(
    {
      table,
      rowOptions: {
        estimateSize: () => 20,
        overscan: 5,
      },
      columnOptions: {
        overscan: 3,
      },
    },
  );

  // Hook #3: Quickly get base component props to enable selected features
  // (reactive to table state, virtualizer and features selected)
  const componentProps = useComponentProps({
    table,
    rowVirtualizer,
    features: {
      // Enable sticky header
      // ==> this applies CSS to `<thead />`:
      //    `top: 0; position: sticky; z-index: 10; background: var(--background);`)
      stickyHeader: true,
      // When resizing column, apply CSS to `<table />`: `user-select: none;`
      resizeColumnNoSelect: true,
    },
  });

  return (
    <div className="h-full p-8">
      <div ref={scrollContainerRef} {...componentProps.container}>
        <table {...componentProps.table}>
          <thead {...componentProps.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                {...componentProps.thead_tr?.({ headerGroup })}
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} {...componentProps.th?.({ header })}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...componentProps.tbody}>
            {virtualRows.map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <tr
                  key={virtualRow.index}
                  {...componentProps.tbody_tr?.({ row, virtualRow })}
                  /*
                  ~ Overriding component props
                  Use case: Row striping + custom `onClick` applied to the row

                  In this example, we:
                  1. override the styles on the table row using `className`
                     to apply row striping (different background color on every other row)
                  2. Include a custom `onClick` handler when row is clicked

                  ! Some overrides can break default feature behavior
                  If overriding styles via `className` or event handlers, you can edit the props directly. Some 
                  overrides can break the default styes. E.g. 

                    - `style` is the channel for styling supplied for core features (e.g. row virtualization / sticky header)
                    - `data-index`, `ref` on `<tr />` within `<tbody />` is used for row virtualization

                  If overriding `style`, use `mergeStyleProps` utility (see section "Merging with `mergeStyleProps`" section below)
                  */
                  // 1. override styles on table row using `className`
                  className={
                    virtualRow.index % 2 === 0 ? "bg-primary-muted" : ""
                  }
                  // 2. Include a custom `onClick` handler when row is clicked
                  onClick={() => {
                    console.log(`Row clicked: "${row.id}"`);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      /*
                      ~ Merging with `mergeStyleProps`
                      For some reason, we want to style with `style` prop here.. 🤷🏼 

                      In this situation, use the `mergeStyleProps` utility from `ui-shad` 
                      to merge the `style` (with spread) and `className` (via `cn`) 
                      properties automatically. 

                      (or you can spread the styles yourself, but it's a bit clunky)
                      */
                      {...mergeStyleProps({
                        first: componentProps.td?.({ cell }),
                        second: { style: { borderRight: "2px solid green" } },
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
